import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Divider,
  FormControlLabel,
  Grid,
  Typography,
  CardMedia,
  CardActions,
} from '@mui/material';
import * as React from 'react';
import { CardActionArea } from '@mui/material';


import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function SimpleAccordion() {
  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Accordion 1</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>Accordion 2</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion disabled>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3a-content"
          id="panel3a-header"
        >
          <Typography>Disabled Accordion</Typography>
        </AccordionSummary>
      </Accordion>
    </div>
  );
}

export const  PostEncuesta = (props) => {
  return (
    <Card sx={{maxWidth: 1000}}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="/static/images/Encuesta.jpg"
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Ayudanos a mejorar nuestros servicios
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Retool se encuentra en constante evolución, por lo que es importante que nos ayudes a mejorar nuestros servicios.
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Leer más</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                con la Encuesta de satisfacción de Retool, nos ayudas a mejorar nuestros servicios. Por favor, responde las siguientes preguntas presentes en el siguiente Link
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Button>

      </CardActions>
    </Card>
  );
}



export const Post = (props) => (
  <Card sx={{ maxWidth: 1000}}>
      <CardMedia
        component="img"
        height="300"
        image="/static/images/Tesla.jpg"
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Historia Vehícular
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lea las principales ventajas de registrar su vehículo en el sistema de Retool.
        </Typography>
      </CardContent>
      <CardActions>
      </CardActions>
    </Card>

);


export const Post2 = (props) => (
  <Card sx={{ maxWidth: 1000}}>
      <CardMedia
        component="img"
        height="400"
        image="/static/images/Tecnomecanica.jpg"
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Revision Tecnomecánica
        </Typography>
        <Typography variant="body2" color="text.secondary">
          la revisión técnico mecánica es un proceso que se realiza a los vehículos para verificar que se encuentren en condiciones de circular por las vías públicas.
        </Typography>
      </CardContent>
      <CardActions>
      </CardActions>
    </Card>

);






