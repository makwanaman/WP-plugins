import React, { useEffect, useState } from "react";
import Image from "next/image";
import Logo from "../../public/logo.svg";
import ArrowRightIcon from "../../public/arrow-right.svg";
import Link from "next/link";
import cookie from "js-cookie";

const Footer = (props) => {
  const todaysDate = new Date();
  const currentYear = todaysDate.getFullYear();
  const [loginState, setLoginState] = useState();

  useEffect(() => {
    let access_token = cookie.get("access_token");
    setLoginState(access_token);
  });
  const [facebook, setFacebook] = useState();
  const [twitter, setTwitter] = useState();
  const [instagram, setinstagram] = useState();
  const [linkedin, setlinkedin] = useState();
  const [email, setEmail] = useState();
  useEffect(() => {
    setFacebook(cookie.get("facebook"));
    setTwitter(cookie.get("twitter"));
    setinstagram(cookie.get("instagram"));
    setlinkedin(cookie.get("linkedin"));
    setEmail(cookie.get("site_email"));
  }, []);
  return (
    <>
      <section className="site-footer">
        <div className="container">
          <div className="row pb-4">
            <div className="col-lg-4">
              <div className="footer-col mob-bdr">
                <div className="footer-logo">
                  <Link href="/">
                    <a className="">
                      <Image alt="" src={Logo} />
                    </a>
                  </Link>
                </div>
                <div className="text-fade footer-text">
                  Free WordPress plugin manager and bulk installation tool!
                </div>
                <div className="mail-info">
                  <p>
                    <span>Contact us: </span>{" "}
                    <a href="mailto:hello@wpfavs.com">
                      {email ? email : "wpfavs@favs.com"}
                    </a>
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="footer-col">
                <div className="footer-hd">General </div>
                <ul className="footer-link">
                  <li>
                    <Link href="/">
                      <a>Home</a>
                    </Link>
                  </li>
                  {loginState || props?.errorMessage === false ? (
                    <li>
                      <Link href="/WPfavs-lists">
                        <a>My Wp Favs</a>
                      </Link>
                    </li>
                  ) : (
                    ""
                  )}

                  <li>
                    <Link href="/categories">
                      <a>Categories</a>
                    </Link>
                  </li>

                  <li>
                    <Link href="/plugin-library">
                      <a>Plugin Lists</a>
                    </Link>
                  </li>

                  <li>
                    <Link href="/blog-articles">
                      <a>Blog</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/blog-snippets">
                      <a>Snippets</a>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="footer-col">
                <div className="footer-hd">Keep up with our weekly WPfavs!</div>
                <p className="text-fade">
                  Subscribe to our weekly newsletter to receive the best WPfavs
                  lists, Plugins and Snippets!
                </p>
                <form className="form-inline hero-form subscribe-form">
                  <input
                    className="form-control"
                    type="email"
                    placeholder="Enter your email"
                  />
                  <button className="btn btn-primary" type="submit">
                    <Image alt="" src={ArrowRightIcon} />
                  </button>
                </form>
              </div>
            </div>
          </div>
          <div className="devider mb-0"></div>
          <div className="row copyright-text pt-4 pb-4">
            <div className="col-lg-4">
              <ul className="footer-link">
                <li>
                  <Link href="/terms-condition">
                    <a>Terms</a>
                  </Link>
                </li>
                <li>
                  <Link href="/privacy_policy">
                    <a>Privacy</a>
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col-lg-4">
              <div className="copyright-text text-fade text-center">
                © {currentYear} &nbsp;WPfavs All Rights Reserved
              </div>
            </div>
            <div className="col-lg-4">
              <div className="social-links">
                <ul>
                  <li>
                    <a href={facebook} target="_blank" without rel="noreferrer">
                      <i className="fa fa-facebook" aria-hidden="true"></i>
                    </a>
                  </li>
                  <li>
                    <a href={instagram} target="_blank" without rel="noreferrer">
                      <i className="fa fa-instagram" aria-hidden="true"></i>
                    </a>
                  </li>
                  <li>
                    <a href={twitter} target="_blank" without rel="noreferrer">
                      <i className="fa fa-twitter" aria-hidden="true"></i>
                    </a>
                  </li>
                  <li>
                    <a href={linkedin} target="_blank" without rel="noreferrer">
                      <i className="fa fa-linkedin" aria-hidden="true"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Footer;
