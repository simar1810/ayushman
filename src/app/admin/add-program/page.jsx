"use client"
import { useState } from 'react';
import { getCookie } from '@/actions/auth';
import toast, { Toaster } from 'react-hot-toast';
import { TailSpin } from "react-loader-spinner";
import { useRouter } from 'next/navigation';
import AdminDashboard from '@/components/Admin/AdminDashboard';
import { FormControl } from '@/components/common/FormControl';
import { API } from '../../../../config';
const token = getCookie('token');

const formConfig = [
  {
    id: 1,
    name: "name",
    placeholder: "Program Name",
    type: "text",
  },
  {
    id: 2,
    name: "subTitle",
    placeholder: "Sub Title",
    type: "text",
  },
  {
    id: 3,
    name: "link",
    placeholder: "Link",
    type: "url",
  },
  {
    id: 4,
    name: "person",
    placeholder: "Person",
    type: "text",
  },
  {
    id: 5,
    name: "coachId",
    placeholder: "Coach ID",
    type: "text",
  },
  {
    id: 6,
    name: "clientId",
    placeholder: "Client ID",
    type: "text",
  },
];

const Form = () => {
  const route = useRouter()
  const [file, setFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [values, setValues] = useState({
    loading: false,
    error: '',
  });

  const { error, loading } = values;

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);

    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => { setPreviewImage(reader.result); };

      if (e.target.files && e.target.files[0]) {
        if (e.target.files[0].size > 2097152) { toast.error("Image size should be less than 2MB"); return; }
        setPreviewImage(URL.createObjectURL(e.target.files[0]));
      }
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValues({ ...values, loading: true });

    const formData = new FormData();
    formData.append('name', e.currentTarget.name.value);
    formData.append('file', file);
    formData.append('subTitle', e.currentTarget.subTitle.value);
    formData.append('link', e.currentTarget.link.value);
    formData.append('person', e.currentTarget.person.value);
    formData.append('coachId', e.currentTarget.coachId.value);
    formData.append('clientId', e.currentTarget.clientId.value);
    formData.append('whitelabel', "wellnessz");
    formData.append('isActive', true);

    try {
      const response = await fetch(`${API}/app/add-program`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        if (data && data.error) {
          setValues({ ...values, error: data.error, loading: false });
          toast.error(data.error);
        } else {
          toast.success(data.message);
          route.push('/admin/programs')
          setValues({ ...values, loading: false, message: data.message, });
        }

      } else {
        console.error('Failed to upload file');
      }
    } catch (error) {
      toast.error(error.message)
      console.error('Error:', error);
    }
  };

  return (
    <AdminDashboard>
      <Toaster />
      {loading && <div className='flex justify-center'>
        <TailSpin color="black" height="30" width="30" ariaLabel="tail-spin-loading" radius="1" wrapperStyle={{}} wrapperclassName="" visible={true} />
      </div>}

      <form onSubmit={handleSubmit} className=''>
        <div className="flex justify-center"> {previewImage && <img src={previewImage} className="mb-4" style={{ maxWidth: '30%', maxHeight: '300px' }} />}</div>
        <div className="flex items-center justify-center">
          {!previewImage ? <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center px-10 py-3 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
            <div className="flex flex-col items-center justify-center pt-4 pb-6">
              <svg className="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
              </svg>
              <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
              <p className="text-xs text-gray-500">WEBP, PNG or JPG </p>
            </div>
            <input id="dropzone-file" type="file" accept='image/*' name="file" className="hidden" onChange={handleFileChange} />
          </label> : ""}
        </div>

        {
          formConfig.map(config => <div
            className="mb-5 mt-5 max-w-[350px] mx-auto"
            key={config.id}
          >
            <FormControl {...config} />
          </div>)
        }
        <div className="w-[120px] mx-auto mt-5">
          <button className=" py-2 px-6 bg-[#1c2434] text-white text-sm rounded font-bold hover:text-[yellow] hover:scale-105 active:scale-95 transition-transform">Submit</button>
        </div>
      </form>
    </AdminDashboard >
  );
};

export default Form;
