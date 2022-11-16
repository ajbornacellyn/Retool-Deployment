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
import { WorkshopEdit } from '../workshop/workshop-edit';
import {deleteWorkshop } from '../../API/workshopPetitions';
import * as React from 'react';
import Router from 'next/router';
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

export const WorkshopListResults = ({ workshops, ...rest }) => {
  const [selectedWorkshop, setSelectedWorkshop] = useState();
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  
  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const deleteWorkshop = (workshop) =>{
    deleteWorkshop(workshop.id)
  };

  const editWorkshop = (workshop) =>{
    setSelectedWorkshop(workshop);
    handleOpen();

  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => { setOpen(true);};
  const handleClose = () => setOpen(false);
  if(workshops !== "Not workshops" && workshops !== "No cars" && workshops.length>0){
    return (
      <Card {...rest}>
        <PerfectScrollbar>
          <Box sx={{ minWidth: 1050 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    Nombre clave del taller
                  </TableCell>
                  <TableCell>
                    Nombre de taller
                  </TableCell>
                  <TableCell>
                    Direccion de taller
                  </TableCell>
                  <TableCell>
                    Numero de contacto de taller
                  </TableCell>
                  <TableCell>
                    Correo de contacto de taller
                  </TableCell>
                  <TableCell>
                    Ciudad de ubicacion del taller
                  </TableCell>
                  <TableCell>  
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {workshops.slice(0, limit).map((workshop) => (
                  <TableRow
                    hover
                    key={workshop.tallerNombreClave}
                  >
                    <TableCell>
                        <Typography
                          color="textPrimary"
                          variant="body1"
                        >
                          {workshop.tallerNombreClave}
                        </Typography>
                    </TableCell>
                    <TableCell>
                      {workshop.tallerNombre}
                    </TableCell>
                    <TableCell>
                      {workshop.tallerDireccion}
                    </TableCell>
                    <TableCell>
                      {workshop.tallerTelefono}
                    </TableCell>
                    <TableCell>
                      {workshop.tallerCorreo}
                    </TableCell>
                    <TableCell>
                      {workshop.tallerCiudad}
                    </TableCell>
                    <TableCell>
                      <IconButton aria-label="delete" onClick={() => {deleteWorkshops(workshop);}}>
                        <DeleteIcon />
                      </IconButton>
                      <IconButton aria-label="edit" onClick={() => {editWorkshop(workshop);}}>
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
                <WorkshopEdit workshop={selectedWorkshop} />
              </Box>
            </Modal>
          </Box>
        </PerfectScrollbar>
        <TablePagination
          component="div"
          count={workshops.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </Card>
    );
  }else{
    return <div>No hay talleres registrados.</div>;
    
  }
};

WorkshopListResults.propTypes = {
  workshops: PropTypes.array.isRequired
};
