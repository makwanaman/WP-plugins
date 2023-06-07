import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
const Main = ({ children }) => {
  return (
    <div>
      <Header
        errorMessage={children?.props?.errorMessage}
        setErrorMessage={children?.props?.setErrorMessage}
        wpListShow={children?.props?.wpListShow}
        setWpListShow={children?.props?.setWpListShow}
      />
      <main>{children}</main>
      <Footer errorMessage={children?.props?.errorMessage} />
    </div>
  );
};

export default Main;
