"use client"
import { useState } from 'react';
import { getCookie, resetPassword, sendOtp } from '../../../actions/auth';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';
import { TailSpin } from 'react-loader-spinner';

const token = getCookie('token');

const ForgotPassword = () => {
    const router = useRouter();
    const [values, setValues] = useState({
        email: '',
        password: '',
        error: '',
        loading: false,
        message: '',
        showForm: true
    });

    const { email, password, error, loading, otp, message, showForm } = values;

    /*useEffect(() => {
      //isAuth()=="admin" && router.push(`/admin`);
      // console.log('isAuth', isAuth());
    }, []);*/



    const verifyOtp = async e => {
        console.log(otp)
        console.log(password)
        e.preventDefault();
        setValues({ ...values, loading: true, error: false })
        const reset = { otp, email, 'newPassword': password }
        resetPassword(reset).then(data => {
            console.log(data.error)
            if (data && data.error) {
                setValues({ ...values, error: data.error, loading: false })
                toast.error(data.error)
            } else {
                console.log(data)
                toast.success('New password saved successfully');
                setValues({ loading: false, error: '', loading: false });
                router.push('/')

            }
        })
    }
    const handleOtp = async e => {
        console.log(email)
        e.preventDefault();
        setValues({ ...values, loading: true, error: false });
        await sendOtp(email).then(data => {
            if (data && data.error) {
                setValues({ ...values, error: data.error, loading: false });
                toast.error(data.error);
            } else {
                console.log(data)
                toast.success('Otp sent successfully in your mail');
                setValues({ loading: false, error: '', message: data.message, email: values.email })
            }
        })

    }
    const handleChange = name => e => {
        setValues({ ...values, error: false, [name]: e.target.value });
    };


    return (
        <form autoComplete="off" >


            <Toaster />
            <div className="relative flex min-h-screen text-gray-800 antialiased flex-col justify-center overflow-hidden bg-gray-50 py-6 sm:py-12">

                {loading && <div className='flex justify-center'>
                    <TailSpin color="black" height="30" width="30" ariaLabel="tail-spin-loading" radius="1" wrapperStyle={{}} wrapperClass="" visible={true} />
                </div>}

                <div className="relative py-3 sm:w-96 mx-auto text-center">
                    <span className="text-2xl font-light ">Forgot Your Password</span>
                    <div className="mt-4 bg-white shadow-md rounded-lg text-left">
                        <div className="h-2 bg-lime-400 rounded-t-md"></div>
                        <div className="px-8 py-6 ">
                            <label className="block font-semibold"> Email </label>
                            <input value={email} onChange={handleChange('email')} name="email" type="text" placeholder="Email" className="border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-indigo-500 focus:ring-1 rounded-md" />
                            <button onClick={handleOtp} className='mt-4  bg-lime-500 text-white py-2 px-6 rounded-md hover:bg-lime-600' >Send Otp</button>
                            <label className="block mt-3 font-semibold"> Otp </label>
                            <input value={otp} onChange={handleChange('otp')} name="otp" type="password" placeholder="otp" className="border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-indigo-500 focus:ring-1 rounded-md" />
                            <label className="block mt-3 font-semibold"> Password </label>
                            <input value={password} onChange={handleChange('password')} name="otp" type="password" placeholder="password" className="border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-indigo-500 focus:ring-1 rounded-md" />
                            <div className="flex justify-between items-baseline">
                                <button onClick={verifyOtp} className="mt-4  bg-lime-500 text-white py-2 px-6 rounded-md hover:bg-lime-600 ">Reset Password</button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </form>
    )
}

export default ForgotPassword