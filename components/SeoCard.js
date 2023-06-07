import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import LinkIcon from "../public/link-icon.svg";
import CopyIcon from "../public/copy-icon.svg";
import Seo1 from "../public/seo1.svg";
import Seo2 from "../public/seo2.svg";
import Seo3 from "../public/seo3.svg";
import Seo4 from "../public/seo4.svg";
import Seo5 from "../public/seo5.svg";
import Seo6 from "../public/seo6.svg";
import cookie from "js-cookie";
import axios from "axios";
import Loader from "./Loader";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
const SeoCard = ({ fav }) => {
  const [checkWpBookMark, setWpBookMark] = useState();

  const [loaderState, setLoaderState] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setWpBookMark(fav?.get_wp_bookmark);
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
                addWpFavsFunction(fav?.id);
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
            <Link href={`/my-seo-list?slug=${fav?.slug}`}>
              <a className="text-white truncate">{fav?.name}</a>
            </Link>
          </h4>

          <p className="auth-name">
            <span className="text-fade"> By</span>{" "}
            <span className="primary-text">{fav?.author?.name} </span>
          </p>
          <p className="card-text text-fade truncate">{fav?.description}</p>
          <div className="card-icon-list">
            <span className="seo-icon cursor-pointer">
              <Link href={`/my-seo-list?slug=${fav?.slug}`}>
                <Image alt="" src={Seo1} />
              </Link>
            </span>
            <span className="seo-icon cursor-pointer">
              <Link href={`/my-seo-list?slug=${fav?.slug}`}>
                <Image alt="" src={Seo2} />
              </Link>
            </span>
            <span className="seo-icon cursor-pointer">
              <Link href={`/my-seo-list?slug=${fav?.slug}`}>
                <Image alt="" src={Seo3} />
              </Link>
            </span>
            <span className="seo-icon cursor-pointer">
              <Link href={`/my-seo-list?slug=${fav?.slug}`}>
                <Image alt="" src={Seo4} />
              </Link>
            </span>
            <span className="seo-icon cursor-pointer">
              <Link href={`/my-seo-list?slug=${fav?.slug}`}>
                <Image alt="" src={Seo5} />
              </Link>
            </span>
            <span className="seo-icon cursor-pointer">
              <Link href={`/my-seo-list?slug=${fav?.slug}`}>
                <Image alt="" src={Seo6} />
              </Link>
            </span>

            <span className="seo-icon seo-icon-link semi-bold">
              <Link href={`/my-seo-list?slug=${fav?.slug}`}>
                <a className="text-white link">+10</a>
              </Link>
            </span>
          </div>
          <div className="card-footer-link cursor-pointer">
            {/* <Link href="/"> */}
            <a
              onClick={() => {
                copyFunction(fav?.token);
              }}
              className="text-white link"
            >
              <Image alt="" src={LinkIcon} />
              &nbsp;&nbsp; Get list
            </a>
            {/* </Link> */}
            <button
              type="button"
              onClick={(e) => {
                duplicateFunction(fav?.id);
              }}
              className="no-css text-white link"
            >
              <Image alt="" src={CopyIcon} />
              &nbsp;&nbsp; Duplicate
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SeoCard;
