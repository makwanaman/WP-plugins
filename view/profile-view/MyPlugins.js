import React, { useEffect, useState } from "react";
import Devider from "../../components/Devider";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import ProfilePagination from "../../components/ProfilePagination";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Delete from "../../public/Delete.png";
import Edit from "../../public/edit.png";
import cookie from "js-cookie";
import Share from "../../public/Share.png";
import { toast } from "react-toastify";
import Pagination from "react-js-pagination";
import { BeakerIcon, PencilSquareIcon } from "@heroicons/react/24/solid";
import Loader from "../../components/Loader";
import { Modal } from "reactstrap";
import SuccessIcon from "../../public/success-icon.svg";
import ModalCloseIcon from "../../public/modal-close-icon.svg";
const schemaPlugin = yup.object().shape({
  pluginname: yup.string().required("plugin name must be required"),
  pluginslag: yup.string().required("plugin slag must be required"),
  plugindescription: yup.string().required("description must be required"),
});
const MyPlugins = (data) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schemaPlugin),
  });
  const [pluginsList, setPluginsList] = useState();
  const [pluginname, setPluginname] = useState("");
  const [pluginslag, setPluginSlug] = useState("");
  const [plugindescription, setPluginDescription] = useState("");
  const [pluginfile, setPluginFile] = useState("");

  const [editPluginName, seteditPluginName] = useState();
  const [editPluginSlug, setEditPluginSlug] = useState();
  const [editPluginDescription, setEditPluginDescription] = useState();
  const [editPluginFile, setEditPluginFile] = useState();
  const [id, setEditId] = useState();

  const [productCount, setProductCount] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loaderState, setLoaderState] = useState(false);
  const [pageLimit, setPageLimit] = useState();
  const [wpsFavs, setWpFavs] = useState();
  const [wpListShow, setWpListShow] = useState(false);
  const [selectwpFavs, setSelectedWpFavs] = useState("");
  const [envantoSelect, setEnvantoSelect] = useState("");
  const [successModel, setSuccessModel] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const router = useRouter();

  console.log(data.stripeCustomerId, "data.stripeCustomerId myplugins");

  const getAllPlugins = async () => {
    try {
      let access_token = cookie.get("access_token");
      if (access_token && data.stripeCustomerId !== null) {
        setLoaderState(true);
        let response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/my-plugins?page=${currentPage}`,
          {
            headers: {
              Authorization: access_token,
            },
          }
        );

        setProductCount(response?.data?.page_count);
        setPluginsList(response?.data?.data);
        setPageLimit(response?.data?.per_page_limit);
      }
      setLoaderState(false);
    } catch (Err) {
      setLoaderState(false);
    }
  };

  //add plugin api
  const addPluginApi = async () => {
    try {
      setLoaderState(true);
      const payload = new FormData();
      payload.append("name", pluginname);
      payload.append("description", plugindescription);
      payload.append("custom_slug", pluginslag);
      payload.append("plugin", pluginfile);
      let access_token = cookie.get("access_token");
      if (access_token) {
        const api = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/plugins-add`,
          payload,
          {
            headers: {
              Authorization: access_token,
            },
          }
        );
        setLoaderState(false);
        toast.success(api.data.message);
        getAllPlugins();
        reset();
        setPluginname("");
        setPluginSlug("");
        setPluginFile("");
        setPluginDescription("");
      } else {
        router.push("/signin");
      }
    } catch (err) {
      setLoaderState(false);
      if (err?.response?.data?.status === 401) {
        cookie.remove("access_token");
        setLoaderState(false);
        router.push("/signin");
      }

      if (err?.response?.data?.error?.plugin) {
        toast.error(err?.response?.data?.error?.plugin[0]);
      } else {
        toast.error(err?.response?.data?.error);
      }
    }
  };

  useEffect(() => {
    getAllPlugins();
  }, [currentPage, data?.stripeCustomerId]);

  //delete api running
  const deleteApi = async (id) => {
    try {
      setLoaderState(true);
      let access_token = cookie.get("access_token");
      if (access_token) {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/plugins-remove`,
          {
            pluginId: id,
          },
          {
            headers: {
              Authorization: access_token,
            },
          }
        );
        setLoaderState(false);
        getAllPlugins();
      } else {
        router.push("/signin");
      }
    } catch (Err) {
      if (Err?.response?.data?.status === 401) {
        cookie.remove("access_token");
        setLoaderState(false);
        router.push("/signin");
      } else {
        toast.error("Something went wrong");
        setLoaderState(false);
      }
    }
  };

  const [editState, setEditState] = useState(false);

  //edit api
  const editApi = async (slug) => {
    try {
      setLoaderState(true);
      let access_token = cookie.get("access_token");
      if (access_token) {
        data.setState(true);
        setEditState(true);
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/plugin-single/${slug}`,
          {
            headers: {
              Authorization: access_token,
            },
          }
        );

        seteditPluginName(response?.data?.data?.name);
        setEditPluginSlug(response?.data?.data?.slug);
        setEditId(response?.data?.data?.id);
        setEditPluginDescription(response?.data?.data?.data?.short_description);

        setLoaderState(false);
      } else {
        setLoaderState(false);
        router.push("/signin");
      }
    } catch (err) {
      if (err?.response?.data?.status === 401) {
        cookie.remove("access_token");
        setLoaderState(false);
        router.push("/signin");
      } else {
        setLoaderState(false);
        toast.error("Something went wrong");
      }
    }
  };

  const editPlugin = async () => {
    try {
      let access_token = cookie.get("access_token");
      setLoaderState(true);
      if (
        !editPluginName ||
        !editPluginDescription ||
        !editPluginSlug ||
        !editPluginFile
      ) {
        setLoaderState(false);
        toast.error("please fill all the information");
      }

      if (access_token) {
        const editFormData = new FormData();
        editFormData.append("plugin_id", id);
        editFormData.append("name", editPluginName);
        editFormData.append("description", editPluginDescription);
        editFormData.append("custom_slug", editPluginSlug);
        editFormData.append("plugin", editPluginFile);
        const editDataresponse = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/plugins-edit`,
          editFormData,
          {
            headers: {
              Authorization: access_token,
            },
          }
        );
        setLoaderState(false);
        toast.success("data Edit successFully");
        getAllPlugins();
      } else {
        setLoaderState(false);
        router.push("/signin");
      }
    } catch (err) {
      if (err?.response?.data?.status === 401) {
        cookie.remove("access_token");
        setLoaderState(false);
        router.push("/signin");
      } else {
        setLoaderState(false);
        toast.error("Something went wrong");
      }
    }
  };

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
      <div className="myplugin-tab">
        {loaderState === true ? (
          <div className="loader-box">
            <Loader />
          </div>
        ) : (
          ""
        )}
        <h4 className="">My Plugins</h4>

        {data.stripeCustomerId !== null ? (
          <>
            <div className="apikey-devider">
              <Devider />
            </div>
            <div className="f-18 semi-bold mb-3">Add Plugin</div>
            <form className="plugin-form mb-4 pb-3">
              <div className="apikey-generate-box">
                <div className="apikey-left">
                  <div className="">Plugin name</div>
                </div>
                <div className="api-right">
                  <div className="form-inline">
                    <div className="form-group hero-form">
                      <input
                        className="form-control"
                        type="text"
                        value={
                          data.state === false ? pluginname : editPluginName
                        }
                        placeholder="Eg:- Plugin Name"
                        {...register("pluginname", {
                          onChange: (e) => {
                            setPluginname(e.target.value);
                            seteditPluginName(e.target.value);
                          },
                        })}
                      />
                    </div>
                    <span style={{ color: "red" }}>
                      {" "}
                      {errors?.pluginname?.message}
                    </span>
                  </div>
                </div>
              </div>
              <div className="apikey-generate-box">
                <div className="apikey-left">
                  <div className="">Plugin Slug</div>
                </div>
                <div className="api-right">
                  <div className="form-inline">
                    <div className="form-group hero-form">
                      <input
                        className="form-control"
                        type="text"
                        value={
                          data.state === false ? pluginslag : editPluginSlug
                        }
                        placeholder="Eg:-Plugin-Slug"
                        {...register("pluginslag", {
                          onChange: (e) => {
                            setPluginSlug(e.target.value);
                            setEditPluginSlug(e.target.value);
                          },
                        })}
                      />
                    </div>
                    <span style={{ color: "red" }}>
                      {" "}
                      {errors?.pluginslag?.message}
                    </span>
                  </div>
                </div>
              </div>
              <div className="apikey-generate-box">
                <div className="apikey-left">
                  <div className="">Short Description</div>
                </div>
                <div className="api-right">
                  <div className="form-inline">
                    <div className="form-group hero-form">
                      <input
                        className="form-control"
                        type="text"
                        value={
                          data.state === false
                            ? plugindescription
                            : editPluginDescription
                        }
                        placeholder="Eg:-Plugin Description"
                        {...register("plugindescription", {
                          onChange: (e) => {
                            setPluginDescription(e.target.value),
                              setEditPluginDescription(e.target.value);
                          },
                        })}
                      />
                    </div>
                    <span style={{ color: "red" }}>
                      {" "}
                      {errors?.plugindescription?.message}
                    </span>
                  </div>
                </div>
              </div>
              <div className="apikey-generate-box">
                <div className="apikey-left">
                  <div className="">Upload Zip File</div>
                </div>
                <div className="api-right">
                  <div className="form-inline w-100">
                    <div className="form-group w-100">
                      <div className="choose-file-btn w-100">
                        <input
                          className="text-fade cursor-pointer"
                          type="file"
                          id="plugin"
                          name="plugin"
                          onChange={(e) => {
                            setPluginFile(e.target.files[0]);
                            setEditPluginFile(e.target.files[0]);
                          }}
                          // onClick={(e) => {
                          //   e.target.value = null;
                          // }}
                        />
                        <div className="api-form-btn ">
                          {data.state === false ? (
                            <button
                              className="btn btn-primary mt-0"
                              onClick={handleSubmit(addPluginApi)}
                            >
                              Add Plugin
                            </button>
                          ) : (
                            <button
                              className="btn btn-primary mt-0"
                              type="button"
                              onClick={editPlugin}
                            >
                              Edit plugin
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
            <Devider />
            <div className="myplugin-info">
              <div className="f-18 semi-bold mb-3">My Plugins</div>
              <div className="card-wrapper">
                {pluginsList?.map((plugindata) => {
                  return (
                    <div className="card-plugin border-bg p-4">
                      <div className="f-14 semi-bold mb-3 plugin-title">
                        {plugindata?.name}
                      </div>
                      <p className="text-des">
                        {plugindata?.data?.short_description}
                      </p>
                      <div className="plugin-share-icon">
                        <span
                          className="edit-btn-plugin"
                          onClick={(e) => {
                            editApi(plugindata?.slug);
                          }}
                        >
                          <PencilSquareIcon
                            className="cursor-pointer"
                            height={20}
                            width={20}
                            style={{}}
                          />
                        </span>

                        <Image
                          alt="not fount"
                          onClick={(e) => {
                            popUpfunction();
                            setEnvantoSelect(plugindata.id);
                          }}
                          width={""}
                          src={Share}
                          className="cursor-pointer"
                        />
                        <Image
                          alt="not fount"
                          width={""}
                          onClick={(e) => {
                            deleteApi(plugindata.id);
                          }}
                          src={Delete}
                          className="cursor-pointer"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
              {pluginsList?.length === 0 && (
                <p className="notfound">Plugins not found</p>
              )}
            </div>
            <ProfilePagination
              currentpage={currentPage}
              setCurrentPage={setCurrentPage}
              productCount={productCount}
              pageLimit={pageLimit}
            />{" "}
          </>
        ) : (
          <p className="notfound">
            You need to be a premium user to be able to upload your own plugins.
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

export default MyPlugins;
