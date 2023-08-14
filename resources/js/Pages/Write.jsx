import React, { useState, useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import FroalaEditorComponent from 'react-froala-wysiwyg';
import axios from 'axios'; // Importa Axios para manejar las solicitudes HTTP
import NavBar from '../Layouts/Navbar';
import PrimaryButton from '@/Components/PrimaryButton';
import InputError from '@/Components/InputError';
import uploadImg from '../../img/upload.png'
import { ArrowUpTrayIcon } from '@heroicons/react/24/outline';


import 'froala-editor/js/plugins.pkgd.min.js';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'froala-editor/css/froala_style.min.css';



export default function write({ Post }) {
  
  const [previewImageUrl, setPreviewImageUrl] = useState('');
  const [uploadedImages, setUploadedImages] = useState([]);
  const [content, setContent] = useState('');

  const { data, setData, post, reset, errors } = useForm({
    title: '',
    content: '',
    categories_id: 1,
    coverImg: '',
    blogImages: [],
  });

  useEffect(() => {
    // Update 'blogImages' in 'data' whenever 'uploadedImages' changes
    setData('blogImages', uploadedImages);
  }, [uploadedImages]);

  const handleImageExtraction = (newContent) => {
    // Extract image URLs from the newContent using regex (similar to the previous response)
    const imgTags = newContent.match(/<img[^>]+src="([^">]+)"/g);
    const imageUrls = imgTags.map(tag => {
      const srcMatch = tag.match(/src="([^">]+)"/);
      return srcMatch[1];
    });

    // Update the uploadedImages state with the extracted image URLs
    setUploadedImages(imageUrls);
  };
  
  const handleContentChanged = (newContent) => {
    setContent(newContent);
    handleImageExtraction(newContent); // Call handleImageExtraction with newContent
    setData('content', newContent); // Update data with newContent
  };
  
  
  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;
    setData('coverImg',selectedFile)
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImageUrl(reader.result);
    };
    reader.readAsDataURL(selectedFile);
  };

  const submit = async (e) => {
    e.preventDefault();

    // Send images to the server and get updated image URLs
    const updatedImageUrls = await uploadImages(uploadedImages);

    // Update the content with the new image URLs
    const updatedContent = content.replace(
      /<img[^>]+src="([^">]+)"/g,
      (_, src) => `<img src="${updatedImageUrls[src]}"`);
      
    // Update 'data' with the new content and image URLs
    setData('content', updatedContent);
    setData('blogImages', updatedImageUrls);

    // Send the rest of the form data to the server
    post(route('posts.store'), { onSuccess: () => reset() });
  };

  const uploadImages = async (imageUrls) => {
    const newImageUrls = {};
  
    // Loop through each image URL and upload it to the server
    for (const imageUrl of imageUrls) {
      try {
        const response = await axios.post('/upload-image', { imageUrl });
        newImageUrls[imageUrl] = response.data.newImageUrl;
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  
    return newImageUrls;
  };

  
  return (
    <>
     <NavBar className='bg-blue-400' />
     
     <div
        style={{
            
          backgroundImage: `url(${previewImageUrl})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          width: '100%',
          height: '60vh',
        }}
        className='flex bg-amber-200 items-center justify-center'
      >
        
     

        {
            !previewImageUrl  ?

            <div className='' >
            <ArrowUpTrayIcon className='h-5 m-auto'/>
            <p>Upload cover image</p>
            </div>
            : 
            <div></div>
        }

      </div>

     

    <div className='m-5' >

    

    <form className='ml-5 mr-5 md:ml-28 md:mr-28' onSubmit={submit}>
  

    <label htmlFor="coverImg">Upload cover image</label>
      <input
        type="file"
        id="coverImg"
        name="coverImg"
        accept="image/*"
        onChange={handleImageChange}
      />

        <br />
        <br />
        <br />

      
      <div className="relative mt-2 rounded-md ">
      <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
        Title
      </label>
        <input
          id='title'
            onChange={e => setData('title', e.target.value)}
            className=" mb-5 block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="Title"
        />
        <InputError message={errors.message} className="mt-2" />
        <FroalaEditorComponent
                tag='textarea'
                model={content}
                onModelChange={handleContentChanged}
            />
            
            <div className="space-x-2">
                <PrimaryButton className="mt-4">Save</PrimaryButton>
                <a className="mt-4" href={route('posts.index')}>Cancel</a>
            </div>
            </div>
            <br />

            {/* EL cidigo comentado abajo es para mostrar un preview del contenido dentro del editor  */}
            {/* <div className="fr-view m-7 ">
                 <p dangerouslySetInnerHTML={{ __html: data.content }}></p> 
            </div> */}
        </form>
      </div>

    
   
            
    </>
  );

}
