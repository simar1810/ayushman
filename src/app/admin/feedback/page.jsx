"use client"
import AdminDashboard from "@/components/Admin/AdminDashboard";
import { useEffect, useState } from 'react';
import { API } from "../../../../config";
import { isAuth, getCookie, AllFeedBacks } from "@/actions/auth";
import useDebounce from "@/hooks/useDebounce";

const token = getCookie('token');

const FeedBack = () => {

    const [feedback, setfeedback] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [feedbackcount, setfeedbackcount] = useState(0);

    const fetchData = async () => {
        try {
            const data = await AllFeedBacks(currentPage, debouncedSearchQuery, token);
            setfeedback(data?.data);
            console.log(data);
            setfeedbackcount(data?.count)
        } catch (error) { console.error('Error fetching feedback:', error); }
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


    return (
        <AdminDashboard>

            <div className="text-center text-sm mb-3">Total Feedbacks &nbsp;-&nbsp; {feedbackcount}</div>


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
                <button className={`px-3 py-1 bg-slate-900 rounded text-[12px] hover:scale-105 text-[yellow] active:scale-95 transition-transform ${((currentPage * 10) >= feedbackcount) ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`} onClick={() => handlePageChange(currentPage + 1)} disabled={(currentPage * 10) >= feedbackcount}>Next</button>
            </div>



            {feedbackcount === 0 && <div className="text-center text-[black] mt-10 text-lg font-bold">No FeedBacks Found</div>}
            <div className="flex justify-center gap-10 flex-wrap mt-10">
                {feedback?.map((user, index) => (

                    <div key={index} className="bg-white border-b mb-10 hover:bg-gray-50">
                        <div><img src={user?.coach?.profilePhoto} className="w-[320px]" alt="" /></div>
                        <div className="text-center mt-3">{user?.feedback}</div>
                        <div className="text-center mt-3 mb-3">{user?.coach?.name}</div>
                        <div className="text-center mb-5">⭐⭐⭐⭐⭐</div>

                    </div>
                ))}

            </div>

        </AdminDashboard>
    )
}



export default FeedBack