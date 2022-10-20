import Head from 'next/head';
import NextLink from 'next/link';
import React, { useState } from "react";
import { Box, Typography, TextField, Button, Container } from "@mui/material";
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
    <>
    <Head>
      <title>
        Login/Signup
      </title>
    </Head>
    <Box
        component="main"
        sx={{
          alignItems: "center",
          display: "flex",
          flexGrow: 1,
          minHeight: "100%",
        }}
      >
        <Container maxWidth="sm">
          <form onSubmit={handleSubmit}>
            <Box sx={{ my: 3 }}>
              <Typography
                color="textPrimary"
                variant="h4"
                >
                  {isSignup ? "Cree una cuenta" : "Inicie sesion"}
              </Typography>
            </Box>

            {isSignup ? "Introduzca su nombre" : ""}
            {isSignup && (
            <TextField
              fullWidth
              onChange={handleChange}
              name="name"
              value={inputs.name}
              type={"text"}
              variant="outlined"
              label="Nombre"
              margin="normal"
              style={{ width: "100%" }}
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
            style={{ width: "100%" }}
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
            style={{ width: "100%" }}
            placeholder="password"
            />
            <Box>

            <NextLink
            href="/"
            passHref
          >
            <Button
            type="submit"
            sx={{ marginTop: 3, borderRadius: 3 }}
            variant="contained"
            style={{ width: "100%" }}
          >
            {isSignup ? "Crear cuenta" : "Iniciar sesion"}

          </Button>
          </NextLink>
          </Box>
          <Box>
          <Typography
            variant="h10"
            padding={3}
            color="textSecondary"
          >
            {isSignup ? "¿Ya esta registrado?" : "¿No posee una cuenta?"}{" "}
            <Button onClick={resetState}setColor="textSecondary">
              Acceda aqui
            </Button>
          </Typography>
          </Box>
          <Box>

          {!isSignup && (
            <Typography
            variant="h10"
            padding={3}
            color="textSecondary"
          >
            Olvido su contraseña?
            <NextLink
            href="/resetPassword"
            passHref
          >
            <Button onClick={resetState}setColor="textSecondary">
              Acceda aqui
            </Button>
            </NextLink>
          </Typography>
          )}

            </Box>
          </form>
        </Container>
      </Box>
    </>
  );
};

export default Auth;
