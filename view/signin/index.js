import React from "react";
import Image from "next/image";
import Link from "next/link";
import SigninForm from "./SigninForm";
import Logo from "../../public/logo.svg";
import SignupImg from "../../public/signup-img.svg";
const SigninPage = (data) => {

  return (
    <>
      <div className="signup-template">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="header-section">
                <nav className="navbar navbar-expand-lg">
                  <Link href="/">
                    <a className="">
                      <Image src={Logo} alt="" />
                    </a>
                  </Link>
                </nav>
              </div>
              <SigninForm />
            </div>
            <div className="col-lg-6">
              <div className="signup-img">
                <Image alt="" src={SignupImg} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SigninPage;
