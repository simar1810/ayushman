"use client";
import AdminDashboard from "@/components/Admin/AdminDashboard";
import { adminsignup, getCookie } from "@/actions/auth";
import { useState } from "react";
const token = getCookie("token");
import toast, { Toaster } from "react-hot-toast";
import { TailSpin } from "react-loader-spinner";
import { useRouter } from "next/navigation";
const CreateAdmin = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    mobileNumber: "",
    role: "",
    loading: false,
  });

  const { name, email, role, mobileNumber, password, loading, error } = values;
  const route = useRouter();
  const handleSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, loading: true, error: false });
    const user = { name, mobileNumber, email, password, role };

    adminsignup(user, token).then((data) => {
      if (data && data.error) {
        setValues({ ...values, error: data.error, loading: false });
        toast.error(data.error);
      } else {
        toast.success(data.message);
        route.push("/admin/alladmins");
        setValues({
          ...values,
          error: "",
          loading: false,
          message: data.message,
        });
      }
    });
  };

  const handleChange = (name) => (e) => {
    setValues({ ...values, error: false, [name]: e.target.value });
  };

  return (
    <AdminDashboard>
      <Toaster />
      <form autoComplete="off" onSubmit={handleSubmit}>
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

        <div className="relative  text-gray-800 antialiased overflow-hidden py-6 sm:py-12">
          <div className="relative py-3 sm:w-96 mx-auto text-center">
            <span className="text-2xl font-light "> Add Admin</span>
            <div className="mt-4 bg-white shadow-md rounded-lg text-left">
              <div className="h-2 bg-purple-400 rounded-t-md"></div>
              <div className="px-8 py-6 ">
                <input
                  autoComplete="off"
                  value={name}
                  onChange={handleChange("name")}
                  name="name"
                  type="text"
                  placeholder="Name"
                  className="border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-indigo-500 focus:ring-1 rounded-md"
                />

                <input
                  autoComplete="off"
                  required
                  value={email}
                  onChange={handleChange("email")}
                  name="email"
                  type="text"
                  placeholder="Email"
                  className="border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-indigo-500 focus:ring-1 rounded-md"
                />

                <input
                  autoComplete="off"
                  required
                  value={password}
                  onChange={handleChange("password")}
                  name="password"
                  type="password"
                  placeholder="Password"
                  className="border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-indigo-500 focus:ring-1 rounded-md"
                />

                <input
                  autoComplete="off"
                  required
                  value={mobileNumber}
                  onChange={handleChange("mobileNumber")}
                  name="mobileNumber"
                  type="number"
                  placeholder="Mobile Number"
                  className="border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-indigo-500 focus:ring-1 rounded-md"
                />

                <input
                  autoComplete="off"
                  required
                  value={role}
                  onChange={handleChange("role")}
                  name="role"
                  type="text"
                  placeholder="Role"
                  className="border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-indigo-500 focus:ring-1 rounded-md"
                />

                <div className="flex justify-center">
                  <button
                    type="submit"
                    className="mt-4 bg-purple-600 text-white py-2 px-6 rounded-md hover:bg-purple-800 hover:scale-105 active:scale-95 transition-transform"
                  >
                    Create
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </AdminDashboard>
  );
};

export default CreateAdmin;
