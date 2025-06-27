"use client";
import AdminDashboard from "@/components/Admin/AdminDashboard";
import { useEffect, useState } from "react";
import { API } from "../../../../config";
import {
  isAuth,
  getCookie,
  getIntrestedClients,
  getallInterestedAppClients,
} from "@/actions/auth";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import toast, { Toaster } from "react-hot-toast";
import { TailSpin } from "react-loader-spinner";
import { GrView } from "react-icons/gr";
import useDebounce from "@/hooks/useDebounce";
const token = getCookie("token");

const IntrestedAppClients = () => {
  const [Add, setAdd] = useState(false);
  const [appcoach, setappcoach] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [userscount, setuserscount] = useState(0);
  const [currentuserID, setcurrentuserID] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEditOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [loading, setloading] = useState(false);

  const [values, setValues] = useState({});

  const handleChange = (name) => (e) => {
    setValues({ ...values, error: false, [name]: e.target.value });
  };

  const fetchData = async () => {
    try {
      const data = await getallInterestedAppClients(
        currentPage,
        debouncedSearchQuery,
        token
      );
      console.log("getallInterestedAppClients data => ", data);
      setappcoach(data?.data);
      setuserscount(data?.data?.length);
    } catch (error) {
      console.error("Error fetching AppCoach:", error);
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery)
  const handleChangeSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };
  useEffect(() => {
    fetchData();
  }, [currentPage, debouncedSearchQuery]);

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

      <div className="text-center text-sm mb-3">
        Intrested AppClients &nbsp;-&nbsp; {userscount}
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

      {userscount === 0 && (
        <div className="text-center text-[black] mt-10 text-lg font-bold">
          No Intrested AppClients Found
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
            </tr>
          </thead>
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
                    {user.name}
                  </th>
                  <td className="px-6 py-4">{user.email} </td>
                  <td className="px-6 py-4">{user.city} </td>
                  <td className="px-6 py-4">{user.mobileNumber} </td>

                  {/*<td className="flex items-center gap-10 px-6 py-4">
                                    <div className="cursor-pointer text-black"><a target="_blank" href={`/admin/appcoach-profile/${user._id}`}><GrView size={20} /></a></div>
                                    
                                </td>*/}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </AdminDashboard>
  );
};

export default IntrestedAppClients;
