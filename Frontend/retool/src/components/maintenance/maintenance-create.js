import { useState } from 'react';
import {createMaintenance} from '../../API/maintenancePetitions';
import {getMaintenances} from '../../API/maintenancePetitions';
import { useEffect } from 'react';
import Router from 'next/router';
import { getTiposServicios, getEstados} from './data';

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
import { set } from 'date-fns';

const tiposServicios = getTiposServicios();

const estados = getEstados();

export const MaintenanceCreate = ({props, vehicles, updateMaintenances, handleClose}) => {
  var today = new Date();
  const [values, setValues] = useState({
    placa:"",
    id:"",
    descripcion:"",
    kilometraje:"",
    estado:estados[0].value,
    servicio:tiposServicios[0].value,
    fecha:today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate(),
    costo:"",
  });

  try{
    if (values.placa == "") {
      values.placa = vehicles[0].placa;
    }
  } catch (error) {
    console.log(error);
  };

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };


  const handleSubmit = (e) =>{
    e.preventDefault();
    createMaintenance(values,updateMaintenances);
    handleClose();

  }

  if(vehicles == "No vehicles") return <div>No hay vehículos</div>;

  return (
    <form
      onSubmit={handleSubmit}
      autoComplete="off"
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
                label="Vehiculo"
                name="placa"
                value={values.placa}
                required
                select
                variant="outlined"
                onChange={handleChange}
                SelectProps={{ native: true }}
              >
                {vehicles.map((option) => (
                  <option
                    key={option.placa}
                    value={option.placa}
                  >
                    {option.placa}
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
                label="Servicio"
                name="servicio"
                value={values.servicio}
                onChange={handleChange}
                select
                SelectProps={{ native: true }}
                variant="outlined"
                required
              >
                {tiposServicios.map((option) => (
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
                label="Costo"
                name="costo"
                value={values.costo}
                onChange={handleChange}
                variant="outlined"
                type="number"
                required
              />
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
                variant="outlined"
                type="number"
                required
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
                value={values.estado}
                onChange={handleChange}
                select
                SelectProps={{ native: true }}
                variant="outlined"
                required
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
              md={12}
              xs={12}
            >
              <TextField
                fullWidth
                label="Detalle"
                name="detalle"
                value={values.detalle}
                onChange={handleChange}
                optional
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
