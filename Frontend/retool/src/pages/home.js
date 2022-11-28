import * as React from 'react';
import AppFooter from '../components/home/modules/views/AppFooter';
import ProductHero from '../components/home/modules/views/ProductHero';
import ProductValues from '../components/home/modules/views/ProductValues';
import ProductCTA from '../components/home/modules/views/ProductCTA';
import AppAppBar from '../components/home/modules/views/AppAppBar';
import withRoot from '../components/home/modules/withRoot';

function Index() {
  return (
    <React.Fragment>
      <AppAppBar />
      <ProductHero />
      <ProductValues />
      <ProductCTA />
      <AppFooter />
    </React.Fragment>
  );
}

export default withRoot(Index);
