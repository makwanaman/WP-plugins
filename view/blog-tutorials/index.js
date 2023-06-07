import React from 'react'
import Header from '../../components/layout/Header';
import BlogTutorialsTemplate from './BlogTutorialsTemplate';
import EntryHeader from './EntryHeader';
import Footer from "../../components/layout/Footer";
const index = () => {
  return (
    <>
      <div className="page-Header">
        <Header />
        <EntryHeader />
      </div>
      <BlogTutorialsTemplate/>
      <Footer />
    </>
  );
}

export default index