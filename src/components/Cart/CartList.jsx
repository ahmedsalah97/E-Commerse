import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../Login/context/Cartcontext';
import { BallTriangle } from  'react-loader-spinner';
import $ from 'jquery';
import { Helmet } from 'react-helmet';


export default function CartList() {

    let {removeWishList} =  useContext(CartContext);
    let[wishList,setwishList]=useState(null);
    let headersData= 
    {
        token:localStorage.getItem('userToken')
    };
   async function getWishlist()
    {
        $('.loading').fadeIn(1000)
        let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`,{headers:headersData})
        
        setwishList(data)
        $('.loading').fadeOut(1000)

    }
   async function removeItemWishlist(id)
    {
        $('.loading').fadeIn(1000)
      let {data}= await removeWishList(id)
      setwishList(data)
      $('.loading').fadeOut(1000)
   
    }

    useEffect(()=>{
        getWishlist()
       
    },[])
  return<> 
    <Helmet>
        
        <title>Fresh Cart WishList</title>
        
      
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
  
  {wishList ? <div className='container p-5 my-5 bg-light'>
    <h2>My wish List</h2>
    {wishList.data.map((el)=> 
            <div className="row p-3 d-flex align-items-center justify-content-around">
            <div className="col-md-2">
                <img className='w-100' src={el.imageCover} alt="" />
            </div>
            <div className="col-md-8 p-2">
                <h2 className='h5 fw-bolder'>{el.title}</h2>
                <h2 className="h5 text-main">{el.price}</h2>
                <button onClick={()=> removeItemWishlist(el._id)}  className='btn  p-0 fw-bolder text-danger'><i className='fas fa-trash-can text-danger'></i> Remove</button>
               
            </div>
            <div className="col-md-2">
            <button className='btn btn-success btn-lg  '>add to card</button>
            </div>
    
        </div>
    

   
    
    
    )}
  </div> :''}
 
 


  
  
  
  </>
   
}
