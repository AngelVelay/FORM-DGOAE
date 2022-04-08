import { Button } from '@material-ui/core';
import { useParams } from "react-router";
import React from 'react'
import { useNavigate } from 'react-router-dom'

function Submitted() {

    
    const { global_id } = useParams();
    var navigate = useNavigate();

    const goToHome = () => {
        navigate("/");
    }

    const goBack = () => {
        navigate("/response/" + global_id);
    }

    return (
        <div>
            <h2>
                Enviado
            </h2>
            <h3>
                
            </h3>

            <Button onClick={goBack}>¿Contestar de nuevo?</Button>
            <h4>
                <label>{window.location.origin+"/response/" + global_id}</label>
            </h4>
            <Button onClick={goToHome}>Regresa a inicio</Button>

        </div>
    )
}

export default Submitted