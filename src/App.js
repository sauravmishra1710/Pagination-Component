import React, { useState, useMemo } from 'react';
import ControlledPagination from './ControlledPagination';
import data from './data.json';
import './style.scss';

export default function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10); // default page size is 10

  const onUpdateItemsPerPage =  (pageSize) => {
    setPageSize(pageSize);
  };

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * pageSize;
    const lastPageIndex = firstPageIndex + pageSize;
    return data.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, pageSize]);

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {currentTableData.map(user => {
            return (
              <tr>
                <td>{user.id}</td>
                <td>{user.first_name + " " + user.last_name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <ControlledPagination
        className="paginationbar"
        currentPage={currentPage}
        totalCount={data.length}
        pageSize={pageSize}
        onPageChange={page => setCurrentPage(page)}
        onUpdateItemsPerPage = {onUpdateItemsPerPage}
      />
    </>
  );
}
