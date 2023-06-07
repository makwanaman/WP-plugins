import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Modal } from "reactstrap";
import ModalCloseIcon from "../../public/modal-close-icon.svg";
import SuccessIcon from "../../public/success-icon.svg";
import axios from "axios";
import Select from "react-select";
import AsyncSelect from "react-select/async";

import { toast } from "react-toastify";
import { useRouter } from "next/router";
import Loader from "../../components/Loader";
import cookie from "js-cookie";
const MultiSelectcustomStyles = {
  input: (provided, state) => ({
    ...provided,
    color: "#FFF",
  }),
  option: (provided, state) => ({
    ...provided,
    color: state.isSelected ? "red" : "#fff",
    backgroundColor: state.isSelected ? "#006cf9" : "#0c2144",
    "&:hover": {
      backgroundColor: "#006cf9",
    },
  }),
  control: (provided, state) => ({
    ...provided,
    color: "#fff",
    backgroundColor: "#0c2144",
    borderColor: "rgba(60 ,86 ,124, 50%)",
    "&:hover": {
      borderColor: "rgba(60 ,86 ,124, 50%)",
    },
  }),
  placeholder: (provided, state) => ({
    ...provided,
    color: state.isFocused
      ? "rgba(209, 228, 255, 0.5)"
      : "rgba(209, 228, 255, 0.5)",
  }),
};

