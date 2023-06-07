import React, { useState, useEffect } from "react";
import Devider from "../../components/Devider";
import Image from "next/image";
import Link from "next/link";
import EnvatoIcon from "../../public/envato-icon.svg";
import ShareIcon from "../../public/share-icon.svg";
import RefreshIcon from "../../public/refresh-icon.svg";
import ProfilePagination from "../../components/ProfilePagination";
import SuccessIcon from "../../public/success-icon.svg";
import BlueArrowRight from "../../public/blue-arrow-right.svg";
import Router, { useRouter } from "next/router";
import { Modal } from "reactstrap";
import ModalCloseIcon from "../../public/modal-close-icon.svg";
import axios from "axios";
import cookie from "js-cookie";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import { TEMPORARY_REDIRECT_STATUS } from "next/dist/shared/lib/constants";
const CodeCanyon = (envantoKey) => {
  console.log("envantoKey", envantoKey);
  const [loaderState, setLoaderState] = useState(false);
  const [envantoState, setEnvantoState] = useState(envantoKey?.envantoKey);
  const [allEnvantoList, setAllEnvantoList] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [productCount, setProductCount] = useState();
  const [pageLimit, setPageLimit] = useState();
  const [wpsFavs, setWpFavs] = useState();
  const [wpListShow, setWpListShow] = useState(false);
  const [selectwpFavs, setSelectedWpFavs] = useState();
  const [envantoSelect, setEnvantoSelect] = useState("");
  const [successModel, setSuccessModel] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const router = useRouter();
  const handleEnvatoFunction = () => {
    router.push(
      `https://api.envato.com/authorization?response_type=code&client_id=${process.env.NEXT_PUBLIC_ENVATO_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_ENVANTOURL}`
    );
  };
  const handleClick = async () => {
    try {
      setLoaderState(true);
      let access_token = cookie.get("access_token");
      if (access_token) {
        let refreshPlugin = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/envato-plugins/refresh`,
          {
            headers: {
              Authorization: access_token,
            },
          }
        );
        setLoaderState(false);
        getAllEnvantoList();
        toast.success(disconnectPlugin?.data?.message);
      } else {
        setLoaderState(false);
        router.push("/signin");
      }
    } catch (Err) {
      setLoaderState(false);
      toast.error(Err?.response?.data?.message);
    }
  };

  const envatoDisconnectFunction = async () => {
    try {
      setLoaderState(true);
      let access_token = cookie.get("access_token");
      if (access_token) {
        let disconnectPlugin = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/envato-plugins/disconnect`,
          {
            headers: {
              Authorization: access_token,
            },
          }
        );
        setLoaderState(false);
        setEnvantoState(null);
        toast.success(disconnectPlugin?.data?.message);
      } else {
        setLoaderState(false);
        router.push("/signin");
      }
    } catch (Err) {
      setLoaderState(false);
      toast.error(Err?.response?.data?.message);
    }
  };
  useEffect(() => {
    setEnvantoState(envantoKey?.envantoKey);
  }, [envantoKey?.envantoKey]);

  const getAllEnvantoList = async () => {
    try {
      let access_token = cookie.get("access_token");
      if (access_token && envantoKey?.stripeCustomerId !== null) {
        let enventoList = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/my-envento-plugins`,
          {
            headers: {
              Authorization: access_token,
            },
          }
        );
        setAllEnvantoList(enventoList?.data?.data);
        setProductCount(enventoList?.data?.page_count);
        setPageLimit(enventoList?.data?.per_page_limit);
      }
    } catch (err) {
      console.log("error", err);
    }
  };

  useEffect(() => {
    getAllEnvantoList();
  }, [currentPage, envantoKey?.stripeCustomerId]);

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

  useEffect(() => {
    getAllWpFavs();
  }, []);

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
              plugin_id: envantoSelect,
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
          setEnvantoSelect("");
          setSelectedWpFavs("");
        } else {
          setLoaderState(false);
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
  const popUpfunction = () => {
    let access_token = cookie.get("access_token");

    if (wpListShow === true && access_token) {
      setModalIsOpen(true);
    } else {
      router.push("/signin");
    }
  };

  return (
    <>
      <div className="code-canyon-tab">
        {loaderState === true ? (
          <div className="loader-box">
            <Loader />
          </div>
        ) : (
          ""
        )}
        <h4 className="">CodeCanyon Plugins</h4>
        {envantoKey?.stripeCustomerId !== null ? (
          <>
            <div className="user-profile-devider">
              <Devider />
            </div>
            {!envantoState ? (
              <>
                <div className="social-login profile-social-connect ">
                  <div className="btn border-bg">
                    <span className="d-flex">
                      <span className="social-login-icon">
                        <Image src={EnvatoIcon} alt="" />
                      </span>
                      Connect with Envato
                    </span>
                    <button
                      onClick={handleEnvatoFunction}
                      className="no-css text-fade font-w-300"
                    >
                      Connect
                    </button>
                  </div>
                </div>
                <div className="text-fade font-wt-300 f-14">
                  Due to how items are classified in Codecannyon and Envato's
                  API, it's impossible to retrieve just WordPress plugins and
                  you may see other items on the list below.
                </div>
              </>
            ) : (
              <>
                <div className="social-login profile-social-connect ">
                  <div className="btn border-bg">
                    <span className="d-flex">
                      <span className="social-login-icon">
                        <Image src={EnvatoIcon} alt="" />
                      </span>
                      Connect with Envato
                    </span>
                    <button
                      onClick={envatoDisconnectFunction}
                      className="no-css text-fade font-w-300"
                    >
                      Disconnect
                    </button>
                  </div>
                </div>
                <div className="text-fade font-wt-300 f-14">
                  Due to how items are classified in Codecannyon and Envato's
                  API, it's impossible to retrieve just WordPress plugins and
                  you may see other items on the list below.
                </div>

                <p className="text-right mt-4 mb-4">
                  <button
                    type="button"
                    onClick={handleClick}
                    className="btn btn-primary refresh-btn ml-auto d-flex btn-pd"
                  >
                    Refresh Plugins&nbsp;&nbsp;
                    <Image alt="" src={RefreshIcon} />
                  </button>
                </p>
                {allEnvantoList?.map((envatoPlugin) => {
                  return (
                    <div className="code-canyon-plugin border-bg">
                      <div className="code-canyon-text">
                        <span className="code-icon">
                          <Image src={EnvatoIcon} alt="" />
                        </span>
                        <div>
                          <div>{envatoPlugin?.name}</div>
                          <div className="text-fade f-14 font-wt-300">
                            {envatoPlugin?.data?.short_description}
                          </div>
                        </div>
                      </div>
                      <div className="code-canyon-btn">
                        <button
                          type="button"
                          onClick={(e) => {
                            popUpfunction();
                            setEnvantoSelect(envatoPlugin?.id);
                          }}
                          className="btn btn-primary btn-pd"
                        >
                          <Image src={ShareIcon} alt="" />
                        </button>
                      </div>
                    </div>
                  );
                })}

                {/* <div className="code-canyon-plugin border-bg">
              <div className="code-canyon-text">
                <span className="code-icon">
                  <Image src={EnvatoIcon} alt="" />
                </span>
                <div>
                  <div>Television Signal Interference Noise</div>
                  <div className="text-fade f-14 font-wt-300">
                    Television Signal Interference Noise
                  </div>
                </div>
              </div>
              <div className="code-canyon-btn">
                <button className="btn btn-primary btn-pd">
                  <Image src={ShareIcon} alt="" />
                </button>
              </div>
            </div>
            <div className="code-canyon-plugin border-bg">
              <div className="code-canyon-text">
                <span className="code-icon">
                  <Image src={EnvatoIcon} alt="" />
                </span>
                <div>
                  <div>Television Signal Interference Noise</div>
                  <div className="text-fade f-14 font-wt-300">
                    Television Signal Interference Noise
                  </div>
                </div>
              </div>
              <div className="code-canyon-btn">
                <button className="btn btn-primary btn-pd">
                  <Image src={ShareIcon} alt="" />
                </button>
              </div>
            </div>
            <div className="code-canyon-plugin border-bg">
              <div className="code-canyon-text">
                <span className="code-icon">
                  <Image src={EnvatoIcon} alt="" />
                </span>
                <div>
                  <div>Television Signal Interference Noise</div>
                  <div className="text-fade f-14 font-wt-300">
                    Television Signal Interference Noise
                  </div>
                </div>
              </div>
              <div className="code-canyon-btn">
                <button className="btn btn-primary btn-pd">
                  <Image src={ShareIcon} alt="" />
                </button>
              </div>
            </div> */}
                <div className="pagination-position">
                  <ProfilePagination
                    currentpage={currentPage}
                    setCurrentPage={setCurrentPage}
                    productCount={productCount}
                    pageLimit={pageLimit}
                  />
                </div>
              </>
            )}
          </>
        ) : (
          <p className="notfound">
            You need to be a premium user to add your CodeCanyon plugins.
          </p>
        )}
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

export default CodeCanyon;
