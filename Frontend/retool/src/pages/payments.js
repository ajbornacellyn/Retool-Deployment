import Head from 'next/head';
import { Box, Container, Typography, Card,Divider,CardContent, CardHeader, Grid,FormControlLabel,Checkbox,} from '@mui/material';
import { DashboardLayout } from '../components/dashboard-layout';
import { SettingsNotifications } from '../components/settings/settings-notifications';
import { SettingsPassword } from '../components/settings/settings-password';

const Page = () => (
  <>
    <Head>
      <title>
        Suscripciones
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth="lg">
        <Typography
          sx={{ mb: 3 }}
          variant="h4"
        >
          Suscripciones
        </Typography>
        <Card>
      <CardHeader
        title="Opciones de pago"
      />
      <Divider />
      <CardContent>
        <Grid
          container
          spacing={6}
          wrap="wrap"
        >
          <Grid
            item
            md={6}
            sm={6}
            sx={{
              display: 'flex',
              flexDirection: 'column'
            }}
            xs={12}
          >
            <Typography
              color="textPrimary"
              gutterBottom
              variant="h6"
              textAlign="center"
            >
              Cuenta normal
            </Typography>
            <Typography
              color="textPrimary"
              gutterBottom
              variant="body1"
              textAlign="center"
            >
              La version de gratis de Retool permite al usuario el uso de la aplicacion y de todas sus herramientas actuales. Sin embargo, en esta version se mostraran anuncios para ayudar a financiar este proyecto
            </Typography>
          </Grid>
          <Grid
            item
            md={6}
            sm={6}
            sx={{
              display: 'flex',
              flexDirection: 'column'
            }}
            xs={12}
          >
            <Typography
              color="textPrimary"
              gutterBottom
              variant="h6"
              textAlign="center"
            >
              Cuenta premium
            </Typography>
            
            <Typography
              color="textPrimary"
              gutterBottom
              variant="body1"
              textAlign="center"
            >
              La version de pago de Retool permite al usuario, por el pago de 10000 pesos colombianos, el uso de la aplicacion sin anuncios. Ademas, este tendra acceso anticipado a nuevas funcionalidades dentro del aplicativo web
            </Typography>
            <a href="https://www.paypal.com/paypalme/ccuaspam" target="_blank" rel="noreferrer">
            <center><img
              alt="Paypal"
              src="/static/images/LogoPaypal.png"
              width="125" 
              height="125"
            />
            </center>
            </a>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
        {/*<SettingsNotifications sx={{width: 1/2}} />
        <SettingsNotifications sx={{width: 1/2, rigth:0}} />*/}
      </Container>
    </Box>
  </>
);

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
