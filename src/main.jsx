import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import Home from './component/Home.jsx';
import About from './component/About.jsx';
import Blog from './component/Blog.jsx'
import Contact from './component/Contact.jsx'



const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>
  },
  {
    path: "/Home",
    element: <Home/>
  },
  {
    path: "about",
    element: <About/>
  },
  {
    path: "blog",
    element: <Blog/>
  },
  {
    path: "contact",
    element: <Contact/>
  }
])



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
