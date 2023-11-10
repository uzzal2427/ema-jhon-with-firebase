import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Shop from './components/Shop/Shop';
import Order from './components/Oeder/Order';
import Inventory from './components/Inventory/Inventory';
import Login from './components/Login/Login';
import cartProductsLoader from './loader/cartProductsLoader';
import Singup from './components/Singup/Singup';
import AuthProvider from './components/AuthProvider/AuthProvider';
import CheekOut from './components/CheekOut/CheekOut';
import PrivateRoute from './Routes/PrivateRoute';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      {
        path: '/',
        element: <Shop></Shop>,
        loader : ()=> fetch('http://localhost:5000/totalProducts')
      },
      {
        path: '/order',
        element: <Order></Order>,
        loader: cartProductsLoader  
      },
      {
        path:'/cheekout',
        element:<PrivateRoute><CheekOut></CheekOut></PrivateRoute>
      },
      {
        path: '/inventory',
        element: <PrivateRoute><Inventory></Inventory></PrivateRoute>
      },
      {
        path: '/login',
        element: <Login></Login>
      },
      {
        path:'/singup',
        element: <Singup></Singup>
      }
    ]
  },
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider><RouterProvider router={router} /></AuthProvider>
  </React.StrictMode>,
)
