import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { VehicleListResults } from '../components/vehicle/vehicle-list-results';
import { VehicleListToolbar } from '../components/vehicle/vehicle-list-toolbar';
import { DashboardLayout } from '../components/dashboard-layout';
import { customers } from '../__mocks__/customers';
import axios from "axios";
import { useEffect, useState } from 'react';



const Page = () => {
  const token = localStorage.getItem('Token');
  const [vehicles, setVehicles] = useState([]);
  useEffect(() => {
      axios
    .get("http://localhost:8000/car/", {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
    .then((res) => { 
    if (res.data !== "No cars"){
      setVehicles(res.data);}; 
  })}, []);
    
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
          <VehicleListToolbar />
          <Box sx={{ mt: 3 }}>
            <VehicleListResults vehicles={vehicles} />
          </Box>
        </Container>
      </Box>
    </>
    );
};
Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);
export default Page;
