import React from "react";
import Link from "next/link";
const PagePagination = (data) => {
  const { currentPage, pageCount, setCurrentPage, show } = data;

  const totalPages = Math.ceil(pageCount / show);
  // alert(currentPage);
  // alert(totalPages);
  const getPageRange = () => {
    const range = [];

    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || Math.abs(i - currentPage) <= 4) {
        range.push(i);
      } else if (range[range.length - 1] !== "...") {
        range.push("...");
      }
    }

    return range;
  };

  return (
    <>
      <div data-testid="num2" className="page-pagination">
        <nav>
          <ul className="pagination">
            {currentPage > 1 ? (
              <li className="page-item ">
                <span
                  className="page-link  "
                  onClick={() => {
                    setCurrentPage(currentPage - 1);
                  }}
                >
                  <i className="fa fa-chevron-left" aria-hidden="true"></i>
                </span>
              </li>
            ) : (
              ""
            )}

            {getPageRange().map((number) => {
              return (
                <li key={number}>
                  <span
                    className={
                      currentPage === number
                        ? "active-page page-link "
                        : "page-link"
                    }
                    onClick={() => {
                      if (number === "...") {
                      } else {
                        setCurrentPage(Number(number));
                      }
                    }}
                  >
                    {number}
                  </span>
                </li>
              );
            })}

            {currentPage < totalPages && totalPages > 1 && (
              <li>
                <span
                  className="page-link"
                  onClick={() => setCurrentPage(currentPage + 1)}
                >
                  <i className="fa fa-chevron-right" aria-hidden="true"></i>
                </span>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default PagePagination;
