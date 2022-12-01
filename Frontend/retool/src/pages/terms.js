import Head from 'next/head';
import NextLink from 'next/link';
import axios from 'axios';
import Router from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, Card, Container, Grid, Link, TextField, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Facebook as FacebookIcon } from '../icons/facebook';
import { Google as GoogleIcon } from '../icons/google';

const terms = () => {


  return (
    <>
      <Head>
        <title>Terminos y condiciones</title>
      </Head>

      <Box
        component="main"
        sx={{
          alignItems: 'center',
          display: 'realtive',
          flexGrow: 1,
          minHeight: '100%',
        }}
      >

        <Container maxWidth="sm">


        <Box sx={{ my: 7 }}>

          <Link href='/'>
            <center><img
            alt="Logo de Retool"
            src="/static/images/logoRetool.png"
            width="200"
            height="200"
            />
            </center>
          </Link>

        </Box>
        <Card sx={{ p: 3 }}>
          <Box sx={{ mb: 3 }}>
            <Typography
              color="textPrimary"
              variant="h4"
            >
              Terminos y condiciones
            </Typography>

            <Typography
              color="textPrimary"
              variant="h8"
            >
              Terminos y condiciones
            </Typography>
            </Box>
        </Card>
        <Typography
              color="textSecondary"
              variant="body2"
            >
              Un vez que Lea los terminos y condiciones, proceda a realizar el registro.
              {' '}
              <NextLink
                href="/register"
              >
                <Link
                  to="/register"
                  variant="subtitle2"
                  underline="hover"
                  sx={{
                    cursor: 'pointer'
                  }}
                >
                  Registrate aquí
                </Link>
              </NextLink>
            </Typography>
        </Container>
      </Box>
    </>
  );
};

export default terms;
