import axios from 'axios'
import { useFormik } from 'formik'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup'


export default function Getpassword() {
    let nav =useNavigate();

    let valid = yup.object({
        email:yup.string().email('Emali is invalid').required('Emali is required'),
        newPassword:yup.string().matches(/^[A-Z][a-z0-9 ]{5,10}$/ , 'password is invalid').required('password is required'),
    });

    let resetPass = useFormik({
        initialValues:{
            email:'',
            newPassword:'',
        },
        validationSchema:valid,
        
        onSubmit:getNewPassword
        
    })

     async  function getNewPassword(vall) {
        let {data}= await axios.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`,vall)
            console.log(data);
            if(data.token)
            {
                nav('/login')
            }
        }
  return <>
  <div className="container my-5 py-2">
    <form onSubmit={resetPass.handleSubmit} action="">
    <div className="m-2">
              <label className='my-2 fw-bolder'  htmlFor="email">Email</label>
              <input onChange={resetPass.handleChange}  type="email" id="email"  name="email" className="form-control" />
              {resetPass.touched.email ? <p className='text-danger'>{resetPass.errors.email}</p> : ''}

              
          </div>
          <div className="m-2">
              <label className='my-2 fw-bolder' htmlFor="newPassword">New Password</label>
              <input onChange={resetPass.handleChange}  type="password" id="newPassword"  name="newPassword" className="form-control" />
              {resetPass.touched.newPassword ? <p className='text-danger'>{resetPass.errors.newPassword}</p> : ''}


          </div>
          <button disabled={!(resetPass.isValid && resetPass.dirty)} type='submit' className='btn btn-success mt-2'>Reset Password</button>
    </form>


  </div>

  
  
  
  
  </>
  
  
}
