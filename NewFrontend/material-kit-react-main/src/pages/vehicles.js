import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { VehicleListResults } from '../components/vehicle/vehicle-list-results';
import { VehicleListToolbar } from '../components/vehicle/vehicle-list-toolbar';
import { DashboardLayout } from '../components/dashboard-layout-data';
import { useEffect, useState } from 'react';
import {getVehicles} from '../API/carPetitions';



const Page = ({vehicles, updateVehicles}) => {
  console.log('');
    return(
    <>
      <Head>
        <title>
          Vehículos
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth={false}>
          <VehicleListToolbar updateVehicles={updateVehicles} />
          <Box sx={{ mt: 3 }}>
            <VehicleListResults updateVehicles={updateVehicles} vehicles={vehicles} />
          </Box>
        </Container>
      </Box>
    </>
    );
};


const App = () => <DashboardLayout children={Page} />


export default App;
