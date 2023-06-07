import React, { useEffect, useState } from "react";
import ProfileInformation from "./ProfileInformation";
import ProfileMenu from "./ProfileMenu";

const ProfileTemplate = (data) => {
  const [state, setState] = useState(false);
  const [profileName, setProfileName] = useState(
    data?.profileData?.profileData?.data?.name
  );
  const [image, setImage] = useState(
    data?.profileData?.profileData?.data?.image
  );

  useEffect(() => {
    setImage(data?.profileData?.profileData?.data?.image);
    setProfileName(data?.profileData?.profileData?.data?.name);
  }, [data]);
  return (
    <>
      <section className="profile-section">
        <div className="container pt-4">
          <div className="row">
            <div className="col-lg-12">
              <div className="profile-box">
                <div className="profile-left">
                  <ProfileMenu
                    image={image}
                    profileData={data}
                    setState={setState}
                    state={state}
                    profileName={profileName}
                    setCodeCanyan={data?.setCodeCanyan}
                    codeCanyan={data?.codeCanyan}
                  />
                </div>
                <div className="profile-right">
                  <ProfileInformation
                    setImage={setImage}
                    profileData={data}
                    setState={setState}
                    state={state}
                    setProfileName={setProfileName}
                    setCodeCanyan={data?.setCodeCanyan}
                    codeCanyan={data?.codeCanyan}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProfileTemplate;
