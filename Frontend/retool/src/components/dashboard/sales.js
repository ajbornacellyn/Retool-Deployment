import { Bar, Line } from 'react-chartjs-2';
import { Box, Button, Card, CardContent, CardHeader, Divider, useTheme } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import axios from 'axios';
import React from 'react';
import { useState, useEffect } from 'react';

export const Sales = ({props, ...React }) => {

  const theme = useTheme();
  var mantLabels = [];
  var datos = [];

  const token = localStorage.getItem('Token');
  const [Mantenimientos, setMaintenances] = useState([]);
  useEffect(() => {
      axios
    .get("https://retool-production.up.railway.app/maintenance/", {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
    .then((res) => {
    if (res.data.message === "OK"){
      setMaintenances(res.data.Maintenances);};
  })

  }, []);

  if(Mantenimientos !== "No maintenances" && Mantenimientos !== "No vehicles" && Mantenimientos.length>0){
    mantLabels = Mantenimientos.map((item) => item.fecha)
    datos = Mantenimientos.map((item) => item.kilometraje)
  }

  const data = {
    datasets: [
      {
        backgroundColor: '#3F51B5',
        barPercentage: 0.5,
        barThickness: 12,
        borderRadius: 4,
        categoryPercentage: 0.5,
        data: datos,
        label: 'Mantenimiento',
        maxBarThickness: 10
      }
    ],
    labels: mantLabels
  };

  const options = {
    animation: false,
    cornerRadius: 20,
    layout: { padding: 0 },
    legend: { display: false },
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      y: {
        title: {
          display: true,
          text: 'Kilometraje'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Fecha'
        },
      },
    },
    xAxes: [
      {
        ticks: {
          fontColor: theme.palette.text.secondary
        },
        gridLines: {
          display: false,
          drawBorder: false
        }
      }
    ],
    yAxes: [


      {
        ticks: {
          fontColor: theme.palette.text.secondary,
          beginAtZero: true,
          min: 0
        },
        gridLines: {
          borderDash: [2],
          borderDashOffset: [2],
          color: theme.palette.divider,
          drawBorder: false,
          zeroLineBorderDash: [2],
          zeroLineBorderDashOffset: [2],
          zeroLineColor: theme.palette.divider
        }
      }
    ],
    tooltips: {
      backgroundColor: theme.palette.background.paper,
      bodyFontColor: theme.palette.text.secondary,
      borderColor: theme.palette.divider,
      borderWidth: 1,
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      intersect: false,
      mode: 'index',
      titleFontColor: theme.palette.text.primary
    }
  };

  return (
    <Card {...props}>
      <CardHeader
        title="Mantenimientos realizados"
      />
      <Divider />
      <CardContent>
        <Box
          sx={{
            height: 400,
            position: 'relative'
          }}
        >
          <Line
            data={data}
            options={options}
          />
        </Box>
      </CardContent>
      <Divider />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          p: 2
        }}
      >
      </Box>
    </Card>
  );
};
