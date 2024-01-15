import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import Home from './component/Home.jsx';
import CEO from './component/CEO.jsx';
import Employee from './component/Employee.jsx'
import Manager from './component/Manager.jsx'
import Login from './component/login.jsx'




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
    path: "CEO",
    element: <CEO/>
  },
  {
    path: "Manager",
    element: <Manager/>
  },
  {
    path: "Employee",
    element: <Employee/>
  },
  {
    path: "login",
    element: <Login/>
  }
 
])



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
