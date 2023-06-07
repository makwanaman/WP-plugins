import React, { useState } from "react";

import Image from "next/image";
import ProfileIcon from "../../public/profile-img-icon.svg";
import UserIcon from "../../public/user-icon-gray.svg";
import UserIconBlue from "../../public/user-icon.svg";
import APIkeyIcon from "../../public/apikey-icon.svg";
import APIkeyIconBlue from "../../public/apikey-icon-blue.svg";
import DatabaseIcon from "../../public/database-icon.svg";
import DatabaseIconBlue from "../../public/database-icon-blue.svg";
import SendIcon from "../../public/send-icon.svg";
import SendIconBlue from "../../public/send-icon-blue.svg";
import UsersIcon from "../../public/users-icon.svg";
import UsersIconBlue from "../../public/users-icon-blue.svg";
import Devider from "../../components/Devider";
import SubscriptionIcon from "../../public/subscription-icon.svg";
import SubscriptionIconBlue from "../../public/subscription-icon-blue.svg";
import InvoiceIcon from "../../public/invoice-icon.svg";
import InvoiceIconBlue from "../../public/invoice-icon-blue.svg";
import LogoutIcon from "../../public/log-out.svg";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import cookie from "js-cookie";
import { signOut } from "next-auth/react";
const ProfileMenu = (data) => {
  const [isActive, setIsActive] = useState(false);
  const [loaderState, setLoaderState] = useState(false);
  const handleClick = (event) => {
    setIsActive((current) => !current);
  };

  const router = useRouter();
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

        if (socialLogin != null) {
          signOut(socialLogin);
        }
        cookie.remove("social");

        cookie.remove("userName");

        setLoaderState(false);
        router.push("/");
      })
      .catch((error) => {
        setLoaderState(false);
        toast.error("error");
      });
  };
  return (
    <>
      <div className="profile-header">
        {loaderState === true ? (
          <div className="loader-box">
            <Loader />
          </div>
        ) : (
          ""
        )}
        <div className="profile-info">
          <div className="profile-icon">
            {data?.image ? (
              <img
                alt="not fount"
                width={"100px"}
                src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${data?.image}`}
              />
            ) : (
              <Image src={ProfileIcon} alt="" />
            )}
          </div>
          <div className="profile-name">
            <p className="text-fade mb-0 f-14">Welcome back,</p>
            <h6 className="mb-0">
              {data?.profileName}
              {/* {data?.profileData?.profileData?.profileData?.data?.name} */}
            </h6>
          </div>
        </div>
      </div>
      <div className="logout-profile profile-menu mob-show">
        <button
          className={
            isActive
              ? "profile-active nav-link no-css text-white justfy-cen align-cen d-flex"
              : "nav-link no-css text-white justfy-cen align-cen d-flex"
          }
          onClick={handleClick}
        >
          <span className="profile-icon-img">
            <i className="fa fa-angle-double-down" aria-hidden="true"></i>
          </span>
          Profile Menu
        </button>
      </div>
      <div className={isActive ? "profile-view profile-show" : "profile-view"}>
        <div
          className="nav flex-column nav-profile"
          id="v-pills-tab"
          role="tablist"
          aria-orientation="vertical"
        >
          <div className="uppercase f-14 sem-bold text-fade st-text">
            Settings
          </div>
          <a
            className={
              data?.codeCanyan === false ? "nav-link active" : "nav-link"
            }
            href="#profile"
            id="profile-tab"
            data-toggle="pill"
            role="tab"
            aria-controls="profile"
            aria-selected={data?.codeCanyan === false ? "true" : "false"}
          >
            <span className="profile-icon-img active">
              <Image src={UserIconBlue} alt="" />
            </span>
            <span className="profile-icon-img inactive">
              <Image src={UserIcon} alt="" />
            </span>
            Profile
          </a>
          <a
            className="nav-link"
            id="api-key-tab"
            href="#api-key"
            data-toggle="pill"
            role="tab"
            aria-controls="api-key"
            aria-selected="false"
          >
            <span className="profile-icon-img active">
              <Image src={APIkeyIconBlue} alt="" />
            </span>
            <span className="profile-icon-img inactive">
              <Image src={APIkeyIcon} alt="" />
            </span>
            API Key
          </a>
          <a
            className="nav-link"
            id="plugins-tab"
            data-toggle="pill"
            href="#plugins"
            role="tab"
            aria-controls="plugins"
            aria-selected="false"
            onClick={() => {
              data.setState(false);
            }}
          >
            <span className="profile-icon-img active">
              <Image src={DatabaseIconBlue} alt="" />
            </span>
            <span className="profile-icon-img inactive">
              <Image src={DatabaseIcon} alt="" />
            </span>
            My Plugins
          </a>
          <a
            className={
              data?.codeCanyan === true ? "nav-link active" : "nav-link"
            }
            id="CodeCanyon-tab"
            data-toggle="pill"
            role="tab"
            href="#CodeCanyon"
            aria-controls="CodeCanyon"
            aria-selected={data?.codeCanyan === true ? "true" : "false"}
          >
            <span className="profile-icon-img active">
              <Image src={SendIconBlue} alt="" />
            </span>
            <span className="profile-icon-img inactive">
              <Image src={SendIcon} alt="" />
            </span>
            CodeCanyon
          </a>
          <a
            className="nav-link"
            id="Affiliates-tab"
            data-toggle="pill"
            role="tab"
            href="#Affiliates"
            aria-controls="Affiliates"
            aria-selected="false"
          >
            <span className="profile-icon-img active">
              <Image src={UsersIconBlue} alt="" />
            </span>
            <span className="profile-icon-img inactive">
              <Image src={UsersIcon} alt="" />
            </span>
            Affiliates
          </a>
          <div className="devide-mt">
            <Devider />
          </div>
          <a
            className="nav-link"
            id="Subscription-tab"
            data-toggle="pill"
            role="tab"
            href="#Subscription"
            aria-controls="Subscription"
            aria-selected="false"
          >
            <span className="profile-icon-img active">
              <Image src={SubscriptionIconBlue} alt="" />
            </span>
            <span className="profile-icon-img inactive">
              <Image src={SubscriptionIcon} alt="" />
            </span>
            Subscription
          </a>
          <a
            className="nav-link"
            id="Invoices-tab"
            data-toggle="pill"
            role="tab"
            href="#Invoices"
            aria-controls="Invoices"
            aria-selected="false"
          >
            <span className="profile-icon-img active">
              <Image src={InvoiceIconBlue} alt="" />
            </span>
            <span className="profile-icon-img inactive">
              <Image src={InvoiceIcon} alt="" />
            </span>
            Invoices
          </a>
          <div className="logout-profile">
            <button className="nav-link no-css" onClick={logoutFunction}>
              <span className="profile-icon-img">
                <Image src={LogoutIcon} alt="" />
              </span>
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileMenu;
