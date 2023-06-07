import React, { useEffect, useState } from "react";
import Footer from "../../components/layout/Footer";
import Header from "../../components/layout/Header";
import EntryHeader from "./EntryHeader";
import SingleBlogTemplate from "./SingleBlogTemplate";
import Loader from "../../components/Loader";
import axios from "axios";
import { useRouter } from "next/router";
const Index = (data) => {
  const [blogState, setBlogState] = useState();
  const [slag, setSlag] = useState(data?.slug);

  const router = useRouter();
  useEffect(() => {
    if (!data?.slug) {
      router.push("/blog-articles");
    }
  }, []);
  useEffect(() => {
    setBlogState(data?.blogData);
  }, [data]);

  return (
    <>
      <div className="page-Header">
        <Header />
        <EntryHeader blogState={blogState} setSlag={setSlag} />
      </div>
      <SingleBlogTemplate blogState={blogState} setSlag={setSlag} />
      <Footer />
    </>
  );
};

export default Index;
