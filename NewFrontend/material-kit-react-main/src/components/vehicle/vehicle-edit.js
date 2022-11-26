import { useState } from 'react';
import axios from "axios";
import { ReactSession } from 'react-client-session';
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
import { editVehicle } from '../../API/carPetitions';
import Router from 'next/router';
import { getMarcas, getCombustibles } from './data';
ReactSession.setStoreType("localStorage");

const marcas = getMarcas();

const combustibles = getCombustibles();

export const VehicleEdit = ({vehicle, props}) => {
  console.log(vehicle);
  const [values, setValues] = useState({
    placa: vehicle.placa,
    marca: vehicle.marca,
    año: vehicle.año,
    modelo: vehicle.modelo,
    combustible: vehicle.combustible,
    kilometraje: vehicle.kilometraje,
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };


  const handleSubmit = (e) =>{
    e.preventDefault();
    editVehicle(vehicle.placa,values)
    //Router.reload();
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
                label="Placa"
                name="placa"
                disabled
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
                label="Marca"
                name="marca"
                value={values.marca}
                onChange={handleChange}
                required
                select
                SelectProps={{ native: true }}
                variant="outlined"
              >
                {marcas.map((option) => (
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
                label="Modelo"
                name="modelo"
                value={values.modelo}
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
                label="Año"
                name="año"
                value={values.año}
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
                label="Combustible"
                name="combustible"
                value={values.combustible}
                onChange={handleChange}
                required
                select
                SelectProps={{ native: true }}
                variant="outlined"
              >
                {combustibles.map((option) => (
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
            Guardar
          </Button>
        </Box>
      </Card>
    </form>
  );
};
