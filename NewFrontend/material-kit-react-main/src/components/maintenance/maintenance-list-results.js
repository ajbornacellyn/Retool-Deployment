import { useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
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

export const MaintenanceListResults = ({ maintenances, ...rest }) => {
  const [selectedMaintenance, setSelectedMaintenance] = useState();
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const deleteMaintenance = (maintenance) =>{
    alert(maintenance.placa);

  };

  const editMaintenance = (maintenance) =>{
    setSelectedMaintenance(maintenance);
    handleOpen();

  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => { setOpen(true);};
  const handleClose = () => setOpen(false);


  if(maintenances.length === undefined) return <div>No hay mantenimientos registrados.</div>;
  return (
    <Card {...rest}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Placa
                </TableCell>
                <TableCell>
                  Marca
                </TableCell>
                <TableCell>
                  Modelo
                </TableCell>
                <TableCell>
                  Kilometraje
                </TableCell>
                <TableCell>

                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {console.log("maintenancessss")}
              {console.log(maintenances)}
              {maintenances.slice(0, limit).map((maintenance) => (
                <TableRow
                  hover
                  key={maintenance.placa}
                >
                  <TableCell>
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {maintenance.placa}
                      </Typography>
                  </TableCell>
                  <TableCell>
                    {maintenance.marca}
                  </TableCell>
                  <TableCell>
                    {maintenance.modelo}
                  </TableCell>
                  <TableCell>
                    {maintenance.kilometraje}
                  </TableCell>
                  <TableCell>
                    <IconButton aria-label="delete" onClick={() => {deleteMaintenance(maintenance);}}>
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
              <MaintenanceEdit maintenance={selectedMaintenance} />
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
