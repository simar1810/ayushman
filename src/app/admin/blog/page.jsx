"use client"
import dynamic from "next/dynamic";
const SunEditor = dynamic(() => import("suneditor-react"), { ssr: false });
import 'suneditor/dist/css/suneditor.min.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import slugify from "slugify";
import { useState, useEffect } from "react";
import { getCookie } from "@/actions/auth";
import { getCategories } from "@/actions/category";
import { createBlog } from "@/actions/blog";
import toast, { Toaster } from "react-hot-toast";
import { TailSpin } from "react-loader-spinner";
import { useRouter } from "next/navigation";
const CreateBlogPage = () => {
    const route = useRouter()
    const blogFromLS = () => {
        if (typeof window === 'undefined') { return false; }
        if (localStorage.getItem('blog')) {
            return JSON.parse(localStorage.getItem('blog'));
        } else { return ""; }

    };


    const [body, setBody] = useState(blogFromLS());
    const [checked, setChecked] = useState([]);
    const [categories, setCategories] = useState([]);


    const handleBody = e => {
        setBody(e);
        formData.set('body', e);
        if (typeof window !== 'undefined') { localStorage.setItem('blog', JSON.stringify(e)); }
    };


    const [values, setValues] = useState({
        error: '',
        sizeError: '',
        success: '',
        formData: new FormData(),
        title: '',
        mtitle: '',
        mdesc: '',
        slug: '',
        photo: '',
        loading: false,
        publishtext: 'Publish',
    });

    const { error, success, formData, loading, publishtext, title, mtitle, mdesc, slug, photo } = values;
    const token = getCookie('token');

    const publishBlog = e => {
        e.preventDefault();
        setValues({ ...values, publishtext: 'Publishing...', loading: true });
        createBlog(formData, token).then(data => {
            if (data.error) {
                toast.error(data.error);
                setValues({ ...values, publishtext: 'Publish', loading: false, error: data.error });
            } else {
                toast.success(`A new blog titled "${data.title}" is created`);
                route.push('/admin/edit-blogs')
                setValues({ ...values, loading: false, title: '', mtitle: '', mdesc: '', slug: '', error: '', photo: '', success: `A new blog titled "${data.title}" is created` });
                setBody('');
                setCategories([]);

                let postslug = slugify(slug).toLowerCase();
                function redirect() {
                    // Router.replace(`/blogs/${postslug}`);
                }
                setTimeout(redirect, 200)


            }
        });
    };

    const handleChange = name => e => {
        const value = e.target.value;
        formData.set(name, value);
        setValues({ ...values, [name]: value, error: '' });
    };


    useEffect(() => {
        initCategories();
    }, []);


    const initCategories = () => {

        getCategories().then(data => {
            // console.log(data)
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setCategories(data);
            }
        });
    };







    const handleToggle = c => () => {
        setValues({ ...values, error: '' });
        // return the first index or -1
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

                <li key={i} className="list-none flex items-center pt-3">
                    <input onChange={handleToggle(c._id)} type="checkbox" className="cursor-pointer" />
                    <label className="font-semibold text-slate-900 pl-3 text-sm">{c.name}</label>
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




    return (
        <>
            <form onSubmit={publishBlog} className=" bg-[#f0f0f0]">
                <Toaster />

                <div className="flex gap-8 justify-center mx-10">

                    <div className="w-[77%]">
                        <input required type="text" autoFocus={true} value={title} onChange={handleChange('title')} name="title" placeholder="Title Goes Here ......." className="max-w-[100%] bg-[#f0f0f0] font-bold text-2xl w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none mb-4 border-none" />

                        <div>
                            <SunEditor
                                setContents={body} placeholder="Start typing here .............."
                                onChange={handleBody} setDefaultStyle="font-family:trebuchet ms; color:black;font-size:17px;padding:15px"
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
                                }} />
                        </div>
                    </div>


                    <div className=" w-[23%] mb-10 lg:ml-10">

                        <div className="mt-[50px] ">
                            {loading && <div className='flex justify-center mb-2'>
                                <TailSpin color="black" height="30" width="30" ariaLabel="tail-spin-loading" radius="1" wrapperStyle={{}} wrapperClass="" visible={true} />
                            </div>}
                            <button type="submit" className="bg-slate-900 text-white tracking-wider px-3  py-2 font-semibold rounded-md hover:shadow-md transition-transform hover:scale-105 hover:text-[yellow] active:scale-95 text-sm mt-2">{publishtext}</button>
                        </div>

                        <div className="mt-5">
                            <DatePicker id='date' autoComplete="off" onChange={handleDateChange} className="border bg-gray-50 border-gray-300 outline-none cursor-pointer px-2 py-1.5 text-[13px] " selected={values.date} minDate={new Date()} showYearDropdown dateFormat="dd MMM, yyyy" placeholderText="Date" />
                        </div>

                        <div className="mt-5">
                            <div className="font-semibold">Title</div>
                            <input required type="text" value={mtitle} onChange={handleChange('mtitle')} name="title" placeholder="Meta Title" className=" h-5 px-2 py-4 mt-2  w-[80%] text-[13px] bg-gray-50 hover:outline-none focus:outline-none mb-4 border border-gray-300" />
                        </div>


                        <div className="mt-5">
                            <div className="font-semibold">Meta Description</div>
                            <textarea required value={mdesc} onChange={handleChange('mdesc')} id="message" rows="6" className="block p-2.5 text-sm text-gray-900 w-[85%] outline-none bg-gray-50 rounded-lg border border-gray-300  mt-2 " placeholder="Meta Description">
                            </textarea>
                        </div>


                        <div className="mt-5">
                            <div className="font-semibold">Slug</div>
                            <input required type="text" value={slug} onChange={handleChange('slug')} name="Slug" placeholder="Slug" className=" h-5 px-2 py-4 mt-2 text-[13px] w-[80%] bg-gray-50 hover:outline-none focus:outline-none mb-4 border border-gray-300" />
                        </div>

                        <div className="mt-5">
                            <div className="font-semibold">Featured Image</div>
                            <input required type="text" value={photo} onChange={handleChange('photo')} name="Slug" placeholder="Featured Image" className=" h-5 px-2 py-4 mt-2 w-[80%] text-[13px] bg-gray-50 hover:outline-none focus:outline-none mb-4 border border-gray-300" />
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

export default CreateBlogPage