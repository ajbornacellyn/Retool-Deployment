import { useState } from 'react';
import { ReactSession } from 'react-client-session';
import axios from "axios";
ReactSession.setStoreType("localStorage");
import { useEffect } from 'react';
import {createWorkshop} from '../../API/workshopPetitions';
import {deleteWorkshop} from '../../API/workshopPetitions';
import {getVehicles} from '../../API/carPetitions';
import Router from 'next/router';

import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField
} from '@mui/material';

export const WorkshopCreate = (props) => {

  const token = localStorage.getItem('Token');
  const [workshops, setWorkshops] = useState([]);
  useEffect(() => {
      getWorkshops(setWorkshops)
  }, []);
  

  const [values, setValues] = useState({
    tallerNombreClave:"",
    tallerNombre:"",
    tallerDireccion:"",
    tallerTelefono:"",
    tallerCorreo:"",
    tallerCiudad:"",
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };


  const handleSubmit = (e) =>{
    e.preventDefault();
    createWorkshop(values);
};

console.log(workshops);
if (workshops === "No cars") {
    return (
      <div>
        <h1>No hay talleres registrados, por favor registre minimo un taller</h1>
      </div>
    );
} else {
  const workshop ={ tallerNombreClave:"",tallerNombre:"",  tallerDireccion:"", tallerTelefono:"", tallerCorreo:"", tallerCiudad:"",};
  workshops.push(workshop);
  return (
    <form
      onSubmit={handleSubmit}
      autoComplete="off"

      {...props}
    >
      <Card>
        <CardHeader
          subheader=""
          title="Registrar taller"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Nombre clave del local. Ej: TallerBogotaCarrera1Calle1-1"
                name="tallerNombreClave"
                value={values.tallerNombreClave}
                required
                select
                variant="outlined"
                onChange={handleChange}
                SelectProps={{ native: true }}
              >
                
              </TextField>
            </Grid>
            
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Nombre del taller"
                name="tallerNombre"
                value={values.tallerNombre}
                onChange={handleChange}
                required
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Direccion del taller"
                name="tallerDireccion"
                value={values.tallerDireccion}
                onChange={handleChange}
                required
                variant="outlined"
              />
            </Grid>
            
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Telefono del taller"
                name="tallerTelefono"
                value={values.tallerTelefono}
                onChange={handleChange}
                type="number"
                required
                variant="outlined"
              />

            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Correo del taller"
                name="tallerCorreo"
                value={values.tallerCorreo}
                onChange={handleChange}
                type="email"
                required
                variant="outlined"
              />

            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Ciudad donde se encuentra ubicado del taller"
                name="tallerCiudad"
                value={values.tallerCiudad}
                onChange={handleChange}
                required
                variant="outlined"
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            p: 2
          }}
        >
          <Button
            type="submit"
            color="primary"
            variant="contained"
          >
            Crear
          </Button>
        </Box>
      </Card>
    </form>
  );
  }
};
