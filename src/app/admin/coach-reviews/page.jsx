"use client";
import { getCookie } from "@/actions/auth";
import AdminDashboard from "@/components/Admin/AdminDashboard";
import apiInstance from "@/helpers/api";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { TailSpin } from "react-loader-spinner";
import Modal from "@mui/material/Modal";

const AppCoachesApprovals = () => {
  const [appCoaches, setAppCoaches] = useState([]);
  const [loading, setloading] = useState(false);
  const [coachId, setCoachId] = useState("");
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  const fetchCoachesWithReviewReq = async () => {
    setloading(true);
    try {
      const { data, status } = await apiInstance.getAppCoachesWithReviewReq();

      if (status === 200) {
        // console.log("get AppCoaches With Review Requests response => ", data);
        setAppCoaches(data?.data || []);
      }
    } catch (error) {
      console.log("Error fetching AppCoaches With Review Requests => ", error);
      toast.error("Error while fetching!");
    }
    setloading(false);
  };
  useEffect(() => {
    fetchCoachesWithReviewReq();
  }, []);

  return (
    <AdminDashboard>
      {appCoaches && appCoaches.length === 0 && (
        <div className="text-center text-[black] mt-10 text-lg font-bold">
          No AppCoaches Found
        </div>
      )}
      {loading ? (
        <div className="flex justify-center items-center mt-[10rem]">
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
      ) : (
        <>
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
                    coachid
                  </th>
                  <th scope="col" className="px-6 py-3">
                    {/* Approval Status */}
                  </th>
                </tr>
              </thead>
              <tbody>
                {appCoaches &&
                  appCoaches.length > 0 &&
                  appCoaches.map((user, index) => (
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
                      <td className="px-6 py-4">{user.coachId}</td>
                      <td className="flex items-center gap-10 px-6 py-4">
                        <button
                          className="px-6 py-2 bg-[#7AC143] rounded-md text-white hover:scale-[103%] transition-all duration-300"
                          onClick={() => {
                            setIsReviewModalOpen(true);
                            setCoachId(user._id ?? "");
                          }}
                        >
                          Add Review
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          <AddCoachReviewModal
            isReviewModalOpen={isReviewModalOpen}
            setIsReviewModalOpen={setIsReviewModalOpen}
            coachId={coachId}
          />
        </>
      )}
    </AdminDashboard>
  );
};

export default AppCoachesApprovals;

const AddCoachReviewModal = ({
  isReviewModalOpen,
  setIsReviewModalOpen,
  coachId,
}) => {
  const [loading, setloading] = useState(false);
  const [values, setValues] = useState({
    rating: "",
    review: "",
  });
  // console.log("values of rating, review => ", values)
  const { rating, review } = values;

  const handleChange = (name) => (e) => {
    setValues({
      ...values,
      [name]: e.target.value,
    });
  };

  const addRatingReview = async (e) => {
    e.preventDefault();
    setloading(true);

    if (!coachId || coachId.length === 0) {
      toast.error("Please Try Again!");
      setIsReviewModalOpen(false);
      setloading(false);
      return;
    }

    try {
      const { status } = await apiInstance.addAppCoachRatingReview({
        coachId,
        rating,
        review,
      });
      if (status === 200) {
        toast.success("Review added Successfully!");
        setIsReviewModalOpen(false);
        setValues({
          rating: "",
          review: "",
        });
      }
    } catch (err) {
      toast.error("Error while adding review");
      console.log("adding review err => ", err);
    }
    setloading(false);
  };

  return (
    <Modal
      open={isReviewModalOpen}
      onClose={() => setIsReviewModalOpen(false)}
      className="flex justify-center items-center"
    >
      <form
        onSubmit={(e) => addRatingReview(e)}
        className="bg-[#e4e3e3] h-[50%] w-[95%] md:w-[55%] lg:w-[40%] rounded-xl flex justify-center items-center flex-col"
      >
        <div className="mb-5 mt-5 max-w-[350px] mx-auto">
          <input
            type="number"
            value={rating}
            onChange={handleChange("rating")}
            required
            placeholder="Rating"
            className="border w-[350px] h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-indigo-500 focus:ring-1 rounded-md"
          />
        </div>

        <div className="mb-5 mt-5 max-w-[350px] mx-auto">
          <textarea
            type="text"
            value={review}
            onChange={handleChange("review")}
            required
            placeholder="Review"
            className="border w-[350px] h- px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-indigo-500 focus:ring-1 rounded-md"
          />
        </div>

        <div className="w-[120px] mx-auto mt-5">
          <button className=" py-2 px-6 bg-[#1c2434] text-white text-sm rounded font-bold hover:text-[yellow] hover:scale-105 active:scale-95 transition-transform">
            {loading ? "Loading..." : `Add`}
          </button>
        </div>
      </form>
    </Modal>
  );
};
