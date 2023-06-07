import React, { useEffect, useState } from "react";
import Devider from "../../components/Devider";
import Image from "next/image";
import PinIcon from "../../public/pin-icon.svg";
import EyeWhiteIcon from "../../public/eye-white-icon.svg";
import UsersWhiteIcon from "../../public/users-white-icon.svg";
import DollorSignIcon from "../../public/dollar-sign-icon.svg";
import Link from "next/link";
import axios from "axios";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import cookie from "js-cookie";
const Affiliates = (data) => {
  const [affiliated, setAffiliateId] = useState("");
  const [earned, setearned] = useState("");
  const [registered, setRegistered] = useState("");
  const [loaderState, setLoaderState] = useState(false);
  const getAllAffiliate = async () => {
    try {
      setLoaderState(true);
      let access_token = cookie.get("access_token");
      const affiliatesData = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/affiliate`,
        {
          headers: {
            Authorization: access_token,
          },
        }
      );
      setLoaderState(false);
      setearned(affiliatesData?.data?.data?.earned);
      setRegistered(affiliatesData?.data?.data?.total_register);
      setAffiliateId(affiliatesData?.data?.data?.referees[0]?.affiliate_id);
    } catch (Err) {
      setLoaderState(false);
    }
  };

  useEffect(() => {
    getAllAffiliate();
  }, []);

  return (
    <>
      <div className="affiliates-tab pb-5">
        {loaderState === true ? (
          <div className="loader-box">
            <Loader />
          </div>
        ) : (
          ""
        )}
        <h4 className="">Affiliates</h4>
        <div className="apikey-devider">
          <Devider />
        </div>
        <div className="apikey-generate-box affiliates-box">
          <div className="apikey-left">
            <div className="">Your unique affiliate ID</div>
            <div
              className="f-12 text-fade"
              onClick={async (e) => {
                await navigator.clipboard.writeText(data?.affiliate_id);
                toast.success("copied successfully");
              }}
            >
              Click to copy
            </div>
          </div>
          <div className="api-right">
            <form className="form-inline api-link-form">
              <div className="form-group hero-form wd-auto">
                <input
                  className="form-control"
                  type="text"
                  value={data?.affiliate_id}
                  disabled
                />
                <button className="btn" type="button">
                  <Image
                    alt=""
                    src={PinIcon}
                    onClick={async (e) => {
                      await navigator.clipboard.writeText(data?.affiliate_id);
                      toast.success("copied successfully");
                    }}
                  />
                </button>
              </div>
            </form>
          </div>
        </div>
        <p className="text-fade mt-4">
          You can now refer users by appending to urls&nbsp;
          <Link href="/">
            <a>?ref={data?.affiliate_id}</a>
          </Link>
        </p>
        <p className="affi-link mt-4">
          <span className="border-bg">
            <Link href="/">
              <a>https://wpfavs.com?ref={data?.affiliate_id}</a>
            </Link>
          </span>
        </p>
        <p className="text-fade mt-4">
          This will save a cookie on user's computer for 30 days. If the user
          register and become a premium user you will get a commission of 30%
          with a maximum of 18USD per user referred.
        </p>
        <p className="text-fade">
          We currently sell premium accounts for 6 USD per month and 60 USD per
          year. If the user subscribe to the yearly plan you get 18USD, if the
          user subscribe to the monthly plan you get 30% each month the
          subscription is active until you reach 18USD. Check affiliate terms
          &nbsp;
          <Link href="/affiliate-terms">
            <a>here</a>
          </Link>
        </p>
        <p className="text-fade">
          A Minimum of 5 users needs to be referred in order to withdraw.
        </p>
        <div className="f-18 mb-4">Stats</div>
        <div className="stats-box">
          <div className="code-canyon-plugin border-bg">
            <div className="code-canyon-text affilaites-text">
              <div>
                <h3>0</h3>
                <div className="text-fade f-14 font-wt-300">Total views</div>
              </div>
            </div>
            <div className="code-canyon-btn">
              <button className="btn btn-primary btn-pd">
                <Image src={EyeWhiteIcon} alt="" />
              </button>
            </div>
          </div>
          <div className="code-canyon-plugin border-bg">
            <div className="code-canyon-text affilaites-text">
              <div>
                <h3>{registered}</h3>
                <div className="text-fade f-14 font-wt-300">
                  Users Registered
                </div>
              </div>
            </div>
            <div className="code-canyon-btn">
              <button className="btn btn-primary btn-pd">
                <Image src={UsersWhiteIcon} alt="" />
              </button>
            </div>
          </div>
          <div className="code-canyon-plugin border-bg">
            <div className="code-canyon-text affilaites-text">
              <div>
                <h3>{earned}$</h3>
                <div className="text-fade f-14 font-wt-300">Total Earned</div>
              </div>
            </div>
            <div className="code-canyon-btn">
              <button className="btn btn-primary btn-pd">
                <Image src={DollorSignIcon} alt="" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Affiliates;
