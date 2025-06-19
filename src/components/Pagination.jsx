import React, { memo } from "react";
import "../Style/Pagination.css"; // Create this CSS file (see step 2)

const LEFT_PAGE = "LEFT";
const RIGHT_PAGE = "RIGHT";

const range = (from, to, step = 1) => {
  const values = [];
  for (let i = from; i <= to; i += step) {
    values.push(i);
  }
  return values;
};

const Pagination = ({
  meta,
  pageNeighbours = 1,
  isLimitChangeable = true,
  hideDataCount,
  onPageChanged,
  numberFormatter = (num) => num,
  limitOptions = [
    { text: "5", value: 5 },
    { text: "10", value: 10 },
    { text: "20", value: 20 },
    { text: "30", value: 30 },
    { text: "50", value: 50 },
    { text: "100", value: 100 },
  ],
}) => {
  const totalPages = meta.totalPageCount;
  const pageLimit = meta.limit;
  const totalRecords = meta.totalRecords;
  const currentPage = meta.page + 1;

  if (!totalRecords || totalPages <= 1) return null;

  const gotoPage = (page) => {
    const newPage = Math.max(1, Math.min(page, totalPages)) - 1;
    onPageChanged?.({ ...meta, page: newPage });
  };

  const handleLimitChange = (e) => {
    const newLimit = Number(e.target.value);
    onPageChanged?.({
      ...meta,
      limit: newLimit,
      page: 0,
    });
  };

  const handleMoveLeft = () => {
    gotoPage(currentPage - pageNeighbours * 2 - 1);
  };

  const handleMoveRight = () => {
    gotoPage(currentPage + pageNeighbours * 2 + 1);
  };

  const fetchPageNumbers = () => {
    const totalNumbers = pageNeighbours * 2 + 3;
    const totalBlocks = totalNumbers + 2;

    if (totalPages > totalBlocks) {
      const leftBound = currentPage - pageNeighbours;
      const rightBound = currentPage + pageNeighbours;
      const beforeLastPage = totalPages - 1;

      const startPage = Math.max(2, leftBound);
      const endPage = Math.min(beforeLastPage, rightBound);

      let pages = range(startPage, endPage);
      const singleSpillOffset = totalNumbers - pages.length - 1;

      const hasLeftSpill = startPage > 2;
      const hasRightSpill = endPage < beforeLastPage;

      if (hasLeftSpill && !hasRightSpill) {
        const extraPages = range(startPage - singleSpillOffset, startPage - 1);
        pages = [LEFT_PAGE, ...extraPages, ...pages];
      } else if (!hasLeftSpill && hasRightSpill) {
        const extraPages = range(endPage + 1, endPage + singleSpillOffset);
        pages = [...pages, ...extraPages, RIGHT_PAGE];
      } else if (hasLeftSpill && hasRightSpill) {
        pages = [LEFT_PAGE, ...pages, RIGHT_PAGE];
      }

      return [1, ...pages, totalPages];
    }
    return range(1, totalPages);
  };

  const pages = fetchPageNumbers();
  const startItem = (currentPage - 1) * pageLimit + 1;
  const endItem = Math.min(currentPage * pageLimit, totalRecords);

  return (
    <div className="pagination-container">
      {(isLimitChangeable || !hideDataCount) && (
        <div className="pagination-controls">
          {isLimitChangeable && (
            <select
              value={pageLimit}
              onChange={handleLimitChange}
              className="limit-select"
            >
              {limitOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.text}
                </option>
              ))}
            </select>
          )}

          {!hideDataCount && (
            <div className="record-info">
              Showing {numberFormatter(startItem)} to {numberFormatter(endItem)}{" "}
              of {numberFormatter(totalRecords)} entries
            </div>
          )}
        </div>
      )}

      <nav className="pagination-nav">
        <ul className="pagination">
          {pages.map((page, index) => {
            if (page === LEFT_PAGE) {
              return (
                <li key={index} className="page-item">
                  <button
                    className="page-link"
                    aria-label="Previous"
                    onClick={handleMoveLeft}
                  >
                    &laquo;
                  </button>
                </li>
              );
            }

            if (page === RIGHT_PAGE) {
              return (
                <li key={index} className="page-item">
                  <button
                    className="page-link"
                    aria-label="Next"
                    onClick={handleMoveRight}
                  >
                    &raquo;
                  </button>
                </li>
              );
            }

            return (
              <li
                key={index}
                className={`page-item ${currentPage === page ? "active" : ""}`}
              >
                <button
                  className="page-link"
                  onClick={() => gotoPage(page)}
                  disabled={currentPage === page}
                >
                  {numberFormatter(page)}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default memo(Pagination);
