import React from 'react';
import imgslider1 from '../../assets/images/images/slider-image-1.jpeg';
import imgslider2 from '../../assets/images/images/slider-image-2.jpeg';
import imgslider3 from '../../assets/images/images/slider-image-3.jpeg';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';



export default function MainSlider() {
  return<>
<div className="container ">
<div className="row my-5 gy-4 gx-0">
    <div className="col-md-9 ">
    <OwlCarousel className='owl-theme' items={1} autoplay autoplayTimeout={2000} dots={false}    loop  >
    <div className='item'>
    <img className='w-100 mainImage' src={imgslider1} alt="" />
    </div>
    <div className='item'>
    <img className='w-100 mainImage' src={imgslider2} alt="" />
    </div>
    <div className='item'>
    <img className='w-100 mainImage' src={imgslider3} alt="" />
    </div>
   
</OwlCarousel>
  
    </div>
   <div className=" col-md-3">
    <img className='w-100 smallImage' src={imgslider2} alt="" />
    <img className='w-100 smallImage'src={imgslider3} alt="" />
   </div>
  </div>

</div>
  

  
  
  
  </>
 
}
