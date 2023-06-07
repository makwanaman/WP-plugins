import React, { useEffect } from "react";
import PluginPageTemplate from "./PluginPageTemplate";
import { useRouter } from "next/router";
const Index = (data) => {
  const router = useRouter();

  useEffect(() => {
    if (!data?.slug) {
      router.push("/plugin-library");
    }
  }, []);
  return (
    <>
      <PluginPageTemplate slug={data?.slug} pluginData={data} />
    </>
  );
};

export default Index;
