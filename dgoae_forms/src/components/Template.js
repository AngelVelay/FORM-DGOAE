import React from 'react'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import { Icon, IconButton } from '@material-ui/core'
import UnfoldMoreIcon from '@material-ui/icons/UnfoldMore'
import "./Template.css"



import blank from "../images/forms-blank-googlecolors.png"
import rsvp from "../images/EventeRSVP.png"
import party from "../images/Party_invitation.png"
import contact from "../images/contact.png"

import uuid from "react-uuid"
import { useNavigate } from "react-router-dom"
import axios from 'axios'
import { useAuth0 } from '@auth0/auth0-react'

function Template() {

    const navigate = useNavigate();
    const { user } = useAuth0();
    const createForm = async () => {
        const id_ = uuid();
        console.log(id_, user.name);
        var question_list = [{
            questionText: "Pregunta", questionType: "radio",
            options: [{ optionText: "Opcion 1" }], open: true,
            require: false
        }];
        try {
            const response = await axios(
                /*
                `http://localhost:9000/add_question?username=${user.name}&doc_id=${id_}`,{
                "document_name": "Untilted Form",
                "doc_desc": "Add Description",
                "questions": question_list
                }*/
                {
                    url: `http://localhost:9000/add_question?username=${user.name}&doc_id=${id_}`,
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    data: {
                        "document_name": "Untilted Form",
                        "document_description": "Add Description",
                        "questions": question_list
                    }
                })
                
                
                
            }catch (err) {
            console.log(err)
        }
        
        navigate("/form/" + id_);
    };

    const createFormRegist = async () => {
        const id_ = uuid();
        console.log(id_, user.name);
        var question_list = [
            {
            questionText: "Nombre Completo", questionType: "text",
            options: [{ optionText: "nombre_completo" }], open: true,
            require: true
            },{
            questionText: "Correo electrónico", questionType: "text",
            options: [{ optionText: "correo" }], open: false,
            require: true
            },{
                questionText: "Número de Cuenta", questionType: "text",
                options: [{ optionText: "ncuenta" }], open: false,
                require: false
            },];
        try {
            const response = await axios(
               
                {
                    url: `http://localhost:9000/add_question?username=${user.name}&doc_id=${id_}`,
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    data: {
                        "document_name": "Untilted Form",
                        "document_description": "Add Description",
                        "questions": question_list
                    }
                })
                
                
                
            }catch (err) {
            console.log(err)
        }
        
        navigate("/form/" + id_);
    };



return (
    <div className='template_section'>
        <div className='template_top'>
            <div className='template_left'>
                <span style={{ fontsize: '16px', color: '#202124' }}>Empezar con una nueva forma</span>
            </div>
            <div className='template_right'>
                <div className='gallery_button'>
                    Galeria de Formatos 
                    <UnfoldMoreIcon fontSize='small' />
                </div>
            </div>
        </div>
        <div className='template_body'>
            <div className='card' onClick={createForm}>
                <img src={blank} alt="no image" className='card_image' />
                <p className='card_title'>En Blanco</p>
            </div>
            <div className='card' onClick={createFormRegist}>
                <img src={party} alt="no image" className='card_image' />
                <p className='card_title'>Registro Simple</p>
            </div>
            <div className='card'>
                <img src={rsvp} alt="no image" className='card_image' />
                <p className='card_title'>RSVP</p>
            </div>
            <div className='card'>
                <img src={contact} alt="no image" className='card_image' />
                <p className='card_title'>Contact Information</p>
            </div>
        </div>
    </div>
)
}

export default Template