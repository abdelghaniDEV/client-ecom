import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, NavLink, Route, Router, useParams } from "react-router-dom";
import ListProducts from "../componnent/ListProducts";
import { fetchProducts } from "../rtlk/slices/products-slice";
import { fetchCatrgpries } from "../rtlk/slices/categories-slice";
import FilterProd from "../componnent/FilterProd";
import { AnimatePresence, motion } from "framer-motion";

function Products() {
  const products = useSelector((state) => state.products);
  const categories = useSelector((state) => state.categories);
  const template = useSelector((state) => state.template)

  // const [fetchData, setFetchData] = useState();
  const [fetchedProducts, setFetchedProducts] = useState([]);
  const [openFilter, setOpenFilter] = useState(false);
  const [selectedCategories, setSelectedCategorie] = useState([]);
  const [selectedSizes, setSelectedSize] = useState([]);


  const { category } = useParams();

  useEffect(() => {
    const activeCategory = () => {
      const activeElement = document.querySelector(".active-category");
      const newActiveElement = document.querySelector(`#${category}`);

      // Remove active class from previous element if it exists
      if (activeElement) {
        activeElement.classList.remove("active-category");
      }

      // Add active class to the new element if it exists
      if (newActiveElement) {
        newActiveElement.classList.add("active-category");
      }
    };

    const handelFetchProducts = () => {
      // Determine which products to fetch based on the category
      const fetched =
        category === "All"
          ? products
          : products.filter((prod) => prod.category.includes(category))

          // products.filter((prod) =>
          //   prod.category.some(
          //     (cat) => cat.name === category
          //   )
          // );

      // Only update the state if the fetched products are different
      if (
        fetched.length !== fetchedProducts.length ||
        fetched.some((prod, index) => prod._id !== fetchedProducts[index]?._id)
      ) {
        setFetchedProducts(fetched);
      }
    };

    // Call the function
    handelFetchProducts();

    activeCategory();
  }, [category, products]);

  useEffect(() => {
    const handleOpacityContent = () => {
      const productsContainer = document.querySelector("#products-container");
      if (openFilter == true) {
        productsContainer.classList.remove("opacity-0", "invisible");
        // console.log(openFilter)
      } else {
        productsContainer.classList.add("opacity-0", "invisible");
      }
    };
    handleOpacityContent();
  }, [openFilter]);

  const item = {
    exit: {
      opacity: 0,
      width: 0,
      transition: {
        ease: "easeInOut",
        duration: 0.3,
        // delay: 1.2,
      },
    },
  };

  return (
    <div>
      <div
      onClick={() => setOpenFilter(false)}
        id="products-container"
        className="fixed top-0 left-0 w-full h-full bg-[#000000b3] opacity-0 invisible transition-opacity z-[1000] "
      ></div>
      <div className='w-full h-[20vh] xl:h-[45vh]  mb-[30px] relative  bg-cover' 
       style={{ backgroundImage: `url(${template.bannerShop?.imgShop})` }}
      >
        <div className="flex flex-col items-center  absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
          <div className="flex flex-col items-center pb-[25px] md:pb-[40px]">
            <h1 className="text-[35px] lg:text-[50px] text-white ">
              {category}
            </h1>
            <div className="flex gap-2 items-center text-white text-[15px] lg:text-[17px]">
              <h2>Products</h2>
              <i className="bx bx-chevron-right"></i>
              <h2 className="text-[#e6e6e6]">{category}</h2>
            </div>
          </div>
          <div className="text-white">
            <ul className="flex gap-[20px]  lg:gap-[30px]">
              <li
                id="All"
                className="active-category text-[15px] lg:text-[17px] "
              >
                <Link to={"/products/All"}>All</Link>
              </li>
              {categories.map((cate) => {
                return (
                  <li
                    key={cate._id}
                    id={cate.name}
                    className=" text-[15px] lg:text-[17px] "
                  >
                    <Link to={`/products/${cate.name}`}>
                      {cate.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
      {/* filter products */}
      <div className="relative">
        <div className="container flex gap-5 items-center py-5">
          <div
            className=" flex gap-1 items-center p-[6px] text-[#868686] justify-start bg-[#f8f8f8] cursor-pointer"
            onClick={() => {
              setOpenFilter(true);
            }}
          >
            <i className="bx bx-filter-alt"></i>
            <h4>Filter Menu</h4>
          </div>
        </div>
        <ListProducts products={fetchedProducts} />
      </div>
      <AnimatePresence>
        {openFilter && (
          <motion.div
            variants={item}
            initial={{ left: "-100vh" }}
            animate={{ left: 0 }}
            transition={{ duration: 0.5 }}
            exit="exit"
            className="fixed top-0 left-0 bg-white md:w-[400px] styleShadow  h-[100vh] z-[1000] overflow-scroll"
          >
            <FilterProd
              fetchedProducts={fetchedProducts}
              setFetchedProducts={setFetchedProducts}
              setOpenFilter={setOpenFilter}
              setSelectedCategorie={setSelectedCategorie}
              setSelectedSize={setSelectedSize}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Products;
