"use client"
import AdminDashboard from "@/components/Admin/AdminDashboard";
import { useEffect, useState } from 'react';
import { API } from "../../../../config";
import { isAuth, getCookie, getallCoachOrganization, updateAppCoachOrganization, deleteAppCoachOrganization, AddOrganisationController } from "@/actions/auth";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import toast, { Toaster } from 'react-hot-toast';
import { TailSpin } from "react-loader-spinner";
import { GrView } from "react-icons/gr";
import { set } from "date-fns";

const token = getCookie('token');

const Allorg = () => {

    const [org, setorg] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [userscount, setuserscount] = useState(0);
    const [currentuserID, setcurrentuserID] = useState({});
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setloading] = useState(false);
    const [isEdit, setIsEditOpen] = useState(false);
    const [Add, setAdd] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [values, setValues] = useState({});

    const { organisation } = values;


    const handleAdd = () => (e) => {
        e.preventDefault();
        setAdd(false);
        setValues({ ...values, loading: true, error: false });
        const organization = { organisation };
        AddOrganisationController(organization, token).then(data => {
            if (data && data.error) { setValues({ ...values, error: data.error, loading: false }); toast.error(data.error); }
            else {
                toast.success(data.message); 
                setValues({ ...values, organisation:"", error: '', loading: false, message: data.message });
                setTimeout(() => { fetchData(); }, 350);
            }
        });
    };



    const handleSubmit = (coachid) => (e) => {
        e.preventDefault();
        setIsEditOpen(false);
        setValues({ ...values, loading: true, error: false });
        const organization = { organisation };
        updateAppCoachOrganization(organization, token, coachid).then(data => {
            if (data && data.error) { setValues({ ...values, error: data.error, loading: false }); toast.error(data.error); }
            else {
                toast.success(data.message); setValues({ ...values, organisation:"", error: '', loading: false, message: data.message });
                setTimeout(() => { fetchData(); }, 350);
                
            }
        });
    };

    const handleChange = organisation => e => { setValues({ ...values, error: false, [organisation]: e.target.value }); };

    const showEditModal = (user) => {
        setIsEditOpen(true);
        setcurrentuserID(user);
        setValues(user)
    };

    const showModal = (user) => {
        setIsOpen(true);
        setcurrentuserID(user);
    };

    const showAddModal = (user) => {
        setAdd(true);
        setcurrentuserID(user);
    };

    const hideModel = () => {
        setIsOpen(false);
        setcurrentuserID([]);
        setInputValue("");
        setIsEditOpen(false)
        setAdd(false);
        setValues({...values, organisation:""});
    };


    const handleConfirmDelete = (id) => {
        setloading(true);
        handledelete(id);
        setIsOpen(false);
        setcurrentuserID([]);
        setInputValue("");
    };


    const handledelete = async (id) => {
        try {
            const data = await deleteAppCoachOrganization(id, token);
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
            const data = await getallCoachOrganization(currentPage, searchQuery, token);
            setorg(data?.data || []);
            console.log(data);
            setuserscount(data?.count || [])
        } catch (error) { console.error('Error fetching org:', error); }
    };

    const handlePageChange = (newPage) => { setCurrentPage(newPage); };

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };


    const [searchQuery, setSearchQuery] = useState('');

    const handleChangeSearch = (e) => { setSearchQuery(e.target.value); setCurrentPage(1); };

    useEffect(() => { setTimeout(() => { fetchData(); }, 500) }, [currentPage, searchQuery]);


    return (
        <AdminDashboard>
            <Toaster />
            {loading && <div className='flex justify-center'>
                <TailSpin color="black" height="30" width="30" ariaLabel="tail-spin-loading" radius="1" wrapperStyle={{}} wrapperclassName="" visible={true} />
            </div>}



            <div className="flex justify-between">
                <div className="text-center text-sm mb-3">Total org &nbsp;-&nbsp; {userscount}</div>
                <div>
                    <button onClick={showAddModal} className="bg-slate-900 py-1 px-3 text-[12px] rounded hover:scale-105 text-[yellow] active:scale-95 cursor-pointer transition-transform">Add</button>
                </div>

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
                <button className={`px-3 py-1 bg-slate-900 rounded text-[12px] hover:scale-105 text-[yellow] active:scale-95 transition-transform ${((currentPage * 10) >= userscount) ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`} onClick={() => handlePageChange(currentPage + 1)} disabled={(currentPage * 10) >= userscount}>Next</button>
            </div>





            {userscount === 0 && <div className="text-center text-[black] mt-10 text-lg font-bold">No Organization Found</div>}
            <div className="relative overflow-x-auto  sm:rounded-lg mt-10">
                <table className="w-[700px] mx-auto text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Name
                            </th>

                            <th scope="col" className="pr-10 py-3 text-end">
                                <span>Actions</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>


                        {org && org.map((org, index) => (

                            <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {org?.organisation}
                                </th>

                                <td className="flex justify-end items-center gap-10 px-6 py-4">
                                    {/* <div className="cursor-pointer text-black"><a target="_blank" href={`/admin/clubuser-profile/${org._id}`}><GrView size={20} /></a></div> */}
                                    <div className="cursor-pointer text-black" onClick={() => showEditModal(org)}>  <FaEdit size={20} /></div>
                                    <div className="cursor-pointer text-[red]" onClick={() => showModal(org)}>  <MdDelete size={20} /></div>
                                </td>
                            </tr>
                        ))}


                    </tbody>
                </table>
            </div>



            <div className={`fixed inset-0 flex items-center justify-center z-50 md:pl-[150px]  ${isOpen ? '' : 'hidden'}`}>
                <div className="fixed top-0 right-0 bottom-0 left-0 bg-black opacity-60"></div>
                <div className="bg-white p-8 rounded-lg shadow-lg z-10">
                    <h2 className="text-lg font-semibold mb-4">Confirm Deletion</h2>
                    <p className="mb-4">Are you sure you want to delete &nbsp;<span className="font-bold text-xl">{currentuserID.organisation}</span></p>
                    <div className="text-sm text-[#d35e5e]">Type the name of the Organization</div>
                    <input value={inputValue} autoComplete="off" onChange={handleInputChange} required name="name" type="text" placeholder="Name" className="border border-red-500 w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none rounded-md" />

                    <div className="flex justify-end mt-8">
                        <button disabled={inputValue !== currentuserID.organisation} onClick={() => handleConfirmDelete(currentuserID._id)} className={`text-sm bg-red-600 mr-2 hover:bg-red-700 hover:scale-105 active:scale-95 transition-transform text-white font-semibold py-2 px-4 rounded ${inputValue !== currentuserID.organisation ? 'opacity-50 cursor-not-allowed' : ''}`}>
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

                    <form autoComplete="off" onSubmit={handleSubmit(currentuserID._id)}>

                        <div className="font-bold">Name</div>
                        <div>
                            <input autoComplete="off" onChange={handleChange('organisation')} value={values?.organisation} name="organisation" type="text" placeholder="Organisation" className="w-[300px] border border-gray-500 h-5 px-3 py-5 mt-2  focus:outline-[#8080f3] rounded-md" />
                        </div>

                        <div className="flex justify-end mt-8">
                            <button className="text-sm bg-lime-600 mr-2 hover:bg-lime-700 hover:scale-105 active:scale-95 transition-transform text-white font-semibold py-2 px-4 rounded cursor-pointer" >Update</button>

                            <button onClick={(e) => { e.preventDefault(); hideModel(); }} className="bg-slate-800 text-sm hover:bg-slate-900 hover:scale-105 active:scale-95 transition-transform text-white font-semibold py-2 px-4 rounded mr-2">Cancel</button>

                        </div>
                    </form>
                </div>

            </div>









            <div className={`fixed inset-0 flex items-center justify-center z-50 md:pl-[150px]  ${Add ? '' : 'hidden'}`}>
                <div className="fixed top-0 right-0 bottom-0 left-0 bg-black opacity-60"></div>
                <div className="bg-white p-8 rounded-lg shadow-lg z-10">

                    <form autoComplete="off" onSubmit={handleAdd()}>

                        <div className="font-bold">Name</div>
                        <div>
                            <input autoComplete="off" onChange={handleChange('organisation')} value={values?.organisation} name="organisation" type="text" placeholder="Organisation" className="w-[300px] border border-gray-500 h-5 px-3 py-5 mt-2  focus:outline-[#8080f3] rounded-md" />
                        </div>

                        <div className="flex justify-end mt-8">
                            <button className="text-sm bg-lime-600 mr-2 hover:bg-lime-700 hover:scale-105 active:scale-95 transition-transform text-white font-semibold py-2 px-4 rounded cursor-pointer" >ADD</button>

                            <button onClick={(e) => { e.preventDefault(); hideModel(); }} className="bg-slate-800 text-sm hover:bg-slate-900 hover:scale-105 active:scale-95 transition-transform text-white font-semibold py-2 px-4 rounded mr-2">Cancel</button>

                        </div>
                    </form>
                </div>

            </div>







        </AdminDashboard>
    )
}



export default Allorg