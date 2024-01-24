import * as React from 'react';
import { useState ,useEffect} from 'react';
import Axios from 'Axios';


function Test_data()  {
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

      fakeData = Object.entries(emp_list).map(([key, value]) => ({key, value}))

}

  export const fakeData = [];
// export const fakeData = [
//     {
//       id: '9s41rp',
//       firstName: 'Kelvin',
//       lastName: 'Langosh',
//       email: 'Jerod14@hotmail.com',
//       state: 'Ohio',
//     },
//     {
//       id: '08m6rx',
//       firstName: 'Molly',
//       lastName: 'Purdy',
//       email: 'Hugh.Dach79@hotmail.com',
//       state: 'Rhode Island',
//     },
//     {
//       id: '5ymtrc',
//       firstName: 'Henry',
//       lastName: 'Lynch',
//       email: 'Camden.Macejkovic@yahoo.com',
//       state: 'California',
//     },
//     {
//       id: 'ek5b97',
//       firstName: 'Glenda',
//       lastName: 'Douglas',
//       email: 'Eric0@yahoo.com',
//       state: 'Montana',
//     },
//     {
//       id: 'xxtydd',
//       firstName: 'Leone',
//       lastName: 'Williamson',
//       email: 'Ericka_Mueller52@yahoo.com',
//       state: 'Colorado',
//     },
//     {
//       id: 'wzxj9m',
//       firstName: 'Mckenna',
//       lastName: 'Friesen',
//       email: 'Veda_Feeney@yahoo.com',
//       state: 'New York',
//     },
//     {
//       id: '21dwtz',
//       firstName: 'Wyman',
//       lastName: 'Jast',
//       email: 'Melvin.Pacocha@yahoo.com',
//       state: 'Montana',
//     },
//     {
//       id: 'o8oe4k',
//       firstName: 'Janick',
//       lastName: 'Willms',
//       email: 'Delfina12@gmail.com',
//       state: 'Nebraska',
//     },
//   ];
  
  //50 us states array
  export const usStates = [
    'Alabama',
    'Alaska',
    'Arizona',
    'Arkansas',
    'California',
    'Colorado',
    'Connecticut',
    'Delaware',
    'Florida',
    'Georgia',
    'Hawaii',
    'Idaho',
    'Illinois',
    'Indiana',
    'Iowa',
    'Kansas',
    'Kentucky',
    'Louisiana',
    'Maine',
    'Maryland',
    'Massachusetts',
    'Michigan',
    'Minnesota',
    'Mississippi',
    'Missouri',
    'Montana',
    'Nebraska',
    'Nevada',
    'New Hampshire',
    'New Jersey',
    'New Mexico',
    'New York',
    'North Carolina',
    'North Dakota',
    'Ohio',
    'Oklahoma',
    'Oregon',
    'Pennsylvania',
    'Rhode Island',
    'South Carolina',
    'South Dakota',
    'Tennessee',
    'Texas',
    'Utah',
    'Vermont',
    'Virginia',
    'Washington',
    'West Virginia',
    'Wisconsin',
    'Wyoming',
    'Puerto Rico',
  ];

  export default {
    fakeData, usStates,Test_data
}