import { useMemo } from 'react';

const range = (start, end) => {
  let length = end - start + 1;
  return Array.from({ length }, (_, idx) => idx + start);
};

export const usePagination = ({
  totalDataCount,
  pageSize,
  siblingCount = 1,
  currentPage,
}) => {
  const paginationRange = useMemo(() => {
    const totalPageCount = Math.ceil(totalDataCount / pageSize);

    // Pages count is determined as siblingCount + firstPage + lastPage + currentPage
    const totalPageNumbers = siblingCount + 3;


    // If the number of pages is less than the page numbers we want to show in our
    // paginationComponent, we return the range [1..totalPageCount]
    if (totalPageNumbers >= totalPageCount) {
      return range(1, totalPageCount);
    }

    let itemCount = 3;
    let itemrange = range(1, itemCount);

      return [...itemrange, totalPageCount];
  }, [totalDataCount, pageSize, siblingCount]);

  return paginationRange;
};