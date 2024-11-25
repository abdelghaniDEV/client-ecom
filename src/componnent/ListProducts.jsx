import React, { useEffect, useState } from "react";
import AddtoCart from "./AddtoCart";
import ProductCart from "./ProductCart";
import { current } from "@reduxjs/toolkit";
import Notification from "./Notification";
import ReactPaginate from "react-paginate";
import Skeleton from "./Skeleton";

function ListProducts({ products }) {
  const [currentPage, setCurrentPage] = useState(0);
  //paginastion
  const itemsPerPage = 15;

  const offset = currentPage * itemsPerPage;
  const currentProducts = products.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(products.length / itemsPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  

  console.log("products", products);

  return (
    <div>
      {products.length > 0 ? (
        <div className="grid grid-cols-2 gap-3 md:gap-6 container mx-auto md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 relative">
          {currentProducts.map((item) => {
            return <ProductCart key={item._id} product={item} />;
          })}
          <AddtoCart />
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 md:gap-6 container mx-auto md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 relative">
          {Array.from({ length: 10 }).map((_, index) => (
            <div key={index} className="flex flex-col gap-3 w-[200px]">
              <Skeleton className="h-[260px]" />
              <Skeleton className="h-5" />
              <div className="flex gap-4">
                <Skeleton className="h-5 w-[100px]" />
                <Skeleton className="h-5 w-[80px]" />
              </div>
            </div>
          ))}
        </div>
      )}{" "}
      <div>
        <ReactPaginate
          previousLabel={"Prev"}
          nextLabel={"Next"}
          breakLabel={"..."}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={
            "flex justify-center items-center mt-4 space-x-2 "
          }
          pageClassName={
            "px-3 py-1 border rounded hover:bg-[#b58df2] hover:text-white"
          }
          previousClassName={"px-3 py-1 border rounded"}
          nextClassName={"px-3 py-1 border rounded"}
          breakClassName={"px-3 py-1"}
          activeClassName={"bg-[#b58df2] text-white"}
          disabledClassName={"opacity-50 cursor-not-allowed"}
        />
      </div>
    </div>
  );
}

export default ListProducts;
