import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { ReminderListResults } from '../components/reminder/reminder-list-results';
import { ReminderListToolbar } from '../components/reminder/reminder-list-toolbar';
import { DashboardLayout } from '../components/dashboard-layout-data';
import { useEffect, useState } from 'react';
import {getReminders} from '../API/carPetitions';

/* eslint react/no-children-prop: 0 */

const Page = ({vehicles, reminders, updateVehicles}) => {
  console.log('');
    return(
    <>
      <Head>
        <title>
          Recordatorios
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
          <ReminderListToolbar updateReminders={updateVehicles} vehicles={vehicles}/>
          <Box sx={{ mt: 3 }}>
            <ReminderListResults updateReminders={updateVehicles} reminders={reminders} />
          </Box>
        </Container>
      </Box>
    </>
    );
};


const App = () => <DashboardLayout children={Page} />


export default App;
