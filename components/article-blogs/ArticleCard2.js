import React from "react";

import Image from "next/image";

import Article1Img1 from "../../public/article1-img.svg";
import BlueArrowRight from "../../public/blue-arrow-right.svg";
import parse from "html-react-parser";
import { useRouter } from "next/router";
const ArticleCard = (data) => {
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
            <div className="article-card-img">
            {data?.article?.image ? (
              <img
                className="card-img"
                src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${data?.article?.image}`}
              />
            ) : (
              <Image alt="" src={Article1Img1} className="card-img" layout="fixed"
              objectFit="cover"
              objectPosition={"center"} />
            )}
            </div>

            <div className="card-body">
              <p className="f-14 text-fade-4 mb-2">
                {dateFunction(data?.article?.created_at)}
              </p>
              <h4 className="card-title article-hd LinesEllipsis-1">{data?.article?.title}</h4>
              <p className="auth-name">
                <span className="text-fade"> By</span>{" "}
                <span className="primary-text LinesEllipsis-1">
                  {data?.article?.author?.name}{" "}
                </span>
              </p>
              <div className="card-text text-fade truncate">
                {data?.article?.content?.replace(/(<([^>]+)>)/gi, "")}
              </div>
            </div>
          </div>
          <div className="card-footer text-center">
            <a
              className="text-white plugin-link cursor-pointer"
              onClick={() => {
                router.push(`/single-blog?slug=${data?.article?.slug}`);
              }}
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

 