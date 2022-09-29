import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';

import AddCircleIcon from '@mui/icons-material/AddCircle';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import CarCrashIcon from '@mui/icons-material/CarCrash';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';


export default function SimpleBottomNavigation() {
  const [value, setValue] = React.useState(0);

  document.body.style.backgroundColor = "red";
  
  return (
    <Box sx={{ width: 1500 }}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction label="Mi auto" icon={<DirectionsCarIcon />} />

        <BottomNavigationAction label="Mantenimientos pendientes" icon={<CarCrashIcon />} />

        <BottomNavigationAction label="Historial de mantenimientos" icon={<ContentPasteIcon />} />

        <BottomNavigationAction label="Registrar mantenimiento" icon={<AddCircleIcon />} />

      </BottomNavigation>
    </Box>
  );
}
