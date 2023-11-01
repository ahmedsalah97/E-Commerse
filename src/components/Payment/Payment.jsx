import { useFormik } from 'formik'
import React, { useContext } from 'react'
import { CartContext } from '../Login/context/Cartcontext';
import { useParams } from 'react-router-dom';

export default function Payment() {
  let{onlinePayment}=useContext(CartContext);
  let {id}=useParams()

 async function handellAdressSubmit(values)
  {
   let response = await onlinePayment(id,'http://localhost:3000', values);
   window.location=response?.data.session.url
   
  };
  let formik = useFormik ({
    initialValues :{
      details:'',
      phone:'',
      city:'',
    },

    onSubmit:handellAdressSubmit

  })
  return <>
  <div className="container pt-1 mt-5 ">
    <form className='mt-5' onSubmit={formik.handleSubmit} action="">
      <label className='fw-bolder' htmlFor="details">Details :</label>
      <input value={formik.values.details} onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" id='details' name='details' className='form-control m-2' />
      
      <label className='fw-bolder' htmlFor="phone">Phone :</label>
      <input value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} type="tel" id='phone' name='phone' className='form-control m-2' />

      <label className='fw-bolder' htmlFor="city">City :</label>
      <input value={formik.values.city} onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" id='city' name='city' className='form-control m-2' />
       <button type='submit' className='btn btn-success text-white'>Pay Now</button>
    </form>
  </div>
  
  </>
   
}
