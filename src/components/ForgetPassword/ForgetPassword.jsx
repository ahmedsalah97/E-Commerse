import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { BallTriangle } from  'react-loader-spinner';


export default function ForgetPassword() {
    let [errors,setErrors] =useState('');
    let nav = useNavigate()
    let [isloading , setisloading] =useState (false)
    async function ForgetPassword (value)
    {
        setisloading(true)
        let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,value).catch((err)=>{
           
        })
        setisloading(false)
        if(data.statusMsg == 'success')
        {
            document.getElementById('resetCode').classList.remove('d-none')
            document.getElementById('forgeForm').classList.add('d-none')
        }
    
    }

    let valid =yup.object({
        email:yup.string().email('Emali is invalid').required('Emali is required'),

    })
    let validationSchema2 =yup.object({
        resetCode:yup.string().required('resetCode is required').matches(/^[0-9]+$/, 'must be only numbers')

    })
    let ForgetForm = useFormik({
        initialValues : {
            email: " "
        },
        validationSchema:valid,
        onSubmit:ForgetPassword
    })

    let resetForm = useFormik({
        initialValues:{
            resetCode:' '
        },
        validationSchema:validationSchema2,
        onSubmit:sendCode
        
    })
    
   async function sendCode(value) {
    setisloading(true)
        let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,value).catch((err)=>{
            console.log(err.response.data.message);
            setErrors(err.response.data.message)
        })
        setisloading(false)
        console.log(value)
        if(data.status == 'Success')
        {
            nav('/Getpassword')

        }
        
    }

  return <>
  <div id='forgeForm' className="container my-5 py-3">
    <form className='my-5' onSubmit={ForgetForm.handleSubmit} >
        <label className='fw-bolder mb-1' htmlFor="email">Enter Email :</label>
        <input onBlur={ForgetForm.handleBlur} className='form-control' onChange={ForgetForm.handleChange} type="text" id='email' name='email'/>
        {ForgetForm.touched.email ? <p className="text-danger">{ForgetForm.errors.email}</p> : ''}
        {isloading ?      <button type="button" className="btn btn-success my-3 d-block " >
          <BallTriangle
    height={40}
    width={40}
    radius={5}
    color="white"
    ariaLabel="ball-triangle-loading"
    wrapperClass={{}}
    wrapperStyle=""
    visible={true}
  />
      
  
          </button> :
        
    
     <> <button disabled={!(ForgetForm.isValid && ForgetForm.dirty)} type="submit" className='btn btn-success mt-2'>Send</button></>
} 
    </form>
  </div>
  <div id='resetCode' className="container my-5 py-3 d-none">
    {errors ?    <div className="text-center alert alert-danger mt-2">{errors}</div>
:''}
    <form onSubmit={resetForm.handleSubmit} className='my-5 ' action="">
        <label className='fw-bolder mb-2' htmlFor="resetCode">Reset Code :</label>
        <input onBlur={resetForm.handleBlur} onChange={resetForm.handleChange} type="text" name='resetCode' id='resetCode' className='form-control' />
        {resetForm.touched.resetCode ? <p className='text-danger'>{resetForm.errors.resetCode}</p> : ''}
        {isloading ?  <button type="button" className="btn btn-success my-3 d-block " >
          <BallTriangle
    height={40}
    width={40}
    radius={5}
    color="white"
    ariaLabel="ball-triangle-loading"
    wrapperClass={{}}
    wrapperStyle=""
    visible={true}
  />
      
  
          </button> : <button disabled={!(resetForm.isValid && resetForm.dirty)} type='submit' className='btn btn-success mt-2'>Verify Code</button>
 }

    </form>
  </div>
  </>

}
