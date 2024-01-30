// import React, { useState } from 'react'
// import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
// import CssBaseline from '@mui/material/CssBaseline';
// import TextField from '@mui/material/TextField';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
// import Link from '@mui/material/Link';
// import Grid from '@mui/material/Grid';
// import Box from '@mui/material/Box';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
// import Typography from '@mui/material/Typography';
// import Container from '@mui/material/Container';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import '../css/Login.css';


// function Copyright(props) {
//   return (
//     <Typography variant="body2" color="text.secondary" align="center" {...props}>
      
//     </Typography>
//   );
// }

// // TODO remove, this demo shouldn't need to reset the theme.

// const defaultTheme = createTheme();

// const theme = createTheme({
//   palette: {
//     maincolor: {
//       main: "#ffffff",
//       contrastText: "#000000",
//     },
//   },
// });

// const background = {
//   backgroundColor: '#86a8c5',
//   //backgroundImage: 'url(http://www.sosuco.com/material_pictureRe/SAB29020024A.jpg)' ,
// };

// const border = {
//   border: '1px solid #ffffff',

// };



// function Login() {
//   const [username_ln,setUsername_ln] = useState("");
//   const [password_ln,setPassword_ln] = useState("");

//   const data = [
//     {
//       username : "ceo",
//       password : "000",
//       State: "ceo"
        
//     },
//     {
//       username : "manager1",
//       password : "m111",
//       State: "manager"
//     },
//     {
//       username : "employee1",
//       password : "e111",
//       State: "employee"
//     },
//     {
//       username : "employee2",
//       password : "e222",
//       State: "employee"
//     },
//     {
//       username : "manager2",
//       password : "m222",
//       State: "manager"
//     },
// ];
    






//   const handleSubmit = (event) => {
//     event.preventDefault();
//     console.log(username_ln +" , " +password_ln);
//     data.map((row,index)=>{
//       if(username_ln == row.username && password_ln == row.password){
//         if(row.State == "ceo"){
//           window.location = 'ceo' ;
         
//         }
//         if(row.State == "employee")
//         {
//           window.location = 'employee' ;
//         }
//         if(row.State == "manager")
//         {
//           window.location = 'manager' ;
//         }
        
//       }
//       //console.log(index,row.username)
//     })
//     //console.log(data[0].State);
//   };

//   return (
//      <ThemeProvider theme={theme} >
//       <Container component="main" maxWidth="xs" style={background} width={700} height={500} sx={{ borderRadius: 2 }}>
        
//         <Box
//           sx={{
//             marginTop: 0,
//             display: 'flex',
//             flexDirection: 'column',
//             alignItems: 'center',
//             style: 'background',
//           }}
          
//         >
        
//           <Typography component="h1" variant="h5">
//             ระบบจัดการตารางเดินงานซ่อมสีรถยนต์ 
//           </Typography>
//           <br/>
//           <Typography component="h5" variant="h7">
//             บริษัท ทวีคาร์แคร์เซ็นเตอร์ จำกัด
//           </Typography>
//           <br/>
            
//           <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
//             <TextField
//               margin="normal"
//               required
//               fullWidth
//               id="username"
//               label="ชื่อผู้ใช้"
//               name="username"
//               autoComplete="username"
//               autoFocus
//               onChange={e => setUsername_ln(e.target.value)}
//             />
//             <TextField
//               margin="normal"
//               required
//               fullWidth
//               name="password"
//               label="รหัสผ่าน"
//               type="password"
//               id="password"
//               autoComplete="current-password"
//               onChange={e => setPassword_ln(e.target.value)}
//             />
            
//             <Button
//               type="submit"
//               fullWidth
//               variant="contained"
//               sx={{ mt: 3, mb: 2 }}
//             >
//               เข้าสู่ระบบ
//             </Button>
            
//           </Box>
//         </Box>
       
//         <Copyright sx={{ mt: 8, mb: 4 }} />
//       </Container>
//     </ThemeProvider>
   
//   );
// }

// export default Login;

import * as React from 'react';
import { useState, useEffect, useContext } from 'react';
import Axios from 'Axios';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Alert } from '@mui/material';


function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center" >
      {/* {'Copyright © '} */}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function SignInSide() {

  const [ad_username, setAd_Username] = useState("");
  const [ad_pass, setAd_Pass] = useState("");

  const [loginStatus, setLoginStatus] = useState("");
  const [loginSucceed,setLoginSucceed] = useState(false);
  
  Axios.defaults.withCredentials = true;

  
  // const {value,setValue} = useContext(UserContext);



//------------------------------------------------------


  const login = (event) => {
    event.preventDefault();
    // console.log(res_username);
    // console.log(res_pass);
    // console.log("res_pass");

    

    //-----------------------------------------------------------

    Axios.post("http://localhost:3001/login", {
      ad_username: ad_username,
      ad_pass: ad_pass,
    }).then((response) => {
      //window.location = "/Home";
      console.log(response);
      if (response.data.message) {
        setLoginStatus(response.data.message);
      } else {
        setLoginSucceed(true);

        setLoginStatus(response.data[0].ad_username);
        //window.location = "/Home";
      }
      
    });
  };


//------------------------------------------------------

  useEffect(() => {
    const timer = setTimeout(() => {
      Axios.get("http://localhost:3001/login_user").then((response) => {
        console.log(response)
        if (response.data.loggedIn == true) {
          
          setLoginStatus(response.data.user[0].ad_username);
        }
      });
    },0);
    return () => {
      clearTimeout(timer);
    }
  }, []);




  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   /*const data = new FormData(event.currentTarget);
  //   console.log({
  //     username: event.target.value,
  //     password: data.get('password'),
  //   });*/
  //   console.log(res_username);
  //   console.log(res_pass);
  // };






















  const handleSubmit = () => {
   
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://c.wallhere.com/images/01/13/0ef7ee5a08043bdb9637413f9648-2277464.png!d)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              ระบบจัดการตารางเดินงานซ่อมสีรถยนต์
            </Typography>
            <Typography component="h4" variant="h7">
              บริษัท ทวีคาร์แคร์เซ็นเตอร์ จำกัด
            </Typography>
            <Box component="form" noValidate onSubmit={login} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
                onChange={(e)=>setAd_Username(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e)=>setAd_Pass(e.target.value)}
              />
              {/* <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              /> */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  {/* <Link href="#" variant="body2">
                    Forgot password?
                  </Link> */}
                </Grid>
                <Grid item>
                  {/* <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link> */}
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
              <br/>
              {loginStatus != "" && loginSucceed == false ? <Alert variant="filled" severity="error">
                  {loginStatus}
              </Alert> : <p></p>}
              {loginSucceed == true ? <Alert variant="filled" severity="success">
                  success
              </Alert> : <p></p>}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}