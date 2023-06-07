import React from 'react'
import Footer from '../../components/layout/Footer';
import Header from '../../components/layout/Header';
import BlogPopularTemplate from './BlogPopularTemplate';
import EntryHeader from './EntryHeader';

const index = () => {
  return (
    <>
      <div className="page-Header">
        <Header />
        <EntryHeader />
      </div>
      <BlogPopularTemplate />
      <Footer />
    </>
  );
}

export default index