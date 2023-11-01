

import { Outlet } from 'react-router-dom';
import Footer from '../Footer/Footer';
import Navbar  from '../Navbar/Navbar';
import { useContext, useEffect } from 'react';
import { Usercontext } from '../Login/context/UserContext';
import { Offline, Online } from "react-detect-offline";





function Layout() {
    
    let {setuserToken} = useContext(Usercontext)
    useEffect(()=>{
      if(localStorage.getItem ('userToken') !==null)
      {
        setuserToken(localStorage.getItem ('userToken'))
      }
  
    }, [])
    

    return <>
    <Navbar/>

    <Outlet/>
    <div>
    <Offline>
      <div className="network">
        <i className='fas fa-wifi'></i> You Are Ofline !
      </div>
    </Offline>
  </div>
    <Footer/>

   

    
    </>
}

export default Layout;