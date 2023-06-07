import React, { useEffect, useState } from "react";
import ProfileView from "../../view/profile-view/index";
import Main from "../../components/layout/Main";
import { useRouter, Router } from "next/router";
import cookie from "js-cookie";
import axios from "axios";
import Loader from "../../components/Loader";
const Index = ({ data }) => {
  const router = useRouter();
  const { query } = useRouter();
  const [state, setState] = useState(0);
  const [codeCanyan, setCodeCanyan] = useState(false);
  const [loaderState, setLoaderState] = useState(false);
  console.log("profileData Formed", data);
  useEffect(() => {
    if (data.status === 401) {
      cookie.remove("access_token");
      router.push("/signin");
    }
  }, [data]);

  const profileFunction = () => {
    let access_token = cookie.get("access_token");

    if (!access_token) {
      router.push("/signin");
    }
  };
  useEffect(() => {
    profileFunction();
  }, []);
  const postEnvantoApi = async (code) => {
    try {
      let access_token = cookie.get("access_token");
      setState(1);
      if (access_token) {
        if (state === 0) {
          setLoaderState(true);

          let envantoApi = await axios.post(
            `${process.env.NEXT_PUBLIC_BASE_URL}/oauth_envato`,
            {
              code: code,
            },
            {
              headers: {
                Authorization: access_token,
              },
            }
          );
          // alert(code);
          setLoaderState(false);
          router.push("/profile-view");
          router.replace("/profile-view");
        }
      }
    } catch (err) {
      // alert(code);
      router.push("/profile-view");
      router.replace("/profile-view");
      setLoaderState(false);
    }
  };

  useEffect(() => {
    if (state === 0 && query.code) {
      postEnvantoApi(query.code);
      setCodeCanyan(true);
    }
  }, [query.code]);
  return (
    <>
      <Main>
        {loaderState === true ? (
          <div className="loader-box">
            <Loader />
          </div>
        ) : (
          ""
        )}
        <ProfileView
          profileData={data}
          setCodeCanyan={setCodeCanyan}
          codeCanyan={codeCanyan}
        />
      </Main>
    </>
  );
};

export async function getServerSideProps({ req }) {
  try {
    let profileResponse = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/get-profile`,
      {
        headers: {
          Authorization: req.cookies.access_token,
        },
      }
    );
    let profileData = await profileResponse.json();

    return {
      props: {
        data: profileData,
      },
    };
  } catch (err) {
    return {
      props: {
        data: "",
      },
    };
  }
}
export default Index;
