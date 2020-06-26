import React from 'react';
import App from 'next/app';
import '../scss/pages/app.scss';
import MainLayout from '../layout/main';
import Header from '../components/header';

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <MainLayout>
        <Header />
        <Component {...pageProps} />
      </MainLayout>
    );
  }
}

export default MyApp;
