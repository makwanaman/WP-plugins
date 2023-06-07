import React, { useState } from "react";
import Image from "next/image";
import Profile from "./Profile";
import APIKey from "./APIKey";
import Subscription from "./Subscription";
import MyPlugins from "./MyPlugins";
import CodeCanyon from "./CodeCanyon";
import Invoices from "./Invoices";
import Affiliates from "./Affiliates";

const ProfileInformation = (data) => {
  const name = data?.profileData?.profileData?.profileData?.data?.name;
  const email = data?.profileData?.profileData?.profileData?.data?.email;
  const login_type =
    data?.profileData?.profileData?.profileData?.data?.login_type;
  const image = data?.profileData?.profileData?.profileData?.data?.image;
  const apikey = data?.profileData?.profileData?.profileData?.data?.api_token;
  const envantoKey =
    data?.profileData?.profileData?.profileData?.data?.envato_refresh_token;

  const stripe_customer_id =
    data?.profileData?.profileData?.profileData?.data?.stripe_id;
  const check_subscribedToPlan =
    data?.profileData?.profileData?.profileData?.data?.check_subscribedToPlan;
  const check_onGracePeriod =
    data?.profileData?.profileData?.profileData?.data?.check_onGracePeriod;
const affiliate_id=data?.profileData?.profileData?.profileData?.data?.affiliate_id;
  const [stripeCustomerId, setStripeCustomerId] = useState(stripe_customer_id);
  const [grace, setGrace] = useState(check_onGracePeriod);
  const [subscribedToPlan, setSubscriptionToPlan] = useState(
    check_subscribedToPlan
  );
  return (
    <>
      <div className="tab-content" id="v-pills-tabContent">
        <div
          className={
            data?.codeCanyan === false ? "tab-pane show active" : "tab-pane"
          }
          id="profile"
          role="tabpanel"
          aria-labelledby="profile-tab"
        >
          <Profile
            setImage={data?.setImage}
            setProfileName={data.setProfileName}
            name={name}
            email={email}
            login_type={login_type}
            image={image}
          />
        </div>
        <div
          className="tab-pane"
          id="api-key"
          role="tabpanel"
          aria-labelledby="api-key-tab"
        >
          <APIKey apikey={apikey} />
        </div>
        <div
          className="tab-pane"
          id="plugins"
          role="tabpanel"
          aria-labelledby="plugins-tab"
        >
          <MyPlugins
            setState={data.setState}
            state={data.state}
            stripeCustomerId={stripeCustomerId}
          />
        </div>
        <div
          className={
            data?.codeCanyan === true ? "tab-pane show active" : "tab-pane fade"
          }
          id="CodeCanyon"
          role="tabpanel"
          aria-labelledby="CodeCanyon-tab"
        >
          <CodeCanyon
            envantoKey={envantoKey}
            stripeCustomerId={stripeCustomerId}
          />
        </div>
        <div
          className="tab-pane"
          id="Affiliates"
          role="tabpanel"
          aria-labelledby="Affiliates-tab"
        >
          <Affiliates affiliate_id={affiliate_id} />
        </div>
        <div
          className="tab-pane"
          id="Subscription"
          role="tabpanel"
          aria-labelledby="Subscription-tab"
        >
          <Subscription
            stripeCustomerId={stripeCustomerId}
            setStripeCustomerId={setStripeCustomerId}
            grace={grace}
            setGrace={setGrace}
            subscribedToPlan={subscribedToPlan}
            setSubscriptionToPlan={setSubscriptionToPlan}
          />
        </div>
        <div
          className="tab-pane"
          id="Invoices"
          role="tabpanel"
          aria-labelledby="Invoices-tab"
        >
          <Invoices stripeCustomerId={stripeCustomerId} />
        </div>
      </div>
    </>
  );
};

export default ProfileInformation;
