import React from "react";
import Image from "next/image";
import SnippetsImg from "../../public/snippets-img.svg";
import LinesEllipsis from "react-lines-ellipsis";
import parse from "html-react-parser";
const BlogSnippetsCard = (data) => {
  const text =
    "An useful code snippet that provides a ready to use Bootstrap Stats Card...";
  return (
    <>
      <div className="plugin-card-box">
        <div className="card border-bg seo-card">
          <div className="snippets-card-body">
            <div className="plugin-header">
              <div className="plugin-h-left">
                <div className="plugin-icon">
                  <img
                    className="card-img-top"
                    alt=""
                    src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${data?.snippetInfo?.image}`}
                  />
                </div>
              </div>
              <div className="plugin-h-right">
                <LinesEllipsis
                  text={data?.snippetInfo?.title}
                  maxLine="1"
                  ellipsis="..."
                  trimRight
                  basedOn="letters"
                  className="card-title mb-1 LinesEllipsis-1"
                />
                <p className="auth-name mb-1 f-14">
                  <span className="text-fade"> Level:</span>{" "}
                  <span className="primary-text LinesEllipsis-1">
                    {data?.snippetInfo?.level}
                  </span>
                </p>
                <LinesEllipsis
                  text={parse(`${data?.snippetInfo?.description}`)}
                  maxLine="2"
                  ellipsis="..."
                  trimRight
                  basedOn="letters"
                  className="text-fade f-14 mb-1"
                />
                {/* <p className="tagged-cat mb-0">
                  <span className="cat-tag-name border-bg text-fade">
                    #shop
                  </span>
                  <span className="cat-tag-name border-bg text-fade">
                    #checkout
                  </span>
                  <span className="cat-tag-name border-bg text-fade">
                    #Cashback
                  </span>
                </p> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogSnippetsCard;
