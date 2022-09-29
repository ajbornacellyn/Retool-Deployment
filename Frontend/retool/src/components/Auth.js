import React, { useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import axios from "axios";
import { ReactSession } from 'react-client-session';
ReactSession.setStoreType("localStorage");
/*
 */

const Auth = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [isLogged, setIsLogged] = useState(true);
  const [inputs, setInputs] = useState({
    name:"",
    email:"",
    password:"",
  });
  const handleChange = (e) => {
    setInputs((prevState)=> ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  };
  const handleSubmit = (e) =>{
    e.preventDefault();
    console.log(inputs);
    console.log(isSignup);
    console.log(isLogged);
    if (!isSignup){
      axios
            .post("http://localhost:8000/login/", {
                username: inputs.email,
                password: inputs.password,
            })
            .then((res) => {
              console.log(res.data);
              if (res.data){
                ReactSession.set("user", res.data);
                window.location.reload();
              }else{
                ReactSession.set("user", "");
              };
            })
            .catch((err) => {});
    }else{
      axios
            .post("http://localhost:8000/register/", {
                first_name: inputs.name,
                email: inputs.email,
                password: inputs.password,
            })
            .then((res) => {
              console.log(res);
            })
            .catch((err) => {});
    };
  };
  const resetState = () => {
    setIsSignup(!isSignup);
    setInputs({name:"",
    email:"",
    password:""})
  };


  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          display="flex"
          flexDirection={"column"}
          maxWidth={671}
          alignItems="center"
          justifyContent={"center"}
          margin="auto"
          marginTop={3}
          color="common.black"
          sx={{
            borderBottom: 2,
            position: "fixed",
            top: 90,
            right: 0,
            m: 0,
            height: "8%",
          }}
        >
          <Typography
            variant="h2"
            padding={3}
            color="common.white"
            sx={{
              position: "fixed",
              top: 10,
              right: 90,
              m: 1,
            }}
          >
            {isSignup ? "Cree una cuenta" : "Inicie sesion"}
          </Typography>
          <Typography
            variant="h10"
            padding={3}
            color="common.white"
            sx={{
              position: "fixed",
              top: 100,
              right: 180,
              m: 1,
            }}
          >
            {isSignup ? "¿Ya esta registrado?" : "¿No posee una cuenta?"}{" "}
            <Button onClick={resetState}setColor="white">
              Acceda aqui
            </Button>
          </Typography>
        </Box>

        <Box
          color="common.white"
          display="flex"
          flexDirection={"column"}
          maxWidth={600}
          alignItems="center"
          justifyContent={"center"}
          margin="auto"
          marginTop={5}
          borderRadius={5}
          boxShadow={"5px 5px 10px #ccc"}
          sx={{
            ":hover": {
              boxShadow: "10px 10px 20px #ccc",
            },
            position: "fixed",
            top: 125,
            right: 30,
            m: 1,
            width: "100%",
            height: "75%",
          }}
        >
          {isSignup ? "Introduzca su nombre" : ""}
          {isSignup && (
            <TextField
            onChange={handleChange}
            name="name"
            value={inputs.name}
              type={"text"}
              variant="outlined"
              label="Nombre"
              margin="normal"
              style={{ width: "75%" }}
              placeholder="Name"
            />
          )}
          Introduzca su correo electronico
          <TextField
          onChange={handleChange}
          name="email"
            type={"email"}
            value={inputs.email}
            label="Correo"
            margin="normal"
            style={{ width: "75%" }}
            placeholder="Email"
          />
          Introduzca su contraseña
          <TextField
          onChange={handleChange}
          name="password"
          value={inputs.password}
            type={"password"}
            label="Contraseña"
            margin="normal"
            style={{ width: "75%" }}
            placeholder="password"
          />
          <Button
            type="submit"
            sx={{ marginTop: 3, borderRadius: 3 }}
            variant="contained"
            style={{ width: "75%" }}
          >
            {isSignup ? "Crear cuenta" : "Iniciar sesion"}

          </Button>
        </Box>
      </form>
    </div>
  );
};

export default Auth;
