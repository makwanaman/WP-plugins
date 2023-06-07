import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import LockIcon from "../../public/lock.svg";
import MailIcon from "../../public/mail.svg";
import UserIcon from "../../public/user-icon.svg";
import EyeIcon from "../../public/eye.svg";
import GoogleIcon from "../../public/google-icon.svg";
import FacebookIcon from "../../public/facebook-icon.svg";
import GithubIcon from "../../public/github-icon.svg";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useSession, signIn, signOut } from "next-auth/react";
import Loader from "../../components/Loader";
import cookie from "js-cookie";
//Creating Schema
const schemasignup = yup
  .object()
  .shape({
    username: yup.string().required("Username must be required"),
    email: yup.string().email().required("E-mail must be required"),
    password: yup
      .string()
      .required("password must be required")
      .min(6, "minumum 6 character has required"),
  })
  .required();
const Signup = () => {
  const {
    register: registersignup,
    handleSubmit: handlesubmitsignup,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schemasignup),
  });
  const [username, setusername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { data: session } = useSession();
  const [passwordvisiblity, setpasswordVisibility] = useState(false);
  const [loaderState, setLoaderState] = useState(false);
  //using useRouter
  const router = useRouter();
  //signup submit

  const signupSubmit = () => {
    setLoaderState(true);
    axios
      .post(`${process.env.NEXT_PUBLIC_BASE_URL}/register`, {
        name: username,
        email: email,
        password: password,
      })
      .then((res) => {
        setLoaderState(false);

        toast.success(res.data.message);
        router.push("/signin");
      })
      .catch((err) => {
        if (err.response.data.error.email) {
          setLoaderState(false);
          toast.error(err.response.data.error.email[0]);
        } else {
          setLoaderState(false);
          toast.error("error!");
        }
      });
  };
  const getSocialFunction = async () => {
    try {
      let socialLogin = cookie.get("social");
      setLoaderState(true);

      const resposnedata = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/social-login`,
        {
          user: {
            name: String(session.user.name),
            email: String(session.user.email),
            image: String(session.user.image),
          },
          expires: String(session.expires),
          accessToken: String(session.accessToken),
          login_type: String(socialLogin),
        }
      );

      cookie.set("userName", session.user.name);
      cookie.set("access_token", session.accessToken);
      setLoaderState(false);
      toast.success(
        `${resposnedata.data.message} ${session.user.name} with ${session.user.email}`
      );

      router.push("/");
    } catch (Err) {
      setLoaderState(false);
      let social = cookie.get("social");
      if (social) {
        signOut(social);
      }
      toast.error("Error");
    }
  };

  // social login
  useEffect(() => {
    try {
      let access_token = cookie.get("access_token");
      if (!access_token) {
        if (session) {
          if (cookie.get("pages") === "signup") {
            getSocialFunction();
          }
        }
      } else {
        if (cookie.get("pages") === "signup") {
          router.push("/signup");
        }
      }
    } catch (Err) {}
  }, [session]);

  return (
    <>
      <div className="text-center mb-4">
        {loaderState === true ? (
          <div className="loader-box">
            <Loader />
          </div>
        ) : (
          ""
        )}
        <h3>Create Account</h3>
        <p className="text-fade">Sign Up to continue using the WPfavs</p>
      </div>
      <form className="signin-form" onSubmit={handlesubmitsignup(signupSubmit)}>
        <div className="form-group">
          <span className="form-icon">
            <Image alt="" src={UserIcon} />
          </span>
          <input
            className="form-control"
            type="text"
            placeholder="Enter your username"
            autoComplete="off"
            {...registersignup("username", {
              onChange: (e) => setusername(e.target.value),
            })}
          />
        </div>
        <span style={{ color: "red" }}> {errors?.username?.message}</span>
        <div className="form-group">
          <span className="form-icon">
            <Image alt="" src={MailIcon} />
          </span>
          <input
            className="form-control"
            type="email"
            placeholder="yourmail@gmail.com"
            autoComplete="off"
            {...registersignup("email", {
              onChange: (e) => setEmail(e.target.value),
            })}
          />
        </div>
        <span style={{ color: "red" }}> {errors?.email?.message}</span>
        <div className="form-group">
          <span className="form-icon">
            <Image alt="" src={LockIcon} />
          </span>
          <input
            className="form-control"
            type={passwordvisiblity === true ? "text" : "password"}
            placeholder="Enter your password"
            autoComplete="off"
            {...registersignup("password", {
              onChange: (e) => setPassword(e.target.value),
            })}
          />

          <span className="form-icon password-eye">
            <Image
              alt=""
              src={EyeIcon}
              onClick={() => {
                setpasswordVisibility(!passwordvisiblity);
              }}
            />
          </span>
        </div>
        <span style={{ color: "red" }}> {errors?.password?.message}</span>
        <div className="mt-4">
          <button className="btn btn-primary btn-wd-100" type="submit">
            Register
          </button>
        </div>
        <div className="or-devider">
          <span>or</span>
        </div>
        <div className="social-login">
          <Link href="/">
            <a
              className="btn border-bg"
              onClick={() => {
                cookie.set("social", "google");
                cookie.set("pages", "signup");

                signIn("google");
              }}
            >
              <span className="social-login-icon">
                <Image src={GoogleIcon} alt="" />
              </span>
              Continue with Google
            </a>
          </Link>
          <Link href="/">
            <a
              className="btn border-bg"
              onClick={() => {
                cookie.set("social", "facebook");

                cookie.set("pages", "signup");
                signIn("facebook");
              }}
            >
              <span className="social-login-icon">
                <Image src={FacebookIcon} alt="" />
              </span>
              Continue with Facebook
            </a>
          </Link>
          <Link href="/">
            <a
              className="btn border-bg"
              onClick={() => {
                cookie.set("social", "github");

                cookie.set("pages", "signup");
                signIn("github");
              }}
            >
              <span className="social-login-icon">
                <Image src={GithubIcon} alt="" />
              </span>
              Continue with Github
            </a>
          </Link>
        </div>
      </form>
    </>
  );
};

export default Signup;
