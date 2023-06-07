import React from "react";
import Link from "next/link";
import Image from "next/image";
import AddIcon from "../../public/add-icon.svg";
import Logo from "../../public/logo.svg";
const ProfileHeader = () => {
  return (
    <>
      <div className="header-section">
        <div className="container">
          <nav className="navbar navbar-expand-lg">
            <Link href="/">
              <a className="logo">
                <Image src={Logo} alt="" />
              </a>
            </Link>

            <button
              className="navbar-toggler mobile-toggle"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div
              className="main-menu collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav m-auto">
                <li className="nav-item">
                  <Link href="/plugin-library">
                    <a> Explorer Plugins</a>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/categories">
                    <a> Categories</a>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/my-seo-list">
                    <a> Plugin Lists</a>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/blog-articles">
                    <a> Blog</a>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/blog-snippets">
                    <a> Snippets</a>
                  </Link>
                </li>
              </ul>
              <ul className="navbar-nav ml-auto login-list">
                <li className="nav-item">
                  <Link href="/">
                    <a className="btn btn-primary">
                      <span className="add-icon">
                        <Image src={AddIcon} alt="" />
                      </span>
                      &nbsp; Create Lists
                    </a>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/">
                    <a className="btn border-bg login-btn">Profile</a>
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};

export default ProfileHeader;
