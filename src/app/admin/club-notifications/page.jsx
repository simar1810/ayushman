"use client"
import AdminDashboard from "@/components/Admin/AdminDashboard";
import { useEffect, useState } from 'react';
import { API } from "../../../../config";
import { isAuth, getCookie, ClubNotificationsApi, removeClubNotification, AddClubNotification, UpdateClubNotification } from "@/actions/auth";
import toast, { Toaster } from 'react-hot-toast';
import { TailSpin } from "react-loader-spinner";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import useDebounce from "@/hooks/useDebounce";

const token = getCookie('token');



const ClubNotifications = () => {

    const [notifications, setnotifications] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [notificationscount, setnotificationscount] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const [currentuserID, setcurrentuserID] = useState({});
    const [inputValue, setInputValue] = useState('');
    const [isEdit, setIsEditOpen] = useState(false);

    const [values, setValues] = useState({});
    const { message, notificatinType } = values;

    const handleSubmit = async (e) => {
        const notification = { message, notificatinType };

        AddClubNotification(notification, token).then(data => {
            if (data && data.error) { toast.error(data.error); }
            else {
                toast.success(data.message); hideModel();
                setTimeout(() => { fetchData(); }, 500)
            }
        });
    }


    const handleUpdate = (id) => {
        // e.preventDefault();
        setIsEditOpen(false);
        setValues({ ...values, error: false });
        const notification = { message, notificatinType };
        UpdateClubNotification(notification, token, id).then(data => {
            if (data && data.error) { setValues({ ...values, error: data.error }); toast.error(data.error); }
            else {
                toast.success(data.message);
                setValues({ ...values, message: "", notificatinType: "", error: '', loading: false, message: data.message });
                hideModel();
                setTimeout(() => { fetchData(); }, 350);
            }
        });
    };



    const showEditModal = (user) => {
        setIsEditOpen(true);
        setcurrentuserID(user);
        setValues(user)
        console.log(user);
    };



    const showModal = (user) => {
        setIsOpen(true);
        setcurrentuserID(user);
    };



    const [addModel, setaddModal] = useState(false);


    function showaddModel() {
        setaddModal(true);
    }

    function hideModel() {
        setaddModal(false);
        setIsOpen(false);
        setcurrentuserID([]);
        setInputValue("");
        setIsEditOpen(false);
        setValues({ ...values, message: "", notificatinType: "", });
    }

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleConfirmDelete = (id) => {
        handledelete(id);
        setIsOpen(false);
        setcurrentuserID([]);
        setInputValue("");
    };

    const handledelete = async (id) => {
        try {
            const data = await removeClubNotification(id, token);
            if (data && data.error) {
                toast.error(data.error);
                setloading(false);
            } else {
                toast.success(data.message);
                setTimeout(() => { fetchData(); }, 350);
                setloading(false);
            }
        } catch (error) {
            console.error("Error while deleting user:", error);
        }
    };


    const fetchData = async () => {
        try {
            const data = await ClubNotificationsApi(currentPage, debouncedSearchQuery, token);
            setnotifications(data?.data);
            setnotificationscount(data?.count)
        } catch (error) { console.error('Error fetching notifications:', error); }
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
    const debouncedSearchQuery = useDebounce(searchQuery)

    const handleChangeSearch = (e) => { setSearchQuery(e.target.value); setCurrentPage(1); };

    useEffect(() => {
        fetchData();
    }, [currentPage, debouncedSearchQuery]);


    const handleChange = name => e => { setValues({ ...values, error: false, [name]: e.target.value }); };


    return (
        <AdminDashboard>
            <Toaster />





            <div className="text-sm mb-3 flex justify-between">

                <div>  Total APP Notifications &nbsp;-&nbsp; {notificationscount}</div>

                <div><button onClick={showaddModel} className="bg-black px-4 py-1 text-white font-bold rounded">ADD</button></div>

            </div>


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
                <button className={`px-3 py-1 bg-slate-900 rounded text-[12px] hover:scale-105 text-[yellow] active:scale-95 transition-transform ${((currentPage * 10) >= notificationscount) ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`} onClick={() => handlePageChange(currentPage + 1)} disabled={(currentPage * 10) >= notificationscount}>Next</button>
            </div>


            {notificationscount === 0 && <div className="text-center text-[black] mt-10 text-lg font-bold">No Notifications Found</div>}
            <div className="relative overflow-x-auto  sm:rounded-lg mt-10">
                <table className="md:w-full mx-auto text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Notifications
                            </th>

                            <th scope="col" className="px-6 py-3">
                                Date
                            </th>

                            <th scope="col" className="px-6 py-3">
                                Actions
                            </th>

                        </tr>
                    </thead>
                    <tbody>


                        {notifications?.map((notification, index) => (
                            <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {notification?.message}
                                </th>
                                <td className="px-6 py-4">
                                    {formatCreatedAt(notification?.createdDate)}
                                </td>

                                <td className=" flex gap-8 px-6 py-4">
                                    <div className="cursor-pointer text-black" onClick={() => showEditModal(notification)}>  <FaEdit size={20} /></div>
                                    <div className="cursor-pointer text-[red] " onClick={() => showModal(notification)}>  <MdDelete size={20} /></div>
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>



            <div className={`fixed inset-0 flex items-center justify-center z-50 md:pl-[150px]  ${addModel ? '' : 'hidden'}`}>
                <div className="fixed top-0 right-0 bottom-0 left-0 bg-black opacity-60"></div>
                <div className="bg-white p-8 rounded-lg shadow-lg z-10">

                    <form autoComplete="off">

                        <div className="font-bold mb-2">Notification Message</div>
                        <div className="mb-5 w-[600px] mx-auto">
                            <textarea onChange={handleChange('message')} value={values?.message} id="message" rows="8" className="block p-2.5 w-full text-sm text-gray-900 outline-none bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500  " placeholder="Message"></textarea>
                        </div>

                        <select onChange={handleChange('notificatinType')} value={values?.notificatinType} id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                            <option defaultValue>Choose Notification Type</option>
                            <option value="adminCoach">adminCoach</option>
                            <option value="adminClient">adminClient</option>
                        </select>

                        <div className="flex gap-5 justify-end mt-8">
                            <button onClick={(e) => { e.preventDefault(); handleSubmit(); }} className=" bg-green-600 hover:bg-green-700 text-sm  hover:scale-105 active:scale-95 transition-transform text-white font-semibold py-2 px-4 rounded">ADD</button>
                            <button onClick={(e) => { e.preventDefault(); hideModel(); }} className="bg-red-600 mr-2 hover:bg-red-700 text-sm hover:scale-105 active:scale-95 transition-transform text-white font-semibold py-2 px-4 rounded">Close</button>
                        </div>
                    </form>
                </div>

            </div>





            <div className={`fixed inset-0 flex items-center justify-center z-50 md:pl-[150px]  ${isOpen ? '' : 'hidden'}`}>
                <div className="fixed top-0 right-0 bottom-0 left-0 bg-black opacity-60"></div>
                <div className="bg-white p-8 rounded-lg shadow-lg z-10">
                    <h2 className="text-lg font-semibold mb-4">Confirm Deletion</h2>
                    <p className="mb-4">Are you sure you want to delete &nbsp;<span className="font-bold text-xl">{currentuserID.message}</span></p>
                    <div className="text-sm text-[#d35e5e]">Type the name of the Notification</div>
                    <input value={inputValue} autoComplete="off" onChange={handleInputChange} required name="name" type="text" placeholder="Name" className="border border-red-500 w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none rounded-md" />

                    <div className="flex justify-end mt-8">
                        <button disabled={inputValue !== currentuserID.message} onClick={() => handleConfirmDelete(currentuserID._id)} className={`text-sm bg-red-600 mr-2 hover:bg-red-700 hover:scale-105 active:scale-95 transition-transform text-white font-semibold py-2 px-4 rounded ${inputValue !== currentuserID.message ? 'opacity-50 cursor-not-allowed' : ''}`} >
                            Delete
                        </button>
                        <button className="bg-slate-800 text-sm hover:bg-slate-900 hover:scale-105 active:scale-95 transition-transform text-white font-semibold py-2 px-4 rounded mr-2"
                            onClick={hideModel}
                        >Cancel</button>
                    </div>
                </div>
            </div>







            <div className={`fixed inset-0 flex items-center justify-center z-50 md:pl-[150px]  ${isEdit ? '' : 'hidden'}`}>
                <div className="fixed top-0 right-0 bottom-0 left-0 bg-black opacity-60"></div>
                <div className="bg-white p-8 rounded-lg shadow-lg z-10">

                    <form autoComplete="off">

                        <div className="font-bold mb-2">Notification Message</div>
                        <div className="mb-5 w-[600px] mx-auto">
                            <textarea onChange={handleChange('message')} value={values?.message} id="message" rows="8" className="block p-2.5 w-full text-sm text-gray-900 outline-none bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500  " placeholder="Message"></textarea>
                        </div>



                        <select onChange={handleChange('notificatinType')} value={values?.notificatinType} id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                            <option defaultValue>Choose Notification Type</option>
                            <option value="adminCoach">adminCoach</option>
                            <option value="adminClient">adminClient</option>
                        </select>

                        <div className="flex gap-5 justify-end mt-8">
                            <button onClick={(e) => { e.preventDefault(); handleUpdate(currentuserID._id); }} className=" bg-green-600 hover:bg-green-700 text-sm  hover:scale-105 active:scale-95 transition-transform text-white font-semibold py-2 px-4 rounded">Update</button>
                            <button onClick={(e) => { e.preventDefault(); hideModel(); }} className="bg-red-600 mr-2 hover:bg-red-700 text-sm hover:scale-105 active:scale-95 transition-transform text-white font-semibold py-2 px-4 rounded">Close</button>
                        </div>
                    </form>
                </div>

            </div>



        </AdminDashboard>
    )
}



export default ClubNotifications