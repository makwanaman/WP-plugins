import React from "react";
import Link from "next/link";
import Image from "next/image";

import Article1Img from "../../public/article3-img.svg";
import BlueArrowRight from "../../public/blue-arrow-right.svg";
import { useRouter } from "next/router";
const ArticleCard = ({ blog }) => {
  const router = useRouter();
  const dateFunction = (date) => {
    const data = new Date(date);
    let dateFormat = data.toString().split(" ");
    return `${dateFormat[2]} ${dateFormat[1]}`;
  };
  return (
    <>
      <div className="article-card-box">
        <div className="card article-card">
          <div className="article-card-top">
            {blog?.image ? (
              <img
                className="card-img-top"
                src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${blog?.image}`}
              />
            ) : (
              <Image alt="" src={Article1Img} className="card-img-top" />
            )}
            <div className="card-body">
              <p className="f-14 text-fade-4 mb-2">
                {dateFunction(blog?.created_at)}{" "}
              </p>
              <h4 className="card-title article-hd text-white">
                <Link href={`/single-blog?slug=${blog?.slug}`}>
                  {blog?.title}
                </Link>
              </h4>
              <p className="auth-name">
                <span className="text-fade"> By</span>{" "}
                <Link
                  href={`/single-blog?slug=${blog?.slug}`}
                  className="primary-text"
                >
                  {blog?.author?.name}
                </Link>
              </p>
              <div className="card-text text-fade content-container">
                <p className="truncate">
                  {blog?.content?.replace(/(<([^>]+)>)/gi, "")}
                </p>
              </div>
            </div>
          </div>
          <div className="card-footer text-center">
            <a
              onClick={() => {
                router.push(`/single-blog?slug=${blog?.slug}`);
              }}
              className="text-white plugin-link cursor-pointer"
            >
              Read More <Image alt="" src={BlueArrowRight} />
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default ArticleCard;
