import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import LinkFadeIcon from "../../public/link-fade-icon.svg";
import HeartFadeIcon from "../../public/heart-fade-icon.svg";
import CopyFadeIcon from "../../public/copy-fade-icon.svg";
import parse from "html-react-parser";
import { toast } from "react-toastify";
import axios from "axios";
import Loader from "../../components/Loader";
import cookie from "js-cookie";
import { useRouter } from "next/router";
const EntryHeader = (data) => {
  const [loaderState, setLoaderState] = useState(false);
  const router = useRouter();
  const [checkWpBookMark, setWpBookMark] = useState();

  useEffect(() => {
    if (data?.headerSeoList?.get_wp_bookmark === undefined) {
      setWpBookMark(null);
    } else {
      setWpBookMark(data?.headerSeoList?.get_wp_bookmark);
    }
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
      if (access_token) {
        let setBookMarkData = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/add-bookmarks`,
          { wpfav_id: data?.headerSeoList?.id, bookmark: setBookMarkvalue },
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
      } else {
        router.push("/signin");
      }
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

  const copyLinkFunction = async () => {
    const url = document.URL;
    await navigator.clipboard.writeText(url);

    toast.success("copied successfully");
  };

  const copyClone = async (id) => {
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

        // router.push("/new-WPfavs");
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
      <div className="entry-header">
        {loaderState === true ? (
          <div className="loader-box">
            <Loader />
          </div>
        ) : (
          ""
        )}
        <div className="container text-center border-top-fade entry-header-box">
          <div className="row">
            <div className="col-lg-1 "></div>
            <div className="col-lg-10 ">
              <div></div>
              <h1 className="f-50">
                <span className="">{data?.headerSeoList?.name}</span>
              </h1>
              <div className="pt-3 pb-3">
                <span className="wp-text bdr-rd-8 primary-text">
                  <span className="text-fade">By </span>&nbsp;
                  {parse(`
    ${data?.headerSeoList?.author?.name}
  `)}
                </span>
              </div>
              <div className="f-20 text-fade">
                {parse(`
    ${data?.headerSeoList?.description}
  `)}
              </div>
              <div className="seo-link">
                <button type="button" className="no-css cursor-pointer">
                  <i
                    onClick={(e) => {
                      addWpFavsFunction(data?.headerSeoList?.id);
                    }}
                    className={
                      checkWpBookMark !== null
                        ? "fa fa-heart-o bookmark-active"
                        : "fa fa-heart-o"
                    }
                  ></i>
                </button>
                <Link href="#">
                  <a onClick={copyLinkFunction}>
                    <Image alt="" src={LinkFadeIcon} />
                  </a>
                </Link>
                <Link href="#">
                  <a
                    onClick={() => {
                      copyClone(data?.headerSeoList?.id);
                    }}
                  >
                    <Image alt="" src={CopyFadeIcon} />
                  </a>
                </Link>
              </div>
            </div>
            <div className="col-lg-1 "></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EntryHeader;
