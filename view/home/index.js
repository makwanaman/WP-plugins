import React, { useEffect } from "react";
import Favs from "./Favs";
import HeorSection from "./HeorSection";
import LatestArticles from "./LatestArticles";
import TopCategory from "./TopCategory";
import TopList from "./TopList";
import WeekPlugin from "./WeekPlugin";

const Index = (data) => {
  console.log("data", data);
  return (
    <>
      <HeorSection />
      <Favs />
      <TopList errorMessage={data?.errorMessage} topList={data?.topList} />
      <WeekPlugin
        pluginList={data?.pluginList}
        wpListShow={data?.wpListShow}
        setWpListShow={data?.setWpListShow}
      />
      <TopCategory topListCategory={data?.topListCategory} />
      <LatestArticles posts={data?.posts} />
    </>
  );
};

export default Index;
