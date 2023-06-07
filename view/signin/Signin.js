import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import LockIcon from "../../public/lock.svg";
import MailIcon from "../../public/mail.svg";
import EyeIcon from "../../public/eye.svg";
import GoogleIcon from "../../public/google-icon.svg";
import FacebookIcon from "../../public/facebook-icon.svg";
import GithubIcon from "../../public/github-icon.svg";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import Loader from "../../components/Loader";
import cookie from "js-cookie";
const schemasignin = yup.object().shape({
  email: yup.string().email().required("E-mail must be required"),
  password: yup.string().required("password must be required"),
});
const Signin = (data) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemasignin),
  });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordvisiblity, setpasswordVisibility] = useState(false);
  const { data: session } = useSession();
  const [loaderState, setLoaderState] = useState(false);
  const router = useRouter();

  //signin function
  const handleSubmitsignin = () => {
    setLoaderState(true);
    axios
      .post(`${process.env.NEXT_PUBLIC_BASE_URL}/login`, {
        email: email,
        password: password,
      })
      .then((res) => {
        cookie.set("userName", res.data.user_data.name);
        cookie.set("access_token", res.data.access_token);

        toast.success(res.data.message);
        setLoaderState(false);
        router.push("/");
      })
      .catch((err) => {
        if (err.response.data.message) {
          toast.error(err.response.data.message);
          setLoaderState(false);
        } else {
          toast.error("error!");
          setLoaderState(false);
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
      setLoaderState(false);

      cookie.set("userName", session.user.name);
      cookie.set("access_token", session.accessToken);
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

      toast.error("error");
    }
  };

  // social login
  useEffect(() => {
    try {
      let access_token = cookie.get("access_token");

      if (!access_token) {
        if (session) {
          if (cookie.get("pages") === "signin") {
            getSocialFunction();
          }
        }
      } else {
        if (cookie.get("pages") === "signin") {
          router.push("/signin");
        }
      }
    } catch (Err) {
      // toast.error("error");
    }
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
        <h3>Welcome Back!</h3>
        <p className="text-fade">Sign In to continue using the WPfavs</p>
      </div>
      <form className="signin-form" onSubmit={handleSubmit(handleSubmitsignin)}>
        <div className="form-group">
          <span className="form-icon">
            <Image alt="" src={MailIcon} />
          </span>
          <input
            className="form-control"
            type="email"
            placeholder="yourmail@gmail.com"
            autoComplete="off"
            {...register("email", {
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
            {...register("password", {
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
        <p className="link text-right">
          <Link href="/forgot-password">
            <a>Forgot Password?</a>
          </Link>
        </p>
        <div className="mt-4">
          <button className="btn btn-primary btn-wd-100" type="submit">
            Log in
          </button>
        </div>
        <div className="or-devider">
          <span>or</span>
        </div>
        <div className="social-login">
          <Link href="">
            <a
              onClick={() => {
                cookie.set("social", "google");
                cookie.set("pages", "signin");
                signIn("google");
              }}
              className="btn border-bg"
            >
              <span className="social-login-icon">
                <Image src={GoogleIcon} alt="" />
              </span>
              Continue with Google
            </a>
          </Link>

          <Link href="/">
            <a
              onClick={() => {
                cookie.set("social", "facebook");
                cookie.set("pages", "signin");

                signIn("facebook");
              }}
              className="btn border-bg"
            >
              <span className="social-login-icon">
                <Image src={FacebookIcon} alt="" />
              </span>
              Continue with Facebook
            </a>
          </Link>
          <Link href="/">
            <a
              onClick={() => {
                cookie.set("social", "github");
                cookie.set("pages", "signin");

                signIn("github");
              }}
              className="btn border-bg"
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

export default Signin;
