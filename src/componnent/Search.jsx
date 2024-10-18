import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Search({ setShowSearch }) {
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(true);
  const [value, setvalue] = useState();

  const products = useSelector((state) => state.products);

    useEffect(() => {}, []);
    setTimeout(() => {
      setLoading(false);
    }, 2000);

  // Filtering products based on the search input
  const handelSearch = (e) => {
    const value = e.target.value.toLowerCase().trim();
    setLoading(true);
    setvalue(value);
    const filterProducts = products.filter(
      (item) =>
        item.name.toLowerCase().includes(value) ||
        item.category[0]
          .toLowerCase()
          .includes(value)
    );
    setResult(filterProducts); // Update result state with the filtered products

    // If the search input is empty, reset the result to an empty array
    if (value == "") {
      setResult([]);
    }
  };

  return (
    <div id="cart" className="">
      <div className="flex items-center justify-between py-[10px] px-[25px] border-b-2">
        <h3>SEARCH</h3>
        <div>
          <i
            className="bx bx-x text-[35px]  h-[35px] w-[35px]     cursor-pointer"
            onClick={() => setShowSearch(false)}
          ></i>
        </div>
      </div>
      <div className="py-[10px] px-[25px]">
        <h1 className="text-[25px] pb-3 font-semibold">
          What are you trying to find?
        </h1>
        <form class="max-w-lg mx-auto">
          <div className="flex">
            <div className="relative w-full">
              <input
                onChange={handelSearch}
                type="search"
                id="search-dropdown"
                className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50  border-1 border-gray-300 focus:ring-[#F5CAAB] focus:outline-none focus:border-[#F5CAAB] dark:placeholder-gray-400 dark:text-white dark:focus:border-[#F5CAAB]"
                placeholder="Search Products, categpry, fashion , Shoes..."
                required
              />
              <button
                type="submit"
                className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-[#F5CAAB] rounded-e-lg border border-[#F5CAAB] hover:bg-[#F5CAAB] focus:ring-4 focus:outline-none "
              >
                <i className="bx bx-search h-4 w-4 text-[20px]"></i>
                <span className="sr-only">Search</span>
              </button>
            </div>
          </div>
        </form>
      </div>
      <div>
        <div className=" flex flex-col   h-[480px]  overflow-scroll pl-[25px] ">
          {result.map((item) => {
            return (
              <div key={item.id}>
                {loading ? (
                  <div
                    className="flex  rounded-lg bg-white sm:flex-row"
                    key={item._id}
                  >
                    <div className="m-2 h-24 w-28 rounded-md border border-[F5CAAB] object-cover object-center relative bg-gray-300 animate-pulse">
                      <div className="flex gap-2 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
                        <i className="bx bxs-image text-[30px] text-gray-50"></i>
                      </div>
                    </div>
                    <div className="flex w-full flex-col px-4 py-4 gap-1 ">
                      <div className="font-semibold bg-slate-300 animate-pulse w-full h-5 rounded-[20px]"></div>
                      <span className="float-right w-[60%] h-4 rounded-[20px] animate-pulse bg-slate-300"></span>
                      <p className="text-lg font-bold w-[30%] h-5 rounded-[20px] animate-pulse bg-slate-300"></p>
                    </div>
                  </div>
                ) : (
                  <div
                    className="flex items-start rounded-lg bg-white sm:flex-row"
                    key={item._id}
                  >
                    <img
                      className="m-2 w-[70px] min-h-[90px]  rounded-md border object-cover object-center"
                      src={item.image[0]}
                    />

                    <div className="flex w-full flex-col px-2 md:px-4 py-2">
                      <Link
                        to={`/product/${item._id}`}
                        className="font-semibold"
                        onClick={() => setShowSearch(false)}
                      >
                        {item.name}
                      </Link>
                      <h4 className="float-right text-[14px] text-gray-400">
                        category :{" "}
                        <span className="text-[#F5CAAB] font-semibold">
                          {" "}
                          {item.category[0]}
                        </span>
                      </h4>
                      <div className="flex gap-2 items-center">
                        <p className="text-lg font-[600] ">
                          ${item.price}
                        </p>
                        <p className="text-[14px] text-[red] line-through">
                          {item.PriceDiscount &&
                            `$${item.PriceDiscount}`}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
          {result.length === 0 && (
            <div className="text-center pt-[50%]">
              {value && <i className="bx bx-sad text-[80px] text-[#F5CAAB]"></i>}
              <p className="text-[30px]   ">
                No result found {value && `for '${value}'`}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Search;
