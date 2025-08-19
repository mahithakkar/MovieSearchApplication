import { createBrowserRouter, RouterProvider } from "react-router-dom";
//importing for defining which Urls map to what compoenents.
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';


import HomePage from "./HomePage"

const router = createBrowserRouter
(
  [
    {
      path: "/",  // url path
      element: <HomePage />, // when url is / it shows home
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

