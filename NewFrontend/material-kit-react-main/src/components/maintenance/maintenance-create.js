import { useState } from 'react';
import { ReactSession } from 'react-client-session';
import axios from "axios";
ReactSession.setStoreType("localStorage");

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

const estados = [
  {
    value: 'En proceso',
    label: 'En proceso'
  },
  {
    value: 'Finalizado',
    label: 'Finalizado'
  },
  {
    value: 'Aplazado',
    label: 'Aplazado'
  }
];

const servicios = [
  {
    value: 'gasolina',
    label: 'Gasolina'
  },
  {
    value: 'acpm',
    label: 'ACPM'
  },
  {
    value: 'gasolina-extra',
    label: 'Gasolina Extra'
  }
];

export const MaintenanceCreate = (props) => {
  const [values, setValues] = useState({
    placa:"",
    fecha:"",
    servicio:"",
    descripcion:"",
    estado:"",
    kilometraje:"",
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

    if (typeof window !== 'undefined') {
      const token = ReactSession.get("token");
      axios
      .post("http://localhost:8000/maintenance/", {
          placa: values.placa,
          descripcion: values.descripcion,
          estado: values.estado,
          servicio: values.servicio,
          fecha: values.fecha,
          kilometraje: values.kilometraje,
          costo: 0,
      },{
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((res) => {
        maintenances = res.data;
      })
      .catch((err) => {});

      // 👉️ can use localStorage here
  } else {
      console.log('You are on the server')
      // 👉️ can't use localStorage

  }
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
          title="Crear Mantenimiento"
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
                label="Placa"
                name="placa"
                value={values.placa}
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
                label="Estado"
                name="estado"
                value={values.descripcion}
                onChange={handleChange}
                required
                select
                SelectProps={{ native: true }}
                variant="outlined"
              >
                {estados.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Descripcion"
                name="descripcion"
                value={values.descripcion}
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
                label="Fecha"
                name="fecha"
                value={values.fecha}
                onChange={handleChange}
                type="date"
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
                label="Servicio"
                name="servicio"
                value={values.servicio}
                onChange={handleChange}
                required
                select
                SelectProps={{ native: true }}
                variant="outlined"
              >
                {servicios.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Kilometraje"
                name="kilometraje"
                value={values.kilometraje}
                onChange={handleChange}
                type="number"
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
};
