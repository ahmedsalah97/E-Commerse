import './App.css';
import toast, { Toaster } from 'react-hot-toast';
import { RouterProvider, createBrowserRouter, createHashRouter } from 'react-router-dom';
import Layout from './components/Layout/Layout.jsx';
import Login from './components/Login/Login.jsx';
import Navbar from './components/Navbar/Navbar.jsx';
import Home from './components/Home/Home';
import Footer from './components/Footer/Footer';
import Notfound from './components/Notfound/Notfound';
import Cart from './components/Cart/Cart';
import Brands from './components/Brands/Brands';
import Categories from './components/Categories/Categories';

import Productdetils from './components/Productdetils/Productdetils';
import Usercontextprovider ,{Usercontext} from './components/Login/context/UserContext';
import Protctedroute from './components/Protctedroute/Protctedroute';
import Proudcts from './components/Proudcts/Proudcts';
import CartContextProvider from './components/Login/context/Cartcontext';
import CartList from './components/Cart/CartList';
import Payment from './components/Payment/Payment';
import Allorders from './components/Payment/Allorders';
import ForgetPassword from './components/ForgetPassword/ForgetPassword';
import Getpassword from './components/Getpassword/Getpassword';
import Register from './components/Register/Register';



let Routers = createHashRouter([
  {path:"/", element:<Layout/> , children:[
    {path:"home", element:<Protctedroute> <Home /></Protctedroute>},
    {index:true, element:<Register/>},
    {path:"Login", element:<Login/>},
    {path:"Getpassword", element:<Getpassword/>},
    {path:"ForgetPassword", element:<ForgetPassword/>},
    {path:"Navbar", element:<Navbar/>},
    {path:"Footer", element:<Footer/>},
    {path:"*", element:<Notfound/>},
    {path:"Cart", element:<Protctedroute><Cart/></Protctedroute>},
    {path:"categories", element:<Protctedroute><Categories/></Protctedroute>},
    {path:"Proudcts", element:<Protctedroute><Proudcts/></Protctedroute>},
    {path:"Brands", element:<Protctedroute><Brands/></Protctedroute>},
    {path:"wishlist", element:<Protctedroute><CartList/></Protctedroute>},
    {path:"Productdetils/:id", element:<Protctedroute><Productdetils/></Protctedroute>},
    {path:"Payment/:id", element:<Protctedroute><Payment/></Protctedroute>},
    {path:"allorders", element:<Protctedroute><Allorders/></Protctedroute>},
  ]}
]);


export default function App() {


  return <>
<CartContextProvider>
<Usercontextprovider> 
<RouterProvider router={Routers}></RouterProvider>
<Toaster/>
</Usercontextprovider>
</CartContextProvider>

  </> 
 
}
