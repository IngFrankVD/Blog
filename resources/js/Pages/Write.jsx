import React, { useRef } from 'react';
import FroalaEditor from 'react-froala-wysiwyg';
import Navabar from '../Layouts/Navbar'
import background from '../../img/patern.jpeg'

import 'froala-editor/js/plugins.pkgd.min.js';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'froala-editor/css/froala_style.min.css';

import JohletIcon from '../../img/Johlett.png'

export default function Write({ auth }) {

    const froalaEditorRef = useRef(null);
      
    const handleSave = () => {
    const blogContent = froalaEditorRef.current.editor.html.get();
    console.log(blogContent); // Imprime el contenido en la consola
        // Aquí puedes enviar blogContent al servidor para guardar en la base de datos
        // Por ejemplo, utilizando axios.post('/ruta/del/servidor', { content: blogContent });
    };
    return (
    
        <div style={{'--image-url': `url(${background})`}}  className='bg-[image:var(--image-url)] bg-cover h-screen  isolate px-6 pt-14 lg:px-8' >
            <Navabar/>
            <div className=' mt-28  ml-2 mr-2' >
                <FroalaEditor
                    ref={froalaEditorRef}
                    tag="textarea"
                    config={{
                    // Aquí puedes agregar las configuraciones adicionales para el editor Froala si lo deseas
                    // Consulta la documentación para más opciones: https://www.froala.com/wysiwyg-editor/docs/options
             }}
            />
                <button onClick={handleSave}>Guardar en la base de datos</button>
            </div>
        </div>

    );



};

