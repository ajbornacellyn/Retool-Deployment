import { useState } from 'react';
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
import { editMaintenance } from '../../API/maintenancePetitions';
import Router from 'next/router';
import { getTiposServicios, getEstados} from './data';


const tiposServicios = getTiposServicios();

const estados = getEstados();

export const MaintenanceEdit = ({maintenance, updateMaintenances, handleClose, props}) => {
  const [values, setValues] = useState({
    placa:maintenance.placa,
    id:maintenance.id,
    servicio:maintenance.servicio,
    descripcion:maintenance.descripcion,
    kilometraje:maintenance.kilometraje,
    estado:maintenance.estado,
    fecha:maintenance.fecha,
    costo:maintenance.costo,
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = (e) =>{
    e.preventDefault();
    editMaintenance(values,updateMaintenances);
    handleClose();
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
          title="Editar Mantenimiento"
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
            Guardar
          </Button>
        </Box>
      </Card>
    </form>
  );
};
