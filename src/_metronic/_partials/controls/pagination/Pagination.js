import React from "react";
import {PaginationLinks} from "./PaginationLinks";
import {PaginationToolbar} from "./PaginationToolbar";

export function Pagination(props) {
  const { children, isLoading, paginationProps,onPaginationSelectChange,updatingQueryParams } = props;
  return (
    <>
      {children}
      <div className="d-flex justify-content-between align-items-center flex-wrap">
        <PaginationLinks paginationProps={paginationProps} 
        updatingQueryParams={updatingQueryParams}
        />
        <PaginationToolbar
          onPaginationSelectChange={onPaginationSelectChange}
          isLoading={isLoading}
          paginationProps={paginationProps}
        />
      </div>
    </>
  );
}
