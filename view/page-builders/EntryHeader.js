import React from 'react'

const EntryHeader = ({singleCategory}) => {
  return (
    <>
      <div className="entry-header">
        <div className="container text-center border-top-fade entry-header-box">
          <div className="row">
            <div className="col-lg-1 "></div>
            <div className="col-lg-10 ">
              <div></div>
              <h1 className="f-50">
                <span className="after-heading">{singleCategory?.name}</span>
              </h1>
              <div className="f-20 text-fade">
                Here you will find all plugins in the page builders.
              </div>
            </div>
            <div className="col-lg-1 "></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EntryHeader