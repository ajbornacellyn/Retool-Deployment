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
  Typography
} from '@mui/material';
import { getInitials } from '../../utils/get-initials';


export const VehicleListResults = ({ vehicles, ...rest }) => {
  const [selectedVehicleIds, setSelectedVehicleIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

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
                  Registration date
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {console.log(vehicles)}
              {vehicles.slice(0, limit).map((vehicle) => (
                <TableRow
                  hover
                  key={vehicle.placa}
                  selected={selectedVehicleIds.indexOf(vehicle.id) !== -1}
                >
                  <TableCell>
                    <Box
                      sx={{
                        alignItems: 'center',
                        display: 'flex'
                      }}
                    >
                      <Avatar
                        src={"/static/images/vehicle.png"}
                        sx={{ mr: 2 }}
                      >
                        {getInitials(vehicle.name)}
                      </Avatar>
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {vehicle.placa}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {vehicle.marca}
                  </TableCell>
                  <TableCell>
                    {vehicle.año}
                  </TableCell>
                  <TableCell>
                    {vehicle.kilometraje}
                  </TableCell>
                  <TableCell>
                    {vehicle.createdAt}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={vehicles.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

VehicleListResults.propTypes = {
  vehicles: PropTypes.array.isRequired
};
