import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '../components/Button';
import Link from '@mui/material/Link';
import AppBar from '../components/AppBar';
import Toolbar from '../components/Toolbar';

const rightLink = {
  fontSize: 16,
  color: 'common.white',
  ml: 3,
};

function AppAppBar() {
  return (
    <div>
      <AppBar position="fixed">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ flex: 1 }} />
          <Link
            variant="h6"
            underline="none"
            color="secondary"
            href="/"
            sx={{ fontSize: 24 }}
          >
            {'Re'}
          </Link>
          <Link
            variant="h6"
            underline="none"
            color="inherit"
            href="/"
            sx={{ fontSize: 24 }}
          >
            {'Tool'}
          </Link>
          <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
            <Link
              color="inherit"
              variant="h6"
              underline="none"
              href="/login/"
              sx={rightLink}
            >
              {'Ingresar'}
            </Link>
            <Link
              color="primary"
              variant="h6"
              underline="primary"
              href="/register/"
              sx={{ ...rightLink, color: 'secondary.main' }}
            >
              {'Registrarse'}
            </Link>
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </div>
  );
}

export default AppAppBar;
