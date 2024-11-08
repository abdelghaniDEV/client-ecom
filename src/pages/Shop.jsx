import React from 'react'
import { useSelector } from 'react-redux'
import CategpryCart from '../componnent/CategpryCart'

function Shop() {

  const categories = useSelector(state => state.categories)
  const template = useSelector((state) => state.template)


  // const { shop } = useParams()
  return (
    <div className=''>
         <div className='w-full h-[20vh] xl:h-[45vh]  mb-[30px] relative  bg-cover'  style={{ backgroundImage: `url(${template.bannerShop?.imgShop})` }}>
        <div className="flex flex-col items-center  absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
          <div className="flex flex-col items-center pb-[50px]">
            <h1 className="text-[40px] lg:text-[50px] text-white">Shop</h1>
            <div className="flex gap-2 items-center text-[17px] lg:text-[16px] text-white">
              <h2>Home</h2>
              <i className="bx bx-chevron-right"></i>
              <h2 className="text-[#e6e6e6]">Shop</h2>
            </div>  
          </div>
        </div>
      </div>
      <div className=' m-[35px] grid grid-cols-1 gap-6  md:grid-cols-3 '>
        {categories.map((category) => {
          return <CategpryCart category={category} key={category._id} />
        })}
    </div>
    </div>
  )
}

export default Shop