import React from 'react'
import { useState ,useEffect} from 'react';
import Axios from 'Axios';
import Nav from './Nav'


function Manager() {

  const [emp_list,setEmp_list] = useState([]);
  

  useEffect(() => {
        const timer = setTimeout(() => {
            console.log('This will run after 1 second!');
            Axios.get('http://localhost:3001/employee_list').then((response) => {

                setEmp_list(response.data);
            
            }
            
        )
        }, 100);

       

        return () => {
            clearTimeout(timer);
           
            
        }

      }, []);


      const onclick_me=()=>{
        console.log(obj)
      }

    const obj = Object.entries(emp_list).map(([key, value]) => ({key, value}))


  return (
    <>
    <Nav/>
    <div>Manager</div>
    <button onClick={()=>onclick_me()}>button</button>
    </>
    
  )
}

export default Manager