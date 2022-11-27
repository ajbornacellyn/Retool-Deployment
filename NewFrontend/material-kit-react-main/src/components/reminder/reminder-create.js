import { useState } from 'react';
import {createReminder} from '../../API/reminderPetitions';
import {getReminders} from '../../API/reminderPetitions';
import { useEffect } from 'react';
import Router from 'next/router';
import { getTiposRecordatiorios, getEstados} from './data';

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

const tiposRecordatiorios = getTiposRecordatiorios();

const estados = getEstados();

export const ReminderCreate = ({props, vehicles, updateReminders, handleClose}) => {
  const [values, setValues] = useState({
    placa:"",
    id:"",
    descripcion:tiposRecordatiorios[0].value,
    kilometraje:"",
    estado:estados[0].value,
    fecha:"",
    detalle:"",
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
    createReminder(values,updateReminders);
    handleClose();

  }

  if(vehicles == "No cars") return <div>No hay vehiculos</div>;

  return (
    <form
      onSubmit={handleSubmit}
      autoComplete="off"
      {...props}
    >
      <Card>
        <CardHeader
          subheader=""
          title="Crear Recordatorio"
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
                label="Descripcion"
                name="descripcion"
                value={values.descripcion}
                onChange={handleChange}
                select
                SelectProps={{ native: true }}
                variant="outlined"
                required
              >
                {tiposRecordatiorios.map((option) => (
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
