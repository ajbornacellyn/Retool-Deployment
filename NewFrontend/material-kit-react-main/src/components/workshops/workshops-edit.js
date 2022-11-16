import { useState } from 'react';
import axios from "axios";
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
import { editWorkshop } from '../../API/workshopPetitions';
import Router from 'next/router';

export const WorkshopEdit = ({workshop, props}) => {
  console.log(workshop);
  const [values, setValues] = useState({
    tallerNombreClave: workshop.tallerNombreClave,
    tallerNombre: workshop.tallerNombre,
    tallerDireccion: workshop.tallerDireccion,
    tallerTelefono: workshop.tallerTelefono,
    tallerCorreo: workshop.tallerCorreo,
    tallerCiudad: workshop.tallerCiudad,
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };


  const handleSubmit = (e) =>{
    e.preventDefault();
    console.log("SU");
    editWorkshop(values)
    Router.reload();
  };

  return (
    <form 
      onSubmit={handleSubmit}
      autoComplete="off"
      noValidate
      {...props}
    >
      <Card>
        <CardHeader
          subheader=""
          title="Editar Vehículo"
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
                label="Numero de contacto"
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
                label="tallerCorreo"
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
            Guardar
          </Button>
        </Box>
      </Card>
    </form>
  );
};
