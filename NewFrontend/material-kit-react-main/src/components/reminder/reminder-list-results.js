import { useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { ReactSession } from 'react-client-session';
import axios from "axios";
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  Modal
} from '@mui/material';
import { getInitials } from '../../utils/get-initials';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { ReminderEdit } from '../reminder/reminder-edit';
import * as React from 'react';
import {deleteReminder} from '../../API/reminderPetitions';
import LinearProgress from '@mui/material/LinearProgress';

ReactSession.setStoreType("localStorage");

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

axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  const token = ReactSession.get("token");
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

export const ReminderListResults = ({ reminders, updateReminders, ...rest }) => {
  const [selectedReminder, setSelectedReminder] = useState();
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const editReminder = (reminder) =>{
    setSelectedReminder(reminder);
    handleOpen();
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  function LinearProgressWithLabel(props) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ width: '100%', mr: 1 }}>
          <LinearProgress variant="determinate" {...props} />
        </Box>
        <Box sx={{ minWidth: 35 }}>
          <Typography variant="body2" color="text.secondary">{`${Math.round(
            props.value,
          )}%`}</Typography>
        </Box>
      </Box>
    );
  }

  console.log(reminders);
  if(reminders == "No vehicles") return <div>No hay vehículos</div>;
  if(reminders == "No reminders") return <div>No hay recordatorios</div>;
  return (
    <Card {...rest}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>

                </TableCell>
                <TableCell>
                  Vehiculo
                </TableCell>
                <TableCell>
                  Descripcion
                </TableCell>
                <TableCell>
                  Kilometraje
                </TableCell>
                <TableCell>
                  Fecha
                </TableCell>
                <TableCell>
                  Detalle
                </TableCell>
                <TableCell>

                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reminders.slice(0, limit).map((reminder) => (
                <TableRow
                  hover
                  key={reminder.id}
                >
                  <TableCell>
                    <Box
                      sx={{
                        alignItems: 'center',
                        display: 'flex'
                      }}
                    >
                      <Avatar
                        src={"/static/images/reminder.png"}
                        sx={{ mr: 2 }}
                      >
                        {getInitials(reminder.name)}
                      </Avatar>
                    </Box>
                  </TableCell>
                  <TableCell>
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {reminder.placa}
                      </Typography>
                  </TableCell>
                  <TableCell>
                    {reminder.descripcion}
                  </TableCell>
                  <TableCell>
                    {reminder.kilometraje}
                    <Box sx={{ width: '100%' }}><LinearProgressWithLabel value={reminder.avance} /></Box>
                  </TableCell>
                  <TableCell>
                    {reminder.fecha}
                  </TableCell>
                  <TableCell>
                    {reminder.detalle}
                  </TableCell>
                  <TableCell>
                    <IconButton aria-label="delete" onClick={() => {deleteReminder(reminder,updateReminders);}}>
                      <DeleteIcon />
                    </IconButton>
                    <IconButton aria-label="edit" onClick={() => {editReminder(reminder);}}>
                      <EditIcon />
                    </IconButton>

                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <ReminderEdit handleClose={handleClose} updateReminders={updateReminders} reminder={selectedReminder} />
            </Box>
          </Modal>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={reminders.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

ReminderListResults.propTypes = {
  reminders: PropTypes.array.isRequired
};
