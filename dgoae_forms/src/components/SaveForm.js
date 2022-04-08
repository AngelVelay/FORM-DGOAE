import { Button } from '@material-ui/core';
import { useParams } from "react-router";
import React , { useEffect, useState }from 'react'
import { useNavigate } from 'react-router-dom'

import axios from 'axios'

function SaveForm() {


    const { id } = useParams();
   
    var [global_id, setGlobal] = useState(-1);
    useEffect(() => {

        async function getGlobalID() {
          
            var request = await axios.get(`http://localhost:9000/getGlobalID?id=${id}`);
            setGlobal(request.data.gid);
            console.log(request.data);
            
        

                       
        };


        getGlobalID();



    }, []);


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

            <h2>
                <label>{window.location.origin + "/response/" + global_id}</label>
            </h2>

            <h4>
                <Button onClick={goToHome}>Regresa a Inicio</Button>
            </h4>
        </div>
    )
}

export default SaveForm