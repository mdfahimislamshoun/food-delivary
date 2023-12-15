import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from './App';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const queryClint = new QueryClient()

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
  },
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClint}>
        <RouterProvider router={router} />
      </QueryClientProvider>
  </React.StrictMode>,
)
