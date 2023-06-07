import React from 'react'
import Header from '../../components/layout/Header';
import BlogSnipptesTemplate from './BlogSnipptesTemplate';
import EntryHeader from './EntryHeader';
import Footer from "../../components/layout/Footer";
const index = () => {
  return (
    <>
      <div className="page-Header">
        <Header />
        <EntryHeader />
      </div>
      <BlogSnipptesTemplate/>
      <Footer />
    </>
  );
}

export default index