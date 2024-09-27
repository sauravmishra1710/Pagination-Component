import React, { useState, useMemo } from 'react';
import ControlledPagination from './components/ControlledPagination';
import ProgressivePagination from './components/ProgressivePagination';
import PaginationType from './components/PaginationType';
import data from './data.json';
import './style.scss';

export default function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10); // default page size is 10
  const [paginationType, setPaginationType] = useState("Controlled"); // Controlled pagination by default

  const onUpdateItemsPerPage =  (pageSize) => {
    setPageSize(pageSize);
    setCurrentPage(1);
  };

  const onUpdatePaginationType =  (paginationType) => {
    setPaginationType(paginationType);
  };

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * pageSize;
    const lastPageIndex = firstPageIndex + pageSize;
    return data.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, pageSize]);

  return (
    <>
      <div style={{ margin: "10px", justifyContent: "center", display: "grid" }}>
        <h1>Pagination Component</h1>
      </div>
      <div style={{ margin: "10px", justifyContent: "right", display: "grid" }}>
      <h5 style={{ marginBottom: "5px"}}>Select pagination type</h5>
        <PaginationType onChangeCallback={onUpdatePaginationType}/>
      </div>
      <div style={{margin: "10px"}}>
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
        </div>
        {(paginationType === "Controlled") ? 
         <ControlledPagination
         currentPage={currentPage}
         totalDataCount={data.length}
         pageSize={pageSize}
         onPageChange={page => setCurrentPage(page)}
         onUpdateItemsPerPage = {onUpdateItemsPerPage}
       /> : <ProgressivePagination
         currentPage={currentPage}
         totalDataCount={data.length}
         pageSize={pageSize}
         onPageChange={page => setCurrentPage(page)}
         onUpdateItemsPerPage = {onUpdateItemsPerPage}
          />}
    </>
  );
}
