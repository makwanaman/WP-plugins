import Head from "next/head";
import React, { useEffect, useState } from "react";
import Main from "../components/layout/Main";
import Home from "../pages/home";
import axios from "axios";
import Loader from "../components/Loader";
import cookie from "js-cookie";
const Index = (data) => {
  const [topList, setTopList] = useState();
  const [loader, setLoader] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [wpListShow, setWpListShow] = useState(false);

  const getAllTopList = async () => {
    try {
      setLoader(true);
      let access_token = cookie.get("access_token");

      if (access_token) {
        let allTopList = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/top-my-wpfavs`,
          {
            headers: {
              Authorization: access_token,
            },
          }
        );
        setTopList(allTopList?.data?.data.slice(0, 3));
      }
      setLoader(false);
    } catch (err) {
      setLoader(false);

      setErrorMessage(true);
    }
  };
  useEffect(() => {
    let access_token = cookie.get("access_token");
    if (!access_token) {
      setErrorMessage(true);
    } else {
      setErrorMessage(false);
      getAllTopList();
    }
  }, []);

  const homeSettingData = async () => {
    try {
      let homeSettingData = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/get-all-settings`
      );

      cookie.set("facebook", homeSettingData?.data?.data[0]?.facebook);
      cookie.set("site_email", homeSettingData?.data?.data[0]?.site_email);
      localStorage.setItem(
        "instagram",
        homeSettingData?.data?.data[0]?.instagram
      );
      cookie.set("instagram", homeSettingData?.data?.data[0]?.instagram);
      cookie.set("twitter", homeSettingData?.data?.data[0]?.twitter);
      cookie.set("linkedin", homeSettingData?.data?.data[0]?.linkedin);
      localStorage.setItem(
        "terms",
        homeSettingData?.data?.data[0]?.terms_and_conditions
      );
      localStorage.setItem(
        "policy",
        homeSettingData?.data?.data[0]?.privacy_policy
      );
      localStorage.setItem(
        "affiliate_terms",
        homeSettingData?.data?.data[0]?.affiliate_terms
      );
    } catch (err) {
      console.log("error");
    }
  };

  useEffect(() => {
    homeSettingData();
  }, []);
  return (
    <div>
      {loader === true ? (
        <div className="loader-box">
          <Loader />
        </div>
      ) : (
        ""
      )}
      <Head>
        <title>WPfavs</title>
        <meta
          name="description"
          content="The world largest directory of tools and resources"
        />

        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Main homeSetting={data?.homeSetting}>
        <Home
          posts={data?.blogData?.posts}
          setErrorMessage={setErrorMessage}
          errorMessage={errorMessage}
          topList={topList}
          topListCategory={data?.topCategories?.data}
          pluginList={data?.pluginList?.data}
          wpListShow={wpListShow}
          setWpListShow={setWpListShow}
          homeSetting={data?.homeSetting}
        />
      </Main>
    </div>
  );
};
export async function getServerSideProps() {
  try {
    const [blogRes, categoryRes, pluginRes] = await Promise.all([
      fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/blog`),
      fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/top-categories-list`),
      fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/top-plugins-list`),
    ]);
    const [blogData, topCategories, pluginList] = await Promise.all([
      blogRes.json(),
      categoryRes.json(),
      pluginRes.json(),
    ]);
    return {
      props: {
        blogData,
        topCategories,
        pluginList,
      },
    };
  } catch (err) {
    return { props: {} };
  }
}
export default Index;
