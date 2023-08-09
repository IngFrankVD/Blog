import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';
import FroalaEditorComponent from 'react-froala-wysiwyg';
import FroalaEditor from 'react-froala-wysiwyg';
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

  const {data, setData, post, reset, errors } = useForm({
    title: '',
    content: content,
    categories_id: 1,
    coverImg: '',
    blogImages: uploadedImages,
  });

  const handleImageExtraction = (newContent) => {
    const regex = /<img.*?src=["'](.*?)["']/g;
    let match;
    const newImages = [];

    while ((match = regex.exec(newContent)) !== null) {
      newImages.push(match[1]);
    }

    setUploadedImages(newImages);
    console.log(newImages)
  };

  const handleContentChanged = (newContent) => {
    setContent(newContent);
    handleImageExtraction(newContent);
    setData('content', newContent)
    setData('blogImages', uploadedImages);
    console.log(data)
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

  const submit = (e) => {
    e.preventDefault();
    post(route('posts.store'), { onSuccess: () => reset() });
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
