import * as React from 'react';
import Button from '../components/Button';
import Typography from '../components/Typography';
import ProductHeroLayout from './ProductHeroLayout';

const backgroundImage =
  'https://cd-blog-images-prod.s3.us-west-2.amazonaws.com/uploads/2019/10/5daf46bfaae28.jpg';

export default function ProductHero() {
  return (
    <ProductHeroLayout
      sxBackground={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundColor: '#7fc7d9', // Average color of the background image.
        backgroundPosition: 'center',
      }}
    >
      {/* Increase the network loading priority of the background image. */}
      <img
        style={{ display: 'none' }}
        src={backgroundImage}
        alt="increase priority"
      />
      <Typography color="inherit" align="center" variant="h2" marked="center">
        Administra tus vehículos
      </Typography>
      <Typography
        color="inherit"
        align="center"
        variant="h5"
        sx={{ mb: 4, mt: { sx: 4, sm: 10 } }}
      >
        Lleva tu historia vehícular al día y planea el mantenimiento de tus vehículos
      </Typography>
      <Button
        color="primary"
        variant="contained"
        size="large"
        component="a"
        href="/register/"
        sx={{ minWidth: 200 }}
      >
        Registrarse
      </Button>
      <Typography variant="body2" color="inherit" sx={{ mt: 2 }}>
        Es completamente gratis!
      </Typography>
    </ProductHeroLayout>
  );
}
