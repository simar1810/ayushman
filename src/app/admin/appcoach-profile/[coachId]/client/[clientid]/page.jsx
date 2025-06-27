"use client";
import AdminDashboard from "@/components/Admin/AdminDashboard";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
// import { API } from "../../../../../../../config";
import {
  // isAuth,
  getCookie,
  // getAppCoachClients,
  // removeAppCoachClient,
  // updateAppCoachClient,
} from "@/actions/auth";
// import { FaEdit } from "react-icons/fa";
// import { MdDelete } from "react-icons/md";
import toast, { Toaster } from "react-hot-toast";
import { TailSpin, ThreeCircles } from "react-loader-spinner";
import {
  getClientOrderHistory,
  getClientPlans,
  getClientStatsData,
  getCoachClientDetails,
} from "@/app/admin/serverFunctions";

const token = getCookie("token");

const Page = ({ params: { clientid } }) => {
  const [loading, setloading] = useState(false);
  const [activeButton, setActiveButton] = useState();
  const [profile, setProfile] = useState();
  const [plans, setPlans] = useState();
  const [retail, setRetail] = useState();
  const [stats, setStats] = useState();
  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  const params = useSearchParams();
  const cid = params.get("cid");
  console.log(cid);

  useEffect(() => {
    async function f() {
      const data = await getCoachClientDetails(clientid);
      // console.log(data);
      setProfile(data?.data);

      // const data2 = await getClientPlans(clientid, data?.data?.refreshToken);
      const data2 = await getClientPlans(clientid, token);
      setPlans(data2?.data);
      console.log("plans000000", data2);

      //   console.log(data2);
      const data3 = await getClientOrderHistory(cid, data?.data?.refreshToken);
      // console.log("retails" , data3)
      if (data3?.status_code == 401) {
        setRetail([]);
        toast.error(data3?.message);
      } else {
        // setRetail(data3?.data);
        console.log(
          "This is Order History Retails value ",
          data3?.data?.orderHistory
        );
        setRetail(data3?.data?.orderHistory);
      }
      console.log(data?.data, "Token", data?.data?.refreshToken);
      const data4 = await getClientStatsData(data?.data?.refreshToken, clientid);
      setStats(data4?.data);
      console.log("stats ka data", data4);
      // console.log("aslkdnfksjfd", data4)
      //   console.log(data3);
    }
    f();
    setActiveButton("profile");
  }, []);

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
            wrapperClassName=""
            visible={true}
          />
        </div>
      )}

      <div className="flex ">
        <div className="flex gap-2">
          <button
            onClick={() => setActiveButton("profile")}
            className={`px-5 py-2 text-sm  rounded text-[#67BC2A] border border-[#67BC2A] ${
              activeButton === "profile"
                ? "bg-[#67BC2A] text-white"
                : "text-[#67BC2A] bg-white"
            }`}
          >
            Profile
          </button>
          <button
            className={`px-5 py-2 text-sm  rounded text-[#67BC2A] border border-[#67BC2A] ${
              activeButton === "plan"
                ? "bg-[#67BC2A] text-white"
                : "text-[#67BC2A] bg-white"
            }`}
            onClick={() => handleButtonClick("plan")}
          >
            Plan
          </button>
          <button
            className={`px-5 py-2 text-sm  rounded text-[#67BC2A] border border-[#67BC2A] ${
              activeButton === "retail"
                ? "bg-[#67BC2A] text-white"
                : "text-[#67BC2A] bg-white"
            }`}
            onClick={() => setActiveButton("retail")}
          >
            Retail
          </button>
          <button
            onClick={() => setActiveButton("stats")}
            className={`px-5 py-2 text-sm  rounded text-[#67BC2A] border border-[#67BC2A] ${
              activeButton === "stats"
                ? "bg-[#67BC2A] text-white"
                : "text-[#67BC2A] bg-white"
            }`}
          >
            Stats
          </button>
        </div>

        {/* <div>
          <button className="px-5 py-2 text-sm bg-white rounded text-[#67BC2A] border border-[#67BC2A]">
            Edit Details
          </button>
        </div> */}
      </div>

      {activeButton == "profile" && (
        <div className="bg-white p-5 rounded mt-5">
          <div className="flex h-52 my-2 mb-12 w-52 mx-auto justify-center">
            <img
              src={profile?.profilePhoto || "/avatar.webp"}
              className="mb-5 mt-5 object-fill rounded-full"
              alt=""
            />
          </div>

          <div className="flex md:w-1/2 mx-auto justify-between gap-10">
            <div>Name</div>
            <div className="">{profile?.name}</div>
          </div>

          <div className="flex md:w-1/2 mx-auto justify-between gap-10 mt-5">
            <div>Age</div>
            <div className="">{profile?.age}</div>
          </div>
          {/* 
                    <div className="flex md:w-1/2 mx-auto justify-between gap-10 mt-5">
                        <div>Description</div>
                        <div className="ml-[10%]">{profile?.description}</div>
                    </div> */}

          <div className="flex gap-10 md:w-1/2 mx-auto justify-between mt-5">
            <div>Contact No.</div>
            <div className="ml-[10%]">{profile?.mobileNumber || "NA"}</div>
          </div>

          <div className="flex md:w-1/2 mx-auto justify-between gap-10 mt-5">
            <div>Email</div>
            <div className="ml-[10%]">{profile?.email || "NA"}</div>
          </div>

          <div className="flex md:w-1/2 mx-auto justify-between gap-10 mt-5">
            <div>Coach</div>
            <div className="ml-[10%]">{profile?.coach || "NA"}</div>
          </div>

          <div className="flex md:w-1/2 mx-auto justify-between gap-10 mt-5">
            <div>Subscription</div>
            <div
              className={` ${
                profile?.isSubscription ? "bg-green-600" : "bg-red-600"
              } text-white ml-[10%] rounded px-1 `}
            >
              {profile?.isSubscription ? "Active" : "Inactive"}
            </div>
          </div>

          {/* <div className="flex gap-10 mt-5">
                        <div>Height</div>
                        <div className="ml-[10%]">{profile?.height}</div>
                    </div>

                    <div className="flex gap-10 mt-5">
                        <div>Weight</div>
                        <div className="ml-[10%]">{profile?.weight}</div>
                    </div>  */}
        </div>
      )}

      {activeButton == "plan" && (
        <div className="bg-white md:flex-row p-5 flex flex-col gap-8 flex-wrap rounded mt-5">
          {plans?.map((plan) => {
            console.log(plan);
            return (
              <div
                key={plans?._id}
                className="md:w-[28%] flex flex-col gap- text-sm pb-6 shadow-md"
              >
                <div className="img object-fit w-full my-4 h-2/3">
                  <img src={plan?.image} alt="" className="object-fill" />
                </div>
                <div className="flex text-center my-1 mx-auto">
                  {plan?.name}
                </div>
                <div className="flex text-center text-xs mx-auto">
                  {plan?.description}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {activeButton == "retail" && (
        <>
          {" "}
          {retail ? (
            <div className="bg-white rounded-md h-fit my-12 w-full">
              <div className="h-fit overflow-x-scroll py-4 px-4">
                <table className=" text-xs md:text-sm my-8 table-auto md:table-auto w-full">
                  <thead className="bg-gray-100 rounded-t-lg  overflow-hidden px-3">
                    <tr className="rounded-t-lg overflow-hidden px-3">
                      <th className='rounded-tl-2xl md:px-3 border-[1px] py-3 "" border-l-0'>
                        DATE
                      </th>
                      <th className='overflow-hidden px-2 md:px-3 justify-center border-[1px] ""'>
                        ORDER ID
                      </th>
                      <th className=' overflow-hidden  md:px-3 mx-2 border-[1px] ""'>
                        CLIENT NAME
                      </th>
                      <th className=' overflow-hidden  md:px-3 border-[1px] ""'>
                        INVOICE
                      </th>
                      <th className=' overflow-hidden  md:px-3 border-[1px] ""'>
                        PROFIT
                      </th>
                      <th className=' overflow-hidden  md:px-3 border-[1px] ""'>
                        PRODUCT MODULE
                      </th>
                      <th className='rounded-tr-2xl overflow-hidden  md:px-3 border-[1px] ""'>
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white text-sm">
                    {/* No data value table content begins   */}

                    {retail?.length === 0 && (
                      <tr className="font-semibold">
                        <td className=" text-center px-3 py-3  overflow-ellipsis ">
                          <span>No data</span>{" "}
                        </td>
                        <td className='text-center overflow-x-scroll no-scrollbar mx-3 md:px-3 py-1 border-[1px] ""'>
                          No data
                        </td>
                        <td className='text-center overflow-x-scroll no-scrollbar md:px-3 py-1 border-[1px] ""'>
                          No data
                        </td>
                        <td className='text-center overflow-x-scroll no-scrollbar md:px-3 py-1 border-[1px] ""'>
                          No data
                        </td>
                        <td className='text-center overflow-x-scroll no-scrollbar md:px-3 py-1 border-[1px] ""'>
                          No data
                        </td>
                        <td className='text-center overflow-x-scroll no-scrollbar md:px-3 py-1 border-[1px] ""'>
                          No data
                        </td>
                        <td className='text-center overflow-x-scroll no-scrollbar md:px-3 py-1 border-[1px] ""'>
                          No data
                        </td>
                        {/* {console.log(client)} */}
                      </tr>
                    )}

                    {/* No data value table content ends */}

                    {console.log("sadfs00", retail)}
                    {retail?.map((order, index) => {
                      return (
                        <tr key={order?._id} className="">
                          <td className=" text-center px-3 text-nowrap border-[1px] py-3 overflow-ellipsis">
                            <span>{order?.createdAt?.slice(0, 10)}</span>{" "}
                          </td>
                          <td className='text-center overflow-x-scroll no-scrollbar  md:px-3 py-1 border-[1px] ""'>
                            {order?.orderId || "NA"}
                          </td>
                          <td className='text-center cursor-pointer  md:px-3 py-1 border-[1px] ""'>
                            <div>{order?.clientName || "NA"}</div>
                          </td>

                          <td className='text-center  md:px-3 py-1 border-[1px] ""'>
                            {order?.invoiceNumber || "NA"}{" "}
                          </td>
                          <td className='text-center  md:px-3 py-1 border-[1px] ""'>
                            {order?.profit || "NA"}
                          </td>
                          <td className='text-center  md:px-3 py-1 border-[1px] ""'>
                            {order?.productModule[0]?.product_id ||
                              order?.productModule[0]?.productName ||
                              "NA"}
                          </td>
                          <td className='text-center  md:px-3 py-1 border-[1px] ""'>
                            {order?.status || "NA"}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <>
              <div className="justify-center w-full flex items-center h-1/2">
                <ThreeCircles />
              </div>
            </>
          )}
        </>
      )}

      {activeButton === "stats" && (
        <div className="bg-white rounded-md h-fit my-12 w-full">
          {stats ? (
            <div className="h-full overflow-x-scroll py-4 px-4">
              <table className=" text-xs md:text-sm  my-8 table-auto md:table-auto w-full">
                <thead className="bg-gray-100 rounded-t-lg  overflow-hidden px-3">
                  <tr className="rounded-t-lg overflow-hidden px-3">
                    <th className='rounded-tl-2xl  md:px-3 border-[1px] py-3 "" border-l-0'>
                      DATE
                    </th>
                    <th className='overflow-hidden px-2 md:px-3 justify-center border-[1px] ""'>
                      HEIGHT
                    </th>
                    <th className=' overflow-hidden px-2 md:px-3 mx-2 border-[1px] ""'>
                      HEIGHT UNIT
                    </th>
                    <th className=' overflow-hidden px-2 md:px-3 border-[1px] ""'>
                      WEIGHT
                    </th>
                    <th className=' overflow-hidden px-2 md:px-3 border-[1px] ""'>
                      WEIGHT UNIT
                    </th>
                    <th className=' overflow-hidden px-2 md:px-3 border-[1px] ""'>
                      BMI
                    </th>
                    <th className=' overflow-hidden px-2 md:px-3 border-[1px] ""'>
                      BODY COMPOSITION
                    </th>
                    <th className=' overflow-hidden px-2 md:px-3 border-[1px] ""'>
                      FAT
                    </th>
                    <th className=' overflow-hidden px-2 md:px-3 border-[1px] ""'>
                      IDEAL WEIGHT
                    </th>
                    <th className=' overflow-hidden px-2  md:px-3 border-[1px] ""'>
                      VISCERAL WEIGHT
                    </th>
                    <th className=' overflow-hidden  px-2 md:px-3 border-[1px] ""'>
                      Muscle
                    </th>
                    <th className='rounded-tr-2xl px-2 overflow-hidden  md:px-3 border-[1px] ""'>
                      RM
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white  text-sm">
                  {/* No data value table content begins   */}

                  {(stats.length === 0 || !stats) && (
                    <tr className="font-semibold">
                      <td className=" text-center px-3 py-3  overflow-ellipsis ">
                        <span>No data</span>{" "}
                      </td>
                      <td className='text-center overflow-x-scroll no-scrollbar mx-3 md:px-3 py-1 border-[1px] ""'>
                        No data
                      </td>
                      <td className='text-center overflow-x-scroll no-scrollbar md:px-3 py-1 border-[1px] ""'>
                        No data
                      </td>
                      <td className='text-center overflow-x-scroll no-scrollbar md:px-3 py-1 border-[1px] ""'>
                        No data
                      </td>
                      <td className='text-center overflow-x-scroll no-scrollbar md:px-3 py-1 border-[1px] ""'>
                        No data
                      </td>
                      <td className='text-center overflow-x-scroll no-scrollbar md:px-3 py-1 border-[1px] ""'>
                        No data
                      </td>
                      <td className='text-center overflow-x-scroll no-scrollbar md:px-3 py-1 border-[1px] ""'>
                        No data
                      </td>
                      <td className='text-center overflow-x-scroll no-scrollbar md:px-3 py-1 border-[1px] ""'>
                        No data
                      </td>
                      <td className='text-center overflow-x-scroll no-scrollbar md:px-3 py-1 border-[1px] ""'>
                        No data
                      </td>
                      <td className='text-center overflow-x-scroll no-scrollbar md:px-3 py-1 border-[1px] ""'>
                        No data
                      </td>
                      <td className='text-center overflow-x-scroll no-scrollbar md:px-3 py-1 border-[1px] ""'>
                        No data
                      </td>
                      <td className='text-center overflow-x-scroll no-scrollbar md:px-3 py-1 border-[1px] ""'>
                        No data
                      </td>
                      {/* {console.log(client)} */}
                    </tr>
                  )}

                  {/* No data value table content ends */}

                  {/* {console.log("sadfs00", retail)} */}
                  {stats?.map((stat, index) => {
                    return (
                      <tr key={stat?._id} className="">
                        <td className=" text-center px-3 text-nowrap border-[1px] py-3 overflow-ellipsis">
                          {/* {console.log("This is stat ",stat)} */}
                          <span>
                            {new Date(stat?.createdDate).toDateString()}
                          </span>{" "}
                        </td>
                        <td className='text-center overflow-x-scroll no-scrollbar  md:px-3 py-1 border-[1px] ""'>
                          {stat?.height || "NA"}
                        </td>
                        <td className='text-center cursor-pointer  md:px-3 py-1 border-[1px] ""'>
                          <div>{stat?.heightUnit || "NA"}</div>
                        </td>

                        <td className='text-center  md:px-3 py-1 border-[1px] ""'>
                          {stat?.weight || "NA"}{" "}
                        </td>
                        <td className='text-center  md:px-3 py-1 border-[1px] ""'>
                          {stat?.weightUnit || "NA"}
                        </td>
                        <td className='text-center  md:px-3 py-1 border-[1px] ""'>
                          {stat?.bmi || "NA"}
                        </td>
                        <td className='text-center  md:px-3 py-1 border-[1px] ""'>
                          {stat?.body_composition || "NA"}
                        </td>
                        <td className='text-center  md:px-3 py-1 border-[1px] ""'>
                          {stat?.fat || "NA"}
                        </td>
                        <td className='text-center  md:px-3 py-1 border-[1px] ""'>
                          {stat?.ideal_weight || "NA"}
                        </td>
                        <td className='text-center  md:px-3 py-1 border-[1px] ""'>
                          {stat?.visceral_fat || "NA"}
                        </td>
                        <td className='text-center  md:px-3 py-1 border-[1px] ""'>
                          {stat?.muscle || "NA"}
                        </td>
                        <td className='text-center  md:px-3 py-1 border-[1px] ""'>
                          {stat?.rm || "NA"}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="justify-center w-full flex items-center h-1/2">
              {/* <ThreeCircles /> */}
              No stats found
            </div>
          )}
        </div>
      )}
    </AdminDashboard>
  );
};

export default Page;
