import React, { useState, useEffect } from "react";
import Devider from "../../components/Devider";
import Image from "next/image";
import Link from "next/link";
import UserProfile from "../../public/user-profile.svg";
import EditProfile from "../../public/edit-photo.png";
import GoogleIcon from "../../public/google-icon.svg";
import FacebookIcon from "../../public/facebook-icon.svg";
import GithubIcon from "../../public/github-icon.svg";
import axios from "axios";
import cookie from "js-cookie";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import { signOut } from "next-auth/react";
const Profile = (data) => {
  const [selectedImage, setSelectedImage] = useState(data?.image);
  const [isActive, setIsActive] = useState(false);
  const [name, setName] = useState(data?.name);

  const [email, setEmail] = useState(data?.email);
  const [loginType, setLoginType] = useState(data?.login_type);

  const [editname, setEditName] = useState(data?.name);
  const [editEmail, setEditEmail] = useState(data?.email);
  const [password, setPassword] = useState("");
  const [confirnPassword, setConfirmPassword] = useState("");
  const [selectedimageClick, setSelectedImageClick] = useState(false);
  const [selectedImageData, setSelectedImageData] = useState(data?.image);
  const [loaderState, setLoaderState] = useState(false);
  const router = useRouter();

  const handleClick = (event) => {
    setIsActive((current) => !current);
  };

  const handleSaveFunction = async () => {
    setLoaderState(true);
    try {
      const payload = new FormData();
      payload.append("name", editname);
      payload.append("email", editEmail);
      if (selectedImage !== data?.image) {
        payload.append("image", selectedImage);
      }

      if (password || confirnPassword) {
        payload.append("password", password);
        payload.append("password_confirmation", confirnPassword);
      }

      let access_token = cookie.get("access_token");
      if (access_token) {
        let responseData = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/update-profile`,
          payload,
          {
            headers: {
              Authorization: access_token,
            },
          }
        );

        cookie.set("userName", editname);
        setLoaderState(false);

        toast.success(responseData?.data?.message);
        setName(editname);
        setEmail(editEmail);

        let localStorage1 = document.getElementById("dropdownMenuButton");
        localStorage1.innerHTML = editname;
        data?.setProfileName(editname);
        data?.setImage(responseData?.data?.data?.image);
        setSelectedImageData(responseData?.data?.data?.image);
      } else {
        router.push("/signin");
      }
    } catch (err) {
      if (err?.response?.data?.status === 401) {
        cookie.remove("access_token");
        setLoaderState(false);
        router.push("/signin");
      } else {
        if (err?.response?.data?.message) {
          toast.error(err?.response?.data?.message);
        } else {
          toast.error("Something went wrong");
        }

        setLoaderState(false);
      }
    }
  };
  useEffect(() => {
    setName(data?.name);
    setEmail(data?.email);
    setLoginType(data?.login_type);
    setEditName(data?.name);
    setEditEmail(data?.email);

    setSelectedImageData(data?.image);
  }, []);

  const logoutFunction = () => {
    setLoaderState(true);
    let accesstoken = cookie.get("access_token");

    var myHeaders = new Headers();
    myHeaders.append("Authorization", accesstoken);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/logout`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        toast.success(result.message);

        cookie.remove("access_token");
        let socialLogin = cookie.get("social");

        if (socialLogin != null) {
          signOut(socialLogin);
        }
        cookie.remove("social");

        cookie.remove("userName");

        setLoaderState(false);
        router.push("/");
      })
      .catch((error) => {
        setLoaderState(false);
        toast.error("error");
      });
  };

  return (
    <>
      <div className="profile-tab">
        {loaderState === true ? (
          <div className="loader-box">
            <Loader />
          </div>
        ) : (
          ""
        )}

        <h4 className="">Profile</h4>
        <div className="user-profile-devider">
          <Devider />
        </div>
        <div
          className={isActive ? "profile-save profile-hide" : "profile-save"}
        >
          <div className="profile-header user-profile-header mb-4">
            <div className="profile-info mb-0">
              <div className="user-profile">
                {selectedImageData === null && (
                  <Image src={UserProfile} alt="" />
                )}
                {selectedImageData != null && (
                  <div className="uploaded-img">
                    <img
                      alt="not fount"
                      width={"100px"}
                      height={'102px'}
                      src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${selectedImageData}`}
                    />
                  </div>
                )}
              </div>
              <div className="profile-name">
                <h5 className="mb-2">{name}</h5>
                <p className="text-fade mb-0 f-14"></p>
              </div>
            </div>
            <div className="profile-edit-btn">
              <button
                className="btn border-bg login-btn text-white"
                onClick={handleClick}
              >
                Edit
              </button>
            </div>
          </div>
          <div className="user-profile-text">
            <div className="user-text-box">
              <div className="user-label">Username</div>
              <div className="user-text text-fade font-wt-300">{name}</div>
            </div>
            <Devider />
            <div className="user-text-box">
              <div className="user-label">Email</div>
              <div className="user-text text-fade font-wt-300">{email}</div>
            </div>
            <Devider />
          </div>
          <div className="social-activity-box mt-3 pb-5">
            <div>Linked Account</div>
            <div className="text-fade font-wt-300">
              We use this to let you sign in and populate your profile
              information
            </div>
            <div className="social-login profile-social-connect mt-4">
              {loginType === "google" ? (
                <div className="btn border-bg">
                  <span className="d-flex">
                    <span className="social-login-icon">
                      <Image src={GoogleIcon} alt="" />
                    </span>
                    <span className="mobile-hide-text">Continue with </span>
                    &nbsp;Google
                  </span>

                  <button
                    onClick={logoutFunction}
                    className="no-css text-fade font-w-300"
                  >
                    DisConnect
                  </button>
                </div>
              ) : (
                ""
              )}
              {loginType === "facebook" ? (
                <div className="btn border-bg">
                  <span className="d-flex">
                    <span className="social-login-icon">
                      <Image src={FacebookIcon} alt="" />
                    </span>
                    <span className="mobile-hide-text">Continue with </span>
                    &nbsp;Facebook
                  </span>
                  <button
                    onClick={logoutFunction}
                    className="no-css text-fade font-w-300"
                  >
                    Disconnect
                  </button>
                </div>
              ) : (
                ""
              )}
              {loginType === "github" ? (
                <div className="btn border-bg">
                  <span className="d-flex">
                    <span className="social-login-icon">
                      <Image src={GithubIcon} alt="" />
                    </span>
                    <span className="mobile-hide-text">Continue with </span>
                    &nbsp;Github
                  </span>
                  <button
                    onClick={logoutFunction}
                    className="no-css text-fade font-w-300"
                  >
                    DisConnect
                  </button>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
        <div
          className={
            isActive ? "profile-edit profile-show" : "profile-edit pb-5"
          }
        >
          <div className="profile-header user-profile-header mb-4">
            <div className="profile-info mb-0">
              <div className="edit-user-pic">
                {selectedImage !== null && selectedimageClick === true && (
                  <div className="uploaded-img">
                    <Image
                      alt="not fount"
                      width={"100px"}
                      height={"102px"}
                      src={URL?.createObjectURL(selectedImage)}
                    />
                  </div>
                )}
                {selectedImage !== null && selectedimageClick === false && (
                  <div className="uploaded-img">
                    <img
                      alt="not fount"
                      width={"100px"}
                      height={'102px'}
                      src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${selectedImageData}`}
                    />
                  </div>
                )}
                {selectedImage === null && selectedimageClick === false && (
                  <div className="edit-bgimg">
                    <Image src={EditProfile} alt="" />
                  </div>
                )}

                <input
                  type="file"
                  name="myImage"
                  className="my_file"
                  onChange={(event) => {
                    setSelectedImage(event.target.files[0]);
                    setSelectedImageClick(true);
                  }}
                />
              </div>

              <div className="profile-name">
                <h5 className="mb-2">{name}</h5>
                <p className="text-fade mb-0 f-14">
                  Update your photo and personal detail
                </p>
              </div>
            </div>
            <div className="profile-edit-btn edit-btn-flex">
              <button
                className="btn border-bg login-btn text-white"
                onClick={handleClick}
              >
                Cancel
              </button>

              <button
                className="btn btn-primary login-btn text-white"
                onClick={handleSaveFunction}
              >
                Save
              </button>
            </div>
          </div>
          <div className="user-profile-text">
            <div className="user-text-box">
              <div className="user-label">Username</div>
              <div className="form-group hero-form">
                <input
                  className="form-control"
                  type="text"
                  placeholder="Jonathan"
                  value={editname || ""}
                  onChange={(e) => {
                    setEditName(e.target.value);
                  }}
                />
              </div>
            </div>
            <Devider />
            <div className="row profile-password-row">
              <div className="col-lg-6">
                <div className="user-text-box">
                  <div className="user-label">New Password</div>
                  <div className="form-group hero-form">
                    <input
                      className="form-control"
                      type="password"
                      placeholder="Password"
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="user-text-box confirm-pass">
                  <div className="user-label">Confirm Password</div>
                  <div className="form-group hero-form">
                    <input
                      className="form-control"
                      type="password"
                      placeholder="Password"
                      onChange={(e) => {
                        setConfirmPassword(e.target.value);
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <Devider />
            <div className="user-text-box">
              <div className="user-label">Email</div>
              <div className="form-group hero-form">
                <input
                  className="form-control"
                  type="email"
                  placeholder="yourmail@gmail.com"
                  value={editEmail || ""}
                  onChange={(e) => {
                    setEditEmail(e.target.value);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
