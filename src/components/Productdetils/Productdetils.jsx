
import axios from 'axios';
import react, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import $ from 'jquery';
import { BallTriangle } from  'react-loader-spinner';
import { CartContext } from '../Login/context/Cartcontext';
import toast  from 'react-hot-toast';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import {Helmet} from "react-helmet";




export default function Productdetils() {

    let {addCart,setcartCount}=useContext(CartContext)
    let {id} =useParams()
    let[product,setProduct] = useState(null)
    useEffect(()=>{
        getproductsDetails()
    },[])

    async function addDatatocart (id)
    {
      let {data} = await addCart(id)
      console.log(data);
      if(data.status == "success")
      {
        setcartCount(data.numOfCartItems)
        toast.success(data.message , {className: "bg-white text-main p-3 " , position:"top-center"})
      }
      else{
        toast.error("Error")

      }
    }
    async function getproductsDetails()
    {
        $('.loading').fadeIn(1000)
        let {data}= await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
        setProduct(data.data)
        $('.loading').fadeOut(1000)
        console.log(data.data);

    }

    return<>
    
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
    
    <div className="container py-5 my-5 ">
       {product !==null ?  <div className="row align-items-center">
       <Helmet>
        
                <title>{product.title}</title>
                
              
            </Helmet>

            <div className="col-md-3">
                
                <OwlCarousel className='owl-theme' items={1} loop >
                  {product.images.map((el)=>{
                    return   <div class='item'>
                    <img className='w-100' src={el} alt="" />   
                     </div>
                  })}
  
  
   
                  </OwlCarousel>
            </div>
            <div className="col-md-9 ">
                <h2 className=''>{product.title}</h2>
                <p className='text-muted'>{product.description}</p>
                <span className="text-main font-sm fw-bolder">{product.category.name}</span>
                
                    <div className="d-flex justify-content-between ">
                        <span className="font-sm">{product.price}Egp</span>
                        <span ><i className="fas fa-star rating-color">{product.ratingsAverage}</i></span>
                    </div>
                    <button onClick={()=>addDatatocart(product._id)}  className='btn btn-sm w-100 bg-main text-white mt-3' >Add To Card</button>
            </div>
           
        </div> : ''}
    </div>
    
    
    </>
}

