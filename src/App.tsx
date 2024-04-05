import * as React from 'react';
import { Content } from "./components/Content";
import Footer from "./components/Footer";
import Header from "./components/Header";
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';

export default function AlignItemsList() {
  return (
    <>
      <React.Fragment>
        <CssBaseline />
        <Header></Header>
        <Container fixed maxWidth='lg'>
          <Content />
        </Container>
        <Footer></Footer>
      </React.Fragment>

    </>
  );
}