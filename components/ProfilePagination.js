import React from "react";
import Link from "next/link";
const ProfilePagination = (data) => {
  const { currentpage, productCount, setCurrentPage, pageLimit } = data;

  return (
    <>
      <div className="bottom-pagination">
        <div className="text-fade f-14 ml-2">
          {currentpage} of {Math.ceil(productCount / pageLimit)} plugins
        </div>
        <nav aria-label="Page navigation">
          <ul className="pagination">
            <li className="page-item">
              <Link href="#">
                {currentpage != 1 ? (
                  <a
                    className="page-no-link border-bg text-fade"
                    onClick={() => {
                      setCurrentPage(currentpage - 1);
                    }}
                  >
                    <i className="fa fa-chevron-left" aria-hidden="true"></i>
                  </a>
                ) : (
                  ""
                )}
              </Link>
            </li>
            <li className="page-item">
              <Link href="#">
                {currentpage <= parseInt(productCount / pageLimit) ? (
                  <a
                    className="page-no-link border-bg active text-fade"
                    onClick={() => {
                      setCurrentPage(currentpage + 1);
                    }}
                  >
                    <i className="fa fa-chevron-right" aria-hidden="true"></i>
                  </a>
                ) : (
                  ""
                )}
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default ProfilePagination;
