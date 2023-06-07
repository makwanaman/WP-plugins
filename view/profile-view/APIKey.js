import React, { useEffect, useState } from "react";
import Devider from "../../components/Devider";
import Image from "next/image";
import PinIcon from "../../public/pin-icon.svg";
import { toast } from "react-toastify";
import axios from "axios";
import { useRouter } from "next/router";
import Loader from "../../components/Loader";
import cookie from "js-cookie";
const APIKey = (data) => {
  const [apiToken, setApiToken] = useState("");
  const router = useRouter();
  const [loaderState, setLoaderState] = useState(false);
  const handleRefereshToken = async () => {
    try {
      let access_token = cookie.get("access_token");
      setLoaderState(true);
      if (access_token) {
        let responseData = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/refresh-key`,
          {
            headers: {
              Authorization: access_token,
            },
          }
        );
        setLoaderState(false);
        setApiToken(responseData.data.data.api_token);
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

  useEffect(() => {
    setApiToken(data?.apikey);
  }, [data]);
  return (
    <>
      <div className="apikey-tab">
        {loaderState === true ? (
          <div className="loader-box">
            <Loader />
          </div>
        ) : (
          ""
        )}
        <h4 className="">API Key</h4>
        <div className="apikey-devider">
          <Devider />
        </div>
        <div className="apikey-generate-box">
          <div className="apikey-left">
            <div className="f-18">Api Key</div>
          </div>
          <div className="api-right">
            <form className="form-inline api-link-form">
              <div className="form-group hero-form">
                <input
                  className="form-control"
                  type="text"
                  value={apiToken || ""}
                  disabled
                />
                <button
                  className="btn"
                  type="button"
                  onClick={async (e) => {
                    await navigator.clipboard.writeText(apiToken);
                    toast.success("copied successfully");
                  }}
                >
                  <Image alt="" src={PinIcon} />
                </button>
              </div>
            </form>
            <div className="api-form-btn">
              <button
                className="btn border-bg text-white"
                onClick={handleRefereshToken}
              >
                Refresh
              </button>
              <button
                className="btn btn-primary"
                onClick={async (e) => {
                  await navigator.clipboard.writeText(apiToken);
                  toast.success("copied successfully");
                }}
              >
                Copy
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default APIKey;
