import React, { useState } from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import '../css/Login.css';


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

const theme = createTheme({
  palette: {
    maincolor: {
      main: "#ffffff",
      contrastText: "#000000",
    },
  },
});

const background = {
  backgroundColor: '#86a8c5',
  //backgroundImage: 'url(http://www.sosuco.com/material_pictureRe/SAB29020024A.jpg)' ,
};

const border = {
  border: '1px solid #ffffff',

};



function Login() {
  const [username_ln,setUsername_ln] = useState("");
  const [password_ln,setPassword_ln] = useState("");

  const data = [
    {
      username : "ceo",
      password : "000",
      State: "ceo"
        
    },
    {
      username : "manager1",
      password : "m111",
      State: "manager"
    },
    {
      username : "employee1",
      password : "e111",
      State: "employee"
    },
    {
      username : "employee2",
      password : "e222",
      State: "employee"
    },
    {
      username : "manager2",
      password : "m222",
      State: "manager"
    },
];
    






  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(username_ln +" , " +password_ln);
    data.map((row,index)=>{
      if(username_ln == row.username && password_ln == row.password){
        if(row.State == "ceo"){
          window.location = 'ceo' ;
         
        }
        if(row.State == "employee")
        {
          window.location = 'employee' ;
        }
        if(row.State == "manager")
        {
          window.location = 'manager' ;
        }
        
      }
      //console.log(index,row.username)
    })
    //console.log(data[0].State);
  };

  return (
     <ThemeProvider theme={theme} >
      <Container component="main" maxWidth="xs" style={background} width={700} height={500} sx={{ borderRadius: 2 }}>
        
        <Box
          sx={{
            marginTop: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            style: 'background',
          }}
          
        >
        
          <Typography component="h1" variant="h5">
            ระบบจัดการตารางเดินงานซ่อมสีรถยนต์ 
          </Typography>
          <br/>
          <Typography component="h5" variant="h7">
            บริษัท ทวีคาร์แคร์เซ็นเตอร์ จำกัด
          </Typography>
          <br/>
            
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="ชื่อผู้ใช้"
              name="username"
              autoComplete="username"
              autoFocus
              onChange={e => setUsername_ln(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="รหัสผ่าน"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={e => setPassword_ln(e.target.value)}
            />
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              เข้าสู่ระบบ
            </Button>
            
          </Box>
        </Box>
       
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
   
  );
}

export default Login;