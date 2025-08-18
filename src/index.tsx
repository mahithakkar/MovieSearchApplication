import { createBrowserRouter, RouterProvider } from "react-router-dom";
//importing for defining which Urls map to what compoenents.
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';


const router = createBrowserRouter
(
  [
    {
      path: "/",  // url path
      element: <h1>Home Page</h1>, // when url is / it shows home
    },
    {
      path: "/search", //when url is search 
      element: <h1>Display Page</h1>, //shows display page
    }
  ]
  
);

//changed from app to router variable created with eleemnts and paths 
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router = { router } /> 
  </React.StrictMode>
);

