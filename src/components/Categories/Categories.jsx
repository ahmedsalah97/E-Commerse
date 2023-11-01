import axios from 'axios'
import React, { useEffect, useState } from 'react'
import $ from 'jquery';
import { BallTriangle } from  'react-loader-spinner';
import { Helmet } from 'react-helmet';


export default function Categories() {

    let[Categorie,setCategorie] =useState([])
   async function getCaregorisData ()
    {
       $('.loading').fadeIn(1000)
        let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
        console.log(data.data);
        setCategorie(data.data)
        $('.loading').fadeOut(1000)
    }

    useEffect(()=>{
        getCaregorisData()
    },[])
  return<>
    <Helmet>
        
        <title>Fresh Cart Categorirs</title>
        
      
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
   
 <div className="container">
    <div className="row my-5 gy-5">
            
  {Categorie.map((Categorie)=>



<div className="col-md-3">
<div class="card" ngcontent-vis-c3="" >

<img className='' src={Categorie.image} alt="..."/>
  <div class="card-body">
    <h1 className='h3 text-center text-main'>{Categorie.name}</h1>
  </div>
</div>

   
    
    

</div>


)}

    </div>
 
 </div>
 
  
  </>


  
}
