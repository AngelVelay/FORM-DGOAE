import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@material-ui/core";

export const LoginButton = () =>{
    const {loginWithRedirect} = useAuth0();

    

    return (
    
    
    <div className="login_header">
        <div>

            <h1>Una forma conocida para realizar cuestionarios para la DGOAE</h1>
        </div>

        <div>
            <Button onClick={()=>loginWithRedirect()}>Inicio Sesión</Button>
        </div>
    </div>

    )
}