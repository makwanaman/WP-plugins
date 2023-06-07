import React from "react";
import PluginLibrary from "../../view/plugin-library/index";
import { useRouter } from "next/router";
const Index = () => {
  const router = useRouter();

  return (
    <>
      <PluginLibrary search={router.query.search} />
    </>
  );
};

export default Index;
