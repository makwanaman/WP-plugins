import React from "react";
import Footer from "../../components/layout/Footer";
import Header from "../../components/layout/Header";
import EntryHeader from "./EntryHeader";
import PluginLIbraryTemplate from "./PluginLIbraryTemplate";
const Index = (search) => {
  return (
    <>
      <div className="page-Header">
        <Header />
        <EntryHeader />
      </div>
      <PluginLIbraryTemplate search={search?.search} />
      <Footer />
    </>
  );
};

export default Index;
