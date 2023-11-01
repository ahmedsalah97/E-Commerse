import axios from "axios";
import { useEffect, useState } from 'react';
import $ from 'jquery';
import { BallTriangle } from  'react-loader-spinner';
import { Link } from "react-router-dom";
import CategorySlider from './../CategorySlider/CategorySlider';
import { useContext } from "react";
import { CartContext } from "../Login/context/Cartcontext";
import toast  from 'react-hot-toast';
import { Helmet } from 'react-helmet';


export default function Proudcts() {
    
    const [Product,setProduct] = useState([]);
    let {addCart,setcartCount,removeWishList} =  useContext(CartContext);
    let{addTowishlist}=useContext(CartContext);

    async  function addWishlist (id)
   {
      let {data} =  await addTowishlist(id)
      
      if(data.status == "success")
      {
        
        setcartCount(data.numOfCartItems);

        toast.success(data.message , {className: "bg-white text-main p-3 " , position:"top-center"})
      }
      else{
        toast.error("Error")

      }
   } 

 



   async function  getProducts (page = 1) {
        $('.loading').fadeIn(1000)
        let {data}= await axios.get(`https://ecommerce.routemisr.com/api/v1/products?page=${page}`)
        setProduct(data.data)
        $('.loading').fadeOut(1000)
        
    }

    useEffect(()=>{
        getProducts()
        $('.pageItem').on( "click" ,function(e){
          let newPage=  $(e.target).html()
          getProducts(newPage);
          
        })

    },[]);

    async function addDatatocart (id)
    {
      let {data} = await addCart(id)
      
      if(data?.status == "success")
      {
        setcartCount(data?.numOfCartItems)
        toast.success(data.message , {className: "bg-white text-main p-3 " , position:"top-center"})
      }
      else
      {
        toast.error("Error")

      }
      
    };

    return <>
      <Helmet>
        
        <title>Fresh Cart Products</title>
        
      
    </Helmet>
   
  <CategorySlider/>
  
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
   
    <div className="container mt-0">
        <div className="row p-3 mt-0">
            {Product.map((Product)=> <div key={Product._id} className="product col-md-2">
                
                <Link to={'/Productdetils/'+ Product._id}>
                <div className=" py-3 px-2 cursor-pointer">
                    <img className="w-100 " src={Product.imageCover} alt={Product.title} />
                    <span className="text-main font-sm fw-bolder">{Product.category.name}</span>
                    <h3 className="h6 ">{Product.title.split(' ').slice(0,2).join(" ")}</h3>
                    <div className="d-flex justify-content-between ">
                        <span className="font-sm">{Product.price}Egp</span>
                        <span ><i className="fas fa-star rating-color">{Product.ratingsAverage}</i></span>
                    </div>
                </div>
                </Link>
               <div className="d-flex align-items-center justify-content-center">
               <button onClick={()=>addDatatocart(Product._id)} className="btn btn-sm w-100 bg-success py-2 my-3 text-white">Add to card</button>
               <i id="heart" onClick={(()=>addWishlist(Product._id))} className=" cursor-pointer ms-2 heart fa-solid fa-heart h4"></i>
               </div>
            </div> )}
            
        </div>
        <>
        <nav aria-label="Page navigation example "className="d-flex justify-content-center">
  <ul className="pagination">
    <li className="page-item">
      <a className="page-link" href="#" aria-label="Previous">
        <span aria-hidden="true">&laquo;</span>
      </a>
    </li>
    <li className="page-item"><a className="page-link pageItem cursor-pointer" >1</a></li>
    <li className="page-item"><a className="page-link pageItem cursor-pointer" >2</a></li>
    
  </ul>
</nav>
        
        
        </>
    </div>
    </>
};
