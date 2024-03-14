import React from 'react'
import Nav from './Nav'
import ResponsiveAppBar from './ResponsiveAppBar'
import Axios from 'Axios';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

import { useState, useEffect, useContext } from 'react';

import { styled } from '@mui/material/styles';

const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const DemoPaper = styled(Paper)(({ theme }) => ({
  
  width: 120,
  height: 120,
  padding: theme.spacing(2),
  ...theme.typography.body2,
  textAlign: 'center',
  //background: getRandomColor(),
}));

function Home() {
  const [loginStatus, setLoginStatus] = useState("");

  const [job_status_00, setJob_status_00] = useState(0);
  const [job_status_01, setJob_status_01] = useState(0);
  const [job_status_02, setJob_status_02] = useState(0);


  useEffect(() => {
    const timer = setTimeout(() => {
      Axios.get('http://localhost:3001/login_user').then((response) => {
        console.log(response.data);
        if (response.data.loggedIn == true && response.data.user == 'manager') {
          console.log(response.data.user);

          setLoginStatus(response.data.user);
        }
        else if (response.data.loggedIn == true && response.data.user == 'ceo') {
          window.location = '/ceo'
        }
        else{
          window.location = '/login'
        }
      })
    }, 10);

    const timer1 = setTimeout(() => {
      console.log('This will run after 1 second!');
      Axios.get('http://localhost:3001/job_status_00').then((response) => {
        //console.log(response);
        setJob_status_00(response.data[0].ct);
      })
    }, 20);

    const timer2 = setTimeout(() => {
      console.log('This will run after 1 second!');
      Axios.get('http://localhost:3001/job_status_01').then((response) => {
        //console.log(response);
        setJob_status_01(response.data[0].ct);
      })
    }, 40);

    const timer3 = setTimeout(() => {
      console.log('This will run after 1 second!');
      Axios.get('http://localhost:3001/job_status_02').then((response) => {
        //console.log(response);
        setJob_status_02(response.data[0].ct);
      })
    }, 60);
    return () => {
      clearTimeout(timer);
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    }
  }, []);


  return (
    <>
    <ResponsiveAppBar/>
    
    {loginStatus == "ceo" ? <div>{loginStatus}</div>
    :loginStatus == "manager"?
    <div>
      <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        '& > :not(style)': {
          m: 1,
          width: 128,
          height: 128,
        },
      }}
    >
      <DemoPaper variant="elevation" style={{background:'red'}}>กำลังดำเนินการ : {job_status_00}</DemoPaper>
      <DemoPaper variant="outlined" style={{background:'blue'}}>รออนุมัติ : {job_status_01}</DemoPaper>
      <DemoPaper variant="outlined" style={{background:'green'}}>เสร็จสิ้น : {job_status_02}</DemoPaper>
    </Box>
    </div>
    :<h1>error</h1>}
    
    </>
  )
}

export default Home