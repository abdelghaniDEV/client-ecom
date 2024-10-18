import "../App.css";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";

function FilterProd({
  setFetchedProducts,
  setOpenFilter,
}) {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [priceOrder, setPriceOrder] = useState("lowToHigh"); // "lowToHigh" or "highToLow"
  const [valuePrice, setValuePrice] = useState([]);
  const [Filters, setFilters] = useState([]);

  const products = useSelector((state) => state.products);


  const listSize = ["M", "S", "X", "XL", "XXL"];

  const [isDataLoaded, setIsDataLoaded] = useState(false); // تتبع استرجاع البيانات من التخزين المحلي

  useEffect(() => {
    // استرجاع الفلاتر من localStorage عند فتح المكون
    const savedCategories =
      JSON.parse(localStorage.getItem("selectedCategories")) || [];
    const savedSizes = JSON.parse(localStorage.getItem("selectedSizes")) || [];
    const savedValuePrice =
      JSON.parse(localStorage.getItem("valuePrice")) || [];
    const savedPriceOrder = localStorage.getItem("priceOrder") || "lowToHigh";
    const savedFilters = JSON.parse(localStorage.getItem("filters")) || [];

    // تعيين الحالة بناءً على القيم المسترجعة
    setSelectedCategories(savedCategories);
    setSelectedSizes(savedSizes);
    setValuePrice(savedValuePrice);
    setPriceOrder(savedPriceOrder);
    setFilters(savedFilters);

    // تأكيد تحميل البيانات
    setIsDataLoaded(true);
  }, []);

  useEffect(() => {
    
    if (isDataLoaded) {
      filterProducts();
      const handleSaveToLocalStorage = () => {
        localStorage.setItem(
          "selectedCategories",
          JSON.stringify(selectedCategories)
        );
        localStorage.setItem("selectedSizes", JSON.stringify(selectedSizes));
        localStorage.setItem("filters", JSON.stringify(Filters));
        localStorage.setItem("valuePrice", JSON.stringify(valuePrice));
        localStorage.setItem("priceOrder", priceOrder);
      };

      handleSaveToLocalStorage();
    }
  }, [
    selectedCategories,
    selectedSizes,
    valuePrice,
    priceOrder,
    isDataLoaded,
    Filters,
  ]); // إضافة isDataLoaded كجزء من التبعيات

  const handleChangePrice = () => {
    const max = document.querySelector("#max").valueAsNumber;
    const min = document.querySelector("#min").valueAsNumber;

    setValuePrice([max, min]);
  };

  const handelFilterChange = (e) => {
    const { value, checked } = e.target;
    setFilters((prev) =>
      checked ? [...prev, value] : prev.filter((cat) => cat !== value)
    );
    console.log(Filters);
  };

  const handleStockChange = (e) => {
    const { value, checked } = e.target;
    setSelectedCategories((prev) =>
      checked ? [...prev, value] : prev.filter((cat) => cat !== value)
    );
  };

  const handleSizeChange = (e) => {
    const { value, checked } = e.target;
    setSelectedSizes((prev) =>
      checked ? [...prev, value] : prev.filter((size) => size !== value)
    );
  };

  // let tempProducts = [...fetchedProducts];

  const filterProducts = () => {
    let tempProducts = [...products];

    //filter by selected Stock
    if (selectedCategories.length > 0) {
      // tempProducts = tempProducts.filter((prod) =>
      //   selectedCategories.includes('outstock') && prod.stock === 0
      // );
      tempProducts = tempProducts.filter((prod) => {
        // Check for "outstock" category and product with stock 0
        if (selectedCategories.includes('outstock') && prod.stock === 0) {
          return true;
        }
        // Check for "instock" category and product with stock > 0
        if (selectedCategories.includes('instock') && prod.stock > 0) {
          return true;
        }
        return false; // Product does not match any filter
      });
      // save in local stockage
      localStorage.setItem(
        "selectedCategories",
        JSON.stringify(selectedCategories)
      );
    }

    //Filter by selected sizes
    if (selectedSizes.length > 0) {
      tempProducts = tempProducts.filter((prod) =>
        prod.size.some((size) =>
          selectedSizes.includes(size.toUpperCase())
    )
      );
      localStorage.setItem("selectedSizes", JSON.stringify(selectedSizes));
    }

    //filter by price
    if (valuePrice.length > 0) {
      tempProducts = tempProducts.filter((prod) => {
        const price = prod.price;
        return price >= valuePrice[1] && price <= valuePrice[0];
      });
    }

    //filter by more filters

    if (Filters.length > 0) {


      // filter by selected best selling
      if (Filters.includes("Best-Selling")) {
        tempProducts = tempProducts.filter(
          (prod) => prod.better === true
        );
      }

      // filter by selected categories woman and men 
      if (Filters.includes("Fashion")) {
        tempProducts = tempProducts.filter(
          (prod) =>
            prod.category.includes("Women") ||
            prod.category.includes("Men") 
        );
      }

      // filter by selected categories Shoes
      if (Filters.includes("Shoes")) {
        tempProducts = tempProducts.filter(
          (prod) =>
            // prod.category.some((cate) => cate.name === "Shoes")
             prod.category.includes('Shoes')
        );
      }

      // filter by selected range price 
      if(Filters.includes("7-50")){
        tempProducts = tempProducts.filter((prod) =>  prod.price >= 7 && prod.price <= 50)
         
        
      }

      if(Filters.includes("50-150")){
        tempProducts = tempProducts.filter((prod) => prod.price >= 50 && prod.price <= 150)
      }
    }

    setFetchedProducts(tempProducts);

    // setOpenFilter(false)
  };

  return (
    <div className="text overflow-scroll">
      <div className=" border-b-2 ">
        <div className="flex items-center justify-between px-4 py-2 ">
          <h2 className="text-[16px] font-[500]">FILTER</h2>
          <i
            className="bx bx-x text-[30px]  cursor-pointer"
            onClick={() => setOpenFilter(false)}
          ></i>
        </div>
      </div>
      <div className="px-4">
        <div className="py-3 border-b-[1px]">
          <h3 className="font-[500]">Availability</h3>
          <div className="flex flex-col gap-2 pt-[16px] pl-2">
            <div className="flex items-center">
              <div className="relative">
                <input
                  type="checkbox"
                  value="instock"
                  className="custom-checkbox"
                  onChange={handleStockChange}
                  checked={selectedCategories.includes("instock")}
                />
                <i className="bx bx-check absolute top-0 right-[2px] text-white pointer-events-none font-[600]"></i>
              </div>
              <label className="ml-3 text-[16px]  text-[#767676]">
                In stock
              </label>
            </div>
            <div className="flex items-center">
              <div className="relative">
                <input
                  type="checkbox"
                  value="outstock"
                  className="custom-checkbox"
                  onChange={handleStockChange}
                  checked={selectedCategories.includes("outstock")}
                />
                <i className="bx bx-check absolute top-0 right-[2px] text-white pointer-events-none font-[600]"></i>
              </div>
              <label className="ml-3 text-[16px]  text-[#767676]">
                Out Of stock
              </label>
            </div>
          </div>
          {/* Add more sizes as needed */}
        </div>
        <div className="py-3 border-b-[1px]">
          <h3 className="font-[500]">Size:</h3>
          <div className="flex flex-col gap-2 pt-[16px] pl-2">
            {listSize.map((size , index) => {
              return (
                <div className="flex items-center" key={index}>
                  <div className="relative">
                    <input
                      type="checkbox"
                      value={size}
                      className="custom-checkbox"
                      onChange={handleSizeChange}
                      checked={selectedSizes.includes(size)}
                    />
                    <i className="bx bx-check absolute top-0 right-[2px] text-white pointer-events-none font-[600]"></i>
                  </div>
                  <label className="ml-3 text-[16px]  text-[#767676]">
                    {size}
                  </label>
                </div>
              );
            })}
          </div>
          {/* Add more sizes as needed */}
        </div>
        <div className="py-3 border-b-[1px]">
          <h3 className="font-[500]">Price:</h3>
          <div className=" pt-[16px]">
            <div className="flex gap-4">
              <div className="">
                <label className="pr-2 text-[14px]">MAX</label>
                <input
                  defaultValue={valuePrice[0] == null ? 1200 : valuePrice[0]}
                  placeholder="max"
                  type="number"
                  className="w-[100px] border-[1px] pl-2 text-[#767676]  outline-none"
                  id="max"
                  onChange={handleChangePrice}
                />
              </div>
              <div>
                <label className="pr-2 text-[14px]">MIN</label>
                <input
                  type="number"
                  className="w-[100px] border-[1px] pl-2 text-[#767676] outline-none"
                  id="min"
                  onChange={handleChangePrice}
                  defaultValue={valuePrice[1] == null ? 1 : valuePrice[1]}
                  placeholder="min"
                />
              </div>
            </div>
          </div>
          {/* Add more sizes as needed */}
        </div>
        <div className="py-3 border-b-[1px]">
          <h3 className="font-[500]">More Filters</h3>
          <div className="flex flex-col gap-2 pt-[16px] pl-2">
            <div className="flex items-center">
              <div className="relative">
                <input
                  type="checkbox"
                  value="Best-Selling"
                  className="custom-checkbox"
                  onChange={handelFilterChange}
                  checked={Filters.includes("Best-Selling")}
                />
                <i className="bx bx-check absolute top-0 right-[2px] text-white pointer-events-none font-[600]"></i>
              </div>
              <label className="ml-3 text-[16px]  text-[#767676]">
                Best Selling
              </label>
            </div>
            <div className="flex items-center">
              <div className="relative">
                <input
                  type="checkbox"
                  value="Fashion"
                  className="custom-checkbox"
                  onChange={handelFilterChange}
                  checked={Filters.includes("Fashion")}
                />
                <i className="bx bx-check absolute top-0 right-[2px] text-white pointer-events-none font-[600]"></i>
              </div>
              <label className="ml-3 text-[16px]  text-[#767676]">
                Fashion
              </label>
            </div>
            <div className="flex items-center">
              <div className="relative">
                <input
                  type="checkbox"
                  value="Shoes"
                  className="custom-checkbox"
                  onChange={handelFilterChange}
                  checked={Filters.includes("Shoes")}
                />
                <i className="bx bx-check absolute top-0 right-[2px] text-white pointer-events-none font-[600]"></i>
              </div>
              <label className="ml-3 text-[16px]  text-[#767676]">Shoes</label>
            </div>
            <div className="flex items-center">
              <div className="relative">
                <input
                  type="checkbox"
                  value="7-50"
                  className="custom-checkbox"
                  onChange={handelFilterChange}
                  checked={Filters.includes("7-50")}
                />
                <i className="bx bx-check absolute top-0 right-[2px] text-white pointer-events-none font-[600]"></i>
              </div>
              <label className="ml-3 text-[16px]  text-[#767676]">
                Price $7-$50
              </label>
            </div>
            <div className="flex items-center">
              <div className="relative">
                <input
                  type="checkbox"
                  value="50-150"
                  className="custom-checkbox"
                  onChange={handelFilterChange}
                  checked={Filters.includes("50-150")}
                />
                <i className="bx bx-check absolute top-0 right-[2px] text-white pointer-events-none font-[600]"></i>
              </div>
              <label className="ml-3 text-[16px]  text-[#767676]">
                Price $50-$150
              </label>
            </div>
          </div>
          {/* Add more sizes as needed */}
        </div>
      </div>
    </div>
  );
}

export default FilterProd;
