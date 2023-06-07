import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "../styles/globals.css";
import "../styles/colortheme.css";
import "../styles/static.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Head from "next/head";
import { SessionProvider } from "next-auth/react";
import axios from "axios";
import cookie from "js-cookie";
function MyApp({ Component, pageProps: { session, ...pageProps }, data }) {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.js");
    import("jquery/dist/jquery.js");
    import("popper.js/dist/umd/popper.js");
  }, []);

  const [homeSetting, setHomeSetting] = useState();

  return (
    <>
      <ToastContainer />
      <Head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        ></link>
      </Head>
      <SessionProvider session={session}>
        <Component {...pageProps} homeSetting={homeSetting} />
      </SessionProvider>
    </>
  );
}

export default MyApp;
