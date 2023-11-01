import axios from 'axios'
import React, { useEffect, useState } from 'react'
import $ from 'jquery';
import { BallTriangle } from 'react-loader-spinner';
import { Helmet } from 'react-helmet';




export default function Brands() {
    let[brands,setbrands]=useState([])

  async function getBrands ()
    {
        $('.loading').fadeIn(1000)
        let {data}=await axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)
        console.log(data.data);
        setbrands(data.data)
        $('.loading').fadeOut(1000)
    }
    useEffect(()=>{
        getBrands()
    },[])

  return <>
    <Helmet>
        
        <title>Fresh Cart Brands</title>
        
      
    </Helmet>
   <div className="loading position-fixed top-0 bottom-0 end-0 start-0 bg-white ">
    <BallTriangle
    height={60}
    width={60}
    radius={5}
    color="green"
    ariaLabel="ball-triangle-loading"
    wrapperClass={{}}
    wrapperStyle=""
    visible={true}
  />
   </div>


<div className="container ">
<div className="row my-5 gy-5">
<h1 className='text-main text-center fw-bolder'>All Brands</h1>
    {brands.map((brands)=> <div className="col-md-3">
        <div className="product">
           
           <div className="items">
           <img src={brands.image} alt="" />
            <h1 className=' h3 text-center '>{brands.name}</h1>
           </div>
        </div>
    </div> )}
    
    </div>
</div>


  </>
 
}

