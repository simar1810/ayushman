"use client"
import AdminDashboard from "@/components/Admin/AdminDashboard";
import { useEffect, useState } from 'react';
import { API } from "../../../../config";
import { isAuth, getCookie, getBrand, getallRetailController, updateRetailController, DeleteRetail } from "@/actions/auth";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import toast, { Toaster } from 'react-hot-toast';
import { TailSpin } from "react-loader-spinner";
import { GrView } from "react-icons/gr";
import { set } from "date-fns";
const token = getCookie('token');

const Retail = () => {
    const [brandId, setBrandId] = useState('');
    const [brand, setBrand] = useState([])
    const [retail, setretail] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [retailcount, setretailcount] = useState(0);
    const [currentuserID, setcurrentuserID] = useState({});
    const [isOpen, setIsOpen] = useState(false);
    const [isEdit, setIsEditOpen] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [loading, setloading] = useState(false);
    const [file, setFile] = useState(null);
    const [list, setList] = useState({});



    const [values, setValues] = useState({});

    const { productDescription, productName } = values;

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };



    const getMyBrands = async () => {
        const datas = await getBrand();
        setBrand(datas?.data)
    }

    const handleSubmit = (coachid) => (e) => {
        e.preventDefault();
        setIsEditOpen(false);
        setValues({ ...values, loading: true, error: false });
        const formData = new FormData();
        formData.append('productName', productName);
        formData.append('productDescription', productDescription);
        formData.append('file', file);
        formData.append('brandId', brandId);
        formData.append('productMrpList', JSON.stringify(list));

        updateRetailController(formData, token, coachid).then(data => {
            if (data && data.error) { setValues({ ...values, error: data.error, loading: false }); toast.error(data.error); }
            else {
                toast.success(data.message); setValues({ ...values, error: '', loading: false, message: data.message }); setTimeout(() => { fetchData(); }, 350);
                setFile(null);
                const fileInput = document.getElementById('fileInput');
                if (fileInput) { fileInput.value = ''; }
            }
        });
    };

    const handleChange = name => e => { setValues({ ...values, error: false, [name]: e.target.value }); };



    const [pairs, setPairs] = useState([]);
    const showEditModal = (user) => {
        setIsEditOpen(true);
        setcurrentuserID(user);
        setValues(user)
        setBrandId(user?.brandId)

        const pairsArray = Object.entries(user?.productMrpList).map(([key, value]) => ({ key, value }));
        setPairs(pairsArray);
    };





    const showModal = (user) => {
        setIsOpen(true);
        setcurrentuserID(user);
    };

    const hideModel = () => {
        setIsOpen(false);
        setIsEditOpen(false);
        setcurrentuserID([]);
        setInputValue('');
        setFile(null);
        const fileInput = document.getElementById('fileInput');
        if (fileInput) { fileInput.value = ''; }
    };


    const handleConfirmDelete = (id) => {
        handledelete(id);
        setloading(true);
        setIsOpen(false);
        setcurrentuserID([]);
        setInputValue("");
        setFile(null);
        const fileInput = document.getElementById('fileInput');
        if (fileInput) { fileInput.value = ''; }
    };

    const handledelete = async (id) => {
        try {
            const data = await DeleteRetail(id, token);
            if (data && data.error) {
                toast.error(data.error); setloading(false);
            } else { toast.success(data.message); setTimeout(() => { fetchData(); }, 350); setloading(false); }
        } catch (error) { console.error("Error while deleting user:", error); }
    };


    const fetchData = async () => {
        try {
            const data = await getallRetailController(currentPage, searchQuery, token);
            setretail(data?.data);
            setretailcount(data?.count)
        } catch (error) { console.error('Error fetching retail:', error); }
    };


    const handlePageChange = (newPage) => { setCurrentPage(newPage); };
    const handleInputChange = (event) => { setInputValue(event.target.value); };

    useEffect(() => { getMyBrands(); }, [])

    const [searchQuery, setSearchQuery] = useState('');
    const handleChangeSearch = (e) => { setSearchQuery(e.target.value); setCurrentPage(1); };
    useEffect(() => { setTimeout(() => { fetchData(); }, 500) }, [currentPage, searchQuery]);




    const handleChange0 = (index, key, value) => {
        const newPairs = [...pairs];
        newPairs[index] = { key, value };
        setPairs(newPairs);

        const pairObject = {};
        newPairs.forEach(pair => {
            if (pair.key !== '' && pair.value !== '') {
                pairObject[pair.key] = pair.value;
            }
        });
        console.log(pairObject);
        setList(pairObject);

    };



    const handleAddPair = () => {
        setPairs([...pairs, { key: '', value: '' }]);
    };

    const handleRemovePair = (index, key) => {
        const newPairs = [...pairs];
        newPairs.splice(index, 1);
        setPairs(newPairs);
        // console.log(list)

        const newList = {};
        newPairs.forEach(pair => {
            if (pair.key !== '' && pair.value !== '') {
                newList[pair.key] = pair.value;
            }
        });
        setList(newList);

    };


    return (
        <AdminDashboard>
            <Toaster />
            {loading && <div className='flex justify-center'>
                <TailSpin color="black" height="30" width="30" ariaLabel="tail-spin-loading" radius="1" wrapperStyle={{}} wrapperClass="" visible={true} />
            </div>}

            <div className="text-center text-sm mb-3">Total Products &nbsp;-&nbsp; {retailcount}</div>




            <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                    </svg>
                </div>
                <input type="search" id="default-search" className="outline-none block w-full p-3 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Mockups, Logos..."
                    value={searchQuery}
                    onChange={handleChangeSearch} />
            </div>



            <div className="flex justify-center items-center gap-10 mt-5 text-sm ">
                <button className="px-3 py-1 bg-slate-900 rounded text-[12px] hover:scale-105 text-[yellow] active:scale-95 cursor-pointer transition-transform" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
                <span className="text-black">{currentPage}</span>
                <button className={`px-3 py-1 bg-slate-900 rounded text-[12px] hover:scale-105 text-[yellow] active:scale-95 transition-transform ${((currentPage * 10) >= retailcount) ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`} onClick={() => handlePageChange(currentPage + 1)} disabled={(currentPage * 10) >= retailcount}>Next</button>
            </div>


            {/* <div className="flex justify-center items-center gap-10 mt-5 text-sm ">
                <button className="px-3 py-1 bg-slate-900 rounded text-[12px] hover:scale-105 text-[yellow] active:scale-95 cursor-pointer transition-transform" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
                <span className="text-black">{currentPage}</span>
                <button className="px-3 py-1 bg-slate-900 rounded text-[12px] hover:scale-105 text-[yellow] active:scale-95 cursor-pointer transition-transform" onClick={() => handlePageChange(currentPage + 1)} disabled={(currentPage * 10) >= retailcount}>Next</button>
            </div> */}





            <div className="flex justify-center flex-wrap gap-8 p-2 mt-5 rounded">


                {retail && retail.map((retail, index) => (
                    <div key={index} className="w-[320px] bg-white shadow text-center rounded">
                        <div><img src={retail.productImage} alt="" className="h-[300px] w-full object-cover" /></div>
                        <div className="flex justify-between p-5 text-black">
                            <div onClick={() => showEditModal(retail)}><FaEdit size={26} className="cursor-pointer" /></div>
                            <div onClick={() => showModal(retail)}><MdDelete size={26} className="cursor-pointer" /></div>
                        </div>
                        <div className=" p-4 font-bold text-black text-[22px]">{retail.productName}</div>
                        <div className=" p-4">{retail.productDescription}</div>
                        <div className=" p-4">

                            <div className="relative overflow-x-auto sm:rounded-lg">
                                <table className="mx-auto w-[280px] text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 shadow-lg">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                                        <tr>
                                            <th scope="col" className="text-center py-3">%</th>
                                            <th scope="col" className="text-center py-3"><span>Margin</span></th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {retail?.productMrpList && Object.entries(typeof (retail?.productMrpList) == 'string' ? JSON.parse(retail?.productMrpList) : retail?.productMrpList)?.map(([key, value]) => (
                                            <tr key={key} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                                <th scope="row" className="text-center  py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                    <span className="font-bold">{key}%</span>  :
                                                </th>

                                                <th scope="row" className=" text-center py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                    {value}
                                                </th>

                                            </tr>
                                        ))}


                                    </tbody>
                                </table>
                            </div>
                        </div>

                    </div>
                ))}



            </div>



            <div className={`fixed inset-0 flex items-center justify-center z-50 md:pl-[150px]  ${isOpen ? '' : 'hidden'}`}>
                <div className="fixed top-0 right-0 bottom-0 left-0 bg-black opacity-60"></div>
                <div className="bg-white p-8 rounded-lg shadow-lg z-10">
                    <h2 className="text-lg font-semibold mb-4">Confirm Deletion</h2>
                    <p className="mb-4">Are you sure you want to delete &nbsp;<span className="font-bold text-xl">{currentuserID.productName}</span></p>
                    <div className="text-sm text-[#d35e5e]">Type the name of the retail</div>
                    <input autoComplete="off" value={inputValue} onChange={handleInputChange} required name="name" type="text" placeholder="Name" className="border border-red-500 w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none rounded-md" />

                    <div className="flex justify-end mt-8">
                        <button disabled={inputValue !== currentuserID.productName} onClick={() => handleConfirmDelete(currentuserID._id)} className={`text-sm bg-red-600 mr-2 hover:bg-red-700 hover:scale-105 active:scale-95 transition-transform text-white font-semibold py-2 px-4 rounded ${inputValue !== currentuserID.productName ? 'opacity-50 cursor-not-allowed' : ''}`} >
                            Delete
                        </button>
                        <button className="bg-slate-800 text-sm hover:bg-slate-900 hover:scale-105 active:scale-95 transition-transform text-white font-semibold py-2 px-4 rounded mr-2"
                            onClick={hideModel}
                        >Cancel</button>
                    </div>
                </div>
            </div>





            <div className={`fixed inset-0 flex items-center justify-center z-50 md:pl-[150px] ${isEdit ? '' : 'hidden'} `}>
                <div className="fixed top-0 right-0 bottom-0 left-0 bg-black opacity-60"></div>
                <div className="bg-white p-8 rounded-lg shadow-lg z-10 max-h-[600px] overflow-y-auto" >

                    <div>

                        <div className="font-bold">Name</div>
                        <div><input autoComplete="off" onChange={handleChange('productName')} value={values?.productName} name="name" type="text" placeholder="Name" className="w-[300px] border border-gray-500 h-5 px-3 py-5 mt-2  focus:outline-[#8080f3] rounded-md" />
                        </div>

                        <br />
                        <select id="countries" value={brandId} onChange={(e) => setBrandId(e.target.value)} className="mb-5 bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:ring-1 block w-[350px] mx-auto p-2.5 outline-none  ">
                            <option >Choose a Brand</option>
                            {brand?.map((e) => {
                                return (
                                    <option key={e?._id} value={e?._id}>
                                        {e?.name}
                                    </option>
                                );
                            })}
                        </select>



                        <br />
                        <div className="font-bold">ProductDescription</div>

                        <textarea onChange={handleChange('productDescription')} value={values?.productDescription} id="message" rows="6" className="mt-2 block p-2.5 w-full text-sm text-gray-900 outline-none bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Category Description">

                        </textarea>

                        <br />
                        <input id="fileInput" type="file" onChange={handleFileChange} />





                        {pairs.map((pair, index) => (
                            <div key={index} className="flex space-x-4 my-2">
                                <input value={pair.key} type="text" placeholder="Key" className="p-2 border border-gray-300 rounded"
                                    onChange={(e) => handleChange0(index, e.target.value, pair.value)}
                                />

                                <input type="text" placeholder="Value" value={pair.value} className="p-2 border border-gray-300 rounded"
                                    onChange={(e) => handleChange0(index, pair.key, e.target.value)}
                                />

                                {index === 0 && (
                                    <button type="button" onClick={handleAddPair} className="px-4 py-2 bg-green-500 text-white rounded"  >
                                        +
                                    </button>
                                )}

                                {/* Render the "Remove" button for each set of inputs */}
                                {index !== 0 && (
                                    <button type="button" onClick={() => handleRemovePair(index, pair?.key)} className="px-4 py-2 bg-red-500 text-white rounded"

                                    >
                                        -
                                    </button>
                                )}
                            </div>
                        ))}




                        <div className="flex justify-end mt-8">
                            <button onClick={handleSubmit(currentuserID._id)} className="text-sm bg-lime-600 mr-2 hover:bg-lime-700 hover:scale-105 active:scale-95 transition-transform text-white font-semibold py-2 px-4 rounded cursor-pointer" >Update</button>
                            <button onClick={(e) => { e.preventDefault(); hideModel(); }} className="bg-slate-800 text-sm hover:bg-slate-900 hover:scale-105 active:scale-95 transition-transform text-white font-semibold py-2 px-4 rounded mr-2">Cancel</button>

                        </div>
                    </div>
                </div>

            </div>




        </AdminDashboard>
    )
}



export default Retail