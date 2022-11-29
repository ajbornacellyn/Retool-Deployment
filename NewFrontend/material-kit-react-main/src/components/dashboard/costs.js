import { Bar, Line } from 'react-chartjs-2';
import { Box, Button, Card, CardContent, CardHeader, Divider, useTheme } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import axios from 'axios';
import React from 'react';
import { useState, useEffect } from 'react';

export const Costs = ({props, ...React }) => {

  const theme = useTheme();
  var mantLabels = [];
  var mantLabel2 = [];
  var datos = [];
  var datos2 = [];
  var car1 =""
  var car2 =""


  const token = localStorage.getItem('Token');
  const [Mantenimientos, setMaintenances] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:8000/maintenanceByCar/", {
      headers: {
        "Authorization": `Token ${token}`
      }
    }).then((res) => {
      setMaintenances(res.data);
    })
  }, []);

  console.log(Mantenimientos);
  if(Mantenimientos !== "Not maintenances" && Mantenimientos !== "No cars", Mantenimientos.length > 0){
    var carros = Mantenimientos.map((carro) => carro );
    if(carros.length > 1){
      var MantAuto0 = carros[0].mantenimientos.map((item) => item);
      var MantAuto1 = carros[1].mantenimientos.map((item) => item);
      

      mantLabels = MantAuto1.map((item) => item.fecha);
      datos = MantAuto1.map((item) => item.costo)
      mantLabel2 = MantAuto0.map((item) => item.fecha);
      datos2 = MantAuto0.map((item) => item.costo)
      car1 = MantAuto0.map((item) => item.placa)[0]
      car2 = MantAuto1.map((item) => item.placa)[0]
      }else{
      var MantAuto0 = carros[0].mantenimientos.map((item) => item);
      mantLabels = MantAuto0.map((item) => item.fecha);
      datos = MantAuto0.map((item) => item.costo)
      car1 = MantAuto0.map((item) => item.placa)[0]
    }
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
        label:"Placa "+  car1,  
        maxBarThickness: 10,
      },
      {
        backgroundColor: '#EEEEEE',
        barPercentage: 0.5,
        barThickness: 12,
        borderRadius: 4,
        categoryPercentage: 0.5,
        data: datos2,
        label: "Placa "+car2,
        maxBarThickness: 10,
      }
    ],
    labels: [mantLabels]
    
  };

  const options = {
    animation: true,
    cornerRadius: 20,
    layout: { padding: 0 },
    legend: { display: false },
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      y: {
        title: {
          display: true,
          text: 'Costo$'
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
        action={(
          <Button
            endIcon={<ArrowDropDownIcon fontSize="small" />}
            size="small"
          >
            Last 7 days
          </Button>
        )}
        title="Costos de Mantenimientos realizados"
      />
      <Divider />
      <CardContent>
        <Box
          sx={{
            height: 400,
            position: 'relative'
          }}
        >
          <Bar
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
        <Button
          color="primary"
          endIcon={<ArrowRightIcon fontSize="small" />}
          size="small"
        >
          Overview
        </Button>
      </Box>
      <Divider />
      <Box>
        <iframe src="https://www.google.com/maps/d/u/0/embed?mid=138qrKF6sP7174kI5urB-lcEr097fyBk&ehbc=2E312F" width="640" height="480"></iframe>
      </Box>
    </Card>
  );
};
