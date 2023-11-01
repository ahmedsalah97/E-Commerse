import React, { useEffect } from 'react'
import { useState } from 'react';
import  axios  from 'axios';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';






export default function CategorySlider() {
    let [categoryList, setcategoryList] = useState([])
  
    async function getallCategory ()
    {
        let {data}= await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
        
        setcategoryList(data.data)
       
    };
    useEffect(()=>{
    getallCategory ();

    },[])
  return <>
    <OwlCarousel className='owl-theme' items={8} dots={false} autoplay autoplayTimeout={1500}  loop  >
      {categoryList.map((el)=>{
        return  <div key={el._id} class='item my-5'>
        <img className=' smallImage' src={el.image} alt="" />
        </div>
      })}
    </OwlCarousel>

  </>
 
}
