"use client";
import AdminDashboard from "@/components/Admin/AdminDashboard";
import { useEffect, useState } from "react";
import { API } from "../../../../../config";
import { FaPlus } from "react-icons/fa";

import {
  isAuth,
  getCookie,
  getAppCoachClients,
  removeAppCoachClient,
  updateAppCoachClient,
  getallCoachPlans,
  getallCoachRetail,
  GetPlanByID,
  addSubscription,
  getAllCoachSubscriptions,
} from "@/actions/auth";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import toast, { Toaster } from "react-hot-toast";
import { TailSpin } from "react-loader-spinner";
import Link from "next/link";
const token = getCookie("token");
import { FaEye } from "react-icons/fa";
import Modal from "@mui/material/Modal";

const AllClubUsers = ({ params: { coachId } }) => {
  const [activeButton, setActiveButton] = useState(null);

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  const [plans, setPlans] = useState([]);
  const [retail, setRetail] = useState([]);
  const [clubUsers, setClubUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [userscount, setuserscount] = useState(0);
  const [currentuserID, setcurrentuserID] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setloading] = useState(false);
  const [isEdit, setIsEditOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [values, setValues] = useState({});
  const [subscriptionValues, setSubscriptionValues] = useState({
    planCode: 1
  });
  const [profile, setProfile] = useState();
  const [getplanbyid, setgetplanbyid] = useState([]);

  const [showPlansModel, setshowPlansModel] = useState(false);
  const [plandetails, setplandetails] = useState(false);
  const [isSubscriptionModalOpen, setIsSubscriptionModalOpen] = useState(false);
  const [coachSubscriptions, setCoachSubscriptions] = useState([]);

  const { name, email, mobileNumber, password } = values;
  const {
    startDate,
    endDate,
    planType,
    planCode
  } = subscriptionValues;

  const handleSubmit = (coachid) => (e) => {
    e.preventDefault();
    setIsEditOpen(false);
    setValues({ ...values, loading: true, error: false });
    const user = { name, email, password, mobileNumber };
    updateAppCoachClient(user, token, coachid).then((data) => {
      if (data && data.error) {
        setValues({ ...values, error: data.error, loading: false });
        toast.error(data.error);
      } else {
        toast.success(data.message);
        setValues({
          ...values,
          error: "",
          loading: false,
          message: data.message,
        });
        setTimeout(() => {
          fetchData();
        }, 350);
      }
    });
  };

  const handleChange = (name) => (e) => {
    setValues({ ...values, error: false, [name]: e.target.value });
  };

  const handleSubscriptionValuesChange = (name) => (e) => {
    setSubscriptionValues({
      ...subscriptionValues,
      error: false,
      [name]: e.target.value,
    });
  };

  const handleAddSubscription = async (e) => {
    e.preventDefault();
    setSubscriptionValues({ ...subscriptionValues, loading: true });
    const newSubscription = {
      planType,
      startDate,
      endDate,
      providedCoachId: coachId,
      paymentStatus: "completed",
      person: "admin",
      planCode
    };

    addSubscription(newSubscription, token).then((data) => {
      if (data && data.error) {
        setSubscriptionValues({
          ...subscriptionValues,
          error: data.error,
          loading: false,
        });
        toast.error(data.error);
      } else {
        toast.success("Subscription added successfully");
        setSubscriptionValues({
          ...subscriptionValues,
          loading: false,
          message: data.message,
        });
      }
    });
  };

  const handleViewSubscriptionsClick = async () => {
    setActiveButton("subscriptions");

    try {
      const data = await getAllCoachSubscriptions(coachId, token);
      console.log("response of getAllCoachSubscriptions api call => ", data);

      if (data.status_code === 200) {
        setCoachSubscriptions(Array.isArray(data?.data) ? data?.data : []);
        // toast.success("Subscriptions fetched successfully");
      } else {
        toast.error(data.message || "Error while fetching subscriptions!");
      }
    } catch (err) {
      console.log("error in handleViewSubscriptionsClick => ", err);
      toast.error("Error while fetching subscriptions!");
    }
  };

  const showEditModal = (user) => {
    setIsEditOpen(true);
    setcurrentuserID(user);
    setValues(user);
  };

  const ShowPlansModel = async (plans) => {
    setshowPlansModel(true);
    setplandetails(plans);
    const data = await GetPlanByID(token, plans?._id);
    setgetplanbyid(data?.data);
    console.log("plans", data.data);
  };

  const HidePlansModel = () => {
    setshowPlansModel(false);
    setplandetails([]);
    setgetplanbyid([]);
  };

  const showModal = (user) => {
    setIsOpen(true);
    setcurrentuserID(user);
  };

  const hideModel = () => {
    setIsOpen(false);
    setcurrentuserID([]);
    setInputValue("");
    setIsEditOpen(false);
  };

  const handleConfirmDelete = (id) => {
    setloading(true);
    handledelete(id);
    setIsOpen(false);
    setcurrentuserID([]);
    setInputValue("");
  };

  const handledelete = async (id) => {
    try {
      const data = await removeAppCoachClient(id, token);
      if (data && data.error) {
        toast.error(data.error);
        setloading(false);
      } else {
        toast.success(data.message);
        setTimeout(() => {
          fetchData();
        }, 350);
        setloading(false);
      }
    } catch (error) {
      console.error("Error while deleting user:", error);
    }
  };

  const fetchData = async () => {
    try {
      const data = await getAppCoachClients(
        currentPage,
        searchQuery,
        token,
        coachId
      );
      console.log("getAppCoachClients api data => ", data);
      const plansdata = await getallCoachPlans(data?.coach?.refreshToken);
      setPlans(plansdata?.data);

      const retaildata = await getallCoachRetail(data?.coach?.refreshToken);
      setRetail(retaildata?.data?.myOrder);

      setClubUsers(data?.data);
      // setuserscount(data?.count)
      setuserscount(data?.data?.length || 0);
      setProfile(data?.coach);
    } catch (error) {
      console.error("Error fetching Data:", error);
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const [searchQuery, setSearchQuery] = useState("");
  const handleChangeSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  useEffect(() => {
    if (activeButton === "profile" || activeButton === null) {
      setActiveButton("profile");
    } else if (activeButton === "clients") {
      setActiveButton("clients");
    } else if (activeButton === "plans") {
      setActiveButton("plans");
    }

    setTimeout(() => {
      fetchData();
    }, 500);
  }, [currentPage, searchQuery]);

  const formatCreatedAt = (isoDateString) => {
    const date = new Date(isoDateString);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  };

  function convertTime(timeString) {
    const [hours, minutes, seconds] = timeString.split(":");
    // Convert hours to 12-hour format if needed
    const hours12 = hours % 12 || 12;
    // Determine AM or PM based on hours
    const period = hours < 12 ? "AM" : "PM";
    // Return the converted time in the desired format
    return `${hours12}:${minutes} ${period}`;
  }

  return (
    <AdminDashboard>
      {loading && (
        <div className="flex justify-center">
          <TailSpin
            color="black"
            height="30"
            width="30"
            ariaLabel="tail-spin-loading"
            radius="1"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
      )}

      <div className="flex justify-between">
        <div className="flex gap-5">
          <button
            onClick={() => handleButtonClick("profile")}
            className={`px-5 py-2 text-sm rounded border ${activeButton == "profile"
              ? "bg-[#67BC2A] text-white"
              : "bg-white text-[#67BC2A] border-[#67BC2A]"
              }`}
          >
            Profile
          </button>

          <button
            onClick={() => handleButtonClick("plans")}
            className={`px-5 py-2 text-sm rounded border ${activeButton == "plans"
              ? "bg-[#67BC2A] text-white"
              : "bg-white text-[#67BC2A] border-[#67BC2A]"
              }`}
          >
            Plans
          </button>

          <button
            onClick={() => handleButtonClick("retail")}
            className={`px-5 py-2 text-sm rounded border ${activeButton == "retail"
              ? "bg-[#67BC2A] text-white"
              : "bg-white text-[#67BC2A] border-[#67BC2A]"
              }`}
          >
            Retail
          </button>

          <button
            onClick={() => handleButtonClick("clients")}
            className={`px-5 py-2 text-sm rounded border ${activeButton == "clients"
              ? "bg-[#67BC2A] text-white"
              : "bg-white text-[#67BC2A] border-[#67BC2A]"
              }`}
          >
            Clients
          </button>

          <button
            onClick={() => handleViewSubscriptionsClick()}
            className={`px-5 py-2 text-sm rounded border ${activeButton == "subscriptions"
              ? "bg-[#67BC2A] text-white"
              : "bg-white text-[#67BC2A] border-[#67BC2A]"
              }`}
          >
            Subscriptions
          </button>
        </div>

        <div>
          {/* <button className="px-5 py-2 text-sm bg-white rounded text-[#67BC2A] border border-[#67BC2A]">Edit Details</button> */}
        </div>

        <div className="flex items-center md:mr-[80px] mr-5 gap-3">
          <div>
            <button
              onClick={() => setIsSubscriptionModalOpen(true)}
              className=" mr-5 px-3 py-2 bg-[#1c2434] text-sm flex gap-[10px] font-semibold tracking-wide text-white rounded-[8px] hover:scale-105 active:scale-95 hover:text-[yellow] transition-transform"
            >
              <FaPlus size={20} /> <span>Add Subscription</span>
            </button>
          </div>
        </div>
      </div>

      {activeButton == "profile" && (
        <div className="bg-white p-5 rounded mt-5">
          <div className="flex justify-center">
            <img
              src={profile?.profilePhoto}
              className="max-w-[400px] mb-5 mt-5 rounded-full"
              alt=""
            />
          </div>

          <div className="flex gap-10">
            <div>Name</div>
            <div className="ml-[10%]">{profile?.name}</div>
          </div>

          <div className="flex gap-10 mt-5">
            <div>Contact No.</div>
            <div className="ml-[10%]">{profile?.mobileNumber}</div>
          </div>

          <div className="flex gap-10 mt-5">
            <div>Email</div>
            <div className="ml-[10%]">{profile?.email}</div>
          </div>
        </div>
      )}

      {activeButton === "plans" && (
        <>
          <div className="md:flex gap-10 flex-wrap p-10 bg-white mt-8 rounded justify-center">
            {plans?.map((plans, index) => (
              <div
                key={index}
                className="w-[400px] bg-[#eae9e9] shadow text-center rounded"
              >
                <div className="mb-3">
                  <img
                    src={plans?.image}
                    alt=""
                    className="h-[250px] w-full object-cover"
                  />
                </div>
                <div className="mb-2">{plans?.name}</div>
                <div className="mb-4">{plans?.description}</div>
                <div
                  className="flex justify-center cursor-pointer text-[22px] mb-8"
                  onClick={() => ShowPlansModel(plans)}
                >
                  <FaEye />
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {activeButton === "retail" && (
        <>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-10">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Order ID
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Client Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Invoice
                  </th>
                  <th scope="col" className="px-6 py-3">
                    CostPrice
                  </th>
                  <th scope="col" className="px-6 py-3">
                    CoachMargin
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Profit
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Selling Price
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Status
                  </th>
                  {/* <th scope="col" className="px-6 py-3">
                                        <span className="sr-only">Edit</span>
                                    </th> */}
                </tr>
              </thead>
              <tbody>
                {retail?.map((retail, index) => (
                  <tr
                    key={index}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {/* {formatCreatedAt(retail?.createdAt)} */}
                      {retail?.createdAt?.slice(0, 10)}
                    </th>
                    <td className="px-6 py-4">{retail?.orderId}</td>
                    <td className="px-6 py-4">{retail?.clientName}</td>
                    <td className="px-6 py-4">{retail?.invoiceNumber}</td>
                    <td className="px-6 py-4">{retail?.costPrice}</td>
                    <td className="px-6 py-4">{retail?.coachMargin}</td>
                    <td className="px-6 py-4">{retail?.profit}</td>
                    <td className="px-6 py-4">{retail?.sellingPrice}</td>
                    {/* <td className="px-6 py-4">
                      <div className={` py-2 px-4 text-white text-sm font-bold ${retail?.status !== "Completed" ? 'bg-green-500' : 'bg-red-500'}`}>{retail?.status === "Completed" ? "Completed" : "False"}</div>
                    </td> */}

                    <td className="px-6 py-4">{retail?.status}</td>

                    {/* <td className="flex items-center gap-10 px-6 py-4">

                                            <div className="cursor-pointer text-black" >  <FaEdit size={20} /></div>
                                            <div className="cursor-pointer text-[red]" >  <MdDelete size={20} /></div>
                                        </td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {activeButton === "clients" && (
        <>
          <div className="text-center text-sm mb-3 mt-3">
            Total AppCoach Clients &nbsp;-&nbsp; {userscount}
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="outline-none block w-full p-3 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search Mockups, Logos..."
              value={searchQuery}
              onChange={handleChangeSearch}
            />
          </div>

          <div className="flex justify-center items-center gap-10 mt-5 text-sm ">
            <button
              className="px-3 py-1 bg-slate-900 rounded text-[12px] hover:scale-105 text-[yellow] active:scale-95 cursor-pointer transition-transform"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>

            <span className="text-black">{currentPage}</span>

            <button
              className="px-3 py-1 bg-slate-900 rounded text-[12px] hover:scale-105 text-[yellow] active:scale-95 cursor-pointer transition-transform"
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Next
            </button>
          </div>

          {userscount === 0 ? (
            <div className="text-center text-[black] mt-10 text-lg font-bold">
              No Clients Found
            </div>
          ) : (
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-10">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Email
                    </th>
                    <th scope="col" className="px-6 py-3">
                      PhoneNumber
                    </th>
                    <th scope="col" className="px-6 py-3"></th>
                    <th scope="col" className="px-6 py-3">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {clubUsers &&
                    clubUsers?.map((user, index) => (
                      <tr
                        key={index}
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                      >
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          {user?.name}
                        </th>
                        <td className="px-6 py-4">{user?.email}</td>
                        <td className="px-6 py-4">{user?.mobileNumber}</td>
                        <td>
                          {" "}
                          <div className="cursor-pointer text-black">
                            {" "}
                            <Link
                              href={`/admin/appcoach-profile/${coachId}/client/${user?._id}?cid=${user?.clientId}`}
                              target="_blank"
                              rel="noreferrer noopener"
                            >
                              {" "}
                              <FaEye size={20} />
                            </Link>
                          </div>
                        </td>
                        <td className="flex items-center gap-10 px-6 py-4">
                          <div
                            className="cursor-pointer text-black"
                            onClick={() => showEditModal(user)}
                          >
                            {" "}
                            <FaEdit size={20} />
                          </div>
                          <div
                            className="cursor-pointer text-[red]"
                            onClick={() => showModal(user)}
                          >
                            {" "}
                            <MdDelete size={20} />
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          )}

          <div
            className={`fixed inset-0 flex items-center justify-center z-50 md:pl-[150px]  ${isOpen ? "" : "hidden"
              }`}
          >
            <div className="fixed top-0 right-0 bottom-0 left-0 bg-black opacity-60"></div>
            <div className="bg-white p-8 rounded-lg shadow-lg z-10">
              <h2 className="text-lg font-semibold mb-4">Confirm Deletion</h2>
              <p className="mb-4">
                Are you sure you want to delete &nbsp;
                <span className="font-bold text-xl">{currentuserID.name}</span>
              </p>
              <div className="text-sm text-[#d35e5e]">
                Type the name of the AppCoach Client
              </div>
              <input
                value={inputValue}
                autoComplete="off"
                onChange={handleInputChange}
                required
                name="name"
                type="text"
                placeholder="Name"
                className="border border-red-500 w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none rounded-md"
              />

              <div className="flex justify-end mt-8">
                <button
                  disabled={inputValue !== currentuserID.name}
                  onClick={() => handleConfirmDelete(currentuserID._id)}
                  className={`text-sm bg-red-600 mr-2 hover:bg-red-700 hover:scale-105 active:scale-95 transition-transform text-white font-semibold py-2 px-4 rounded ${inputValue !== currentuserID.name
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                    }`}
                >
                  Delete
                </button>
                <button
                  className="bg-slate-800 text-sm hover:bg-slate-900 hover:scale-105 active:scale-95 transition-transform text-white font-semibold py-2 px-4 rounded mr-2"
                  onClick={hideModel}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>

          <div
            className={`fixed inset-0 flex items-center justify-center z-50 md:pl-[150px]  ${isEdit ? "" : "hidden"
              }`}
          >
            <div className="fixed top-0 right-0 bottom-0 left-0 bg-black opacity-60"></div>
            <div className="bg-white p-8 rounded-lg shadow-lg z-10">
              <form
                autoComplete="off"
                onSubmit={handleSubmit(currentuserID._id)}
              >
                <div className="font-bold">Name</div>
                <div>
                  <input
                    autoComplete="off"
                    onChange={handleChange("name")}
                    value={values?.name}
                    name="name"
                    type="text"
                    placeholder="Name"
                    className="w-[300px] border border-gray-500 h-5 px-3 py-5 mt-2  focus:outline-[#8080f3] rounded-md"
                  />
                </div>

                <br />
                <div className="font-bold">Email</div>
                <div>
                  {" "}
                  <input
                    autoComplete="off"
                    onChange={handleChange("email")}
                    value={values?.email}
                    name="email"
                    type="email"
                    placeholder="Email"
                    className="w-[300px] border border-gray-500 h-5 px-3 py-5 mt-2  focus:outline-[#8080f3] rounded-md"
                  />
                </div>

                <br />
                <div className="font-bold">Password</div>
                <div>
                  {" "}
                  <input
                    autoComplete="off"
                    onChange={handleChange("password")}
                    value={values?.password}
                    name="password"
                    type="text"
                    placeholder="Password"
                    className="w-[300px] border border-gray-500 h-5 px-3 py-5 mt-2  focus:outline-[#8080f3] rounded-md"
                  />
                </div>

                <br />
                <div className="font-bold">MobileNumber</div>
                <div>
                  {" "}
                  <input
                    autoComplete="off"
                    onChange={handleChange("mobileNumber")}
                    value={values?.mobileNumber}
                    name="mobileNumber"
                    type="number"
                    placeholder="MobileNumber"
                    className="w-[300px] border border-gray-500 h-5 px-3 py-5 mt-2  focus:outline-[#8080f3] rounded-md"
                  />
                </div>

                <div className="flex justify-end mt-8">
                  <button className="text-sm bg-lime-600 mr-2 hover:bg-lime-700 hover:scale-105 active:scale-95 transition-transform text-white font-semibold py-2 px-4 rounded cursor-pointer">
                    Update
                  </button>

                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      hideModel();
                    }}
                    className="bg-slate-800 text-sm hover:bg-slate-900 hover:scale-105 active:scale-95 transition-transform text-white font-semibold py-2 px-4 rounded mr-2"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}

      {activeButton === "subscriptions" && (
        <>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-10">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Purchasing Date
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Start Date
                  </th>
                  <th scope="col" className="px-6 py-3">
                    End Date
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Plan Type
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Order Id
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {coachSubscriptions?.map((item, index) => (
                  <tr
                    key={index}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {item?.subscriptionDate?.slice(0, 10)}
                    </th>
                    <td className="px-6 py-4">{item?.startDate}</td>
                    <td className="px-6 py-4">{item?.endDate}</td>
                    <td className="px-6 py-4">{item?.planType}</td>
                    <td className="px-6 py-4">
                      {item?.razorpay_order_id || "by admin"}
                    </td>
                    <td className="px-6 py-4">{item?.subscriptionStatus}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      <div
        className={`fixed inset-0 flex items-center justify-center z-50 md:pl-[150px]  ${showPlansModel ? "" : "hidden"
          }`}
      >
        <div className="fixed top-0 right-0 bottom-0 left-0 bg-black opacity-60"></div>
        <div className="bg-white p-8 rounded-lg shadow-lg z-10 w-[600px] max-h-[600px] overflow-y-auto">
          <h2 className="text-lg font-semibold mb-4 bg-[green] text-white py-3 text-center">
            Plan
          </h2>

          <div className="mb-3 flex justify-center">
            <img
              src={plandetails?.image}
              alt=""
              className="h-[100px] object-cover"
            />
          </div>
          <div className="mb-2 text-center font-bold text-[19px]">
            {plandetails?.name}
          </div>
          <div className="mb-4 text-center">{plandetails?.description}</div>

          {/* <div className="font-bold text-2xl mb-5">Meals</div> */}

          {getplanbyid?.meals?.map((meal, index) => (
            <div key={index}>
              <div className="text-xl font-bold mb-3 bg-[green] text-white py-3 text-center">
                {meal?.mealType}
              </div>
              {meal?.meals?.map((food, index) => (
                <div key={food._id} className="text-center">
                  <div className="mb-10">
                    <div className="flex justify-center">
                      {" "}
                      <img src={food?.image} className="h-[180px]" />
                    </div>
                    <div className="font-bold text-[19px] mt-3">
                      {food?.name}
                    </div>
                    <div className="text-sm my-3">{food?.description}</div>
                    <div className="text-sm">
                      <span className="font-bold">Meal Time - </span>
                      {convertTime(food?.meal_time)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}

          <div className="fixed bottom-[11%] ml-[30%] z-10">
            <button
              className="bg-slate-800 text-sm hover:bg-slate-900 hover:scale-105 active:scale-95 transition-transform text-white font-semibold py-2 px-4 rounded mr-2"
              onClick={HidePlansModel}
            >
              Close
            </button>
          </div>
        </div>
      </div>

      {isSubscriptionModalOpen && (
        <Modal
          open={isSubscriptionModalOpen}
          onClose={() => setIsSubscriptionModalOpen(false)}
          className="flex justify-center items-center"
        >
          <form
            onSubmit={handleAddSubscription}
            className="bg-[#e4e3e3] h-[50%] w-[95%] md:w-[55%] lg:w-[40%] rounded-xl flex justify-center items-center flex-col"
          >
            <div className="mb-5 mt-5 max-w-[350px] mx-auto">
              <input
                type="date"
                id="startDate"
                name="startDate"
                value={startDate}
                onChange={handleSubscriptionValuesChange("startDate")}
                required
                className="border w-[350px] h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-indigo-500 focus:ring-1 rounded-md"
              />
            </div>
            <div className="mb-5 mt-5 max-w-[350px] mx-auto">
              <input
                type="date"
                id="endDate"
                name="endDate"
                value={endDate}
                onChange={handleSubscriptionValuesChange("endDate")}
                required
                className="border w-[350px] h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-indigo-500 focus:ring-1 rounded-md"
              />
            </div>
            <div className="mb-5 mt-5 max-w-[350px] mx-auto">
              <input
                value={planType}
                onChange={handleSubscriptionValuesChange("planType")}
                type="text"
                placeholder="Plan Type"
                className="border w-[350px] h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-indigo-500 focus:ring-1 rounded-md"
              />
            </div>
            <select
              value={planCode}
              onChange={handleSubscriptionValuesChange("planCode")}
              className="w-[350px] py-3 px-4 rounded-md focus:outline-none cursor-pointer"
            >
              <option selected value="1">Basic</option>
              <option value="2">Pro</option>
            </select>
            <div className="w-[120px] mx-auto mt-5">
              <button className=" py-2 px-6 bg-[#1c2434] text-white text-sm rounded font-bold hover:text-[yellow] hover:scale-105 active:scale-95 transition-transform">
                Add
              </button>
            </div>
          </form>
        </Modal>
      )}
    </AdminDashboard>
  );
};

export default AllClubUsers;