const NewWpfavsTemplate = (id) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [options, setOptions] = useState([]);
  const [dataoptions, setdataOptions] = useState([]);

  const [wordPressPlugins, setWordPressPlugins] = useState([]);
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [privateKey, setPrivatekey] = useState("1");
  const [customPlugins, setCustomPlugin] = useState([]);
  const [codecanyan, setCodeCanyan] = useState([]);
  const [loaderState, setLoaderState] = useState(false);
  const [currency, setCurrency] = useState([]);

  const [wordPressList, setWordPressList] = useState([]);
  const router = useRouter();

  const customPlugin = async () => {
    try {
      let access_token = cookie.get("access_token");
      setLoaderState(true);
      const customApiResponse = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/wpfavs/create/allPlugin`,
        {
          headers: {
            Authorization: access_token,
          },
        }
      );

      const array = customApiResponse?.data?.data?.custom_plugins?.map(
        (statedata) => {
          return {
            value: statedata.id,
            label: statedata.name,

            color: "#0052CC",
          };
        }
      );

      setOptions(array);

      const envato = customApiResponse?.data?.data?.envato_plugins?.map(
        (statedata) => {
          return {
            value: statedata.id,
            label: statedata.name,
          };
        }
      );

      setdataOptions(envato);
      setLoaderState(false);
    } catch (err) {
      setLoaderState(false);
      if (err?.response?.data?.status === 401) {
        cookie.remove("access_token");
        router.push("/signin");
      } else {
        toast.error("Something Went Wrong");
      }
    }
  };

  useEffect(() => {
    customPlugin();
  }, []);

  const filterUser = async (inputvalue) => {
    try {
      if (inputvalue.length > 2) {
        let access_token = cookie.get("access_token");

        let responseData = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/plugins/search?slug=${inputvalue}`,
          {
            headers: {
              Authorization: access_token,
            },
          }
        );
        const wordPressOrg = responseData?.data?.data?.map((statedata) => {
          let authorname = statedata.author.replace(/(<([^>]+)>)/gi, "");
          return {
            value: statedata.id,
            label: `${statedata.name} by ${authorname}`,
          };
        });
        setWordPressPlugins(wordPressOrg);
        return responseData?.data?.data.map((e) => {
          let authorname = e.author.replace(/(<([^>]+)>)/gi, "");

          return {
            value: e.id,
            label: `${e.name} by ${authorname}`,
          };
        });
      }
    } catch (err) {
      toast.error("something went wrong");
    }
  };

  const promiseOptions = (inputValue) => {
    return filterUser(inputValue);
  };

  const submitDataFunction = async () => {
    try {
      if (!title || !description) {
        toast.error("please enter all The information");
      } else {
        let codecanyanData, customdata, wordPressData, wordpressFormat;
        let idData = id?.id;
        setLoaderState(true);
        if (privateKey === null) {
          codecanyanData = "";
          customdata = "";
          wordPressData = currency?.map((object) => object.value);

          wordpressFormat = wordPressData?.toString();
        } else {
          codecanyanData = codecanyan?.map((object) => object.value);
          customdata = customPlugins?.map((object) => object.value);
          wordPressData = wordPressList?.map((object) => object.value);
          wordpressFormat = wordPressData?.toString();
        }

        const access_token = cookie.get("access_token");
        const pluginsData = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/wpfavs/create`,
          {
            name: title,
            description: description,
            private: privateKey,
            plugins: wordpressFormat,
            custom_plugins: customdata,
            envato_plugins: codecanyanData,
            wpfav_id: idData,
          },
          {
            headers: {
              Authorization: access_token,
            },
          }
        );
        setModalIsOpen(true);
        setLoaderState(false);
        // reset();
      }
    } catch (err) {
      toast.error("Something went Wrong");

      setLoaderState(false);
    }
  };

  const getWpFavsData = async () => {
    try {
      if (id?.id) {
        let access_token = cookie.get("access_token");
        let myFavListData = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/my-wpfavs/edit/${id?.id}`,
          {
            headers: {
              Authorization: access_token,
            },
          }
        );

        setPrivatekey(myFavListData?.data?.data?.wpfav?.private.toString());
        if (myFavListData?.data?.data?.wpfav?.private.toString() === "0") {
          setPrivatekey(null);
        }

        if (myFavListData?.data?.data?.wpfav?.private !== 1) {
          const plugins = myFavListData?.data?.data?.plugins?.map(
            (statedata) => {
              return {
                value: statedata.id,
                label: statedata.name,
              };
            }
          );

          setCurrency(plugins);
        } else {
          const plugins = myFavListData?.data?.data?.plugins?.map(
            (statedata) => {
              return {
                value: statedata.id,
                label: statedata.name,
                // data: statedata.id,
              };
            }
          );

          setWordPressList(plugins);
        }

        setTitle(myFavListData?.data?.data.wpfav?.name);
        setDescription(myFavListData?.data?.data?.wpfav?.description);
      }
    } catch (err) {
      console.log("err", err);
    }
  };

  useEffect(() => {
    getWpFavsData();
  }, [id]);

  return (
    <>
      <section className="favlists-section pt-5 pb-5">
        {loaderState === true ? (
          <div className="loader-box">
            <Loader />
          </div>
        ) : (
          ""
        )}
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="flex-heading mb-5 mt-5">
                <h1 className="mb-0">New WPFav List</h1>
              </div>
            </div>
          </div>
          <div className="row mb-row-rev">
            <div className="col-lg-7">
              <form className="plugin-form mb-4 pb-3">
                <div className="apikey-generate-box">
                  <div className="apikey-left">
                    <div className="">Title</div>
                  </div>
                  <div className="api-right">
                    <div className="form-inline">
                      <div className="form-group hero-form">
                        <input
                          className="form-control"
                          type="text"
                          value={title}
                          placeholder="My first SEO list"
                          onChange={(e) => {
                            setTitle(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="apikey-generate-box">
                  <div className="apikey-left">
                    <div className="">Description</div>
                  </div>
                  <div className="api-right">
                    <div className="form-inline">
                      <div className="form-group hero-form">
                        <textarea
                          className="form-control"
                          rows="5"
                          cols="50"
                          value={description}
                          placeholder="Short description about the collection"
                          onChange={(e) => {
                            setDescription(e.target.value);
                          }}
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="apikey-generate-box private-tab-toggle">
                  <div className="apikey-left">
                    <div className="">Private</div>
                  </div>
                  <div className="api-right">
                    <div className="signup-tabs wp-binary-tabs">
                      <ul className="nav nav-tabs" id="myTab" role="tablist">
                        <li className="nav-item">
                          <a
                            className={
                              privateKey === "1"
                                ? "nav-link active"
                                : "nav-link"
                            }
                            id="yes-tab"
                            data-toggle="tab"
                            href="#yes"
                            role="tab"
                            aria-controls="yes"
                            aria-selected="true"
                            onClick={(e) => {
                              setPrivatekey("1");
                            }}
                          >
                            Yes
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className={
                              privateKey === null
                                ? "nav-link active"
                                : "nav-link"
                            }
                            id="no-tab"
                            data-toggle="tab"
                            href="#no"
                            role="tab"
                            aria-controls="no"
                            aria-selected="false"
                            onClick={(e) => {
                              setPrivatekey(null);
                            }}
                          >
                            No
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div className="col-lg-5">
              <div className="border-bg wp-create-bg">
                <h3>Help</h3>
                <p className="text-fade f-14">
                  Type a title and short description that best describe your
                  list of plugins.
                </p>
                <p className="text-fade f-14">
                  For example: New install plugins, Ecommerce plugins, Security
                  plugins.
                </p>
                <p className="text-fade f-14">
                  By making it private the list will be only available to you
                  and not listed publicly or accesible with quick token key.
                </p>
                <p className="text-fade f-14">
                  If you upload your own custom plugins the list will be
                  automatically listed as private.
                </p>
              </div>
            </div>
          </div>
          {privateKey === "1" ? (
            <div className="row">
              <div className="col-sm-12">
                <div>
                  <div className="tab-content">
                    <div
                      className="tab-pane active"
                      id="yes"
                      role="tabpanel"
                      aria-labelledby="yes-tab"
                    >
                      <ul
                        className="nav nav-tabs yes-tab-content"
                        id="myTab"
                        role="tablist"
                      >
                        <li className="nav-item">
                          <a
                            className="nav-link active"
                            id="Wordpress-tab"
                            data-toggle="tab"
                            href="#Wordpress"
                            role="tab"
                            aria-controls="Wordpress"
                            aria-selected="true"
                          >
                            Wordpress.org
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className="nav-link"
                            id="Custom-plugins-tab"
                            data-toggle="tab"
                            href="#Custom-plugins"
                            role="tab"
                            aria-controls="Custom-plugins"
                            aria-selected="false"
                          >
                            Custom plugins
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className="nav-link"
                            id="CodeCanyon-plugins-tab"
                            data-toggle="tab"
                            href="#CodeCanyon-plugins"
                            role="tab"
                            aria-controls="CodeCanyon-plugins"
                            aria-selected="false"
                          >
                            CodeCanyon plugins
                          </a>
                        </li>
                      </ul>

                      <div className="tab-content" id="myTabContent">
                        <div
                          className="tab-pane show active"
                          id="Wordpress"
                          role="tabpanel"
                          aria-labelledby="Wordpress-tab"
                        >
                          <div className="mui-select-box mt-4 mb-3">
                            <AsyncSelect
                              isMulti
                              cacheOptions
                              defaultOptions={wordPressPlugins}
                              loadOptions={promiseOptions}
                              styles={MultiSelectcustomStyles}
                              value={wordPressList}
                              onChange={(e) => {
                                let dataId = e.map((data) => {
                                  return {
                                    value: data.value,
                                    label: data.label,
                                  };
                                });
                                setWordPressList(dataId);
                              }}
                            />
                          </div>
                          {/* <p className="text-fade">
                            Type the plugin slug as appears on wordpress.org.
                            For example to add
                            http://wordpress.org/plugins/popups simple type
                            popups.
                          </p> */}
                          <p className="pt-4">
                            <button
                              onClick={submitDataFunction}
                              className="btn btn-primary w-100 multiselect-btn"
                            >
                              Create
                            </button>
                          </p>
                        </div>
                        <div
                          className="tab-pane fade"
                          id="Custom-plugins"
                          role="tabpanel"
                          aria-labelledby="Custom-plugins-tab"
                        >
                          <div className="mui-select-box mt-4 mb-3">
                            <Select
                              styles={MultiSelectcustomStyles}
                              options={options}
                              value={customPlugins}
                              onChange={(e) => {
                                let dataId = e.map((data) => {
                                  return {
                                    value: data.value,
                                    label: data.label,
                                  };
                                });
                                setCustomPlugin(dataId);
                              }}
                              isMulti
                            />
                          </div>
                          {/* <p className="text-fade">
                            Type the plugin slug as appears on custom. For
                            example to add http://wordpress.org/plugins/popups
                            simple type popups.
                          </p> */}
                          <p className="pt-4">
                            <button
                              onClick={submitDataFunction}
                              className="btn btn-primary w-100 multiselect-btn"
                            >
                              Create
                            </button>
                          </p>
                        </div>
                        <div
                          className="tab-pane fade"
                          id="CodeCanyon-plugins"
                          role="tabpanel"
                          aria-labelledby="CodeCanyon-plugins-tab"
                        >
                          <div className="mui-select-box mt-4 mb-3">
                            <Select
                              options={dataoptions}
                              value={codecanyan}
                              onChange={(e) => {
                                let dataId = e.map((data) => {
                                  return {
                                    value: data.value,
                                    label: data.label,
                                  };
                                });
                                setCodeCanyan(dataId);
                              }}
                              isMulti
                              styles={MultiSelectcustomStyles}
                            />
                          </div>
                          {/* <p className="text-fade">
                            Type the plugin slug as appears onCodeCanyon
                            plugins. For example to add
                            http://wordpress.org/plugins/popups simple type
                            popups.
                          </p> */}
                          <p className="pt-4">
                            <button
                              onClick={submitDataFunction}
                              className="btn btn-primary w-100 multiselect-btn"
                            >
                              Create
                            </button>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div
              className="tab-pane"
              id="no"
              role="tabpanel"
              aria-labelledby="no-tab"
            >
              <ul
                className="nav nav-tabs yes-tab-content"
                id="myTab"
                role="tablist"
              >
                <li className="nav-item">
                  <a
                    className="nav-link active"
                    id="Wordpress-tab"
                    data-toggle="tab"
                    href="#Wordpress"
                    role="tab"
                    aria-controls="Wordpress"
                    aria-selected="true"
                  >
                    Wordpress.org
                  </a>
                </li>
              </ul>
              <div className="tab-content" id="myTabContent">
                <div
                  className="tab-pane show active"
                  id="Wordpress"
                  role="tabpanel"
                  aria-labelledby="Wordpress-tab"
                >
                  <div className="mui-select-box mt-4 mb-3">
                    <AsyncSelect
                      isMulti
                      cacheOptions
                      value={currency}
                      defaultOptions={wordPressPlugins}
                      loadOptions={promiseOptions}
                      styles={MultiSelectcustomStyles}
                      onChange={(e) => {
                        let dataId = e.map((data) => {
                          return {
                            value: data.value,
                            label: data.label,
                          };
                        });
                        setCurrency(dataId);
                      }}
                    />
                  </div>
                  {/* <p className="text-fade">
                    Type the plugin slug as appears on wordpress.org. For
                    example to add http://wordpress.org/plugins/popups simple
                    type popups.
                  </p> */}
                  <p className="pt-4">
                    <button
                      onClick={submitDataFunction}
                      className="btn btn-primary w-100 multiselect-btn"
                    >
                      Create
                    </button>
                  </p>
                </div>
                <div
                  className="tab-pane fade"
                  id="Custom-plugins"
                  role="tabpanel"
                  aria-labelledby="Custom-plugins-tab"
                >
                  <div className="mui-select-box mt-4 mb-3">
                    <Select
                      styles={MultiSelectcustomStyles}
                      options={options}
                      onChange={(e) => {
                        let dataId = e.map((data) => {
                          return {
                            data: data.data,
                          };
                        });
                        setCustomPlugin(dataId);
                      }}
                      isMulti
                    />
                  </div>
                  {/* <p className="text-fade">
                    Type the plugin slug as appears on custom. For example to
                    add http://wordpress.org/plugins/popups simple type popups.
                  </p> */}
                  <p className="pt-4">
                    <button
                      onClick={submitDataFunction}
                      className="btn btn-primary w-100 multiselect-btn"
                    >
                      Create
                    </button>
                  </p>
                </div>
                <div
                  className="tab-pane fade"
                  id="CodeCanyon-plugins"
                  role="tabpanel"
                  aria-labelledby="CodeCanyon-plugins-tab"
                >
                  <div className="mui-select-box mt-4 mb-3">
                    <Select
                      options={dataoptions}
                      onChange={(e) => {
                        let dataId = e.map((data) => {
                          return {
                            data: data.data,
                          };
                        });
                        setCodeCanyan(dataId);
                      }}
                      isMulti
                      styles={MultiSelectcustomStyles}
                    />
                  </div>
                  {/* <p className="text-fade">
                    Type the plugin slug as appears onCodeCanyon plugins. For
                    example to add http://wordpress.org/plugins/popups simple
                    type popups.
                  </p> */}
                  <p className="pt-4">
                    <button
                      onClick={submitDataFunction}
                      className="btn btn-primary w-100 multiselect-btn"
                    >
                      Create
                    </button>
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
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
              <Image alt="" src={SuccessIcon} />
              <h3>Success!</h3>
              <p>WpFav saved successfully!</p>
              <div className="d-block payment-btn text-center">
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={() => {
                    router.push("/WPfavs-lists");
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
export default NewWpfavsTemplate;
