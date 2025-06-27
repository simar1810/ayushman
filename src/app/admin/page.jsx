"use client";
import AdminDashboard from "@/components/Admin/AdminDashboard";
import { MdGroup } from "react-icons/md";
import { BsFillPersonFill } from "react-icons/bs";
import { GiKnifeFork } from "react-icons/gi";
import { BsPersonFillAdd } from "react-icons/bs";
import { useState, useEffect } from "react";
import {
  isAuth,
  getCookie,
  getallRetailController,
  Total,
} from "@/actions/auth";
import apiInstance from "@/helpers/api";
import Image from "next/image";
import toast from "react-hot-toast";
const token = getCookie("token");

const AdminIndex = () => {
  const [products, setproducts] = useState([]);
  const [totalusers, settotalusers] = useState([]);
  const fetchData = async () => {
    try {
      const data = await getallRetailController(1, "", token);
      const slicedData = data.data.slice(0, 5);
      setproducts(slicedData || []);
    } catch (error) {
      console.error("Error fetching feeds:", error);
    }
  };

  const total = async () => {
    try {
      const data = await Total(token);
      settotalusers(data);
    } catch (error) {
      console.error("Error fetching Users:", error);
    }
  };

  useEffect(() => {
    fetchData();
    total();
  }, []);

  return (
    <AdminDashboard>
      <h1 className="font-bold text-[23px] text-black">Overview</h1>

      <div className="flex justify-center text-[black] gap-5 mt-5 flex-wrap text-sm text-center">
        <div className="bg-white rounded shadow p-5 w-[200px]">
          <div className="flex items-center justify-center bg-[#67BC2A] w-[46px] h-[46px] rounded-full mb-2 mx-auto">
            <MdGroup className="text-white" size={28} />
          </div>
          <div>Total App Clients</div>
          <div className="mt-4 mb-4 text-[25px] font-bold">
            {totalusers?.appclients}
          </div>
        </div>

        <div className="bg-white rounded shadow p-5 w-[200px]">
          <div className="flex items-center justify-center bg-[#67BC2A] w-[46px] h-[46px] rounded-full mb-2 mx-auto">
            <BsFillPersonFill className="text-white" size={28} />
          </div>
          <div>Total Coaches</div>
          <div className="mt-4 mb-4 text-[25px] font-bold">
            {totalusers?.appcoaches}
          </div>
        </div>

        <div className="bg-white rounded shadow p-5 w-[200px]">
          <div className="flex items-center justify-center bg-[#67BC2A] w-[46px] h-[46px] rounded-full mb-2 mx-auto">
            <GiKnifeFork className="text-white" size={28} />
          </div>
          <div>Meals Created</div>
          <div className="mt-4 mb-4 text-[25px] font-bold">
            {totalusers?.meals}
          </div>
        </div>

        <div className="bg-white rounded shadow p-5 w-[200px]">
          <div className="flex items-center justify-center bg-[#67BC2A] w-[46px] h-[46px] rounded-full mb-2 mx-auto">
            <BsPersonFillAdd className="text-white" size={28} />
          </div>
          <div>Total Clubusers</div>
          <div className="mt-4 mb-4 text-[25px] font-bold">
            {totalusers?.clubusers}
          </div>
          {/* <div className="mt-2">12% increase from last month</div> */}
        </div>

        <div className="bg-white rounded shadow p-5 w-[200px]">
          <div className="flex items-center justify-center bg-[#67BC2A] w-[46px] h-[46px] rounded-full mb-2 mx-auto">
            <BsPersonFillAdd className="text-white" size={28} />
          </div>
          <div>Total ClubUSer Clients</div>
          <div className="mt-4 mb-4 text-[25px] font-bold">
            {totalusers?.clubuserclients}
          </div>
        </div>
      </div>

      <TopAppCoaches />
    </AdminDashboard>
  );
};

export default AdminIndex;

function TopAppCoaches() {
  const [coaches, setCoaches] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const { data, status } = await apiInstance.getTopAppCoaches();

        if (status === 200) {
          setCoaches(data?.data || []);
          // console.log("response of getTopAppCoaches api => ", data);
        }
      } catch (error) {
        toast.error(error.message)
      }
    })();
  }, []);

  return (
    <div className="w-[40%] min-h-[320px] max-h-[520px] mt-[4rem] bg-white rounded-xl overflow-y-scroll scrollbar-hide">
      <div className=" p-2">
        <div className="w-full flex justify-between items-center">
          <div className="flex gap-2">
            <div className="h-[20px] w-[3px] bg-[#67BC2A]"></div>
            <p className="font-semibold text-sm">Top Coaches</p>
          </div>
        </div>
      </div>

      {/* ([...coaches, ...coaches, ...coaches])?.map((coach, index) => ( */}
      {coaches && coaches?.length > 0 ? (
        coaches?.map((coach, index) => (
          <div
            className="w-full flex flex-col gap-2 items-center mb-4"
            key={index}
          >
            <div className="h-[.8px] w-full bg-[#ECECEC]"></div>
            <div className="w-[95%] flex gap-3 items-center px-1 justify-between">
              <div className="flex gap-3 items-center">
                <div className="h-[45px] w-[45px] rounded-md">
                  <Image
                    src={coach?.profilePhoto ?? "/default-user-dp.svg"}
                    alt="coachPhoto"
                    width={100}
                    height={0}
                    unoptimized
                    className="object-cover aspect-square rounded-[50%]"
                  />
                </div>
                <div>
                  <p className="text-sm text-black font-semibold">
                    {coach.name}
                  </p>
                  <p className="text-[#82867E] text-sm">{coach.email}</p>
                </div>
              </div>

              <p>{coach?.totalClients || 20} Clients</p>
            </div>
          </div>
        ))
      ) : (
        <div className=" h-[280px] flex items-center justify-center">
          <p className=" text-gray-500">No Perfomers</p>
        </div>
      )}
    </div>
  );
}
