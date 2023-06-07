import React from "react";
import ProfileTemplate from "./ProfileTemplate";

const Index = (data) => {
  return (
    <>
      <ProfileTemplate
        setCodeCanyan={data?.setCodeCanyan}
        codeCanyan={data?.codeCanyan}
        profileData={data}
      />
    </>
  );
};

export default Index;
