import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { MaintenanceListResults } from '../components/maintenance/maintenance-list-results';
import { MaintenanceListToolbar } from '../components/maintenance/maintenance-list-toolbar';
import { DashboardLayout } from '../components/dashboard-layout';
import { customers } from '../__mocks__/customers';
import axios from "axios";
import { ReactSession } from 'react-client-session';
ReactSession.setStoreType("localStorage");
import { useEffect } from "react";

var maintenances = {};

if (typeof window !== 'undefined') {
    const token = ReactSession.get("token");
    axios
    .get("http://localhost:8000/maintenance/", {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
    .then((res) => {
      if (res.data !== "No maintenances"){
      maintenances = res.data;};
    })
    .catch((err) => {});

    // 👉️ can use localStorage here
} else {
    console.log('You are on the server')
    maintenances = {};
    // 👉️ can't use localStorage
}
const Page = () => {
  if (!ReactSession.get("token")){
    window.location.replace("/Auth");
  } else {
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
          <MaintenanceListToolbar />
          <Box sx={{ mt: 3 }}>
            <MaintenanceListResults maintenances={maintenances} />
          </Box>
        </Container>
      </Box>
    </>
    );
  };
};
Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);
export default Page;
