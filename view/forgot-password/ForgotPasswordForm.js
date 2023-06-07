import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import MailIcon from "../../public/mail.svg";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import Router, { useRouter } from "next/router";
import Loader from "../../components/Loader";
import LockIcon from "../../public/lock.svg";
import EyeIcon from "../../public/eye.svg";
const schemasignin = yup.object().shape({
  email: yup.string().email().required("E-mail must be required"),
});
const schemaforgetPassword = yup.object().shape({
  code: yup.string().required("Code must be required"),
  password: yup.string().required("Password must be required"),
});
const ForgotPasswordForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schemasignin),
  });
  const {
    register: register1,
    handleSubmit: handleSubmit1,
    formState: { errors: error },
  } = useForm({
    resolver: yupResolver(schemaforgetPassword),
  });
  const [email, setEmail] = useState("");
  const [loaderState, setLoaderState] = useState(false);
  const [code, setCode] = useState();
  const [password, setPassword] = useState();
  const [state, setState] = useState(true);
  const [passwordvisiblity, setpasswordVisibility] = useState(false);
  const router=useRouter();
  const forgotPasswordFunction = async () => {
    try {
      setLoaderState(true);
      let forgotPassword = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/forgot-password`,
        {
          email: email,
        }
      );
      setLoaderState(false);
      toast.success(forgotPassword?.data?.message);
      setState(false);
      reset();
    } catch (err) {
      setLoaderState(false);
      if (err?.response?.data?.message) {
        toast.error(err?.response?.data?.message);
      } else {
        toast.error("Something Went Wrong");
      }
    }
  };

  const saveForgetPasswordForm = async () => {
    try {
      setLoaderState(true);
      let forgotsaveData = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password`,
        {
          code: code,
          password: password,
        }
      );
      setLoaderState(false);
      toast.success(forgotsaveData?.data?.message);
      router.push("/signin")
    } catch (err) {
      if (err?.response?.data?.message) {
        setLoaderState(false);
        toast.error(err?.response?.data?.message);
      } else {
        setLoaderState(false);
        toast.error("something went wrong");
      }
    }
  };
  return (
    <>
      <div className="signup-tabs">
        {loaderState === true ? (
          <div className="loader-box">
            <Loader />
          </div>
        ) : (
          ""
        )}
        <div className="text-center mb-4">
          <h3>Forgot your password?</h3>
          <p className="text-fade">
            Enter your email address below and we will send you a link where you
            can enter a new password.
          </p>
        </div>

        {state === true ? (
          <form
            className="signin-form"
            autoComplete="new-password"
            onSubmit={handleSubmit(forgotPasswordFunction)}
          >
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

            <div className="mt-4">
              <button className="btn btn-primary btn-wd-100" type="submit">
                Restore
              </button>
            </div>
          </form>
        ) : (
          <form
            className="signin-form"
            autoComplete="new-password"
            onSubmit={handleSubmit1(saveForgetPasswordForm)}
          >
            <div className="form-group">
              <span className="form-icon">
                <Image alt="" src={MailIcon} />
              </span>
              <input
                className="form-control"
                type="text"
                placeholder="Ex: Jhsdjas"
                autoComplete="off"
                {...register1("code", {
                  onChange: (e) => setCode(e.target.value),
                })}
              />
            </div>
            <span style={{ color: "red" }}> {error?.code?.message}</span>
            <div className="form-group">
              <span className="form-icon">
                <Image alt="" src={LockIcon} />
              </span>

              <input
                className="form-control"
                placeholder="Enter your password"
                type={passwordvisiblity === true ? "text" : "password"}
                id="password"
                autoComplete="off"
                {...register1("password", {
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
            <span style={{ color: "red" }}> {error?.password?.message}</span>

            <div className="mt-4">
              <button className="btn btn-primary btn-wd-100" type="submit">
                Save
              </button>
            </div>
          </form>
        )}
        <p className="link text-center mt-4">
          <span className="text-fade">No account? Just</span>&nbsp;
          <Link href="/signup">
            <a> Sign Up </a>
          </Link>
        </p>
      </div>
    </>
  );
};

export default ForgotPasswordForm;
