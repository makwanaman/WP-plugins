import React from "react";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import EntryHeader from "./EntryHeader";
import NewWpfavsTemplate from "./NewWpfavsTemplate";
import { useRouter } from "next/router";
const Index = (props) => {
  const router = useRouter();

  return (
    <>
      <div className="page-Header">
        <Header />
        <EntryHeader />
      </div>
      <NewWpfavsTemplate id={router.query.id} />
      <Footer />
    </>
  );
};

export default Index;
