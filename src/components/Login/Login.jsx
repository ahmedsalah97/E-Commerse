import axios from "axios";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as yup from 'yup';

import { BallTriangle } from  'react-loader-spinner'
import { Usercontext } from './context/UserContext';





function Login () {

  let {setuserToken} = useContext(Usercontext)

    let [errormessage , seterrormessage] = useState (null)
    let [isloading , setisloading] =useState (false)
    let navigate = useNavigate();
  
    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
    let valid = yup.object({
        email:yup.string().email('Emali is invalid').required('Emali is required'),
        password:yup.string().matches(/^[A-Z][a-z0-9 ]{5,10}$/ , 'password is invalid').required('password is required'),
    })
    let registerForm= useFormik({
        initialValues:{
        
            email:"",
            password:"",
          
        },
        validationSchema: valid ,
        onSubmit:submitlogin,
         
    })
    
 

   async function submitlogin(value)
    {
        setisloading(true)
        
        let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`,value) .catch(
           
            (err)=> {
                seterrormessage(err.response.data.message)
               
         setisloading(false)
               
        })
           
      
          if(data.message =='success')
          {
            setisloading(false)
            localStorage.setItem('userToken', data.token)
            setuserToken(data.token)
           
            navigate('/home')
          }
      
    };
    return <>
    

    <div className="container my-3 py-5">
      
       
    <form action="" onSubmit={registerForm.handleSubmit}>
      <h1 className="text-center">Login Now</h1>
      {errormessage !=null ? <div className="alert alert-danger text-center">{errormessage}</div> : "" }
          <div className="m-2">
              <label className="fw-bolder" htmlFor="Email">Email :</label>
              <input  onChange={registerForm.handleChange}  type="Email" id="Email"  name="email" className="form-control" />
              <p className="text-danger">{registerForm.errors.email}</p>
          </div>
          <div className="m-2">
              <label className="fw-bolder" htmlFor="Password">Password :</label>
              <input onChange={registerForm.handleChange}  type="Password" id="Password"  name="password" className="form-control" />
              <p className="text-danger">{registerForm.errors.password}</p>
              
          </div>
        
  
          {isloading ? 
           <button type="button" className="btn btn-success my-3 d-block " >
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

          <>
          <div className="">
          <button disabled={!(registerForm.isValid && registerForm.dirty ) } type="submit" className="btn btn-success my-3 " >Login</button>
          <Link className="my-3 fw-bolder ms-auto btn text-success" to={'/'}>Register Now</Link>
          <Link className="me-0 fw-bolder" to={'/ForgetPassword'}>Forget Password...?</Link>
          
          
          </div>
          
          
          </>








         
        }
  
      
      </form>
    </div>
      
      
      
      </>






   
}

export default Login ;