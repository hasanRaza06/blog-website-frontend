import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function CreateBlogBody() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const handlePublish = async () => {
        const token = localStorage.getItem('token');

        try {
            const response = await axios.post('https://backend.hasanraza102515209.workers.dev/api/v1/blog/create', 
            {
                title,
                content
            }, 
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.status === 200) {
                navigate('/blogs');
            } else {
                setErrorMessage(response.data.message || 'An error occurred');
                setTimeout(() => setErrorMessage(''), 2000);
            }
        } catch (error) {
            setErrorMessage('There was an error publishing the blog!');
            setTimeout(() => setErrorMessage(''), 2000);
            console.error("There was an error publishing the blog!", error);
        }
    };

    return (
        <div className='pt-5 ml-10 mr-10'>
            <div className='flex justify-between'> 
                <div className='flex text-2xl'>Create your blog</div>
                <button 
                    className='rounded-md bg-green-400 p-2 ' 
                    onClick={handlePublish}>
                    Publish
                </button>
            </div>
            {errorMessage && (
                <div className='text-red-500 mb-4'>
                    {errorMessage}
                </div>
            )}
            <label className='text-xl'>Title :</label>
            <input 
                type="text" 
                className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-dotted focus:bg-white focus:border-grey-300' 
                onChange={(e) => { setTitle(e.target.value) }} 
            /><br />
            <label className='text-xl'>Content :</label>
            <textarea 
                rows={5} 
                className='appearance-none block w-full h-52 bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-dotted focus:bg-white focus:border-grey-300' 
                onChange={(e) => { setContent(e.target.value) }}>
            </textarea>
        </div>
    );
}
