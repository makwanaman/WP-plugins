import React from "react";
import Home from "../../view/home/index";

const Index = (data) => {
  return (
    <>
      <Home
        posts={data?.posts}
        errorMessage={data?.errorMessage}
        pluginList={data?.pluginList}
        topListCategory={data?.topListCategory}
        topList={data?.topList}
        wpListShow={data?.wpListShow}
        setWpListShow={data?.setWpListShow}
      />
    </>
  );
};

export default Index;
