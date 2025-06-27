"use client";
import dynamic from "next/dynamic";
const SunEditor = dynamic(() => import("suneditor-react"), { ssr: false });
import 'suneditor/dist/css/suneditor.min.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import slugify from "slugify";
import { useState, useEffect } from "react";
import { getCookie } from "@/actions/auth";
import { getCategories } from "@/actions/category";
import { updateBlog, singleBlog } from "@/actions/blog";
import toast, { Toaster } from "react-hot-toast";
import { TailSpin } from "react-loader-spinner";

const EditBlogPage = ({ params: { blogslug } }) => {

    const [categories, setCategories] = useState([]);
    const [checked, setChecked] = useState([]);
    const [body, setBody] = useState('');

    const [values, setValues] = useState({
        title: '',
        error: '',
        success: '',
        formData: new FormData(),
        mtitle: '',
        mdesc: '',
        slug: '',
        date: '',
        photo: '',
        loading: false,
        updatetext: 'Update',
    });

    const { error, success, loading, formData, title, updatetext, mtitle, mdesc, slug, date, photo } = values;
    const token = getCookie('token');

    useEffect(() => {
        initBlog();
        initCategories();
    }, []);

    const editBlog = e => {
        e.preventDefault();
        formData.set('body', body);
        setValues({ ...values, updatetext: 'Updating....', loading: true });
        updateBlog(formData, token, blogslug).then(data => {
            console.log(data)
            if (data.error) {
                setValues({ ...values, updatetext: "updating", loading: false });
                toast.error(data.error);
            }
            else {
                setValues({ ...values, loading: false, success: `Blog titled "${data.title}" is successfully updated` });
                toast.success(`Blog titled "${data.title}" is successfully updated`);

                let postslug = slugify(slug).toLowerCase();
                function redirect() {
                    // Router.push(`/blogs/${postslug}`);
                }
                setTimeout(redirect, 500)

            }
        });
    };



    const initBlog = (res) => {
        console.log(blogslug);
        if (blogslug) {
            singleBlog(blogslug).then(data => {
                if (!data) {
                    if (!isAuth()) {
                        // Router.push(`/signin`);
                    } else if (isAuth().role == 1) {
                        // Router.push(`/admin`);
                    }
                    else if (isAuth().role !== 1) {
                        // Router.push(`/user`);
                    }

                } else {
                    const dateFromString = new Date(Date.parse(data.date));
                    setValues({ ...values, title: data.title, mtitle: data.mtitle, date: dateFromString, photo: data.photo, slug: data.slug, mdesc: data.mdesc });
                    setBody(data.body)
                    setCategoriesArray(data.categories);
                }
            });
        }
    };


    const handleChange = name => e => {
        const value = e.target.value;
        formData.set(name, value);
        setValues({ ...values, [name]: value, error: '' });
    };



    const initCategories = () => {
        getCategories().then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setCategories(data);
            }
        });
    };



    const setCategoriesArray = blogCategories => {
        let ca = [];
        blogCategories.map((c, i) => {
            ca.push(c._id);
        });
        setChecked(ca);
    };



    const findOutCategory = c => {
        const result = checked.indexOf(c);
        if (result !== -1) {
            return true;
        } else {
            return false;
        }
    };

    const handleToggle = c => () => {
        setValues({ ...values, error: '' });
        const clickedCategory = checked.indexOf(c);
        const all = [...checked];

        if (clickedCategory === -1) {
            all.push(c);
        } else {
            all.splice(clickedCategory, 1);
        }

        setChecked(all);
        formData.set('categories', all);
    };



    const showCategories = () => {
        return (
            categories &&
            categories.map((c, i) => (

                <li key={i} className="">
                    &nbsp;&nbsp;&nbsp;&nbsp;    <input onChange={handleToggle(c._id)} checked={findOutCategory(c._id)} type="checkbox" />
                    <label >&nbsp;&nbsp; {c.name}</label>
                </li>

            ))
        );
    };



    const handleDateChange = (date) => {
        const name = 'date';
        const value = date;
        const { formData } = values;

        formData.set(name, value);
        setValues({ ...values, [name]: value, formData, error: '' });

    };

    const handleBody = (e) => {
        setBody(e);
        formData.set('body', e);
    };




    return (
        <>
            <form onSubmit={editBlog} className=" bg-[#f0f0f0]">
                <Toaster />

                <div className="flex gap-8 justify-center mx-10">

                    <div className="w-[77%] min-h-screen overflow-y-auto">
                        <input type="text" autoFocus={true} value={title} onChange={handleChange('title')} name="title" placeholder="Title Goes Here ......." className="max-w-[100%] bg-[#f0f0f0] font-bold text-2xl w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none mb-4 border-none" />

                        <div className="min-h-screen overflow-y-auto">
                            <SunEditor
                                setContents={body} placeholder="Start typing here .............."
                                onChange={handleBody}
                                setDefaultStyle="font-family:trebuchet ms; color:black;font-size:17px;padding:15px"
                                setOptions={{
                                    height: 800,
                                    buttonList: [
                                        ["fontSize"],
                                        [
                                            "bold",
                                            "underline",
                                            "italic",
                                            "blockquote",
                                            "subscript",
                                            "superscript",
                                        ],
                                        ["formatBlock"],
                                        ["align", "horizontalRule", "list", "table"],
                                        ["fontColor", "hiliteColor"],
                                        ["removeFormat"],
                                        ["link", "image", "video"],
                                        ["preview"],
                                        ["showBlocks", "codeView", "fullScreen"],
                                    ],
                                }}
                            />
                        </div>
                    </div>



                    <div className=" w-[23%] mb-10 lg:ml-10">

                        <div className="mt-[50px] ">
                            {loading && <div className='flex justify-center mb-2'>
                                <TailSpin color="black" height="30" width="30" ariaLabel="tail-spin-loading" radius="1" wrapperStyle={{}} wrapperClass="" visible={true} />
                            </div>}
                            <button type="submit" className="bg-slate-900 text-white tracking-wider px-3  py-2 font-semibold rounded-md hover:shadow-md transition-transform hover:scale-105 hover:text-[yellow] active:scale-95 text-sm mt-2">{updatetext}</button>
                        </div>

                        <div className="mt-5">
                            <DatePicker id='date' autoComplete="off" onChange={handleDateChange} className="border bg-gray-50 border-gray-300 outline-none cursor-pointer px-2 py-1.5 text-[13px] " selected={values.date} minDate={new Date()} showYearDropdown dateFormat="dd MMM, yyyy" placeholderText="Date" />
                        </div>

                        <div className="mt-5">
                            <div className="font-semibold">Title</div>
                            <input type="text" value={mtitle} onChange={handleChange('mtitle')} name="title" placeholder="Meta Title" className=" h-5 px-2 py-4 mt-2  w-[80%] text-[13px] bg-gray-50 hover:outline-none focus:outline-none mb-4 border border-gray-300" />
                        </div>


                        <div className="mt-5">
                            <div className="font-semibold">Meta Description</div>
                            <textarea value={mdesc} onChange={handleChange('mdesc')} id="message" rows="6" className="block p-2.5 text-sm text-gray-900 w-[85%] outline-none bg-gray-50 rounded-lg border border-gray-300  mt-2 " placeholder="Meta Description">
                            </textarea>
                        </div>


                        <div className="mt-5">
                            <div className="font-semibold">Slug</div>
                            <input type="text" value={slug} onChange={handleChange('slug')} name="Slug" placeholder="Slug" className=" h-5 px-2 py-4 mt-2 text-[13px] w-[80%] bg-gray-50 hover:outline-none focus:outline-none mb-4 border border-gray-300" />
                        </div>

                        <div className="mt-5">
                            <div className="font-semibold">Featured Image</div>
                            <input type="text" value={photo} onChange={handleChange('photo')} name="Slug" placeholder="Featured Image" className=" h-5 px-2 py-4 mt-2 w-[80%] text-[13px] bg-gray-50 hover:outline-none focus:outline-none mb-4 border border-gray-300" />
                        </div>


                        <div className="mt-3">
                            <div className="font-semibold mb-2">Categories</div>
                            <ul className="ml-5">
                                {showCategories()}
                            </ul>
                        </div>
                    </div>


                </div>

            </form>


        </>
    )
}

export default EditBlogPage