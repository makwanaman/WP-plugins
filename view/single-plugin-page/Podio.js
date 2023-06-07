import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Modal } from "reactstrap";
import AddIcon from "../../public/add-icon.svg";
import PodioIcon from "../../public/podio-icon.svg";
import BlueArrowRight from "../../public/blue-arrow-right.svg";
import ArrowRight from "../../public/arrow-right.svg";
import DownloadWhiteIcon from "../../public/download-white-icon.svg";
import ExternalLinkIcon from "../../public/external-link-icon.svg";
import ShareWhiteIcon from "../../public/share-white-icon.svg";
import parse from "html-react-parser";
import Button from "react-bootstrap/Button";
import ModalCloseIcon from "../../public/modal-close-icon.svg";
import SuccessIcon from "../../public/success-icon.svg";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import cookie from "js-cookie";
import Loader from "../../components/Loader";
const Podio = ({ pluginState }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const router = useRouter();
  const [selectwpFavs, setSelectedWpFavs] = useState();
  const [wpsFavs, setWpFavs] = useState();
  const [successModel, setSuccessModel] = useState(false);
  const fullStars = Math.floor(pluginState?.rating / 20);
  const halfStars = Math.round((pluginState?.rating % 20) / 10);
  const emptyStars = 5 - fullStars;
  const [loaderState, setLoaderState] = useState(false);
  const [wpListShow, setWpListShow] = useState(false);
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

  const getAllWpFavs = async () => {
    try {
      let access_token = cookie.get("access_token");
      if (access_token) {
        let pluginStore = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/dropdown-wpfavs-list`,
          {
            headers: {
              Authorization: access_token,
            },
          }
        );

        setWpFavs(pluginStore?.data?.data);
        setWpListShow(true);
      } else {
        setWpListShow(false);
      }
    } catch (err) {
      if (err?.response?.data?.status === 401) {
        setWpListShow(false);
      }
      console.log("error", err);
    }
  };

  const handleWpFavs = (e) => {
    setSelectedWpFavs(e.target.value);
  };

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
              plugin_id: pluginState?.id,
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
          router.push("/signin");
          toast.error("first login");
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

  useEffect(() => {
    getAllWpFavs();
  }, []);
  const popUpfunction = () => {
    if (wpListShow === true) {
      setModalIsOpen(true);
    } else {
      router.push("/signin");
    }
  };
  return (
    <>
      <div className="plugin-card-box">
        {loaderState === true ? (
          <div className="loader-box">
            <Loader />
          </div>
        ) : (
          ""
        )}
        <div className="card border-bg seo-card">
          <div className="card-body">
            <div className="row align-cen">
              <div className="col-lg-4">
                <div className="plugin-header">
                  <div className="plugin-h-left">
                    <div className="plugin-icon">
                      <Image alt="" src={PodioIcon} />
                    </div>
                  </div>
                  <div className="plugin-h-right">
                    <h4 className="card-title mb-1">{pluginState?.name}</h4>
                    <p className="auth-name mb-1">
                      <span className="text-fade"> By</span>{" "}
                      <span className="primary-text">
                        {" "}
                        {parse(`${pluginState?.author}`)}
                      </span>
                    </p>
                    <p className="rating mb-0">{starButtons}</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-8">
                <div className="podio-btns">
                  {/* <Link href="/"> */}
                  <a
                    href={pluginState?.author_profile}
                    target="_blank"
                    className="btn border-bg text-white discover-btn justfy-cen"
                  >
                    <Image alt="" src={ExternalLinkIcon} />
                    &nbsp;&nbsp;Visit wp.org
                  </a>
                  {/* </Link> */}
                  <button
                    type="button"
                    className="btn border-bg text-white discover-btn justfy-cen"
                    onClick={(e) => {
                      popUpfunction();
                    }}
                  >
                    {" "}
                    <Image alt="" src={ShareWhiteIcon} /> &nbsp;&nbsp; Add to
                    WPfavs
                  </button>
                  <a
                    href={pluginState?.data?.download_link}
                    target="_blank"
                    className="btn btn-primary discover-btn justfy-cen"
                  >
                    <Image alt="" src={DownloadWhiteIcon} />
                    &nbsp;&nbsp; Download
                  </a>
                  {/* </Link> */}
                </div>
              </div>
            </div>
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
                  {wpsFavs?.map((wpfav) => {
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

      {/* success model */}
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

export default Podio;
