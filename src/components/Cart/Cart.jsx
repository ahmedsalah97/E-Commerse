
import React, { useState } from 'react'
import { useContext } from 'react'
import { CartContext } from '../Login/context/Cartcontext'
import { useEffect } from 'react';
import $ from 'jquery';
import { BallTriangle } from 'react-loader-spinner';
import {  Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';




export default function Cart() {

  let {clearCart,getCart ,removeCartItem,updateProductQuantity,setcartCount} = useContext(CartContext);
  let [cartdetails ,setcartdetails]=useState(null);

  async function removeItem (id)
  {
   let {data} = await removeCartItem(id)
   setcartdetails (data)
   setcartCount(data.numOfCartItems)

  };

  async function getlogUser ()
  {
    $('.loading').fadeIn(1000);
       let {data} = await getCart()
       setcartdetails (data)
       $('.loading').fadeOut(1000)
       
  };

  async function updateQuantity(id,count)
  {
    let {data}=await updateProductQuantity(id,count)
    setcartdetails(data)
  }

  async function clearAllCart()
  {
    $('.loading').fadeIn(1000);
     await clearCart();
    $('.loading').fadeOut(1000);
   setcartdetails(0)
   setcartCount(0)

  
  }

  useEffect(()=>{
    getlogUser()
  },[]);



  return <>
    <Helmet>
        
        <title>Fresh Cart Cart</title>
        
      
    </Helmet>

{cartdetails === 0 ? <div className='py-5 my-5 text-center' >
  <h3>No Data Now Go to products And Add Again </h3>
  <Link to={"/Proudcts"} className='btn btn-success' >Go Products</Link>
  
</div> : ''}

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
 
{cartdetails ?

<div className="container mb-4 my-5">
<div className="w-90 mx-auto p-3 bg-main-light my-5">
    <h3>Shoping Cart</h3>
    <h4 className='h6 text-main fw-bolder'>Cart Items: <span className='text-dark'>{cartdetails.numOfCartItems}</span> </h4>
    <h4 className='h6 text-main fw-bolder'>Total Cart Price: <span className='text-dark'>{cartdetails.data.totalCartPrice}EGP</span></h4>
    {cartdetails.data.products.map((product)=> <div className="row border-bottom  my-3">
      <div className="col-md-1">
        <img className='w-100' src={product.product.imageCover} alt="" />
      </div>
      <div className="col-md-11">
        <div className='d-flex justify-content-between align-items-center'>
          <div>
            <h3 className='h6 mt-1'>{product.product.title.split(' ').slice(0,4).join(' ')}</h3>
            <h6 className='text-main fw-bolder'>Price : <span className='text-dark'>{product.price} Egp</span></h6>
          </div>
          <div>
            <button onClick={()=>updateQuantity(product.product.id,product.count + 1)} className=' btn bg-success'>+</button>
            <span className='h4'>{product.count}</span>
            <button onClick={()=>updateQuantity(product.product.id,product.count - 1)} className='btn bg-danger'>-</button>
          </div>
        </div>
        <button onClick={()=>removeItem(product.product.id)} className='btn text-danger p-0 fw-bolder '><i className='fas fa-trash-can text-danger'></i> Remove</button>
      </div>
    </div>)}
    <Link to={'/Payment/' +cartdetails.data._id} className=' text-white m-2 btn bg-success w-25 '>Cheak Out</Link>
    <button onClick={clearAllCart}  className=' text-white m-2 btn bg-success '>Clear Cart</button>
    

  </div> 
</div>


  
  
 :'' }
 
  </>
 
}
