// "use client";
import React, { useEffect } from "react";
// import { AppLayout } from "@/layout/index";
import "../app/globals.css";
import { Provider } from "react-redux";
import type { AppProps } from 'next/app';
import AppLayout from "../components/layout/AppLayout";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from "react-toastify";
import { useSelector } from "react-redux";
import UserService from "../services/users.services";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { logout } from "../redux/reducers/userReducer";
import { store } from "../redux/store/store";
// import { RootState } from "@components/redux/reducers";

function AppWrapper({ Component, pageProps, ...appProps }: AppProps) {
  const user = useSelector((state: any) => state.user);
  const userService = new UserService();
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if(!appProps.router.pathname.includes("/signup")){
      if(!user.token){
        toast.error('login to resume activity!');
        dispatch(logout());
        router.push('/');
        // userService.Logout()
        // .then((res) => {
        //     if(res?.error){
        //         toast.error(res?.error)
        //     }else {
        //     }
        // })
      }
    }
  }, [])

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
