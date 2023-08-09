import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';
import FroalaEditorComponent from 'react-froala-wysiwyg';
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

    const handleImageChange = (e) => {
        const selectedFile = e.target.files[0];
        setData({ ...data, coverImg: selectedFile });
        if (!selectedFile) return;
    
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewImageUrl(reader.result);
        };
        reader.readAsDataURL(selectedFile);
      };
    
    // const handleImageChange = (e) => {
    //     const selectedFile = e.target.files[0];
    //     setData({ ...data, coverImg: selectedFile });

    //     if (selectedFile) {
    //       const reader = new FileReader();
    //       reader.onloadend = () => {
    //         setPreviewImageUrl(reader.result);
    //       };
    //       reader.readAsDataURL(selectedFile);
    //     } else {
    //       setPreviewImageUrl('');
    //     }
    //   };

    const [content, setContent] = useState('');

    const { data, setData, post, clearErrors, reset, errors  } = useForm({
        title: Post.title,
        content: Post.content,
        categories_id: 1,
        coverImg: '',
        oldImg: Post.coverImg,
    });

  const submit = (e) => {
        e.preventDefault();
        post(route('posts.update', Post.id), { onSuccess: () => reset() });
    };

  const handleContentChanged = (newContent) => {
    setContent(newContent);
    setData('content', newContent)
  };


  console.log(data);
  
  return (
    <>
     <NavBar className='bg-blue-400' />
     <div
        style={{
            
          backgroundImage: `url(${!previewImageUrl ? '/storage/posts/'+data.oldImg : previewImageUrl })`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          width: '100%',
          height: '60vh',
        }}
        className='flex bg-amber-200 items-center justify-center'
      >
        {
            !previewImageUrl === undefined ?

            <div className='' >
            <ArrowUpTrayIcon className='h-5 m-auto'/>
            <p>Upload cover image</p>
            </div>
            : 
            <div></div>
        }

      </div>

    <div className='m-5' >
    <form onSubmit={submit}>
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

      <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">
        Title
      </label>
      <div className="relative mt-2 rounded-md ">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <span className="text-gray-500 sm:text-sm"> </span>
        </div>
        <input
            value={data.title}
            onChange={e => setData('title', e.target.value)}
            className=" mb-5 block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="Title"
        />
        <InputError message={errors.message} className="mt-2" />
        <FroalaEditorComponent
                value={data.content}
                tag='textarea'
                model={data.content}
                onModelChange={handleContentChanged}
            />
            
            <div className="space-x-2">
                <PrimaryButton className="mt-4">Save</PrimaryButton>
                <a className="mt-4" href={"/posts/"+Post.id} >Cancel</a>
            </div>
            </div>
            <br />

            {/* EL cidigo comentado abajo es para mostrar un preview del contenido dentro del editor  */}
            <div className="fr-view m-7 ">
                {/* <p dangerouslySetInnerHTML={{ __html: content }}></p> */} 
            </div>
        </form>
      </div>

            
    
   
            
    </>
  );

}
