import React from 'react'
import Image from "next/image";
import Link from "next/link";
import ArrowRightIcon from "../../public/arrow-right.svg";
import MailIcon from "../../public/mail.svg";
import SignupImg from "../../public/signup-img.svg";
import Logo from "../../public/logo.svg";
const NotifyDone = () => {
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
              <div className="signup-tabs">
                <div className="text-center mb-4">
                  <h3>Done!</h3>
                  <p className="text-fade">
                    You'll receive an email to reset your password in the next
                    few minutes
                  </p>
                </div>
                <p className="link text-center mt-4">
                  <Link href="/signup">
                    <a className="btn btn-primary discover-btn back-btn">
                      <span className="arrow-icon">
                        <Image alt="" src={ArrowRightIcon} />
                      </span>
                      &nbsp;&nbsp;Back
                    </a>
                  </Link>
                </p>
              </div>
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

export default NotifyDone