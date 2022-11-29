import { Doughnut } from 'react-chartjs-2';
import { Box, Card, CardContent, CardHeader, Divider, Typography, useTheme } from '@mui/material';
import LaptopMacIcon from '@mui/icons-material/LaptopMac';
import PhoneIcon from '@mui/icons-material/Phone';
import TabletIcon from '@mui/icons-material/Tablet';
import { useState, useEffect, Component } from 'react';
import axios from 'axios';

// funcion que retorna el procentaje de aparicion de acada elemento en un array
const getPercentage = (array) => {
  let count = {};
  let percentage = {};
  array.forEach((element) => {
    count[element] = count[element] ? count[element] + 1 : 1;
  });
  for (let key in count) {
    percentage[key] = (count[key] / array.length) * 100;
  }
  return percentage;

};

export const TrafficByDevice = () => {

  const token = localStorage.getItem('Token');
  const [Mantenimientos, setMaintenances] = useState([]);
  const [dataTipo, setData] = useState({});
  var  valores = {};
  var tipos = []
  var porcentaje = []

  useEffect(() => {
    axios.get("http://localhost:8000/maintenanceByCar/", {
      headers: {
        "Authorization": `Token ${token}`
      }
    }).then((res) => {
      setData(res.data);
      }
    )
  }
  , []);
 


  const theme = useTheme();
  console.log("dataTipo");
  console.log(dataTipo)
  if(dataTipo !== "Not maintenances" && dataTipo !== "No cars", dataTipo.length > 0){
    var datos = dataTipo[0].mantenimientos.map((item) => item.tipo);
    valores = getPercentage(datos);
  }
  console.log(valores.keys);
  // se obtienen las key del objeto valores
  for (let key in valores) {
    tipos.push(key);
  }
  for (let key in valores) {
    porcentaje.push(valores[key]);
  }
  

  const data = {
    datasets: [
      {
        data: porcentaje,
        backgroundColor: ['#3F51B5', '#e53935', '#FB8C00'],
        borderWidth: 8,
        borderColor: '#FFFFFF',
        hoverBorderColor: '#FFFFFF'
      }
    ],
    labels: tipos
  };

  const options = {
    animation: false,
    cutoutPercentage: 80,
    layout: { padding: 0 },
    legend: {
      display: false
    },
    maintainAspectRatio: false,
    responsive: true,
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

  var allData = [];
  for(let key in valores) {
    let dato = {
      title: key,
      value: valores[key],
      icon: LaptopMacIcon,
      color: '#3F51B5'
    }
    allData.push(dato);
  }

  const devices = allData

  return (
    <Card >
      <CardHeader title="Traffic by Device" />
      <Divider />
      <CardContent>
        <Box
          sx={{
            height: 300,
            position: 'relative'
          }}
        >
          <Doughnut
            data={data}
            options={options}
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            pt: 2
          }}
        >
          {devices.map(({
            color,
            icon: Icon,
            title,
            value
          }) => (
            <Box
              key={title}
              sx={{
                p: 1,
                textAlign: 'center'
              }}
            >
              <Icon color="action" />
              <Typography
                color="textPrimary"
                variant="body1"
              >
                {title}
              </Typography>
              <Typography
                style={{ color }}
                variant="h4"
              >
                {value}
                %
              </Typography>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};
