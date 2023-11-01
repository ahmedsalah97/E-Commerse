import { Link, useNavigate ,NavLink} from "react-router-dom";
import logo from '../../assets/images/freshcart-logo.svg'
import { Usercontext } from "../Login/context/UserContext";
import { useContext, useState } from "react";
import { CartContext } from "../Login/context/Cartcontext";






function Navbar() {

  let{cartCount}=useContext(CartContext);
  let {updateProductQuantity}= useContext(CartContext);

   let {userToken , setuserToken} =useContext(Usercontext);
   let navigate =useNavigate();


   function logout (){
    localStorage.removeItem('userToken')
    setuserToken(null)
    navigate('/login')

   };

 
    return<>
    <nav className=" navbar navbar-expand-lg bg-body-tertiary px-5 fixed-top pt-1">
 <div className="container-fluid ">
    <Link className="navbar-brand ms-0"  to="/home">
        <img src={logo} alt="fresh market logo" />
    </Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav mx-auto mb-2 mb-lg-0">

       
       {userToken!==null ?  <>
        
        <li className="nav-item">
          <NavLink className={((x)=> x.isActive == true  ?"nav-link activeLink" : "nav-link")} to="home">Home</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className={((x)=> x.isActive == true  ?"nav-link activeLink" : "nav-link")} to="Proudcts">Proudcts</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className={((x)=> x.isActive == true  ?"nav-link activeLink" : "nav-link")} to="Categories">Categories</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className={((x)=> x.isActive == true  ?"nav-link activeLink" : "nav-link")} to="brands">Brands</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className={((x)=> x.isActive == true  ?"nav-link activeLink" : "nav-link")} to="wishlist">wishlist</NavLink>
        </li>
        
       
       
       </> : ''}
       
       

       
      </ul>
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">

      
          <div className="d-flex  align-items-center">
          <li><i className="fab fa-facebook mx-2"></i></li>
            <li><i className="fab fa-instagram mx-2"></i></li>
            <li><i className="fab fa-youtube mx-2"></i></li>
            <li><i className="fab fa-tiktok mx-2"></i></li>
          
          </div>

          {userToken!==null ? <> 
            <li className="nav-item">
          <Link className="nav-link position-relative" to="cart">  <span>
        
          <i  className="fa-solid fa-cart-shopping text-main fa-lg"></i>
          <span className="position-absolute top-1 start-100 translate-middle badge rounded-pill bg-main text-white">
                    {cartCount}
       
           </span>
   
          </span></Link>
        </li>
            <li className="nav-item">
          <span onClick={()=>logout()} className="nav-link cursor-pointer mx-2 fw-bolder" to="logout">Sign Out</span>
         
        </li>
       
          
          
          
          </> : <> 
          <li className="nav-item">
          <Link className="nav-link fw-bolder" to="login">Login</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link fw-bolder" to="/">Register</Link>
        </li>
       
          
          
          
          </>}
      
       
  
       
      </ul>
    
    </div>
  </div>
 
</nav>
    

    </>


}

export default Navbar;