"use client";
import { CgProfile, CgMenuLeft } from "react-icons/cg";
import { MdKeyboardArrowDown } from "react-icons/md";
import Link from "next/link";
import { useRef, useState, useEffect, useMemo } from "react";
import { PiSquaresFourFill } from "react-icons/pi";
import { usePathname } from "next/navigation";
import { HiUserGroup } from "react-icons/hi2";
import { MdAdminPanelSettings } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import { MdEditSquare } from "react-icons/md";
import { GoFileDirectoryFill } from "react-icons/go";
import { IoIosHappy } from "react-icons/io";
import { MdCategory } from "react-icons/md";
import { isAuth, getCookie, signout } from "@/actions/auth";
import { useRouter } from "next/navigation";
import { FaBell } from "react-icons/fa";
import { FaRegBell } from "react-icons/fa";
import { GoBell } from "react-icons/go";
import { API } from "../../../config";
// import { isAuth } from "@/actions/auth";

const token = getCookie("token");

const AdminDashboard = ({ children }) => {
  const [admin, setAdmin] = useState({});

  const router = useRouter();

  function sighnoutuser() {
    signout(() => router.push(`/ayushman-admin`));
  }

  const menuRef = useRef(null);
  const pathname = usePathname();

  const [activeItem, setActiveItem] = useState([]);

  const fetchData = async () => {
    try {
      if (!isAuth()) {
        router.push("/ayushman-admin");
      }

      if (token) {
        const data = await fetch(`${API}/admin-dashboard`, {
          headers: { authorization: `Bearer ${token}` },
        });

        const parsedData = await data.json();
        setAdmin(parsedData.data);
      }
    } catch (error) {
      console.error(error)
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const toggle = (ref) => {
    if (ref.current.style.display === "block") {
      ref.current.style.display = "none";
    } else {
      ref.current.style.display = "block";
    }
  };

  const toggleSubItems = (index) => {
    if (activeItem.includes(index)) {
      setActiveItem(activeItem.filter((item) => item !== index));
    } else {
      setActiveItem([...activeItem, index]);
    }
  };

  async function logout() {
    await signout();
    router.replace("/ayushman-admin");
  }

  const memoizedLinks = useMemo(
    () => [
      {
        pathname: "/admin",
        icon: <PiSquaresFourFill size={20} />,
        text: "Dashboard",
      },
      {
        pathname: "",
        icon: <HiUserGroup size={20} />,
        text: "ClubUsers",
        arrow: <MdKeyboardArrowDown size={20} />,
        subItems: [
          {
            pathname: "/admin/allclubusers",
            icon: <GoFileDirectoryFill size={20} />,
            text: "All ClubUsers",
          },
          {
            pathname: "/admin/createclubuser?",
            icon: <FaPlus size={20} />,
            text: "Add ClubUser",
          },
          {
            pathname: "/admin/interested",
            icon: <IoIosHappy size={20} />,
            text: "Interested Coaches",
          },
        ],
      },
      {
        pathname: "",
        icon: <MdAdminPanelSettings size={20} />,
        text: "Admins",
        arrow: <MdKeyboardArrowDown size={20} />,
        subItems: [
          {
            pathname: "/admin/alladmins",
            icon: <GoFileDirectoryFill size={20} />,
            text: "All Admins",
          },
          {
            pathname: "/admin/createadmin",
            icon: <FaPlus size={20} />,
            text: "Add Admin",
          },
        ],
      },
      {
        pathname: "",
        icon: <GoFileDirectoryFill size={20} />,
        text: "Blogs",
        arrow: <MdKeyboardArrowDown size={20} />,
        subItems: [
          {
            pathname: "/admin/blog",
            target: "blank",
            icon: <FaPlus size={20} />,
            text: "Add Post",
          },
          {
            pathname: "/admin/edit-blogs",
            icon: <MdEditSquare size={20} />,
            text: "All Posts",
          },
          {
            pathname: "/admin/category",
            icon: <MdCategory size={20} />,
            text: "Categories",
          },
        ],
      },
      {
        pathname: "",
        icon: <GoFileDirectoryFill size={20} />,
        text: "Users",
        arrow: <MdKeyboardArrowDown size={20} />,
        subItems: [
          {
            pathname: "/admin/allappcoaches?type=reporting-managers",
            icon: <GoFileDirectoryFill size={20} />,
            text: "Reporting Managers",
          },
          {
            pathname: "/admin/allappcoaches?type=health-coaches",
            icon: <GoFileDirectoryFill size={20} />,
            text: "health coaches",
          },
          {
            pathname: "/admin/allappcoaches?type=doctors",
            icon: <GoFileDirectoryFill size={20} />,
            text: "doctors",
          },
          {
            pathname: "/admin/allappcoaches?type=franchise",
            icon: <GoFileDirectoryFill size={20} />,
            text: "franchise",
          },
          {
            pathname: "/admin/add-appCoach",
            icon: <FaPlus size={20} />,
            text: "Add coach",
          },
        ],
      },
      {
        pathname: "/admin/coach-reviews",
        icon: <GoFileDirectoryFill size={20} />,
        text: "Coach Reviews",
      },
      {
        pathname: "",
        icon: <GoFileDirectoryFill size={20} />,
        text: "Interested Coaches",
        arrow: <MdKeyboardArrowDown size={20} />,
        subItems: [
          {
            pathname: "/admin/interested_coach",
            icon: <GoFileDirectoryFill size={20} />,
            text: "All Interested Coaches",
          },
          {
            pathname: "/admin/interested_client",
            icon: <GoFileDirectoryFill size={20} />,
            text: "All Interested Clients",
          },
        ],
      },

      {
        pathname: "",
        icon: <GoFileDirectoryFill size={20} />,
        text: "Feeds",
        arrow: <MdKeyboardArrowDown size={20} />,
        subItems: [
          {
            pathname: "/admin/feeds",
            icon: <GoFileDirectoryFill size={20} />,
            text: "All Feeds",
          },
          {
            pathname: "/admin/add-feeds",
            icon: <FaPlus size={20} />,
            text: "Add Feeds",
          },
        ],
      },

      {
        pathname: "/admin/sessions",
        icon: <GoFileDirectoryFill size={20} />,
        text: "Sessions",
      },

      {
        pathname: "",
        icon: <GoFileDirectoryFill size={20} />,
        text: "Retail",
        arrow: <MdKeyboardArrowDown size={20} />,
        subItems: [
          {
            pathname: "/admin/retail",
            icon: <GoFileDirectoryFill size={20} />,
            text: "Retail",
          },
          {
            pathname: "/admin/add-retail",
            icon: <FaPlus size={20} />,
            text: "Add Retail",
          },
        ],
      },

      {
        pathname: "",
        icon: <GoFileDirectoryFill size={20} />,
        text: "Programs",
        arrow: <MdKeyboardArrowDown size={20} />,
        subItems: [
          {
            pathname: "/admin/programs",
            icon: <GoFileDirectoryFill size={20} />,
            text: "All Programs",
          },
          {
            pathname: "/admin/add-program",
            icon: <FaPlus size={20} />,
            text: "Add Program",
          },
        ],
      },

      {
        pathname: "/admin/organization",
        icon: <PiSquaresFourFill size={20} />,
        text: "Organization",
      },

      {
        pathname: "",
        icon: <FaBell size={20} />,
        text: "Notification",
        arrow: <MdKeyboardArrowDown size={20} />,
        subItems: [
          {
            pathname: "/admin/app-notifications",
            icon: <FaRegBell size={20} />,
            text: "App Notification",
          },
          {
            pathname: "/admin/club-notifications",
            icon: <GoBell size={20} />,
            text: "Club Notification",
          },
        ],
      },

      {
        pathname: "",
        icon: <FaBell size={20} />,
        text: "Request",
        arrow: <MdKeyboardArrowDown size={20} />,
        subItems: [
          {
            pathname: "/admin/subscriptions",
            icon: <FaRegBell size={20} />,
            text: "Subscription",
          },
          {
            pathname: "/admin/trial-support",
            icon: <GoBell size={20} />,
            text: "Trial & Support",
          },
          {
            pathname: "/admin/contact",
            icon: <GoBell size={20} />,
            text: "Contacts",
          },
          {
            pathname: "/admin/add-subscription",
            icon: <FaPlus size={20} />,
            text: "Add Subscription",
          },
        ],
      },

      {
        pathname: "/admin/feedback",
        icon: <PiSquaresFourFill size={20} />,
        text: "FeedBack",
      },
    ],
    []
  );

  useEffect(() => {
    memoizedLinks.forEach((link, index) => {
      if (link.subItems) {
        link.subItems.map((subItem) => {
          if (pathname === subItem.pathname) {
            setActiveItem([...activeItem, index]);
          }
        });
      }
    });
  }, [pathname]);

  return (
    <>
      <div className="flex h-screen bg-[#e4e3e3]">
        <div
          ref={menuRef}
          className="lg:w-[280px] pt-5 md:pt-0 h-[100vh] bg-[white] text-[#67BC2A] hidden lg:block w-[100vw] absolute lg:mt-0 lg:fixed mt-[70px] overflow-y-auto"
        >
          <div className="flex gap-4 items-center md:pr-10 md:pt-3 pl-4">
            <div>
              <CgProfile size={60} />
            </div>
            <div>
              <div className="text-[14px] font-semibold">{admin?.name}</div>
              <div className="text-center font-semibold text-[13px]">Admin</div>
            </div>
          </div>

          <div className="mt-10 text-black">
            {memoizedLinks.map((link, index) => (
              <div key={index}>
                <Link
                  href={link.pathname}
                  onClick={() => toggleSubItems(index)}
                  className={`${pathname === link.pathname
                    ? "bg-[#67BC2A] text-black font-semibold"
                    : ""
                    } hover:bg-[#67BC2A] hover:font-semibold flex items-center justify-between pl-6 py-2 pb-2 mt-2 cursor-pointer`}
                >
                  <div className="flex items-center gap-4">
                    <div>{link.icon}</div>
                    <div>{link.text}</div>
                  </div>
                  <div
                    className={`pr-6 ${activeItem.includes(index)
                      ? "transform rotate-180 pl-6"
                      : ""
                      }`}
                  >
                    {link.arrow}
                  </div>
                </Link>
                {activeItem.includes(index) && link.subItems && (
                  <div className="bg-[#a8da84] py-2 ">
                    {link.subItems.map((subItem, subIndex) => (
                      <Link
                        key={subIndex}
                        href={subItem.pathname}
                        target={subItem.target}
                        className={`${pathname === subItem.pathname
                          ? "bg-[#67BC2A] text-black font-semibold"
                          : ""
                          } hover:bg-[#75b546] hover:font-semibold  flex items-center gap-3 pl-[30px] py-2 mb-3 cursor-pointer`}
                      >
                        <div>{subItem.icon}</div>
                        <div>{subItem.text}</div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="w-[100%]  max-h-screen overflow-y-auto text-[#494848]">
          <div className="lg:ml-[260px]">
            <div className="flex justify-between items-center pl-4 md:pl-[50px] h-[70px] bg-white">
              <div className="flex items-center pr-1">
                <div className="lg:hidden block pr-4">
                  <CgMenuLeft size={25} onClick={() => toggle(menuRef)} />
                </div>
                <div>Admin Dashboard</div>
              </div>

              <div className="flex items-center md:mr-[80px] mr-5 gap-3">
                <div>
                  <button
                    onClick={() => sighnoutuser()}
                    className=" mr-5 px-3 py-2 bg-[#1c2434] text-sm font-semibold tracking-wide text-white rounded-[8px] hover:scale-105 active:scale-95 hover:text-[yellow] transition-transform"
                  >
                    Signout
                  </button>
                </div>
                {/* <div>DM</div> */}
              </div>
            </div>

            <div className="md:pl-[100px] md:pr-[100px] px-5 pt-[20px] pb-[20px]">
              {children}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
