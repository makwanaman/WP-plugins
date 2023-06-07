import React from 'react'
import Image from "next/image";
import Link from "next/link";
import SignupImg from "../../public/signup-img.svg";
import Logo from "../../public/logo.svg";
import ForgotPasswordForm from './ForgotPasswordForm';
const forgotTemplate = () => {
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
            </div>
          </div>
          <div className="row row-content">
            <div className="col-lg-6">
              <ForgotPasswordForm />
            </div>
            <div className="col-lg-6">
              <div className="signup-img notify-img">
                <Image alt="" src={SignupImg} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default forgotTemplate