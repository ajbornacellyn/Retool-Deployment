import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Container,
  TextField,
  FormHelperText,
  InputAdornment,
  SvgIcon, 
  Typography,
  Link,
  Modal
} from '@mui/material';
import { Search as SearchIcon } from '../../icons/search';
import * as React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import NextLink from 'next/link';
import Router from 'next/router';
import { ReminderCreate } from '../reminder/reminder-create';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export const ReminderListToolbar = ({vehicles, updateReminders, props}) => {
  
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
  <Box {...props}>
    <Box
      sx={{
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        m: -1
      }}
    >
      <Typography
        sx={{ m: 1 }}
        variant="h4"
      >
        Recordatorios
      </Typography>
      <Box sx={{ m: 1 }}>
        <Button onClick={handleOpen}
          color="primary"
          variant="contained"
        >
          Crear Recordatorio
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <ReminderCreate vehicles={vehicles} updateReminders={updateReminders} handleClose={handleClose}/>
          </Box>
        </Modal>
      </Box>
    </Box>
  </Box>
  );
};
