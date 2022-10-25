import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { VehicleListResults } from '../components/vehicle/vehicle-list-results';
import { VehicleListToolbar } from '../components/vehicle/vehicle-list-toolbar';
import { DashboardLayout } from '../components/dashboard-layout';
import { customers } from '../__mocks__/customers';
import axios from "axios";
import { ReactSession } from 'react-client-session';
ReactSession.setStoreType("localStorage");
import { useEffect } from "react";

var vehicles = {};

if (typeof window !== 'undefined') {
    const token = ReactSession.get("token");
    axios
    .get("http://localhost:8000/car/", {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
    .then((res) => {
      console.log(res);
      if (res.data !== "No cars"){
      vehicles = res.data;};
    })
    .catch((err) => {
      console.log(err.response.data.detail);
      if(err.response.data.detail == "Invalid token."){
        ReactSession.remove("token");
        window.location.replace("/Auth");
      };
    });

    // 👉️ can use localStorage here
} else {
    console.log('You are on the server')
    vehicles = {};
    // 👉️ can't use localStorage
}
const Page = () => {

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
