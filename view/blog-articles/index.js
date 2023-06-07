import React from 'react'
import Footer from '../../components/layout/Footer';
import Header from '../../components/layout/Header';
import BlogArticlesTemplate from './BlogArticlesTemplate';
import EntryHeader from './EntryHeader';

const index = () => {
  return (
    <>
      <div className="page-Header">
        <Header />
        <EntryHeader />
      </div>
      <BlogArticlesTemplate/>
      <Footer/>
    </>
  );
}

export default index