"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import {
  isAuth,
  authenticate,
} from "../../actions/auth";
import toast, { Toaster } from "react-hot-toast";
import { TailSpin } from "react-loader-spinner";
import apiInstance from "@/helpers/api";

const Admin = () => {
  const router = useRouter();
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    message: "",
    showForm: true,
  });
  const [showPassword, setShowPassword] = useState(false);

  const { email, password, error, loading, message, showForm } = values;

  useEffect(() => {
    if (isAuth() === "admin") {
      router.push(`/admin`);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setValues({ ...values, loading: true, error: false });
    const user = { email, password };

    try {
      const { data, status } = await apiInstance.adminLogin(user);

      if (status === 200) {
        authenticate(data, () => {
          router.push(`/admin`);
          toast.success("Logged In successfully !");
        });
      }
    } catch (err) {
      console.error("error while admin login => ", err);
      toast.error(err?.response?.data?.message || "Login Failed!");
    }
    setValues({ ...values, loading: false, error: false });
  };

  const handleChange = (name) => (e) => {
    setValues({ ...values, error: false, [name]: e.target.value });
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form autoComplete="off" onSubmit={handleSubmit}>
      <Toaster />
      <div className="relative flex min-h-screen text-gray-800 antialiased flex-col justify-center overflow-hidden bg-gray-50 py-6 sm:py-12">
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

        <div className="relative py-3 sm:w-96 mx-auto text-center">
          <span className="text-2xl font-light">
            Admin Login to your account
          </span>
          <div className="mt-4 bg-white shadow-md rounded-lg text-left">
            <div className="h-2 bg-lime-400 rounded-t-md"></div>
            <div className="px-8 py-6">
              <label className="block font-semibold"> Email </label>
              <input
                value={email}
                onChange={handleChange("email")}
                name="email"
                type="text"
                placeholder="Email"
                className="border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-indigo-500 focus:ring-1 rounded-md"
              />
              <label className="block mt-3 font-semibold"> Password </label>
              <div className="relative">
                <input
                  value={password}
                  onChange={handleChange("password")}
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-indigo-500 focus:ring-1 rounded-md"
                />
                <span
                  className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                  onClick={toggleShowPassword}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              <div className="flex justify-between items-baseline">
                <button
                  type="submit"
                  className="mt-4 bg-lime-500 text-white py-2 px-6 rounded-md hover:bg-lime-600"
                >
                  Login
                </button>
                <a
                  href="/admin/forgot_password"
                  className="text-sm hover:underline"
                >
                  Forgot password?
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Admin;
