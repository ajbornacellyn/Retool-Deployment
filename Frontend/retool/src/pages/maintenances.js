import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { MaintenanceListResults } from '../components/maintenance/maintenance-list-results';
import { MaintenanceListToolbar } from '../components/maintenance/maintenance-list-toolbar';
import { DashboardLayout } from '../components/dashboard-layout-data';
import { useEffect, useState } from 'react';
import {getMaintenances} from '../API/carPetitions';



const Page = ({vehicles, maintenances, updateVehicles}) => {
  console.log('');
    return(
    <>
      <Head>
        <title>
          Mantenimientos
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
          <MaintenanceListToolbar updateMaintenances={updateVehicles} vehicles={vehicles}/>
          <Box sx={{ mt: 3 }}>
            <MaintenanceListResults updateMaintenances={updateVehicles} maintenances={maintenances} />
          </Box>
        </Container>
      </Box>
    </>
    );
};


const App = () => <DashboardLayout children={Page} />


export default App;
