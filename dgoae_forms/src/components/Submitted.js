import { Button } from '@material-ui/core';
import { useParams, useLocation } from "react-router";
import React from 'react'
import { useNavigate } from 'react-router-dom'

function Submitted() {

    let location = useLocation();
    const { id } = useParams();
    var navigate = useNavigate();
    
    const goToHome = () => {
        navigate("/");
    }

    return (
    <div>
        <h2>
            Enviado
        </h2>
        <h3>
            ¿Contestar de nuevo?
        </h3>
        <h4>
            {location.pathname + '/response/' + id}
        </h4>
    <Button onClick={goToHome}>Regresa a inicio</Button>

    </div>
  )
}

export default Submitted