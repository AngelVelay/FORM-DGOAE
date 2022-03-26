import { Button } from '@material-ui/core';
import { useParams, useLocation } from "react-router";
import React from 'react'
import { useNavigate } from 'react-router-dom'

function SaveForm() {

    const { id } = useParams();

    var navigate = useNavigate();
    
    const goToHome = () => {
        navigate("/");
    }

    return (
    <div>
        <h2>
            Guardado
        </h2>
        <h3>
            Copia el siguiente link para el uso del cuestionario.
        </h3>
        
        <h2> http://localhost:3000/response/{id} </h2>

<h4>
    <Button onClick={goToHome}>Regresa a Inicio</Button>
    </h4>
    </div>
  )
}

export default SaveForm