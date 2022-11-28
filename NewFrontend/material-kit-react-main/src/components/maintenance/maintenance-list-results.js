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
import { MaintenanceEdit } from '../maintenance/maintenance-edit';
import * as React from 'react';
import {deleteMaintenance} from '../../API/maintenancePetitions';

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

export const MaintenanceListResults = ({ maintenances, updateMaintenances, ...rest }) => {
  const [selectedMaintenance, setSelectedMaintenance] = useState();
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const editMaintenance = (maintenance) =>{
    setSelectedMaintenance(maintenance);
    handleOpen();
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  console.log(maintenances);
  if(maintenances == "No vehicles") return <div>No hay vehiculos</div>;
  if(maintenances == "No maintenances") return <div>No hay mantenimientos</div>;
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
                  Servicio
                </TableCell>
                <TableCell>
                  Fecha
                </TableCell>
                <TableCell>
                  Costo
                </TableCell>
                <TableCell>
                  Kilometraje
                </TableCell>
                <TableCell>
                  Estado
                </TableCell>
                <TableCell>

                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {maintenances.slice(0, limit).map((maintenance) => (
                <TableRow
                  hover
                  key={maintenance.id}
                >
                  <TableCell>
                    <Box
                      sx={{
                        alignItems: 'center',
                        display: 'flex'
                      }}
                    >
                      <Avatar
                        src={"/static/images/maintenance.png"}
                        sx={{ mr: 2 }}
                      >
                        {getInitials(maintenance.name)}
                      </Avatar>
                    </Box>
                  </TableCell>
                  <TableCell>
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {maintenance.placa}
                      </Typography>
                  </TableCell>
                  <TableCell>
                    {maintenance.servicio}
                  </TableCell>
                  <TableCell>
                    {maintenance.fecha}
                  </TableCell>
                  <TableCell>
                    {maintenance.costo}
                  </TableCell>
                  <TableCell>
                    {maintenance.kilometraje}
                  </TableCell>
                  <TableCell>
                    {maintenance.estado}
                  </TableCell>
                  <TableCell>
                    <IconButton aria-label="delete" onClick={() => {deleteMaintenance(maintenance,updateMaintenances);}}>
                      <DeleteIcon />
                    </IconButton>
                    <IconButton aria-label="edit" onClick={() => {editMaintenance(maintenance);}}>
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
              <MaintenanceEdit handleClose={handleClose} updateMaintenances={updateMaintenances} maintenance={selectedMaintenance} />
            </Box>
          </Modal>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={maintenances.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

MaintenanceListResults.propTypes = {
  maintenances: PropTypes.array.isRequired
};
