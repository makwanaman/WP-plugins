import React from "react";

const EntryHeader = (data) => {
  const dateFunction = (date) => {
    const data = new Date(date);
    let dateFormat = data.toString().split(" ");
    return `${dateFormat[2]} ${dateFormat[1]}`;
  };
  return (
    <>
      <div className="entry-header">
        <div className="container text-center border-top-fade entry-header-box">
          <div className="row">
            <div className="col-lg-1 "></div>
            <div className="col-lg-10 ">
              <h1 className="f-50">
                <span className="after-heading">
                  {data?.blogState?.page_title}
                </span>
              </h1>
              <div className="f-20 text-fade">
                {dateFunction(data?.blogState?.posts?.created_at)}
              </div>
            </div>
            <div className="col-lg-1 "></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EntryHeader;
