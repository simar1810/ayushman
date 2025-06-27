"use client"
import { useState, useEffect } from 'react';
import AdminDashboard from '@/components/Admin/AdminDashboard';
import { API } from '../../../../config';
import { isAuth, getCookie, addAppCoachController } from '@/actions/auth';
import toast, { Toaster } from 'react-hot-toast';
import { TailSpin } from "react-loader-spinner";
import { useRouter } from 'next/navigation';
const token = getCookie('token');

export const Form = () => {
    const router = useRouter();
    const [name, setname] = useState('');
    const [email, setemail] = useState('');
    const [HID, sethid] = useState('');
    const [city,setcity]=useState('');
    const [mobileNumber,setmobilenumber]=useState('');
    const [values, setValues] = useState({
        loading: false,
        error: '',
    });

    const { error, loading } = values;

    const handleSubmit = async (e) => {
        e.preventDefault();
         setValues({ ...values, loading: true });
         const newUser = { name, email, mobileNumber, city,HID };
         console.log(newUser)
         addAppCoachController(newUser, token).then(data => {
            if (data && data.error) { setValues({ ...values, error: data.error, loading: false }); toast.error(data.error); }
            else {
                toast.success(data.message);
                    router.push("/admin/allappcoaches")
                    setValues({ ...values, loading: false, message: data.message, });
            }
        });
    };



    return (
        <AdminDashboard>
            <Toaster />
            {loading && <div className='flex justify-center'>
                <TailSpin color="black" height="30" width="30" ariaLabel="tail-spin-loading" radius="1" wrapperStyle={{}} wrapperclassName="" visible={true} />
            </div>}


            <form onSubmit={handleSubmit}>
                
                <div className="mb-5 mt-5 max-w-[350px] mx-auto">
                    <input value={HID} onChange={(e) => sethid(e.target.value)} type="text" placeholder='HID' required className='border w-[350px] h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-indigo-500 focus:ring-1 rounded-md' />
                </div>
                <div className="mb-5 mt-5 max-w-[350px] mx-auto">
                    <input value={name} onChange={(e) => setname(e.target.value)} type="text" placeholder='Name'  className='border w-[350px] h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-indigo-500 focus:ring-1 rounded-md' />
                </div>
                <div className="mb-5 mt-5 max-w-[350px] mx-auto">
                    <input value={city} onChange={(e) => setcity(e.target.value)} type="text" placeholder='City' className='border w-[350px] h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-indigo-500 focus:ring-1 rounded-md' />
                </div>                
                <div className="mb-5 mt-5 max-w-[350px] mx-auto">
                    <input value={mobileNumber} onChange={(e) => setmobilenumber(e.target.value)} type="number" placeholder='Mobile Number'  className='border w-[350px] h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-indigo-500 focus:ring-1 rounded-md' />
                </div>
                <div className="mb-5 mt-5 max-w-[350px] mx-auto">
                    <input value={email} onChange={(e) => setemail(e.target.value)} type="text" placeholder='Email'  className='border w-[350px] h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-indigo-500 focus:ring-1 rounded-md' />
                </div>
                <div className="w-[120px] mx-auto mt-5">
                    <button className=" py-2 px-6 bg-[#1c2434] text-white text-sm rounded font-bold hover:text-[yellow] hover:scale-105 active:scale-95 transition-transform">Submit</button>
                </div>

            </form>
        </AdminDashboard>
    );
};

export default Form;
