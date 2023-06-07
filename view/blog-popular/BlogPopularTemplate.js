
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import ArrowRight from "../../public/arrow-right.svg";
import ArticleCard from '../../components/article-blogs/ArticleCard'
import ArticleCard2 from "../../components/article-blogs/ArticleCard2";
import ArticleCard3 from "../../components/article-blogs/ArticleCard3";
import BlogAltImage from "../../components/blog-tutorials-card/BlogAltImage";
import BlogAutomated from "../../components/blog-tutorials-card/BlogAutomated";
import BlogSnippetsCard from "../../components/blog-snippets/BlogSnippetsCard";
import ArticleFullWidth from "../../components/article-blogs/ArticleFullWidth";
const BlogPopularTemplate = () => {
  return (
    <>
      <section className="favlists-section pt-5 pb-5">
        <div className="container pt-5">
          <div className="row row-content pb-45">
            <div className="col-lg-12">
              <div className="flex-heading">
                <h1 className="mb-0">Popular Articles</h1>
                <Link href="/">
                  <a className="btn btn-primary discover-btn">
                    Discover All&nbsp;&nbsp;
                    <Image alt="" src={ArrowRight} />
                  </a>
                </Link>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12 col-md-12">
              <ArticleFullWidth />
            </div>
            <div className="col-lg-4 col-md-6">
              <ArticleCard />
            </div>
            <div className="col-lg-4 col-md-6">
              <ArticleCard2 />
            </div>
            <div className="col-lg-4 col-md-6">
              <ArticleCard3 />
            </div>
          </div>
          <div className="row row-content pb-45 pt-4">
            <div className="col-lg-12">
              <div className="flex-heading">
                <h1 className="mb-0">Popular Tutorials</h1>
                <Link href="/">
                  <a className="btn btn-primary discover-btn">
                    Discover All&nbsp;&nbsp;
                    <Image alt="" src={ArrowRight} />
                  </a>
                </Link>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6 col-md-12">
              <BlogAutomated />
            </div>
            <div className="col-lg-6 col-md-12">
              <BlogAltImage />
            </div>
          </div>
          <div className="row row-content pb-45 pt-4">
            <div className="col-lg-12">
              <div className="flex-heading">
                <h1 className="mb-0">Popular Snippets</h1>
                <Link href="/">
                  <a className="btn btn-primary discover-btn">
                    Discover All&nbsp;&nbsp;
                    <Image alt="" src={ArrowRight} />
                  </a>
                </Link>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6 col-md-12">
              <BlogSnippetsCard />
            </div>
            <div className="col-lg-6 col-md-12">
              <BlogSnippetsCard />
            </div>
            <div className="col-lg-6 col-md-12">
              <BlogSnippetsCard />
            </div>
            <div className="col-lg-6 col-md-12">
              <BlogSnippetsCard />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default BlogPopularTemplate;
