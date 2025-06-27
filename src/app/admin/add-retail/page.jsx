"use client"
import { useState, useEffect } from 'react';
import AdminDashboard from '@/components/Admin/AdminDashboard';
import { API } from '../../../../config';
import { getCookie, getBrand } from '@/actions/auth';
import toast, { Toaster } from 'react-hot-toast';
import { TailSpin } from "react-loader-spinner";
import { useRouter } from 'next/navigation';
const token = getCookie('token');

const Form = () => {
    const route = useRouter()
    const [productName, setproductName] = useState('');
    const [brandId, setBrandId] = useState('');

    const [productDescription, setproductDescription] = useState('');
    const [file, setFile] = useState(null);
    const [brand, setBrand] = useState([])
    const [list, setList] = useState({
        "": "",
    });

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

    const getMyBrands = async () => {
        const datas = await getBrand(token);

        setBrand(datas?.data)
        console.log(datas?.data)
    }

    useEffect(() => {
        getMyBrands();
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setValues({ ...values, loading: true });

        const formData = new FormData();
        formData.append('productName', productName);
        formData.append('productDescription', productDescription);
        formData.append('file', file);
        formData.append('productMrpList', JSON.stringify(list));
        formData.append('brandId', brandId);

        try {
            const response = await fetch(`${API}/app/addProduct`, {
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
                    route.push('/admin/retail')
                    setValues({ ...values, loading: false, message: data.message, });
                }

            } else {
                console.error('Failed to upload file');
            }
        } catch (error) {
            setValues({ loading: false, error: error.message })
        } finally {
            setValues({ loading: false })
        }
    };

    const [pairs, setPairs] = useState([{ key: '', value: '' }]);

    const handleChange = (index, key, value) => {
        const newPairs = [...pairs];
        newPairs[index] = { key, value };
        setPairs(newPairs);

        const pairObject = {};
        newPairs.forEach(pair => {
            if (pair.key !== '' && pair.value !== '') {
                pairObject[pair.key] = pair.value;
            }
        });
        setList(pairObject);

    };

    const handleAddPair = () => {
        setPairs([...pairs, { key: '', value: '' }]);
    };

    const handleRemovePair = (index) => {
        const newPairs = [...pairs];
        newPairs.splice(index, 1);
        setPairs(newPairs);

        // Update list state after removing the pair
        const pairObject = {};
        newPairs.forEach(pair => {
            if (pair.key !== '' && pair.value !== '') {
                pairObject[pair.key] = pair.value;
            }
        });
        setList(pairObject);
    };

    return (
        <AdminDashboard>
            <Toaster />
            {loading && <div className='flex justify-center'>
                <TailSpin color="black" height="30" width="30" ariaLabel="tail-spin-loading" radius="1" wrapperStyle={{}} wrapperclassName="" visible={true} />
            </div>}

            <form >
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
                        <input required id="dropzone-file" type="file" accept='image/*' name="file" className="hidden" onChange={handleFileChange} />
                    </label> : ""}
                </div>

                <div className="mb-5 mt-5 max-w-[350px] mx-auto">
                    <input value={productName} onChange={(e) => setproductName(e.target.value)} type="text" placeholder='Retail Title' required className='border w-[350px] h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-indigo-500 focus:ring-1 rounded-md' />
                </div>
                {/* <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select an option</label> */}
                <select id="countries" required value={brandId} onChange={(e) => setBrandId(e.target.value)} className="mb-5 bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:ring-1 block w-[350px] mx-auto p-2.5 outline-none  ">
                    <option defaultValue >Choose a Brand</option>
                    {brand?.map((e) => {
                        return (
                            <option key={e?._id} value={e?._id}>
                                {e?.name}
                            </option>
                        );
                    })}
                </select>

                <div className="mb-5 max-w-[420px] mx-auto">
                    <textarea required value={productDescription} onChange={(e) => setproductDescription(e.target.value)} id="message" rows="8" className="block p-2.5 w-full text-sm text-gray-900 outline-none bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Retail Description"></textarea>
                </div>

                <div className="container mx-auto mt-4 w-[500px]">
                    <h1 className="text-2xl font-bold mb-4">MRPList</h1>

                    {pairs.map((pair, index) => (
                        <div key={index} className="flex space-x-4 my-2">
                            <input required type="text" placeholder="Key" value={pair.key} onChange={(e) => handleChange(index, e.target.value, pair.value)}
                                className="p-2 border border-gray-300 rounded"
                            />
                            <input required type="text" placeholder="Value" value={pair.value} onChange={(e) => handleChange(index, pair.key, e.target.value)}
                                className="p-2 border border-gray-300 rounded"
                            />
                            <button type="button" onClick={() => handleRemovePair(index)} className="px-4 py-2 bg-red-500 text-white rounded"
                            >  Remove</button>

                            <button type="button" onClick={handleAddPair} className="px-4 py-2 bg-green-500 text-white rounded"
                            >  Add</button>
                        </div>
                    ))}

                    {/* <div className='flex gap-2 mt-3'>
                        <input type="number" value="0" className="rounded py-2 px-4  border border-gray-300 w-[80px] ml-2 mr-5 outline-none" />
                        <input type="number" onChange={(e) => onListPriceChange("0", e.target.value)} className="rounded py-2 px-4  border border-gray-300 w-[120px] ml-2 mr-5 outline-none" />
                    </div>


                    <div className='flex gap-2 mt-3'>
                        <input type="number" value="15" className="rounded py-2 px-4  border border-gray-300 w-[80px] ml-2 mr-5 outline-none" />
                        <input type="number" onChange={(e) => onListPriceChange("15", e.target.value)} className="rounded py-2 px-4  border border-gray-300 w-[120px] ml-2 mr-5 outline-none" />
                    </div>

                    <div className='flex gap-2 mt-3'>
                        <input type="number" value="25" className="rounded py-2 px-4  border border-gray-300 w-[80px] ml-2 mr-5 outline-none" />
                        <input type="number" onChange={(e) => onListPriceChange("25", e.target.value)} className="rounded py-2 px-4  border border-gray-300 w-[120px] ml-2 mr-5 outline-none" />
                    </div>

                    <div className='flex gap-2 mt-3'>
                        <input type="number" value="35" className="rounded py-2 px-4  border border-gray-300 w-[80px] ml-2 mr-5 outline-none" />
                        <input type="number" onChange={(e) => onListPriceChange("35", e.target.value)} className="rounded py-2 px-4  border border-gray-300 w-[120px] ml-2 mr-5 outline-none" />
                    </div>

                    <div className='flex gap-2 mt-3'>
                        <input type="number" value="42" className="rounded py-2 px-4  border border-gray-300 w-[80px] ml-2 mr-5 outline-none" />
                        <input type="number" onChange={(e) => onListPriceChange("42", e.target.value)} className="rounded py-2 px-4  border border-gray-300 w-[120px] ml-2 mr-5 outline-none" />
                    </div>

                    <div className='flex gap-2 mt-3'>
                        <input type="number" value="50" className="rounded py-2 px-4  border border-gray-300 w-[80px] ml-2 mr-5 outline-none" />
                        <input type="number" onChange={(e) => onListPriceChange("50", e.target.value)} className="rounded py-2 px-4  border border-gray-300 w-[120px] ml-2 mr-5 outline-none" />
                    </div> */}

                </div>
                <div className="w-[120px] mx-auto mt-5">
                    <button onClick={handleSubmit} className=" py-2 px-6 bg-[#1c2434] text-white text-sm rounded font-bold hover:text-[yellow] hover:scale-105 active:scale-95 transition-transform">Submit</button>
                </div>

            </form>
        </AdminDashboard>
    );
};

export default Form;