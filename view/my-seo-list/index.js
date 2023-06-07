import React, { useState, useEffect } from "react";
import Footer from "../../components/layout/Footer";
import Header from "../../components/layout/Header";
import EntryHeader from "./EntryHeader";
import SeoListTemplate from "./SeoListTemplate";
import axios from "axios";
import { useRouter } from "next/router";
const Index = (data) => {
  const router = useRouter();
  useEffect(() => {
    if (!data?.seoList) {
      router.push("/");
    }
  });

  return (
    <>
      <div className="page-Header">
        <Header />
        <EntryHeader headerSeoList={data?.seoList} />
      </div>
      <SeoListTemplate headerSeoList={data?.seoList} />
      <Footer />
    </>
  );
};

export default Index;
