"use client";
import AdminDashboard from "@/components/Admin/AdminDashboard";
import { useEffect, useState } from "react";
import { API } from "../../../../config";
import {
  isAuth,
  getCookie,
  getAllFeeds,
  updateFeed,
  DeleteFeed,
} from "@/actions/auth";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import toast, { Toaster } from "react-hot-toast";
import { TailSpin } from "react-loader-spinner";
import { GrView } from "react-icons/gr";
import useDebounce from "@/hooks/useDebounce";
const token = getCookie("token");

const Feeds = () => {
  const [feeds, setfeeds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [feedscount, setfeedscount] = useState(0);
  const [currentuserID, setcurrentuserID] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEditOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [loading, setloading] = useState(false);
  const [file, setFile] = useState(null);

  const [values, setValues] = useState({});

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const { title, description } = values;

  const handleSubmit = (feedid) => (e) => {
    e.preventDefault();
    setIsEditOpen(false);
    setValues({ ...values, loading: true, error: false });
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("file", file);
    updateFeed(formData, token, feedid).then((data) => {
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
        setFile(null);
        const fileInput = document.getElementById("fileInput");
        if (fileInput) {
          fileInput.value = "";
        }
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
    setFile(null);
    const fileInput = document.getElementById("fileInput");
    if (fileInput) {
      fileInput.value = "";
    }
  };

  const handleConfirmDelete = (id) => {
    handledelete(id);
    setloading(true);
    setIsOpen(false);
    setcurrentuserID([]);
    setInputValue("");
    setFile(null);
    const fileInput = document.getElementById("fileInput");
    if (fileInput) {
      fileInput.value = "";
    }
  };

  const handledelete = async (id) => {
    try {
      const data = await DeleteFeed(id, token);
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
      const data = await getAllFeeds(currentPage, debouncedSearchQuery, token);
      console.log("getAllFeeds data of admin/feeds => ", data);
      setfeeds(data?.data);
      // setfeedscount(data?.count)
      setfeedscount(data?.data.length || 0);
    } catch (error) {
      console.error("Error fetching feeds:", error);
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery);
  const handleChangeSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };
  useEffect(() => {
    fetchData();
  }, [currentPage, debouncedSearchQuery]);

  return (
    <AdminDashboard>
      <Toaster />
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
        Total feeds &nbsp;-&nbsp; {feedscount}
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

      {/* <div className="flex justify-center items-center gap-10 mt-5 text-sm ">
                <button className="px-3 py-1 bg-slate-900 rounded text-[12px] hover:scale-105 text-[yellow] active:scale-95 cursor-pointer transition-transform" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
                <span className="text-black">{currentPage}</span>
                <button className="px-3 py-1 bg-slate-900 rounded text-[12px] hover:scale-105 text-[yellow] active:scale-95 cursor-pointer transition-transform" onClick={() => handlePageChange(currentPage + 1)}>Next</button>
            </div> */}

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
          className={`px-3 py-1 bg-slate-900 rounded text-[12px] hover:scale-105 text-[yellow] active:scale-95 transition-transform ${currentPage * 10 >= feedscount
            ? "opacity-50 cursor-not-allowed"
            : "cursor-pointer"
            }`}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage * 10 >= feedscount}
        >
          Next
        </button>
      </div>

      {feedscount === 0 && (
        <div className="text-center text-[black] mt-10 text-lg font-bold">
          No Feeds Found
        </div>
      )}
      <div className="flex justify-center flex-wrap gap-10 p-3 mt-5 rounded">
        {feeds &&
          feeds.map((feed, index) => (
            <div
              key={index}
              className="w-[310px] bg-white shadow text-center rounded"
            >
              <div>
                <img
                  src={feed.image}
                  alt=""
                  className="h-[250px] w-full object-cover"
                />
              </div>
              <div className="flex justify-between p-5 text-black">
                <div onClick={() => showEditModal(feed)}>
                  <FaEdit size={26} className="cursor-pointer" />
                </div>
                <div onClick={() => showModal(feed)}>
                  <MdDelete size={26} className="cursor-pointer" />
                </div>
              </div>
              <div className="mb-4 font-bold text-black text-[22px]">
                {feed.userName}
              </div>
              <div className="mb-9">{feed.caption}</div>
            </div>
          ))}
      </div>

      <div
        className={`fixed inset-0 flex items-center justify-center z-50 md:pl-[150px]  ${isOpen ? "" : "hidden"
          }`}
      >
        <div className="fixed top-0 right-0 bottom-0 left-0 bg-black opacity-60"></div>
        <div className="bg-white p-8 rounded-lg shadow-lg z-10">
          <h2 className="text-lg font-semibold mb-4">Confirm Deletion</h2>
          <p className="mb-4">
            Are you sure you want to delete &nbsp;
            <span className="font-bold text-xl">{currentuserID.title}</span>
          </p>
          <div className="text-sm text-[#d35e5e]">
            Type the name of the feeds
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
              disabled={inputValue !== currentuserID.title}
              onClick={() => handleConfirmDelete(currentuserID._id)}
              className={`text-sm bg-red-600 mr-2 hover:bg-red-700 hover:scale-105 active:scale-95 transition-transform text-white font-semibold py-2 px-4 rounded ${inputValue !== currentuserID.title
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
          <form autoComplete="off" onSubmit={handleSubmit(currentuserID._id)}>
            <div className="font-bold">Name</div>
            <div>
              <input
                autoComplete="off"
                onChange={handleChange("title")}
                value={values?.title}
                name="title"
                type="text"
                placeholder="Name"
                className="w-[300px] border border-gray-500 h-5 px-3 py-5 mt-2  focus:outline-[#8080f3] rounded-md"
              />
            </div>

            <br />
            <div className="font-bold">ProductDescription</div>

            <textarea
              onChange={handleChange("description")}
              value={values?.description}
              id="message"
              rows="6"
              className="mt-2 block p-2.5 w-full text-sm text-gray-900 outline-none bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Category Description"
            ></textarea>

            <br />
            <input type="file" id="fileInput" onChange={handleFileChange} />

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

export default Feeds;
