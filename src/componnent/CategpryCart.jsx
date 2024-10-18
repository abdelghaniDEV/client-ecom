import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import loadingAnimate from '../images/loading-none-bg.gif'

function CategpryCart({ category }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);


  return (
    //  <motion.div initial={{ opacity:0}} whileInView={{ opacity:1 }} transition={{ duration :  }}>
    <Link to={`/products/${category.name}`} className="relative  ">
      <div
      >
        <div className="">
        {loading && (
              <div className="w-full h-full bg-slate-50 absolute z-[100]">
                <div className="flex gap-2 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
                  <img src={loadingAnimate} className="w-[100px]" alt="loading animation" />
                </div>
                
              </div>
            )}
          <img
            src={
              category.image &&
                category.image
            }
            className=" w-[400px] h-[230px] "
          />
          <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] ">
            <div className="flex flex-col items-center gap-2 pb-4">
              <span className="text-[38px] font-medium text-black bg-white text-center px-[40px] md:text-[40px]">
                {category.name}
              </span>
              <div className="flex items-center gap-1 bg-slate-50 ">
                <span className=" text-[12px] lg:text-[13px] pl-6 font-semibold text-[#C59780]">
                  Shop Collection
                </span>
                <i className="bx bxs-chevron-right-circle text-[30px]"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default CategpryCart;
