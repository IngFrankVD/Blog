import Navbar from '../Layouts/Navbar'
import Footer from '../Components/Footer';
import '../../css/BlogSingle.css'
import FroalaEditorView from 'react-froala-wysiwyg/FroalaEditorView'
import { data } from 'autoprefixer';
import {usePage } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import {PencilSquareIcon, TrashIcon} from '@heroicons/react/24/outline';
import React, { useState } from 'react';
  
import "froala-editor/css/froala_style.min.css";

export default function Home({Post}) {

  const {auth} = usePage().props;

  const data ={ 
      id: Post.id,
      title: Post.title,
      coverImg: Post.coverImg,
      categories: Post.categories,
      created_at: Post.created_at,
      updated_at: Post.updated_at,
      content: Post.content,
      userID: Post.user_id,
      autorName: Post.name,
      autorPicture: Post.picture,
}
  
console.log(data.id)

  return (
    <>
    <Navbar/>

      <div style={{'--image-url': `url(/storage/posts/${data.coverImg})`}}  className='bg-[image:var(--image-url)] bg-cover bg-center relative isolate px-6 pt-14 lg:px-8"'>
        <div
            
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
        <div className=" mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              {/* {post[0].desc} */}
            </p>
          </div>
        </div>
        <div
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
      </div>



            
      
      <div className="fr-view m-5 md:m-36  ">
            <div style={{width:"400px"}} className='flex items-center justify-left ' >
              <span className='flex items-center' > 
              <img className=" rounded-full h-8 mr-2"  src={data.autorPicture} alt="" /> 
              <a href="" style={{ fontWeight: 'bold' }} className='' > {data.autorName}   </a> 
              </span>   
              { 
                data.userID === auth.user.id ? 
                <>
                <div className='flex' >
                  <Link as="button" className='z-0' href={route('posts.edit',data.id)} method="get">
                  <PencilSquareIcon className="ml-5 mr-1 h-6 w-6 text-blue-500" />  
                  </Link>
                  <Link as="button" className='z-0' href={route('posts.destroy',data.id)} method="delete">
                    <TrashIcon className=' text-red-600 h-6 w-6 ' /> 
                  </Link>
                </div>
                </>
                :
                <div className='flex' >
                  
                </div>
            

              }
            </div>
            <br />
            <h1 className='mt-10 mb-10 text-3xl font-black' > {data.title} </h1>
            <FroalaEditorView model={data.content} />
      </div>
      


      <Footer/>
    </>
  )
}
