"use client"
import { useState, useEffect } from 'react';
import AdminDashboard from '@/components/Admin/AdminDashboard';
import { API } from '../../../../config';
import { isAuth, getCookie, addSubscription, getAllAppCoaches } from '@/actions/auth';
import toast, { Toaster } from 'react-hot-toast';
import { TailSpin } from "react-loader-spinner";
import { useRouter } from 'next/navigation';
import { set } from 'date-fns';
const token = getCookie('token');

const Form = () => {
    const router = useRouter();
    const [appCoach, setappCoach] = useState([]);
    const [values, setValues] = useState({});
    const { startDate, coachid, endDate, planType } = values;
    const handleChange = name => e => { setValues({ ...values, error: false, [name]: e.target.value }); };
    const { error, loading } = values;
    useEffect(() => {
        getAllAppCoaches(token, '').then(data => {
            console.log(data)
            if (data && data.error) { setValues({ error: data.error }); toast.error(data.error) }
            else {
                console.log(data.message)
                setappCoach(data?.appCoach)
            }
        })
    }, [])
    const handleSubmit = async (e) => {
        e.preventDefault();
        setValues({ ...values, loading: true });
        const newSubscription = { planType, startDate, endDate, providedCoachId: coachid, "paymentStatus": "completed" };
        console.log(newSubscription)
        addSubscription(newSubscription, token).then(data => {
            if (data && data.error) { setValues({ ...values, error: data.error, loading: false }); toast.error(data.error); }
            else {
                toast.success(data.message);
                //router.push("/admin/allappcoaches")
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
                    <input type="date" id="startDate" name="startDate" value={startDate} onChange={handleChange('startDate')}
                        required className='border w-[350px] h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-indigo-500 focus:ring-1 rounded-md' />
                </div>
                <div className="mb-5 mt-5 max-w-[350px] mx-auto">
                    <input type="date" id="endDate" name="endDate" value={endDate} onChange={handleChange('endDate')}
                        required className='border w-[350px] h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-indigo-500 focus:ring-1 rounded-md' />
                </div>
                <div className='mb-5 mt-5 max-w-[350px] mx-auto'>
                    <select id="countries" value={coachid} onChange={handleChange('coachid')} placeholder='Select your coach' className='mb-5 bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:ring-1 block w-[350px] mx-auto p-2.5 outline-none '>
                        <option defaultValue>Select Coach</option>
                        {appCoach.map((coach) => (
                            <option key={coach?._id} value={coach?._id}>
                                {coach?.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-5 mt-5 max-w-[350px] mx-auto">
                    <input value={planType} onChange={handleChange('planType')} type="text" placeholder='Plan Type' className='border w-[350px] h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-indigo-500 focus:ring-1 rounded-md' />
                </div>
                <div className="w-[120px] mx-auto mt-5">
                    <button className=" py-2 px-6 bg-[#1c2434] text-white text-sm rounded font-bold hover:text-[yellow] hover:scale-105 active:scale-95 transition-transform">Add Subscriptiom</button>
                </div>

            </form>
        </AdminDashboard>
    );
};

export default Form;
