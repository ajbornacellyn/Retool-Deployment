import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { AuthGuard } from './auth-guard';
import { DashboardNavbar } from './dashboard-navbar';
import { DashboardSidebar } from './dashboard-sidebar';
import { ValidateSession } from '../components/session';
import { useEffect, useState } from 'react';
import { getVehicles } from '../API/carPetitions';
import { getReminders } from '../API/reminderPetitions';

const DashboardLayoutRoot = styled('div')(({ theme }) => ({
  display: 'flex',
  flex: '1 1 auto',
  maxWidth: '100%',
  paddingTop: 64,
  [theme.breakpoints.up('lg')]: {
    paddingLeft: 280
  }
}));

export const DashboardLayout = ({children}) => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  
  const [vehicles, setVehicles] = useState([]);
  const [reminders, setReminders] = useState([]);
  const updateVehicles = () => {getVehicles(setVehicles); getReminders(setReminders);};
  useEffect(() => {getVehicles(setVehicles); getReminders(setReminders);}, []);

  if (ValidateSession()){
  return (
    <AuthGuard>
      <DashboardLayoutRoot>
        <Box
          sx={{
            display: 'flex',
            flex: '1 1 auto',
            flexDirection: 'column',
            width: '100%'
          }}
        >
          {children({vehicles:vehicles, reminders:reminders, updateVehicles:updateVehicles})}
        </Box>
      </DashboardLayoutRoot>
      <DashboardNavbar vehicles={vehicles} updateVehicles={updateVehicles} onSidebarOpen={() => setSidebarOpen(true)} />
      <DashboardSidebar
        onClose={() => setSidebarOpen(false)}
        open={isSidebarOpen}
      />
    </AuthGuard>
  );
}
};
