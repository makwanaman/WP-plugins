import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import LinkIcon from "../public/link-icon.svg";
import CopyIcon from "../public/copy-icon.svg";
import Delete from "../public/delete.svg";
import cookie from "js-cookie";
import axios from "axios";
import Loader from "./Loader";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
const SeoCard = (fav) => {
  const [checkWpBookMark, setWpBookMark] = useState();

  const [loaderState, setLoaderState] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setWpBookMark(fav?.fav?.get_wp_bookmark);
  }, []);

  const addWpFavsFunction = async (id) => {
    try {
      let setBookMarkvalue;
      if (checkWpBookMark) {
        setWpBookMark(null);
        setBookMarkvalue = "0";
      } else {
        setWpBookMark(!null);
        setBookMarkvalue = "1";
      }

      let access_token = cookie.get("access_token");

      let setBookMarkData = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/add-bookmarks`,
        { wpfav_id: id, bookmark: setBookMarkvalue },
        {
          headers: {
            Authorization: access_token,
          },
        }
      );
      if (setBookMarkData?.data?.bookmark_flag === "0") {
        setWpBookMark(null);
      }

      toast.success(setBookMarkData?.data?.message);
    } catch (err) {
      if (err?.response?.data?.status === 401) {
        cookie.remove("access_token");
        cookie.remove("userName");
        router.push("/signin");
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  const duplicateFunction = async (id) => {
    try {
      setLoaderState(true);
      let access_token = cookie.get("access_token");
      if (access_token) {
        let duplicateClone = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/clone/${id}`,
          {
            headers: {
              Authorization: access_token,
            },
          }
        );

        setLoaderState(false);
        toast.success(duplicateClone?.data?.message);
        router.push({
          pathname: "/edit-WPfavs",
          query: { id: duplicateClone?.data?.data?.id },
        });
      } else {
        router.push("/signin");
      }
    } catch (err) {
      setLoaderState(false);
      if (err?.response?.data?.status === 401) {
        cookie.remove("access_token");
        cookie.remove("userName");
        router.push("/signin");
      } else {
        toast.error("Something went wrong");
      }
    }
  };
  const copyFunction = async (token) => {
    await navigator.clipboard.writeText(token);

    toast.success("copied successfully");
  };
  const getCharacter = (str) => {
    // Remove leading and trailing white spaces
    if (str) {
      str = str.trim();

      // Loop through the string characters
      for (let i = 0; i < str.length; i++) {
        let char = str[i];

        // Check if the character is an alphabet
        if (char.match(/[a-zA-Z]/)) {
          return char;
        }
      }

      // If no alphabet character is found
      return null;
    }
  };

  const deleteApi = async (id) => {
    try {
      let access_token = cookie.get("access_token");
      if (access_token) {
        setLoaderState(true);
        let deletePlugin = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/delete/${id}`,
          {
            headers: {
              Authorization: access_token,
            },
          }
        );
        console.log("favStateChange", fav?.stateChange);
        toast.success(deletePlugin?.data?.message);
        fav?.setStateChange(!fav?.stateChange);
        router.push("/WPfavs-lists");
        setLoaderState(false);
      } else {
        setLoaderState(false);
        router.push("/signin");
      }
    } catch (err) {
      setLoaderState(false);
      if (err?.response?.data?.status === 401) {
        cookie.remove("access_token");
        router.push("/signin");
      } else {
        toast.error("Something went wrong");
      }
    }
  };
  return (
    <>
      <div className="card border-bg seo-card">
        {loaderState === true ? (
          <div className="loader-box">
            <Loader />
          </div>
        ) : (
          ""
        )}
        <div className="card-body">
          <button type="button" className="no-css wishlist-icon cursor-pointer">
            <i
              onClick={(e) => {
                addWpFavsFunction(fav?.fav?.id);
              }}
              className={
                checkWpBookMark !== null
                  ? "fa fa-heart-o bookmark-active"
                  : "fa fa-heart-o"
              }
            ></i>
          </button>

          <h4 className="card-title">
            {" "}
            <Link href={`/my-seo-list?slug=${fav?.fav?.slug}`}>
              <a className="text-white truncate">{fav?.fav?.name}</a>
            </Link>
          </h4>

          <p className="auth-name">
            <span className="text-fade"> By</span>{" "}
            <Link
              href={`/my-seo-list?slug=${fav?.fav?.slug}`}
              className="primary-text"
            >
              {fav?.fav?.author?.name}
            </Link>
          </p>

          <p className="card-text text-fade truncate">
            {fav?.fav?.description}
          </p>
          <div className="card-icon-list">
            {(fav?.fav?.plugins?.length > 0 ||
              fav?.fav?.custom_plugins?.length > 0 ||
              fav?.fav?.envato_plugins?.length > 0) &&
              fav?.fav?.plugins

                ?.concat(fav?.fav?.custom_plugins, fav?.fav?.envato_plugins)
                .slice(0, 3)
                ?.map((data) => {
                  return data?.image ? (
                    <>
                      <span className="cat-img">
                        <img
                          alt=""
                          src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${data?.image}`}
                        />
                      </span>
                    </>
                  ) : (
                    <>
                      <span
                        className="cat-img  img-letter"
                        style={{
                          backgroundColor: data?.color_code
                            ? data?.color_code
                            : "blue",
                        }}
                      >
                        {getCharacter(data?.name)}
                      </span>
                    </>
                  );
                })}

            <Link href={`/my-seo-list?slug=${fav?.fav?.slug}`}>
              <span className="cat-img cursor-pointer cat-count">
                <a className="text-white link">
                  +
                  {fav?.fav?.plugins?.length +
                    fav?.fav?.custom_plugins?.length +
                    fav?.fav?.envato_plugins?.length}
                </a>
              </span>
            </Link>
          </div>
          <div className="card-footer-link cursor-pointer d-flex justify-content-between ">
            <button
            type="button"
              onClick={() => {
                copyFunction(fav?.fav?.token);
              }}
              className="no-css text-white d-flex align-items-center btn-size"
            >
              <Image alt="" src={LinkIcon} />
              &nbsp;Get list
            </button>
            {/* </Link> */}
            <button
              type="button"
              onClick={(e) => {
                duplicateFunction(fav?.fav?.id);
              }}
              className="no-css text-white d-flex align-items-center btn-size"
            >
              <Image alt="" src={CopyIcon} />
              &nbsp;Duplicate
            </button>
            {fav?.deleteData === true ? (
              <button
                type="button"
                className="no-css text-white d-flex align-items-center btn-size"
                onClick={() => {
                  deleteApi(fav?.fav?.id);
                }}
                // onClick={(e) => {
                //   deleteApi(fav?.fav?.id);
                // }}
              >
                <Image  alt="" src={Delete} />
                 Delete
              </button>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SeoCard;
