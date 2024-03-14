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
import Show_job_detail from './component/Show_job_detail.jsx'
import Emp_search_job from './component/Emp_search_job.jsx'
import Show_job_detail_CEO from './component/Show_job_detail_CEO.jsx'


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
  },
  {
    path:"Show_job_detail/:id_job",
    element: <Show_job_detail/>
  },
  {
    path:"Show_job_detail_CEO/:id_job",
    element: <Show_job_detail_CEO/>
  },
  {
    path:"search_car",
    element: <Search_car/>
  }
  ,
  {
    path:"Emp_search_job",
    element: <Emp_search_job/>
  }
  ,
  {
    path:"Logout",
    element: <Login/>
  }
 
])



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
