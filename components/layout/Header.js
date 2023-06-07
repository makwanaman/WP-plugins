import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import AddIcon from "../../public/add-icon.svg";
import Logo from "../../public/logo.svg";
import { toast } from "react-toastify";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import Loader from "../../components/Loader";
import cookie from "js-cookie";
const Header = (data) => {
  //for login or logout state
  const [logstate, setLogstate] = useState("");
  const [userName, setUserName] = useState("");
  const [loaderState, setLoaderState] = useState(false);
  const router = useRouter();

  //logout function
  const logoutFunction = () => {
    setLoaderState(true);
    let accesstoken = cookie.get("access_token");

    var myHeaders = new Headers();
    myHeaders.append("Authorization", accesstoken);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/logout`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        toast.success(result.message);

        cookie.remove("access_token");
        let socialLogin = cookie.get("social");

        setLogstate("login");

        if (socialLogin != null) {
          signOut(socialLogin);
        }
        cookie.remove("social");

        cookie.remove("userName");
        setLoaderState(false);

        router.push("/");

        if (data?.errorMessage === false) {
          data?.setErrorMessage(true);
          data?.setWpListShow(true);
        }
      })
      .catch((error) => {
        setLoaderState(false);
        toast.error("error");
      });
  };

  useEffect(() => {
    let access_token = cookie.get("access_token");

    let username = cookie.get("userName");
    if (!access_token) {
      setLogstate("login");
      setUserName("login");
    } else {
      setUserName(username);
      setLogstate("logout");
    }
  }, []);

  const createListFunction = () => {
    let access_token = cookie.get("access_token");
    if (!access_token) {
      router.push("/signin");
    } else {
      router.push("/new-WPfavs");
    }
  };

  const profilePageFunction = () => {
    let access_token = cookie.get("access_token");
    if (!access_token) {
      router.push("/signin");
    } else {
      router.push(`/profile-view`);
    }
  };

  return (
    <>
      <div className="header-section">
        {loaderState === true ? (
          <div className="loader-box">
            <Loader />
          </div>
        ) : (
          ""
        )}
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
                {logstate === "login" ? (
                  ""
                ) : (
                  <li className="nav-item">
                    <Link href="/WPfavs-lists">
                      <a> My Wp Favs</a>
                    </Link>
                  </li>
                )}
                <li className="nav-item">
                  <Link href="/categories">
                    <a> Categories</a>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/plugin-library">
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
                <li className="nav-item mr-2">
                  <button
                    className="btn btn-primary"
                    onClick={createListFunction}
                  >
                    <span className="add-icon">
                      <Image src={AddIcon} alt="" />
                    </span>
                    &nbsp; Create List
                  </button>
                </li>
                {logstate !== "login" ? (
                  <div className="dropdown">
                    <button
                      className="dropdown-toggle login-btn-outer localStorageData "
                      type="button"
                      id="dropdownMenuButton"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      {userName}
                    </button>
                    <div
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenuButton"
                    >
                      {/* <Link
                        className="btn border-bg dropdown-item"
                        href="/profile-view"
                      > */}
                      <button
                        className="btn  dropdown-item"
                        onClick={profilePageFunction}
                      >
                        Profile View{" "}
                      </button>
                      {/* </Link> */}
                      <button
                        className="btn dropdown-item"
                        onClick={logoutFunction}
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                ) : (
                  <Link href="/signup">
                    <a
                      className="justify-content-center login-btn-outer btn text-white"
                      style={{ color: "white !important" }}
                    >
                      LogIn
                    </a>
                  </Link>
                )}
              </ul>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Header;
