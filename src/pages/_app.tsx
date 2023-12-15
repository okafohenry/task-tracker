// "use client";
import React, { useEffect } from "react";
// import { AppLayout } from "@/layout/index";
import "../app/globals.css";
import { Provider } from "react-redux";
import type { AppProps } from 'next/app'
import { store } from "../redux/store/store";
import AppLayout from "../components/layout/AppLayout";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";

function AppWrapper({ Component, pageProps, ...appProps }: AppProps) {


  const isLayoutNeeded = appProps.router.pathname.includes("/auth");

  const LayoutWrapper = isLayoutNeeded ? AppLayout : React.Fragment;

  return (
    <LayoutWrapper>
      <Component {...pageProps} />
      <ToastContainer />
    </LayoutWrapper>
  );
}


function App({ Component, pageProps, ...appProps }: AppProps) {
  return (
    <Provider store={store}>
      <AppWrapper Component={Component} pageProps={pageProps} {...appProps} />
    </Provider>
  );
}

export default App;
