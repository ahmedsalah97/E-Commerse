import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { createContext } from "react";


export let CartContext = createContext ();



export default function CartContextProvider (props)
{
  

    let headersData= 
    {
        token:localStorage.getItem('userToken')
    }
    let[cartCount,setcartCount]= useState(0)

    function addCart(id)
    {
        let body = {

            "productId": id
        }
       
       return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`, body ,{
        headers: headersData 
    
    } ).then((response)=> response )
       .catch((err)=> err);
       
    };

    function addTowishlist(id)
    {
        let body = {

            "productId": id
        }
       
       return axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`, body ,{
        headers: headersData 
    
    } ).then((response)=> response )
    .catch((err)=> err);
       
    };

    function getCart ()
    {

       return axios.get(`https://ecommerce.routemisr.com/api/v1/cart/`,{headers:headersData })
       .then((response)=>response)
       .catch((err)=> err)
     
   
    }
    function removeCartItem (removid)
    {
     return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${removid}`, {headers:headersData})
      .then((response)=> response)
      .catch((error)=>error)
    }
    function clearCart ()
    {
     return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`, {headers:headersData})
     .then((response)=>response)
     .catch((err)=> err)
   
      
    }

    function updateProductQuantity(productid,count)
    {
      return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productid}` ,{
        count:count
      }, {headers:headersData})
      .then((response)=>response)
      .catch((error)=>error)

    }
    function removeWishList(removid)
    {
       return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${removid}`, {headers:headersData})
      .then((response)=> response)
      .catch((error)=>error)
      
    }
    function onlinePayment(cartId,url,values)
    {
     return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`,
      {
        shippingAddress:values
      },
      {
          headers:headersData}
      
      )
      .then((response)=>response)
      .catch((err)=>err)
      
    }


    useEffect(()=>{
      
     async function Data ()
      {
        let {data} = await getCart();
        setcartCount(data?.numOfCartItems);
      };
      Data();
    },[])


    return <>

    <CartContext.Provider value= {{clearCart,onlinePayment,addCart,cartCount,setcartCount ,getCart,removeCartItem,updateProductQuantity,addTowishlist,removeWishList
    }}>
      {props.children}
    </CartContext.Provider>

    </>
 
};