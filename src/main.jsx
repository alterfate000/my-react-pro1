import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter,RouterProvider ,useParams} from 'react-router-dom'
import Home from './component/Home.jsx';

import CEO from './component/CEO.jsx'
import Employee from './component/Employee.jsx'
import Manager from './component/Manager.jsx'
import Login from './component/login.jsx'
import Edit_employee from './component/Edit_employee.jsx'
import Ceo_car from './component/Ceo_car.jsx'
import Create_job from './component/create_job.jsx'
import Search_car from './component/Search_car.jsx'



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
  ,
  {
    path: "Edit_employee",
    element: <Edit_employee/>
  },
  {
    path: "Ceo_car",
    element: <Ceo_car/>
  },
  {
    path:"Create_job/:pageNumber",
    element: <Create_job/>
  }
  ,
  {
    path:"search_car",
    element: <Search_car/>
  }
 
])



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
