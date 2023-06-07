import React, { useState, useEffect } from "react";
import Devider from "../../components/Devider";

import Image from "next/image";
import PayPlus from "../../public/pay-plus.svg";
import ModalCloseIcon from "../../public/modal-close-icon.svg";
import { Modal } from "reactstrap";
import { usePaymentInputs } from "react-payment-inputs";
import images from "react-payment-inputs/images";
import cookie from "js-cookie";
import { useRouter } from "next/router";

import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import axios from "axios";
import Discover from "../../public/discover.svg";
import emericanexpress from "../../public/emericanexpress.svg";

import mestro from "../../public/mestro.svg";
import unionpay from "../../public/unionpay.svg";
import visa from "../../public/visa.svg";

const ERROR_MESSAGES = {
  emptyCardNumber: "empty card number",
  invalidCardNumber: "invalid card number",
  emptyExpiryDate: "empty expiry date",
  monthOutOfRange: "The expiration month must be between 01 and 12",
  yearOutOfRange: "The expiration year cannot be in the past",
  dateOutOfRange: "The expiration date cannot be in the past",
  invalidExpiryDate: "invalid expiry date",
  emptyCVC: "empty cvc",
  invalidCVC: "invalid cvc",
};

const Subscription = (data) => {
  const {
    meta,
    getCardImageProps,
    getCardNumberProps,
    getExpiryDateProps,
    getCVCProps,
  } = usePaymentInputs({
    errorMessages: ERROR_MESSAGES,
  });

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [cardName, setCardName] = useState();
  const [cardNumber, setCardNumber] = useState();
  const [expiryDate, setExpiryDate] = useState();
  const [cvv, setCvv] = useState();
  const router = useRouter();
  const [planId, setPlanId] = useState(process.env.NEXT_PUBLIC_WPFAVS_MAIN);
  const [planType, setPlanType] = useState("wpfavs_main");
  const [loaderState, setLoaderState] = useState(false);

  const [cardDetails, setCardDetails] = useState();
  const [popupShow, setPopupShow] = useState();
  const [stateChange, setStateChange] = useState(false);
  const [stateData, setStateData] = useState("blank");

  const getCardDetails = async () => {
    try {
      let access_token = cookie.get("access_token");

      if (access_token) {
        setLoaderState(true);
        let getCardDetails = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/get-card-list`,
          {
            headers: {
              Authorization: access_token,
            },
          }
        );
        setCardDetails(getCardDetails?.data?.data?.data);
        setLoaderState(false);
      }
    } catch (err) {
      setLoaderState(false);
      console.log("error", err);
    }
  };
  const getAllUsers = async () => {
    try {
      let access_token = cookie.get("access_token");
      if (access_token) {
        setLoaderState(true);
        let getAllProfile = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/get-profile`,
          {
            headers: {
              Authorization: access_token,
            },
          }
        );

        data.setStripeCustomerId(getAllProfile?.data?.data?.stripe_id);

        data.setGrace(getAllProfile?.data?.data?.check_onGracePeriod);
        data.setSubscriptionToPlan(
          getAllProfile?.data?.data?.check_subscribedToPlan
        );
        setLoaderState(false);
      }
    } catch (err) {
      setLoaderState(false);
      console.log("err", err);
    }
  };

  const subscriptionData = async (access_token, data) => {
    try {
      setLoaderState(true);
      let subscriptionData = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/subscription`,
        {
          plan_id: planId,
          plan_type: planType,
          ...data,
        },
        {
          headers: {
            Authorization: access_token,
          },
        }
      );

      getAllUsers();
      getCardDetails();
      setLoaderState(false);
      setModalIsOpen(false);
      setCardName("");
      setCardNumber("");
      setExpiryDate("");
      setCvv("");
    } catch (err) {
      setLoaderState(false);
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

  const getAccessToken = () => {
    try {
      let withoutSpace = cardNumber.replace(/ /g, "");

      const dataMonth = expiryDate.split("/");
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
      myHeaders.append(
        "Authorization",

        `Bearer ${process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY}`
      );

      var urlencoded = new URLSearchParams();
      urlencoded.append("card[number]", withoutSpace);
      urlencoded.append("card[exp_month]", Number(dataMonth[0]));
      urlencoded.append("card[exp_year]", Number(dataMonth[1]));
      urlencoded.append("card[cvc]", cvv);
      urlencoded.append("type", "card");
      var requestOptions1 = {
        method: "POST",
        headers: myHeaders,
        body: urlencoded,
        redirect: "follow",
      };

      fetch("https://api.stripe.com/v1/payment_methods", requestOptions1)
        .then((response) => response.text())
        .then(async (result) => {
          const data = JSON.parse(result);

          if (!data.error) {
            let access_token = cookie.get("access_token");
            if (access_token) {
              subscriptionData(access_token, data);
            } else {
              router.push("/signin");
            }
          } else {
            toast.error(data?.error?.code);
          }
        })
        .catch((err) => {
          toast.error("Something went wrong");
        });
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  const addCardData = async (access_token, data) => {
    try {
      setLoaderState(true);
      let subscriptionData = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/add-card-details`,
        {
          ...data,
        },
        {
          headers: {
            Authorization: access_token,
          },
        }
      );
      getCardDetails();
      setModalIsOpen(false);
      setCardName("");
      setCardNumber("");
      setExpiryDate("");
      setCvv("");
      setLoaderState(false);
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
  const addCard = () => {
    try {
      let withoutSpace = cardNumber.replace(/ /g, "");

      const dataMonth = expiryDate.split("/");
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
      myHeaders.append(
        "Authorization",

        `Bearer ${process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY}`
      );

      var urlencoded = new URLSearchParams();
      urlencoded.append("card[number]", withoutSpace);
      urlencoded.append("card[exp_month]", Number(dataMonth[0]));
      urlencoded.append("card[exp_year]", Number(dataMonth[1]));
      urlencoded.append("card[cvc]", cvv);
      urlencoded.append("type", "card");
      var requestOptions1 = {
        method: "POST",
        headers: myHeaders,
        body: urlencoded,
        redirect: "follow",
      };

      fetch("https://api.stripe.com/v1/payment_methods", requestOptions1)
        .then((response) => response.text())
        .then(async (result) => {
          const data = JSON.parse(result);

          if (!data.error) {
            let access_token = cookie.get("access_token");
            if (access_token) {
              addCardData(access_token, data);
            } else {
              router.push("/signin");
            }
          } else {
            toast.error(data?.error?.code);
          }
        })
        .catch((err) => {
          toast.error("Something went wrong");
        });
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  const handleAddCard = () => {
    if (!cardNumber || !cardName || !expiryDate || !cvv) {
      toast.error("fill all the information");
    } else if (popupShow === "subscribe") {
      getAccessToken();
    } else if (popupShow === "addCard") {
      addCard();
    }
  };

  const subscriptionOperation = async (plantype) => {
    try {
      setLoaderState(true);
      let access_token = cookie.get("access_token");
      if (access_token) {
        let cancelSubscription = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/subscribe`,
          {
            plan: plantype,
          },
          {
            headers: {
              Authorization: access_token,
            },
          }
        );
        getAllUsers();
        setLoaderState(false);
        toast.success(`${plantype} Subscription SuccessFully`);
      } else {
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

  const swapSubscription = async (plan_id, plantype) => {
    try {
      setLoaderState(true);
      let access_token = cookie.get("access_token");
      if (access_token) {
        if (plan_id) {
          let cancelSubscription = await axios.post(
            `${process.env.NEXT_PUBLIC_BASE_URL}/subscribe`,
            {
              plan: "swap",
              plan_id: plan_id,
              plan_type: plantype,
            },
            {
              headers: {
                Authorization: access_token,
              },
            }
          );
          getAllUsers();
          setLoaderState(false);
          toast.success("swap Subscription SuccessFully");
        } else {
          setLoaderState(false);
          toast.error("Plan id not found");
        }
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
  const deleteCard = async (id) => {
    try {
      setLoaderState(true);
      let access_token = cookie.get("access_token");
      if (access_token) {
        let cancelSubscription = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/delete-card`,
          {
            payment_method_id: id,
          },
          {
            headers: {
              Authorization: access_token,
            },
          }
        );
        setLoaderState(false);
        getCardDetails();
        toast.success("Delete card SuccessFully");
      } else {
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
    if (data?.stripeCustomerId !== null) {
      getCardDetails();
    }
  }, [data?.stripeCustomerId]);

  return (
    <>
      <div className="subscription-tab">
        {loaderState === true ? (
          <div className="loader-box">
            <Loader />
          </div>
        ) : (
          ""
        )}
        <h4 className="">Subscription</h4>
        <div className="user-profile-devider">
          <Devider />
        </div>
        <div className="subscribe-box">
          <p>Please choose the plan that more suits you below:</p>
          <div className="subscribe-box-container">
            {/* Free Start */}
            {data?.subscribedToPlan == null ? (
              <div className="subscribe-active">
                <input
                  type="radio"
                  id="subscribe-one"
                  name="subscribe-radio"
                  defaultChecked
                  onClick={() => {
                    setStateData("blank");
                  }}
                />
                <div
                  className={
                    stateData === "blank"
                      ? "subscribe-card cursor-pointer active"
                      : "subscribe-card cursor-pointer"
                  }
                >
                  <div className="subscribe-header">
                    <div className="f-18">Free</div>
                    <div className="subscribe-rate">$0/month</div>
                  </div>
                  <div className="subscribe-btn"></div>
                </div>
              </div>
            ) : (
              ""
            )}

            {/* Bignner Start */}
            <div
              className={`${
                data?.subscribedToPlan !== undefined
                  ? "subscribe-active subscribe-width"
                  : "subscribe-active"
              }`}
            >
              <input
                type="radio"
                id="subscribe-one"
                name="subscribe-radio"
                defaultChecked
                onClick={() => {
                  setPlanType("wpfavs_main");
                  setStateChange(false);
                  setStateData("true");
                  setPlanId(process.env.NEXT_PUBLIC_WPFAVS_MAIN);
                }}
              />
              <div
                className={
                  stateData === "true"
                    ? "subscribe-card cursor-pointer active"
                    : "subscribe-card cursor-pointer"
                }
              >
                <div className="subscribe-header">
                  <div className="f-18">Beginner</div>
                  <div className="f-12 text-fade">31 days</div>
                  <div className="subscribe-rate">$10/month</div>
                </div>
                <div className="subscribe-btn">
                  {data.stripeCustomerId === null ? (
                    <button
                      className="btn btn-primary"
                      type="button"
                      onClick={(e) => {
                        setPlanType("wpfavs_main");

                        setStateChange(false);
                        setStateData("true");
                        setPlanId(process.env.NEXT_PUBLIC_WPFAVS_MAIN);
                        setPopupShow("subscribe");
                        setModalIsOpen(true);
                      }}
                    >
                      Subscribe
                    </button>
                  ) : data?.subscribedToPlan === "wpfavs_main" &&
                    data?.grace !== "1" ? (
                    <button
                      className="btn border-bg text-white"
                      type="button"
                      onClick={() => {
                        setPlanType("wpfavs_main");
                        setStateChange(false);
                        setStateData("true");
                        subscriptionOperation("cancel");
                      }}
                    >
                      Cancel Subscription
                    </button>
                  ) : data?.subscribedToPlan === "wpfavs_main" &&
                    data?.grace === "1" ? (
                    <button
                      className="btn btn-primary"
                      type="button"
                      onClick={(e) => {
                        setPlanType("wpfavs_main");
                        setStateChange(false);
                        setStateData("true");
                        subscriptionOperation("resume");
                      }}
                    >
                      Resume Subscription
                    </button>
                  ) : data?.subscribedToPlan === "wpfavs_yearly" ? (
                    <button
                      className="btn btn-primary"
                      type="button"
                      onClick={(e) => {
                        setPlanType("wpfavs_main");
                        setStateChange(false);
                        setStateData("true");
                        swapSubscription(
                          process.env.NEXT_PUBLIC_WPFAVS_MAIN,
                          "wpfavs_main"
                        );
                      }}
                    >
                      Swap Subscription
                    </button>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>

            {/* Professional Plan start */}
            <div
              className={`${
                data?.subscribedToPlan !== undefined
                  ? "subscribe-active subscribe-width"
                  : "subscribe-active"
              }`}
            >
              <input
                type="radio"
                id="subscribe-two"
                name="subscribe-radio"
                onClick={() => {
                  setPlanType("wpfavs_yearly");
                  setStateData("false");
                  setStateChange(true);
                  setPlanId(process.env.NEXT_PUBLIC_WPFAVS_YEARLY);
                }}
              />
              <div
                className={
                  stateData === "false"
                    ? "subscribe-card cursor-pointer active"
                    : "subscribe-card cursor-pointer"
                }
              >
                <div className="subscribe-header">
                  <div className="f-18">Professional</div>
                  <div className="f-12 text-fade">365 days</div>
                  <div className="subscribe-rate">
                    $99/year
                    <div className="f-12 text-fade">2 months free</div>
                  </div>
                </div>
                <div className="subscribe-btn">
                  {data.stripeCustomerId === null ? (
                    <button
                      className="btn btn-primary"
                      type="button"
                      onClick={(e) => {
                        setPlanType("wpfavs_yearly");
                        setStateData("false");
                        setStateChange(true);
                        setPlanId(process.env.NEXT_PUBLIC_WPFAVS_YEARLY);
                        setPopupShow("subscribe");
                        setModalIsOpen(true);
                      }}
                    >
                      Subscribe
                    </button>
                  ) : data.subscribedToPlan === "wpfavs_yearly" &&
                    data.grace !== "1" ? (
                    <button
                      type="button"
                      className="btn border-bg text-white"
                      onClick={() => {
                        setPlanType("wpfavs_yearly");
                        setStateData("false");
                        setStateChange(true);
                        subscriptionOperation("cancel");
                      }}
                    >
                      Cancel Subscription
                    </button>
                  ) : data.subscribedToPlan === "wpfavs_yearly" &&
                    data.grace === "1" ? (
                    <button
                      className="btn btn-primary"
                      type="button"
                      onClick={(e) => {
                        setPlanType("wpfavs_yearly");
                        setStateData("false");
                        setStateChange(true);
                        subscriptionOperation("resume");
                      }}
                    >
                      Resume Subscription
                    </button>
                  ) : data.subscribedToPlan === "wpfavs_main" ? (
                    <button
                      className="btn btn-primary"
                      type="button"
                      onClick={(e) => {
                        setPlanType("wpfavs_yearly");
                        setStateData("false");
                        setStateChange(true);
                        swapSubscription(
                          process.env.NEXT_PUBLIC_WPFAVS_YEARLY,
                          "wpfavs_yearly"
                        );
                      }}
                    >
                      Upgrade Subscription
                    </button>
                  ) : (
                    ""
                  )}
                  {/* <button className="btn btn-primary">Subscribe</button> */}
                </div>
              </div>
            </div>
          </div>
          <p className="text-fade font-wt-300">
            Become a premium user and create unlimited Wp Favs with unlimited
            plugins. Also upload custom plugins and Codecanyon plugins to your
            collections.
          </p>
          <Devider />
          {/* <div className="enable-renew-box">
            <div className="renew-toggle">
              <label className="switch">
                <input type="checkbox" defaultChecked />
                <span className="slider round"></span>
              </label>
            </div>
            <p className="font-wt-300 mb-3 ">Enable auto renew</p>
            <p className="font-wt-300 text-fade text-fade">
              Auto-renewals are typically monthly or annual, and the customer is
              notified before or after the billing.
            </p>
            <Devider />
          </div> */}
          {data.stripeCustomerId !== null ? (
            <div className="payment-method">
              <div className="subscribe-box-container">
                {cardDetails?.map((card) => {
                  return (
                    <div className="payment-card subscribe-active">
                      <input
                        type="radio"
                        id="payment-one"
                        name="payment-radio"
                        defaultChecked
                      />

                      <div className="subscribe-card cursor-pointer">
                        <div className="subscribe-header">
                          <div className="f-12 text-fade">
                            {card?.card?.funding}
                          </div>
                          <div
                            className="subscribe-rate"
                            onClick={() => {
                              deleteCard(card?.id);
                            }}
                          >
                            <div className="f-12 text-fade dot-size">-</div>
                          </div>
                        </div>
                        <div className="payment-card-footer">
                          <div className="pay-card-info">
                            <span className="line-ht-0">
                              {card?.card?.brand === "visa" && (
                                <Image alt="" src={visa} />
                              )}
                              {card?.card?.brand === "discover" && (
                                <Image alt="" src={Discover} />
                              )}
                              {card?.card?.brand === "amex" && (
                                <Image alt="" src={emericanexpress} />
                              )}
                              {card?.card?.brand === "mastercard" && (
                                <Image alt="" src={mestro} />
                              )}
                              {card?.card?.brand === "unionpay" && (
                                <Image alt="" src={unionpay} />
                              )}
                              {card?.card?.brand === "" && (
                                <Image alt="" src={mestro} />
                              )}
                            </span>
                            <span className="text-fade f-16">
                              **** **** ****{card?.card?.last4}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}

                <div
                  className="payment-card subscribe-active"
                  onClick={() => {
                    setPopupShow("addCard");
                    setModalIsOpen(true);
                  }}
                >
                  <input type="radio" id="payment-three" name="payment-radio" />
                  <div className="subscribe-card cursor-pointer add-card">
                    <Image alt="" src={PayPlus} />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      {/* payment modal */}

      <div className="payment-modal">
        <Modal isOpen={modalIsOpen} className="add-payment-box">
          <div className="payment-modal-header">
            <div className="f-18 payment-hd pb-4">
              <span>Add a new card </span>
              <span
                className="cursor-pointer modal-close"
                onClick={() => setModalIsOpen(false)}
              >
                <Image alt="" src={ModalCloseIcon} />
              </span>
            </div>
          </div>
          <Devider />
          <form className="add-card-info"></form>

          <form className="form-inline add-payment-form api-link-form">
            <div className="payment-form-box f-14 text-fade">
              <div className="payment-form-left">
                <label>CARD NUMBER</label>
                <div className=" hero-form d-flex justify-content-start align-items-center pl-3 hero-form ">
                  <svg
                    className=" top-3 right-3"
                    {...getCardImageProps({ images })}
                  />

                  <input
                    className="form-control icon-input"
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    {...getCardNumberProps({
                      onChange: (e) => {
                        setCardNumber(e.target.value);
                      },
                    })}
                  />
                </div>
                <label>NAME ON CARD</label>
                <div className="form-group hero-form">
                  <input
                    className="form-control"
                    type="text"
                    // placeholder="Jonathan Bowie"
                    placeholder="name on Card"
                    onChange={(e) => {
                      setCardName(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="payment-form-right">
                <div className="mob-pay">
                  <label>EXPIRY</label>
                  <div className="form-group hero-form">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="MM/YYYY"
                      {...getExpiryDateProps({
                        onChange: (e) => {
                          setExpiryDate(e.target.value);
                        },
                      })}
                    />
                  </div>
                </div>
                <div className="mob-pay">
                  <label>CVV</label>
                  <div className="form-group hero-form">
                    <input
                      className="form-control"
                      type="number"
                      placeholder=""
                      {...getCVCProps({
                        onChange: (e) => {
                          setCvv(e.target.value);
                        },
                      })}
                    />
                  </div>
                </div>
              </div>
            </div>
            <small style={{ color: "red" }}>{meta?.error}</small>
            <div className="payment-btn">
              {popupShow === "subscribe" ? (
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={handleAddCard}
                >
                  Subscribe & Add card
                </button>
              ) : (
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={handleAddCard}
                >
                  Add Card
                </button>
              )}
              <button
                type="button"
                onClick={() => {
                  setModalIsOpen(false);
                }}
                className="btn border-bg text-white"
              >
                Cancel
              </button>
            </div>
          </form>
        </Modal>
      </div>
    </>
  );
};

export default Subscription;
