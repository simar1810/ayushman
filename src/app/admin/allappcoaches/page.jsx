"use client";

import AdminDashboard from "@/components/Admin/AdminDashboard";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  getCookie,
  getAllAppCoaches,
  updateAppCoach,
  removeAppCoach,
  AllContacts,
} from "@/actions/auth";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import toast, { Toaster } from "react-hot-toast";
import { TailSpin } from "react-loader-spinner";
import { GrView } from "react-icons/gr";
import useDebounce from "@/hooks/useDebounce";
import { Modal } from "@mui/material";
import { FaXmark } from "react-icons/fa6";
import { FormControl } from "@/components/common/FormControl";
import apiInstance from "@/helpers/api";
import { displayPlan } from "@/helpers/data";
import { format } from "date-fns";
import SelectControl from "@/components/common/Select";

const token = getCookie("token");

// Mapping function to convert URL type to numeric type
const getTypeFromQuery = (queryType) => {
  const typeMapping = {
    "doctors": -1, 
    "reporting-officer": -2, // Reporting Officer
    "health-coaches": -3, // Health coach
    "franchise": 0, // Franchise owner
  };

  return typeMapping[queryType] !== undefined ? typeMapping[queryType] : null;
};

const AllAppCoaches = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [appcoach, setappcoach] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [userscount, setuserscount] = useState(0);
  const [currentuserID, setcurrentuserID] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEditOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [coachType, setCoachType] = useState("all");
  const [loading, setloading] = useState(true);
  const [Add, setAdd] = useState(false);
  const [values, setValues] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery);


  // Get user type from URL query parameter
  const urlType = searchParams.get("type");
  const numericType = getTypeFromQuery(urlType);

  const { name, email, mobileNumber, city, coachRef, rating, review } = values;
  const handleSubmit = (coachid) => (e) => {
    e.preventDefault();
    setIsEditOpen(false);
    setValues({ ...values, loading: true, error: false });

    const user = {
      name,
      email,
      mobileNumber,
      city,
      coachRef,
      rating,
      review,
    };

    updateAppCoach(user, token, coachid).then((data) => {
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

  const showEditModal = (user) => {
    setIsEditOpen(true);
    setcurrentuserID(user);
    setValues(user);
  };

  const showModal = (user) => {
    setIsOpen(true);
    setcurrentuserID(user);
  };

  const hideModel = () => {
    setIsOpen(false);
    setIsEditOpen(false);
    setcurrentuserID([]);
    setInputValue("");
  };

  const showAddModal = (user) => {
    setAdd(true);
    setcurrentuserID(user);
  };

  const handleConfirmDelete = (id) => {
    handledelete(id);
    setloading(true);
    setIsOpen(false);
    setcurrentuserID([]);
    setInputValue("");
  };

  const handledelete = async (id) => {
    try {
      const data = await removeAppCoach(id, token);
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
      console.error("Delete error:", error);
    }
  };

  const fetchData = async () => {
    setloading(true);
    try {
      // Pass the numeric type to the API call
      const data = await getAllAppCoaches(
        currentPage,
        debouncedSearchQuery,
        token,
        coachType,
        numericType // Add the numeric type parameter
      );
      setappcoach(data?.appCoach);
      setuserscount(data?.totalAppCoaches);

      const contacts = await AllContacts(
        currentPage,
        debouncedSearchQuery,
        token,
        "trial"
      );
    } catch (error) {
      console.error("Fetch error:", error);
    }
    setloading(false);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleChangeSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleChangeCoachType = (type) => {
    setCoachType(type);
    setCurrentPage(1);
  };

  useEffect(() => {
    fetchData();
  }, [currentPage, debouncedSearchQuery, coachType, numericType]); // Add numericType to dependencies

  // Display the type being filtered
  const getTypeDisplayName = () => {
    const displayNames = {
      1: "Doctors",
      2: "Reporting Officers",
      3: "Health Coaches",
      0: "Franchise Owners",
    };
    return displayNames[numericType] || "All AppCoaches";
  };

  return (
    <AdminDashboard>
      <Toaster />

      <div className="text-center text-sm mb-3">
        {numericType !== null ? (
          <>
            Total {getTypeDisplayName()} &nbsp;-&nbsp; {userscount}
            <div className="text-xs text-gray-600 mt-1">
              Filtering by type: {urlType} 
            </div>
          </>
        ) : (
          <>Total AppCoaches &nbsp;-&nbsp; {userscount}</>
        )}
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
          placeholder="Search by name, email, phone number or coach ref"
          value={searchQuery}
          onChange={handleChangeSearch}
        />
      </div>

      <div className="flex justify-end gap-[14rem] items-center">
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

        <div className="flex items-center translate-y-2">
          <button
            onClick={() => handleChangeCoachType("all")}
            className={`px-5 py-2 text-sm rounded border ${
              coachType == "all"
                ? "bg-[#67BC2A] text-white"
                : "bg-white text-[#67BC2A] border-[#67BC2A]"
            }`}
          >
            All
          </button>
          <button
            onClick={() => handleChangeCoachType("paid")}
            className={`px-5 py-2 text-sm rounded border ${
              coachType == "paid"
                ? "bg-[#67BC2A] text-white"
                : "bg-white text-[#67BC2A] border-[#67BC2A]"
            }`}
          >
            Paid
          </button>
          <button
            onClick={() => handleChangeCoachType("unpaid")}
            className={`px-5 py-2 text-sm rounded border ${
              coachType == "unpaid"
                ? "bg-[#67BC2A] text-white"
                : "bg-white text-[#67BC2A] border-[#67BC2A]"
            }`}
          >
            Unpaid
          </button>
          <ExportAppCoaches />
        </div>
      </div>

      {userscount === 0 && (
        <div className="text-center text-[black] mt-10 text-lg font-bold">
          No {numericType !== null ? getTypeDisplayName() : "AppCoaches"} Found
        </div>
      )}

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-10">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name{" "}
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                {" "}
                City
              </th>
              <th scope="col" className="px-6 py-3">
                {" "}
                PhoneNumber{" "}
              </th>
              <th scope="col" className="px-6 py-3">
                {" "}
                Joining Date
              </th>
              <th scope="col" className="px-6 py-3">
                {" "}
                Coach Ref{" "}
              </th>
              <th scope="col" className="px-6 py-3">
                {" "}
                Plan Type{" "}
              </th>
              <th scope="col" className="px-6 py-3">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          {!loading && (
            <tbody>
              {appcoach &&
                appcoach.map((user, index) => (
                  <tr
                    key={index}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {user?.name && user.name.length > 0 ? user.name : "_"}
                    </th>
                    <td className="px-6 py-4">
                      {user?.email && user.email.length > 0 ? user.email : "_"}{" "}
                    </td>
                    <td className="px-6 py-4">
                      {user?.city && user.city.length > 0 ? user.city : "_"}{" "}
                    </td>
                    <td className="px-6 py-4">
                      {user?.mobileNumber && user.mobileNumber.length > 0
                        ? user.mobileNumber
                        : "_"}{" "}
                    </td>
                    <td className="px-6 py-4">
                      {user?.createdAt
                        ? format(new Date(user.createdAt), "dd-MM-yyyy")
                        : "_"}{" "}
                    </td>
                    <td className="px-6 py-4">
                      {user?.coachRef && user.coachRef.length > 0
                        ? user.coachRef
                        : "_"}{" "}
                    </td>
                    <td className="px-6 py-4">
                      {user?.subscription?.planCode
                        ? displayPlan(user.subscription.planCode)
                        : "_"}
                    </td>
                    <td className="flex items-center gap-4 px-6 py-4">
                      <div className="cursor-pointer text-black">
                        <a
                          target="_blank"
                          href={`/admin/appcoach-profile/${user._id}`}
                          rel="noreferrer"
                        >
                          <GrView size={20} />
                        </a>
                      </div>
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
          )}
        </table>

        {loading && (
          <div className="bg-white flex justify-center items-center py-8">
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
      </div>

      {/* Delete Modal */}
      <div
        className={`fixed inset-0 flex items-center justify-center z-50 md:pl-[150px]  ${
          isOpen ? "" : "hidden"
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
            Type the name of the AppCoach
          </div>
          <input
            autoComplete="off"
            value={inputValue}
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
              className={`text-sm bg-red-600 mr-2 hover:bg-red-700 hover:scale-105 active:scale-95 transition-transform text-white font-semibold py-2 px-4 rounded ${
                inputValue !== currentuserID.name
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

      {/* Edit Modal */}
      <div
        className={`fixed inset-0 flex items-center justify-center z-50 md:pl-[150px] ${
          isEdit ? "" : "hidden"
        }`}
      >
        <div className="fixed top-0 right-0 bottom-0 left-0 bg-black opacity-60"></div>
        <div className="bg-white p-8 rounded-lg shadow-lg z-10 max-h-[90vh] overflow-y-scroll">
          <form autoComplete="off" onSubmit={handleSubmit(currentuserID._id)}>
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
            <br />
            <div className="font-bold">City</div>
            <div>
              <input
                autoComplete="off"
                onChange={handleChange("city")}
                value={values?.city}
                name="City"
                type="text"
                placeholder="City"
                className="w-[300px] border border-gray-500 h-5 px-3 py-5 mt-2  focus:outline-[#8080f3] rounded-md"
              />
            </div>
            <br />
            <div className="font-bold">Coach Ref</div>
            <div>
              <input
                autoComplete="off"
                onChange={handleChange("coachRef")}
                value={values?.coachRef}
                name="coachRef"
                type="text"
                placeholder="Coach Ref"
                className="w-[300px] border border-gray-500 h-5 px-3 py-5 mt-2  focus:outline-[#8080f3] rounded-md"
              />
            </div>
            <br />
            <div className="font-bold">Rating</div>
            <div>
              <input
                autoComplete="off"
                onChange={handleChange("rating")}
                value={values?.rating ?? values?.ratingReview?.rating}
                name="rating"
                type="number"
                placeholder="Rating"
                className="w-[300px] border border-gray-500 h-5 px-3 py-5 mt-2  focus:outline-[#8080f3] rounded-md"
              />
            </div>
            <br />
            <div className="font-bold">Review</div>
            <div>
              <input
                autoComplete="off"
                onChange={handleChange("review")}
                value={values?.review ?? values?.ratingReview?.review}
                name="review"
                type="text"
                placeholder="Review"
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
    </AdminDashboard>
  );
};

export default AllAppCoaches;

const CoachTypes = ["Free", "Active", "Inactive"];

function ExportAppCoaches() {
  const [modalOpened, setModalOpened] = useState(false);

  async function exportCoaches(e) {
    try {
      e.preventDefault();
      const data = {
        startingDate: e.currentTarget.startingSince.value,
        type: e.currentTarget.type.value,
      };

      if (!data.startingDate) throw new Error("Please select a starting date!");

      const response = await apiInstance.exportAppCoaches(data);
      const blob = new Blob([response.data], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "clients.csv");
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (error) {
      toast.error(error?.message || "Please try again Later!");
    }
  }

  return (
    <>
      <button
        className="bg-white text-[#67BC2A] text-[14px] px-4 py-2 rounded-md border-[1px] border-[#67BC2A]"
        onClick={() => setModalOpened(true)}
      >
        Export
      </button>
      {modalOpened && (
        <Modal
          open={true}
          onClose={() => setModalOpened(false)}
          className="flex items-center justify-center px-4"
        >
          <form
            onSubmit={exportCoaches}
            className="max-w-[450px] w-full bg-white p-4 rounded-[8px] relative"
          >
            <FaXmark
              className="w-[20px] h-[20px] absolute top-4 right-4"
              onClick={() => setModalOpened(false)}
            />
            <h2 className="text-[20px] font-semibold mb-4">Export Coaches</h2>
            <FormControl
              label="Export Coaches since"
              type="date"
              name="startingSince"
            />
            <SelectControl
              label="Coach Type"
              options={CoachTypes.map((type, index) => ({
                id: index,
                name: type,
                value: type,
              }))}
              name="type"
            />
            <button className="bg-[#67BC2A] text-white leading-[1] px-4 py-2 mt-4 rounded-md">
              export
            </button>
          </form>
        </Modal>
      )}
    </>
  );
}
