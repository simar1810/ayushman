"use client";
import AdminDashboard from "@/components/Admin/AdminDashboard";
import { useEffect, useState } from "react";
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
  getAllClubUSerClients,
  getAllClubUserMeetings,
  getAllClubUserClients,
  addClubSubscription,
  getClubUserSubscriptions,
} from "@/actions/auth";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import toast, { Toaster } from "react-hot-toast";
import { TailSpin } from "react-loader-spinner";
import Link from "next/link";
const token = getCookie("token");
import { FaEye } from "react-icons/fa";
import Modal from "@mui/material/Modal";

const AllClubUsers = ({ params: { userId } }) => {
  console.log("this is user i9df", userId)
  const [activeButton, setActiveButton] = useState(null);

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
  const [subscriptionValues, setSubscriptionValues] = useState({});
  const [profile, setProfile] = useState();
  const [getplanbyid, setgetplanbyid] = useState([]);
  const [meeting, setMeeting] = useState([]);
  const [clubUserClient, setClubUserClient] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);

  const [showPlansModel, setshowPlansModel] = useState(false);
  const [plandetails, setplandetails] = useState(false);
  const [isSubscriptionModalOpen, setIsSubscriptionModalOpen] = useState(false);
  const [coachSubscriptions, setCoachSubscriptions] = useState([]);

  const { name, email, mobileNumber, password } = values;
  const { startDate, endDate, planType, planAmount } = subscriptionValues;

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName)
    console.log(buttonName, buttonName === "meeting")
    if (buttonName === "meeting") fetchMeetings()
    if (buttonName === "client") fetchClients()
    if (buttonName === "subscription") fetchSubscriptions()
  };

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
    try {
      setSubscriptionValues({ ...subscriptionValues, loading: true });
      const newSubscription = {
        planType,
        startDate,
        endDate,
        coachId: profile._id
      };
      const response = await addClubSubscription(newSubscription, token);
      if (response.status_code !== 200) toast.error(response.message)
      else toast.success(response.message)
    } catch (error) {
      toast.error(error.message)
    }
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
      const user = await getAllClubUSerClients(token, userId);
      if (user.status) setProfile(user.clubuser)
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

  async function fetchMeetings() {
    try {
      const response = await getAllClubUserMeetings(profile._id, token);
      if (response.status) setProfile(response.clubuser)
      setMeeting(response?.payload)
    } catch (error) {
      console.error("Error fetching Data:", error);
    }
  }

  async function fetchClients() {
    try {
      const response = await getAllClubUserClients(profile._id, token);
      if (response.status) setProfile(response.clubuser)
      setClubUserClient(response?.payload[0].clients)
      console.log(response?.payload[0].clients)
    } catch (error) {
      console.error("Error fetching Data:", error);
    }
  }

  async function fetchSubscriptions() {
    try {
      const response = await getClubUserSubscriptions(profile._id, token);
      if (response.status_code === 200) setSubscriptions(response.data)
      else toast.error(response?.message || "Error finding your subscriptions!")
    } catch (error) {
      console.error("Error fetching Data:", error);
    }
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
            onClick={() => handleButtonClick("meeting")}
            className={`px-5 py-2 text-sm rounded border ${activeButton == "meeting"
              ? "bg-[#67BC2A] text-white"
              : "bg-white text-[#67BC2A] border-[#67BC2A]"
              }`}
          >
            Meetings
          </button>

          <button
            onClick={() => handleButtonClick("client")}
            className={`px-5 py-2 text-sm rounded border ${activeButton == "client"
              ? "bg-[#67BC2A] text-white"
              : "bg-white text-[#67BC2A] border-[#67BC2A]"
              }`}
          >
            Clients
          </button>

          <button
            onClick={() => handleButtonClick("subscription")}
            className={`px-5 py-2 text-sm rounded border ${activeButton == "subscription"
              ? "bg-[#67BC2A] text-white"
              : "bg-white text-[#67BC2A] border-[#67BC2A]"
              }`}
          >
            Subscription
          </button>

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

      {activeButton === "client" && <Clients clients={clubUserClient} />}
      {activeButton === "subscription" && <Subscriptions subscriptions={subscriptions} />}

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

      {activeButton === "meeting" && <Meetings meetings={meeting} />}
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
              <label htmlFor="plan-start-date">Start Date</label>
              <input
                value={startDate}
                id="plan-start-date"
                onChange={handleSubscriptionValuesChange("startDate")}
                type="date"
                placeholder="Start Date"
                className="border w-[350px] h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-indigo-500 focus:ring-1 rounded-md"
              />
            </div>
            <div className="mb-5 mt-5 max-w-[350px] mx-auto">
              <label htmlFor="plan-type">End Date</label>
              <input
                value={endDate}
                id="plan-end-date"
                onChange={handleSubscriptionValuesChange("endDate")}
                type="date"
                placeholder="End Date"
                className="border w-[350px] h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-indigo-500 focus:ring-1 rounded-md"
              />
            </div>
            <div className="mb-5 mt-5 max-w-[350px] mx-auto">
              <label htmlFor="plan-type">Plan Type</label>
              <input
                value={planType}
                id="plan-type"
                onChange={handleSubscriptionValuesChange("planType")}
                type="text"
                placeholder="Plan Type"
                className="border w-[350px] h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-indigo-500 focus:ring-1 rounded-md"
              />
            </div>
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

function Meetings({ meetings }) {
  return <div className="mt-8">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" className="px-6 py-3">
            Base Link
          </th>
          <th scope="col" className="px-6 py-3">
            WellnessZ Link
          </th>
          <th scope="col" className="px-6 py-3">
            Created Date
          </th>
          <th scope="col" className="px-6 py-3">
            Joining Time
          </th>
          <th scope="col" className="px-6 py-3">
            Club Type
          </th>
          <th scope="col" className="px-6 py-3">
            Meeting Type
          </th>
          <th scope="col" className="px-6 py-3">
            Attendance
          </th>
        </tr>
      </thead>
      <tbody>
        {meetings?.map((meeting, index) => (
          <tr
            key={index}
            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
          >
            <th
              scope="row"
              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              {meeting.baseLink}
            </th>
            <td className="px-6 py-4">{meeting?.wellnessZLink}</td>
            <td className="px-6 py-4">{meeting?.createdDate}</td>
            <td className="px-6 py-4">{meeting?.joinedTime}</td>
            <td className="px-6 py-4">{meeting?.clubType}</td>
            <td className="px-6 py-4">{meeting?.meetingType}</td>
            <td className="px-6 py-4">{meeting?.attendence}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
}

function Clients({ clients }) {
  return <div className="mt-8">
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
            Phone Number
          </th>
          <th scope="col" className="px-6 py-3">
            Roll Number
          </th>
          <th scope="col" className="px-6 py-3">
            Sponsored By
          </th>
        </tr>
      </thead>
      <tbody>
        {clients?.map((client, index) => (
          <tr
            key={index}
            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
          >
            <th
              scope="row"
              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              {client.name}
            </th>
            <td className="px-6 py-4">{client?.email}</td>
            <td className="px-6 py-4">{client?.mobileNumber}</td>
            <td className="px-6 py-4">{client?.rollno}</td>
            <td className="px-6 py-4">{client?.sponseredByName}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
}

function Subscriptions({ subscriptions }) {
  return <div className="mt-8">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" className="px-6 py-3">
            Amount
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
            Order ID
          </th>
          <th scope="col" className="px-6 py-3">
            Subscription Status
          </th>
        </tr>
      </thead>
      <tbody>
        {subscriptions?.map((subscription, index) => (
          <tr
            key={index}
            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
          >
            <th
              scope="row"
              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              {subscription.amount}
            </th>
            <td className="px-6 py-4">{subscription?.startDate}</td>
            <td className="px-6 py-4">{subscription?.endDate}</td>
            <td className="px-6 py-4">{subscription?.planType} {subscription.planType !== "Free" && "month"}</td>
            <td className="px-6 py-4">{subscription?.razorpay_order_id	}</td>
            <td className="px-6 py-4">{subscription?.subscriptionStatus}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
}