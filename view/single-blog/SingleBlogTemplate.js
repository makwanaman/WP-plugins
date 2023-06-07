import React from "react";
import "react-datepicker/dist/react-datepicker.css";
import Link from "next/link";
import Devider from "../../components/Devider";
import Image from "next/image";
import SingleBlogImg from "../../public/single-blog-img.png";

import ArticleCard2 from "../../components/article-blogs/ArticleCard2";
import parse from 'html-react-parser';
import SubscribeForm from "../../components/SubscribeForm";
const SingleBlogTemplate = (data) => {

  return (
    <>
      <section className="favlists-section pt-5 pb-5">
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
            {data?.blogState?.posts?.image?
              <div className="blog-img text-center mb-2">
                <Image alt="" src={SingleBlogImg} />
              </div>:""}
              <p className="text-fade">
     
              {parse(`
    ${data?.blogState?.posts?.content}
  `) 
  }

              </p>
             
             
   
              
             
              
            </div>
          </div>
          <div className="subscribe-form pt-5 pb-5">
            <SubscribeForm />
          </div>
          <div className="ralated-blogs">
            <div className="row row-content pb-45">
              <div className="col-lg-12">
                <div className="flex-heading">
                  <h1 className="mb-0">Related Posts</h1>
                </div>
              </div>
            </div>
            <div className="row row-content">
              {data?.blogState?.posts_related?.map((res)=>
              {return(
                <div className="col-lg-4 col-md-6">
                <ArticleCard2 article={res} setSlag={data.setSlag}/>
              </div>
              )



              }


)
                       


              }
            
            
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default SingleBlogTemplate;
