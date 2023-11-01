import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from 'yup';
import { BallTriangle } from  'react-loader-spinner';

function Register() {
    let [errormessage , seterrormessage] = useState (null);
    let [isloading , setisloading] =useState (false);
    let navigate = useNavigate();
  
    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
    let valid = yup.object({
        name:yup.string().min(3, 'minlength is 3').max(15 , 'maxlength is 15').required('Name is required'),
        email:yup.string().email('Emali is invalid').required('Emali is required'),
        phone:yup.string().matches(phoneRegExp, 'phone is invalid').required('phone is required'),
        password:yup.string().matches(/^[A-Z][a-z0-9 ]{5,10}$/ , 'password is invalid').required('password is required'),
        rePassword:yup.string().oneOf([yup.ref('password')] , 'password and repassword is not equal').required('RePassword is required'),
    })
    let registerForm= useFormik({
        initialValues:{
            name:"",
            email:"",
            password:"",
            rePassword:"",
            phone:"",
        },
        validationSchema: valid ,
        onSubmit:submitRegister,
         
    })
    
 

   async function submitRegister(value)
    {
        setisloading(true)
        
        let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`,value) .catch(
           
            (err)=> {
                seterrormessage(err.response.data.message)
                setisloading(false)
        })
          if(data.message =='success')
          {
            setisloading(false)
            navigate('/Login')
          }
    };



    return <>
    
  <div className="container my-3 py-5">
    {errormessage !=null ? <div className="alert alert-danger">{errormessage}</div> : "" }
     
  <form action="" onSubmit={registerForm.handleSubmit}>
    <h1 className="text-center">Register Form</h1>
   
    
    <div className="m-2">
            <label className="fw-bolder" htmlFor="Name">Name :</label>
            <input onChange={registerForm.handleChange} type="text" id="Name" name="name" className="form-control" />
            <p className="text-danger">{registerForm.errors.name}</p>
        </div>
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
        <div className="m-2">
            <label className="fw-bolder" htmlFor="RePassword">RePassword :</label>
            <input onChange={registerForm.handleChange}  type="Password" id="RePassword"  name="rePassword" className="form-control" />
            <p className="text-danger">{registerForm.errors.rePassword}</p>
        </div>
        <div className="m-2">
            <label className="fw-bolder" htmlFor="Phone">Phone :</label>
            <input onChange={registerForm.handleChange}  type="tel" id="Phone"  name="phone" className="form-control" />
            <p className="text-danger">{registerForm.errors.phone}</p>
        </div>

        {isloading ?  <button type="button" className="btn btn-success my-3 d-block ms-auto" >
        <BallTriangle
  height={60}
  width={60}
  radius={5}
  color="white"
  ariaLabel="ball-triangle-loading"
  wrapperClass={{}}
  wrapperStyle=""
  visible={true}
/>
    

        </button> :
        <button disabled={!(registerForm.isValid && registerForm.dirty ) } type="submit" className="btn btn-success my-3 d-block ms-auto" >Register</button>
      }

    
    </form>
  </div>
    
    </>
    
};

export default Register;