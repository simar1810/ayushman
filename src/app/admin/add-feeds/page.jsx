"use client";
import { useState, useEffect } from "react";
import AdminDashboard from "@/components/Admin/AdminDashboard";
import { API } from "../../../../config";
import { isAuth, getCookie, getAllFeeds, AddFeeds } from "@/actions/auth";
import toast from "react-hot-toast";
import { TailSpin } from "react-loader-spinner";
import { useRouter } from "next/navigation";
const token = getCookie("token");

const Form = () => {
  const route = useRouter();
  const [caption, setCaption] = useState("");
  // const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);

  const [previewImage, setPreviewImage] = useState(null);

  const [values, setValues] = useState({
    loading: false,
    error: "",
  });

  const { error, loading } = values;

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);

    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result);
      };

      if (e.target.files && e.target.files[0]) {
        setPreviewImage(URL.createObjectURL(e.target.files[0]));
      }
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValues({ ...values, loading: true });

    const formData = new FormData();
    formData.append("caption", caption);
    formData.append("person", "admin");
    formData.append("type", "global");
    // formData.append('description', description);
    formData.append("file", file);

    try {
      const response = await fetch(`${API}/app/addfeed`, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        if (data && data.error) {
          setValues({ ...values, error: data.error, loading: false });
          toast.error(data.error);
        } else {
          toast.success(data.message);
          route.push("/admin/feeds");
          setValues({ ...values, loading: false, message: data.message });
        }
      } else {
        console.error("Failed to upload file");
      }
    } catch (error) {
      console.error("Error while uploading feed:", error);
    }
  };

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
            wrapperclassName=""
            visible={true}
          />
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-20">
        <div className="flex justify-center">
          {" "}
          {previewImage && (
            <img
              src={previewImage}
              className="mb-4"
              style={{ maxWidth: "30%", maxHeight: "300px" }}
            />
          )}
        </div>

        <div className="flex items-center justify-center">
          {!previewImage ? (
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center px-10 py-3 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            >
              <div className="flex flex-col items-center justify-center pt-4 pb-6">
                <svg
                  className="w-8 h-8 mb-4 text-gray-500"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p className="mb-2 text-sm text-gray-500">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500">WEBP, PNG or JPG </p>
              </div>
              <input
                id="dropzone-file"
                type="file"
                accept="image/*"
                name="file"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
          ) : (
            ""
          )}
        </div>

        <div className="mb-5 mt-5 max-w-[350px] mx-auto">
          <input
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            type="text"
            placeholder="Feed Caption"
            required
            className="border w-[350px] h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-indigo-500 focus:ring-1 rounded-md"
          />
        </div>

        {/* <div className="mb-5 max-w-[420px] mx-auto">
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} id="message" rows="8" className="block p-2.5 w-full text-sm text-gray-900 outline-none bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Feed Description"></textarea>
                </div> */}

        <div className="w-[120px] mx-auto mt-5">
          <button className=" py-2 px-6 bg-[#1c2434] text-white text-sm rounded font-bold hover:text-[yellow] hover:scale-105 active:scale-95 transition-transform">
            Submit
          </button>
        </div>
      </form>
    </AdminDashboard>
  );
};

export default Form;
