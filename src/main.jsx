import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from './App';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Healthy from './component/Healthy';
import Home from './component/Home';
import SignIn from './login&reg/SignIn';
import AddProduct from './component/AddProduct';
import AuthProvider from './provider/AuthProvider';
import Privet from './provider/Privet';
import Order from './component/Order';
import SignUp from './login&reg/SignUp';
import OrderConfirm from './component/OrderConfirm';
import Delivery from './component/delivery';
import Private from './provider/Privet';
const queryClint = new QueryClient()

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      {
        path: "/",
        element: <Home></Home>
      },
      {
        path: '/healthy',
        element: <Private><Healthy></Healthy></Private>
      },
      {
        path: '/addProduct',
        element: <Private><AddProduct></AddProduct></Private>
      },
      {
        path: '/order',
        element: <Private><Order></Order></Private>
      },
      {
        path:'/signIn',
        element: <SignIn></SignIn>
      },
      {
        path:'/signUp',
        element: <SignUp></SignUp>
      },
      {
        path:'/OrderConfirm',
        element: <Private><OrderConfirm></OrderConfirm></Private>
      },
      {
        path:'/myorder',
        element:<Private><Delivery></Delivery></Private>
      },
    ]
  },
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClint}>
    <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
