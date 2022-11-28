import * as React from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '../components/Typography';

const item = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  px: 5,
};

function ProductValues() {
  return (
    <Box
      component="section"
      sx={{ display: 'flex', overflow: 'hidden', bgcolor: 'secondary.light' }}
    >
      <Container sx={{ mt: 15, mb: 30, display: 'flex', position: 'relative' }}>
        <Box
          component="img"
          src="/static/themes/onepirate/productCurvyLines.png"
          alt="curvy lines"
          sx={{ pointerEvents: 'none', position: 'absolute', top: -180 }}
        />
        <Grid container spacing={5}>
          <Grid item xs={12} md={4}>
            <Box sx={item}>
              <Box
                component="img"
                src="/static/themes/onepirate/vehicle.svg"
                alt="suitcase"
                sx={{ height: 55 }}
              />
              <Typography variant="h6" sx={{ my: 5 }}>
                Vehículos
              </Typography>
              <Typography variant="h5" align="center">
                Registra todos tus vehículos. Sin limite por usuario.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={item}>
              <Box
                component="img"
                src="/static/themes/onepirate/maintenance.svg"
                alt="graph"
                sx={{ height: 55 }}
              />
              <Typography variant="h6" sx={{ my: 5 }}>
                Mantenimientos
              </Typography>
              <Typography variant="h5" align="center">
                Crea y administra los mantenimientos para tus vehículos registrados.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={item}>
              <Box
                component="img"
                src="/static/themes/onepirate/reminder.svg"
                alt="clock"
                sx={{ height: 55 }}
              />
              <Typography variant="h6" sx={{ my: 5 }}>
                Recordatorios
              </Typography>
              <Typography variant="h5" align="center">
                Genera recordarios para no dejar olvidar los mantenimientos por realizar.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default ProductValues;
