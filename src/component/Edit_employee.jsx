import * as React from 'react';
import { useState ,useEffect} from 'react';
import Axios from 'Axios';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
//import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const theme = createTheme({
    palette: {
        maincolor: {
            main: "#86a8c5",
            contrastText: "#ffffff",
        },
    },
});

export default function Edit_employee() {

    const [res_username, setRes_username] = useState("");
    const [res_name, setRes_name] = useState("");
    const [res_email, setRes_email] = useState("");
    const [res_pass, setRes_pass] = useState("");
    const [res_tel, setRes_tel] = useState("");
    const [res_id, setRes_id] = useState("");
    const [loginStatus, setLoginStatus] = useState(true);

    const [resercherList, setResercherList] = useState([]);

    /*const addRes = () => {
        Axios.post('http://localhost:3001/register', {
            res_username: res_username,
            res_name: res_name,
            res_email: res_email,
            res_pass: res_pass,
            res_tel: res_tel,
        }).then(() => {
            setResercherList([
                ...resercherList,
                {
                    res_username: res_username,
                    res_name: res_name,
                    res_email: res_email,
                    res_pass: res_pass,
                    res_tel: res_tel,
                },
            ]);
        });

        /*var ans = confirm("ยืนยันการสมัคร");
        if (ans == true) {
            //window.location.assign("http://localhost:5173/Login");
            window.open("http://localhost:5173/Login");
        }



    };*/
    // useEffect(() => {
    //     const timer = setTimeout(() => {
    //         console.log('This will run after 1 second!');
    //         Axios.get('http://localhost:3001/show_resercher').then((response) => {

    //             setRes_name(response.data[0].res_name);
    //             setRes_username(response.data[0].res_username);
    //             setRes_email(response.data[0].res_email);
    //             setRes_tel(response.data[0].res_tel);
    //             setRes_pass(response.data[0].res_pass);
    //             setRes_id(response.data[0].res_id);
            
    //         }
            
    //     )
    //     }, 100);
    //     //return () => clearTimeout(timer);

    //     const timer1 = setTimeout(() => {
    //         Axios.get('http://localhost:3001/login_user').then((response) => {
    //           //console.log(response);
    //           if (response.data.loggedIn == true) {
    //             console.log("ttt");
      
    //             setLoginStatus(response.data.loggedIn);
    //           }
    //           else{
    //             setLoginStatus(response.data.loggedIn);
    //           }
              
    //         })
    //     }, 1);

    //     return () => {
    //         clearTimeout(timer);
    //         clearTimeout(timer1);
            
    //     }

    //   }, []);


      

    const handleSubmit = (event) => {
        console.log("test");
        {/*event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      username: data.get('username'),
      password: data.get('password'),
    });*/}
    };


    //-------------------------------------------------------------------


    // const editProfile=(id)=>{
    //     console.log(id);
    //     Axios.put("http://localhost:3001/update_resercher", { 
    //         res_name: res_name,
    //         res_username: res_username,
    //         res_tel: res_tel,
    //         res_email: res_email,
    //         res_pass: res_pass,
    //         res_id: id,
    //     }).then(
    //     (response) => {
        
    //         window.location = '/Profile';
    //     }
    //     );
       
        
    // }



    return (
    <div>
    {loginStatus == true ?
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >

                    <Typography component="h1" variant="h5" color="#86a8c5" fontFamily='Century Gothic' sx={{ mb: 3 }}>
                        Edit Profile
                    </Typography>
                    <Box component="form" noValidate onSubmit={onchange} sx={{ mt: 0 }}>
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <TextField sx={{mb: 1}}
                                    autoComplete="given-name"
                                    name="Name"
                                    required
                                    fullWidth
                                    id="Name"
                                    label="Name and Surname"
                                    color='maincolor'
                                    autoFocus
                                    value={res_name}
                                    onChange={(event) => {setRes_name(event.target.value)}}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField sx={{mb: 1}}
                                    required
                                    fullWidth
                                    id="username"
                                    label="Username"
                                    color='maincolor'
                                    name="username"
                                    autoComplete="username"
                                    value={res_username}
                                    onChange={(event) => {setRes_username(event.target.value)}}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField sx={{mb: 1}}
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    color='maincolor'
                                    name="email"
                                    autoComplete="email"
                                    value={res_email}
                                    onChange={(event) => {setRes_email(event.target.value)}}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField sx={{mb: 1}}
                                    required
                                    fullWidth
                                    name="tel"
                                    label="Tel"
                                    color='maincolor'
                                    type="tel"
                                    id="tel"
                                    autoComplete="tel"
                                    value={res_tel}
                                    onChange={(event) => {setRes_tel(event.target.value)}}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField sx={{mb: 1}}
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    color='maincolor'
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    value={res_pass}
                                    onChange={(event) => {setRes_pass(event.target.value)}}
                                />
                            </Grid>

                        </Grid>

                  
                        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ mb: 5 }}>
                                <Grid item xs={12} sm={6}>
                                    <Button
                                        //type="submit"
                                        fullWidth
                                        variant="outlined"
                                        color="maincolor"
                                        sx={{ mt: 2, mb: 2 }}
                                        onClick={() => { window.location = "/Profile" }}
                                    >
                                        Cancle
                                    </Button>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        color="maincolor"
                                        sx={{ mt: 2, mb: 2 }}
                                        onClick={()=>{editProfile(res_id)}}
                                    >
                                        Save
                                    </Button>
                                </Grid>
                            </Grid>
                    </Box>
                </Box>

            </Container>
        </ThemeProvider>
        :
        <>{window.location = '/Login'} </>}
    </div>
    );
}