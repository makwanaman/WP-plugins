import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import AddIcon from "../public/add-icon.svg";

import JiraIcon from "../public/jira-icon.svg";
import BlueArrowRight from "../public/blue-arrow-right.svg";
import parse from "html-react-parser";
import { useRouter } from "next/router";
import cookie from "js-cookie";
import axios from "axios";
import { toast } from "react-toastify";
import { Modal } from "reactstrap";
import ModalCloseIcon from "../public/modal-close-icon.svg";
import SuccessIcon from "../public/success-icon.svg";
import Loader from "../components/Loader";
const PluginCard = (data) => {
  const router = useRouter();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectwpFavs, setSelectedWpFavs] = useState();
  const [loaderState, setLoaderState] = useState(false);
  const [successModel, setSuccessModel] = useState(false);
  const fullStars = Math.floor(data?.list?.rating / 20);
  const halfStars = Math.round((data?.list?.rating % 20) / 10);
  const emptyStars = 5 - fullStars;

  const starButtons = [];
  for (let i = 0; i < fullStars; i++) {
    starButtons.push(
      <span className="rate-star" key={i}>
        <i className="fa fa-star" aria-hidden="true"></i>
      </span>
    );
  }

  for (let i = 0; i < emptyStars; i++) {
    starButtons.push(
      <span className="no-css" key={i + fullStars + halfStars}>
        <i className="fa fa-star" aria-hidden="true"></i>
      </span>
    );
  }
  const saveWpFavs = async () => {
    try {
      if (selectwpFavs) {
        setLoaderState(true);
        let access_token = cookie.get("access_token");
        if (access_token) {
          let pluginStore = await axios.post(
            `${process.env.NEXT_PUBLIC_BASE_URL}/plugins/add-to-wpfav`,
            {
              wpfav_id: selectwpFavs,
              plugin_id: data?.list?.id,
            },
            {
              headers: {
                Authorization: access_token,
              },
            }
          );

          setLoaderState(false);
          setModalIsOpen(false);
          setSuccessModel(true);
          setSelectedWpFavs("");
        } else {
          setLoaderState(false);
          toast.error("first login");
          router.push("/signin");
        }
      } else {
        toast.error("Please Select Wpfavs");
      }
    } catch (err) {
      if (err?.response?.data?.status === 401) {
        setLoaderState(false);
        router.push("/signin");
      } else {
        setLoaderState(false);
        toast.error("something went wrong");
      }
    }
  };

  const popUpfunction = () => {
    let access_token = cookie.get("access_token");
    if (access_token && data?.loginState === false) {
      setModalIsOpen(true);
    } else {
      router.push("/signin");
    }
  };
  const handleWpFavs = (e) => {
    setSelectedWpFavs(e.target.value);
  };

  return (
    <>
      <div className="plugin-card-box scroll-card">
        {loaderState === true ? (
          <div className="loader-box">
            <Loader />
          </div>
        ) : (
          ""
        )}
        <div className="card border-bg seo-card ">
          <div className="card-body">
            <button
              type="button"
              onClick={(e) => {
                popUpfunction();
              }}
              className="no-css wishlist-icon cursor-pointer fade-4"
            >
              <Image alt="" src={AddIcon} />
            </button>
            <div className="plugin-header">
              <div className="plugin-h-left">
                <div className="plugin-icon">
                  <Image alt="" src={JiraIcon} />
                </div>
              </div>
              <div className="plugin-h-left">
                <h4 className="card-title mb-1">{data?.list?.name}</h4>
                <p className="auth-name mb-1">
                  <span className="text-fade"> By</span>{" "}
                  <span className="primary-text">
                    {parse(`${data?.list?.author}`)}
                  </span>
                </p>
                <p className="rating mb-0">{starButtons}</p>
              </div>
            </div>
            <p className="card-text text-fade truncate">
              {parse(`${data?.list?.data?.short_description}`)}
            </p>
            <div className="devider mb-3"></div>
            <p className="categories-tag">
              <span className="cat-hd">Categories: </span>{" "}
              {/* className="cat-name fade-blue" */}
              {data?.list?.category?.color_code ? (
                <span
                  className="cat-name"
                  style={{
                    background: `${data?.list?.category?.color_code}`,
                  }}
                >
                  {" "}
                  <Link href="" className="text-white">
                    {data?.list?.category?.name}
                  </Link>
                </span>
              ) : (
                <span className="cat-name" style={{ background: "blue" }}>
                  <Link href="" className="text-white">
                    general
                  </Link>
                </span>
              )}
            </p>
            {/* <p className="tagged-cat">
              <span className="cat-tag-name border-bg text-fade">#shop</span>
              <span className="cat-tag-name border-bg text-fade">
                #checkout
              </span>
              <span className="cat-tag-name border-bg text-fade">
                #Cashback
              </span>
            </p> */}
          </div>
          <div className="card-footer text-center">
            {/* <Link href="/"> */}
            <a
              onClick={() => {
                router.push(`/single-plugin-page?slug=${data?.list?.slug}`);
              }}
              className="text-white plugin-link cursor-pointer"
            >
              Learn More <Image alt="" src={BlueArrowRight} />
            </a>
            {/* </Link> */}
          </div>
        </div>
      </div>
      <div className="payment-modal">
        <Modal isOpen={modalIsOpen} className="add-payment-box">
          <div className="payment-modal-header">
            <div className="f-18 payment-hd pb-4">
              <span></span>
              <span
                className="cursor-pointer modal-close"
                onClick={() => setModalIsOpen(false)}
              >
                <Image alt="" src={ModalCloseIcon} />
              </span>
            </div>
          </div>

          <form className="add-card-info"></form>
          <form className="form-inline add-payment-form api-link-form">
            <div className="text-center w-100">
              {/* <Image alt="" src={SuccessIcon} /> */}
              <h3>Add plugin to Wp Fav!</h3>
              <p>Choose to which Wp Fav you want to add the plugin:</p>
              <div className="form-group select-box">
                <select
                  onChange={handleWpFavs}
                  className="form-control"
                  id="exampleFormControlSelect1"
                >
                  <option type="hidden" value="">
                    Select the WPfavs
                  </option>
                  {data?.wpsFavs?.map((wpfav) => {
                    return (
                      <option key={wpfav?.id} value={wpfav?.id}>
                        {wpfav?.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="d-block payment-btn text-center">
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={saveWpFavs}
                >
                  Save
                </button>
              </div>
            </div>
          </form>
        </Modal>
      </div>

      <div className="payment-modal">
        <Modal isOpen={successModel} className="add-payment-box">
          <div className="payment-modal-header">
            <div className="f-18 payment-hd pb-4">
              <span></span>
              <span
                className="cursor-pointer modal-close"
                onClick={() => setSuccessModel(false)}
              >
                <Image alt="" src={ModalCloseIcon} />
              </span>
            </div>
          </div>

          <form className="add-card-info"></form>
          <form className="form-inline add-payment-form api-link-form">
            <div className="text-center w-100">
              <Image alt="" src={SuccessIcon} />
              <h3>Success!</h3>
              <p>Add WpFavs saved successfully!</p>
              <div className="d-block payment-btn text-center">
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={() => {
                    setSuccessModel(false);
                    setModalIsOpen(false);
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </form>
        </Modal>
      </div>
    </>
  );
};

export default PluginCard;
