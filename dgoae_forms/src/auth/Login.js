import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@material-ui/core";
import React from "react";
import ImageBackground from "../images/biblioteca.jpg";
import LogoDGOAE from "../images/logoUNAM.png";

import "./Login.css";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <>
      <section className="showcase">
        <header>
          <img className="logo" src={LogoDGOAE}></img>
        </header>
        <img src={ImageBackground}></img>
        <div className="overlay"></div>
        <div className="text">
          <h2>DGOAE FORMULARIO</h2>
          <h3>Bienvenid@s a CuEV</h3>
          <p>
            Una manera sencilla de hacer y resolver cuestionarios en la
            Dirección General de Orientación y Atención Educativa
          </p>
          <Button
            color="primary"
            variant="contained"
            style={{ border: "2px solid blueviolet" }}
            onClick={() => loginWithRedirect()}
          >
            Inicio Sesión
          </Button>
        </div>
      </section>
    </>
  );
};

export default LoginButton;
