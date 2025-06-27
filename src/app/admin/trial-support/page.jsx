"use client"
import AdminDashboard from "@/components/Admin/AdminDashboard";
import { useEffect, useState } from 'react';
import { API } from "../../../../config";
import { isAuth, getCookie, Allsubscriptions, AllContacts, updateContact } from "@/actions/auth";
import toast, { Toaster } from 'react-hot-toast';
const token = getCookie('token');

const Subscription = () => {

    const [subscription, setsubscription] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [subscriptioncount, setsubscriptioncount] = useState(0);

    const [remark, setRemark] = useState("");
    const [unresolve, setunresolve] = useState(false);

    const [Add, setAdd] = useState(false);
    const [currentuserID, setcurrentuserID] = useState({});

    const showModal = (user) => {
        setAdd(true);
        setcurrentuserID(user);

    };

    const showModal2 = (user) => {
        setunresolve(true);
        setcurrentuserID(user);
    };

    const hideModel = () => {
        setAdd(false);
        setcurrentuserID([]);
        setunresolve(false);
    };

    const Confirm = () => {
        setAdd(false);
        handleSubmit();
        setcurrentuserID([]);
    };

    const Confirm2 = () => {
        setunresolve(false);
        handleSubmit2();
        setcurrentuserID([]);
    };





    const handleSubmit = async () => {
        try {
            const isResolved = true;
            const payload = { isResolved, remark }

            const data = await updateContact(payload, token, currentuserID._id)
            if (data && data.error) {
                toast.error(data.error);
            } else {
                toast.success(data.message);
                setTimeout(() => { fetchData(); }, 350);
            }
        } catch (error) {
            console.error("Error while Resolving", error);
        }
    };



    const handleSubmit2 = async () => {
        try {
            const isResolved = false;
            const payload={isResolved, remark}

            const data = await updateContact(payload, token, currentuserID._id)
            if (data && data.error) {
                toast.error(data.error);
            } else {
                toast.success(data.message);
                setTimeout(() => { fetchData(); }, 350);
            }
        } catch (error) {
            console.error("Error while Resolving", error);
        }
    };






    const fetchData = async () => {
        try {
            const data = await AllContacts(currentPage, searchQuery, token, "trial");
            setsubscription(data?.data);
            console.log(data);
            setsubscriptioncount(data?.count)
        } catch (error) { console.error('Error fetching subscription:', error); }
    };

    const formatCreatedAt = (isoDateString) => {
        const date = new Date(isoDateString);
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        };
        return date.toLocaleDateString('en-US', options);
    };

    const handlePageChange = (newPage) => { setCurrentPage(newPage); };

    const [searchQuery, setSearchQuery] = useState('');

    const handleChangeSearch = (e) => { setSearchQuery(e.target.value); setCurrentPage(1); };

    useEffect(() => { setTimeout(() => { fetchData(); }, 500) }, [currentPage, searchQuery]);


    const handlechangeremark = () => (e) => { setRemark(e.target.value); };


    return (
        <AdminDashboard>
            <Toaster />

            <div className="text-center text-sm mb-3">Total Trails Support &nbsp;-&nbsp; {subscriptioncount}</div>


            <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                    </svg>
                </div>
                <input type="search" id="default-search" className="outline-none block w-full p-3 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Mockups, Logos..." value={searchQuery} onChange={handleChangeSearch} />

            </div>


            {/* <div className="flex justify-center items-center gap-10 mt-5 text-sm ">
                <button className="px-3 py-1 bg-slate-900 rounded text-[12px] hover:scale-105 text-[yellow] active:scale-95 cursor-pointer transition-transform" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
                <span className="text-black">{currentPage}</span>
                <button className="px-3 py-1 bg-slate-900 rounded text-[12px] hover:scale-105 text-[yellow] active:scale-95 cursor-pointer transition-transform" onClick={() => handlePageChange(currentPage + 1)}>Next</button>
            </div> */}




            <div className="flex justify-center items-center gap-10 mt-5 text-sm ">
                <button className="px-3 py-1 bg-slate-900 rounded text-[12px] hover:scale-105 text-[yellow] active:scale-95 cursor-pointer transition-transform" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
                <span className="text-black">{currentPage}</span>
                <button className={`px-3 py-1 bg-slate-900 rounded text-[12px] hover:scale-105 text-[yellow] active:scale-95 transition-transform ${((currentPage * 10) >= subscriptioncount) ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`} onClick={() => handlePageChange(currentPage + 1)} disabled={(currentPage * 10) >= subscriptioncount}>Next</button>
            </div>


            {subscriptioncount === 0 && <div className="text-center text-[black] mt-10 text-lg font-bold">No Trail Support Found</div>}
            <div className="relative overflow-x-auto  sm:rounded-lg mt-10">
                <table className="w-full mx-auto text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Name
                            </th>

                            <th scope="col" className="px-6 py-3">
                                Email
                            </th>

                            <th scope="col" className="px-6 py-3">
                                Subject
                            </th>

                            <th scope="col" className="px-6 py-3">
                                Message
                            </th>

                            <th scope="col" className="px-6 py-3">
                                IsResolved
                            </th>

                            <th scope="col" className="px-6 py-3">
                                Date
                            </th>

                        </tr>
                    </thead>
                    <tbody>


                        {subscription?.map((subs, index) => (

                            <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {subs?.name}
                                </th>

                                <td className="px-6 py-4">
                                    {subs.email}
                                </td>

                                <td className="px-6 py-4">
                                    {subs.subject}
                                </td>

                                <td className="px-6 py-4">
                                    {subs.message}
                                </td>

                                <td className="px-6 py-4">
                                    {subs?.isResolved ? <p onClick={() => showModal2(subs)} className="bg-green-500 w-[70px] text-center py-1 cursor-pointer px-2 rounded hover:opacity-90 text-white text-[12px]"
                                    >Resolved</p> : <button className="bg-red-500 py-1 w-[70px] text-center px-2 rounded hover:opacity-95 text-white text-[12px]"
                                        onClick={() => showModal(subs)}>Resolve</button>}
                                </td>

                                <td className="px-6 py-4">
                                    {formatCreatedAt(subs?.createdOn)}
                                </td>

                            </tr>
                        ))}


                    </tbody>
                </table>
            </div>





            <div className={`fixed inset-0 flex items-center justify-center z-50 md:pl-[150px]  ${Add ? '' : 'hidden'}`}>
                <div className="fixed top-0 right-0 bottom-0 left-0 bg-black opacity-60"></div>
                <div className="bg-white p-8 rounded-lg shadow-lg z-10">

                    <div>

                        <div className="font-bold">Is Given Issue Resolved ?</div>
                        <div>
                            {/* <input autoComplete="off" name="organisation" type="text" placeholder="Organisation" className="w-[300px] border border-gray-500 h-5 px-3 py-5 mt-2  focus:outline-[#8080f3] rounded-md" /> */}
                        </div>

                        <div className=" mt-8">

                            <div>
                                <textarea onChange={handlechangeremark()} id="message" rows="6" className="mt-2 md:w-[350px] block p-2.5 w-full text-sm text-gray-900 outline-none bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Category Description">
                                </textarea>
                            </div>


                            <div className="flex justify-end pt-5">
                                <button onClick={() => Confirm()} className="text-sm bg-lime-500 mr-2 hover:bg-lime-600 hover:scale-105 active:scale-95 transition-transform text-white font-semibold py-2 px-4 rounded cursor-pointer" >Yes</button>

                                <button onClick={(e) => { e.preventDefault(); hideModel(); }} className="bg-red-500 text-sm hover:bg-red-600 hover:scale-105 active:scale-95 transition-transform text-white font-semibold py-2 px-4 rounded mr-2">Cancel</button>
                            </div>


                        </div>
                    </div>
                </div>

            </div>


            <div className={`fixed inset-0 flex items-center justify-center z-50 md:pl-[150px]  ${unresolve ? '' : 'hidden'}`}>
                <div className="fixed top-0 right-0 bottom-0 left-0 bg-black opacity-60"></div>
                <div className="bg-white p-8 rounded-lg shadow-lg z-10">

                    <div>

                        <div className="font-bold">Are You Sure You want to Unresolve This ?</div>
                        <div>
                            {/* <input autoComplete="off" name="organisation" type="text" placeholder="Organisation" className="w-[300px] border border-gray-500 h-5 px-3 py-5 mt-2  focus:outline-[#8080f3] rounded-md" /> */}
                        </div>

                        <div className=" mt-8">

                            <div>
                                {/* <textarea onChange={handlechangeremark()} id="message" rows="6" className="mt-2 md:w-[350px] block p-2.5 w-full text-sm text-gray-900 outline-none bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Category Description">
                                </textarea> */}
                            </div>


                            <div className="flex justify-end pt-5">
                                <button onClick={() => Confirm2()} className="text-sm bg-lime-500 mr-2 hover:bg-lime-600 hover:scale-105 active:scale-95 transition-transform text-white font-semibold py-2 px-4 rounded cursor-pointer" >Yes</button>

                                <button onClick={(e) => { e.preventDefault(); hideModel(); }} className="bg-red-500 text-sm hover:bg-red-600 hover:scale-105 active:scale-95 transition-transform text-white font-semibold py-2 px-4 rounded mr-2">Cancel</button>
                            </div>


                        </div>
                    </div>
                </div>

            </div>

        </AdminDashboard>



    )
}



export default Subscription