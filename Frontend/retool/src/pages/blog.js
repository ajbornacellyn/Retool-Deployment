import Head from 'next/head';
import { Box, Container, Typography } from '@mui/material';
import { DashboardLayout } from '../components/dashboard-layout';
import { Post, Post2,PostEncuesta } from '../components/settings/settings-notifications copy';

const Page = () => (
  <>
    <Head>
      <title>
        Blog
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
        backgroundColor: 'background.default',
        minHeight: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '0 20px',
      }}
    >
      <Container fixed>

        <Typography
          sx={{ mb: 3 }}
          variant="h1"

        >
          Blog
        </Typography>

        <PostEncuesta />
        <Post />
        <Post2 />

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

