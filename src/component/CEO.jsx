import * as React from 'react';
import { useState, useEffect, useContext } from 'react';
import Axios from 'Axios';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LogoutTwoToneIcon from '@mui/icons-material/LogoutTwoTone';
//import HouseIcon from '@mui/icons-material/House';
//import NotificationsIcon from '@mui/icons-material/Notifications';
//import SettingsIcon from '@mui/icons-material/Settings';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Paper from '@mui/material/Paper';
//import Container from '@mui/material/Container';
//import { DataGrid } from '@mui/x-data-grid';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
//import SendIcon from '@mui/icons-material/Send';
//import AssignmentTurnedInOutlinedIcon from '@mui/icons-material/AssignmentTurnedInOutlined';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import FileUploadIcon from '@mui/icons-material/FileUploadOutlined';
import SearchIcon from '@mui/icons-material/Search';
// import HomeIcon from '@mui/icons-material/Home';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import PersonSearchIcon from '@mui/icons-material/PersonSearch';
// import LoginIcon from '@mui/icons-material/Login';
// import LogoutIcon from '@mui/icons-material/Logout';
// import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Nav from './Nav'

import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';



const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: `-${drawerWidth}px`,
        ...(open && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        }),
    }),
);

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

function createData(name, email, role, remove) {
    return { name, email, role, remove };
}

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}


function CEO() {

  const [open_modal, setOpen_Modal] = useState(false);
  const [open_modal_add, setOpen_Modal_add] = useState(false);

  const [open_modal_car, setOpen_Modal_car] = useState(false);
  const [open_modal_add_car, setOpen_Modal_add_car] = useState(false);


  const [emp_first,setEmp_first] = useState("world");
  const [emp_last,setEmp_last] = useState("hello");
  const [emp_department,setEmp_department] = useState("world");
  const [emp_id,setEmp_id] = useState("world");

  //-------------------------------------------------------------------------------------------------------

  const delete_emp =(id)=>{
    console.log(id);

    var ans = confirm("ยืนยันลบพนักงาน id :" + id);
        if(ans==true){
            Axios.delete(`http://localhost:3001/delete_emp/${id}`).then((response) => {
                setEmployee_list(
                    employee_list.filter((val) => {
                      return val.id_employee != id;
                    })
                  );
            });
            setEmp_id("");
            //window.location = '/EditData';
        }
            
}
//-------------------------------------------------------------------------------------------------------
 

  const handle_on_modal_add_car = (e) => {
    setOpen_Modal_add_car(true);
};




  const handle_on_modal_add = (e) => {
      setOpen_Modal_add(true);
  };

  const handle_addEmp = (e) => {
    


    Axios.post("http://localhost:3001/add_emp", {
          first_name: emp_first,
          last_name: emp_last,
          department: emp_department,
         

        }).then((response) => {
            console.log(response);
        
        });

        Axios.get("http://localhost:3001/emp_history").then((response) => {
              setEmployee_list(response.data);
              
        });





    
    setOpen_Modal_add(false);
  };





  
//--------------------------------------------------------------------------------

  const handleClickOpen_Modal = (e) => {
    setEmp_id(e)
    let id = e;
        //setCheck_Click('edit');
        Axios.get(`http://localhost:3001/edit_employee/${id}`).then((response) => {
            //console.log(response.data[0].kl_name);
            //setInput_value(response.data[0].ml_name);
            setEmp_first(response.data[0].first_name)
            setEmp_last(response.data[0].last_name)
            setEmp_department(response.data[0].department)
            
            //setMemberID(response.data[0].ml_id);
            }
      )

    //console.log(e)
    //setInput_value(e)
    setOpen_Modal(true);
  };

  
  const edit_emp=(e)=>{
    Axios.put("http://localhost:3001/update_emp", { 
        first_name: emp_first,
        last_name: emp_last, 
        department: emp_department,        
        id_employee: emp_id,
    }).then(
    (response) => {   
        window.location = '/CEO';     
        
    }
    );
}

//--------------------------------------------------------------------------------

  const handleClose_Modal = () => {
    setOpen_Modal(false);
  };
  const handleClose_Modal_add = () => {
    setOpen_Modal_add(false);
  };
  const handleClose_Modal_car = () => {
    setOpen_Modal_car(false);
  };
  const handleClose_Modal_add_car = () => {
    setOpen_Modal_add_car(false);
  };





    const [employee_list,setEmployee_list] = useState([]);
    const [car_list,setCar_list] = useState([]);

    useEffect(() => {
        const timer = setTimeout(() => {
            console.log('This will run after 1 second!');
            Axios.get('http://localhost:3001/employee_list').then((response) => {
                //console.log(response);
                setEmployee_list(response.data);
            })
        }, 10);

        const timer1 = setTimeout(() => {
            console.log('This will run after 1 second!');
            Axios.get('http://localhost:3001/car_list').then((response) => {
                //console.log(response);
                setCar_list(response.data);
            })
        }, 30);
        // //return () => clearTimeout(timer);
        // const timer1 = setTimeout(() => {
        //     console.log('This will run after 2 second!');
        //     Axios.get('http://localhost:3001/user_list').then((response) => {
        //         //console.log(response);
        //         setUserList(response.data);
        //     })
        // }, 30);

        // const timer2 = setTimeout(() => {
        //     Axios.get('http://localhost:3001/login_admin_check').then((response) => {
        //       //console.log(response);
        //       if (response.data.loggedIn_admin == true) {
        //         console.log("ttt");
      
        //         setLoginStatus(response.data.loggedIn_admin);
        //       }
        //       else{
        //         setLoginStatus(response.data.loggedIn_admin);
        //       }
              
        //     })
        // }, 1);

        return () => {
            clearTimeout(timer);
            clearTimeout(timer1);
            // clearTimeout(timer2);


        }

    }, []);

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



  const theme = createTheme({
    palette: {
        maincolor: {
            main: "#86a8c5",
            contrastText: "#ffffff",
        },
    },
});
const [open, setOpen] = useState(false);

const handleDrawerOpen = () => {
    setOpen(true);
};

const handleDrawerClose = () => {
    setOpen(false);
};

const [value, setValue] = React.useState(0);

const handleChange = (event, newValue) => {
    setValue(newValue);
};


const item = [
     {
         text: 'รถยนต์',
         icon: <ManageAccountsIcon />,
         path: '/MUser'
     },
     {
         text: 'พนักงาน',
         icon: <SearchIcon />,
         path: '/MProj'
     },
    // {
    //     text: 'Srearch Publication',
    //     //icon: <SearchIcon />,
    //     path: '/MPub'
    // },
    // {
    //     text: 'Upload Project',
    //     icon: <FileUploadIcon />,
    //     path: '/MUpPJ'
    // }
    // ,{
    //     text: 'Upload Publication',
    //     //icon: <FileUploadIcon />,
    //     path: '/MUpPub'
    // },
    // {
    //     text: 'Manage Keyword and Member',
    //     //icon: <EditOutlinedIcon />,
    //     path: '/EditData'
    // },
    
     {
         text: 'Log Out',
         //icon: <LogoutOutlined />,
         path: '/AdminLogin'
     }
]



  return (
    <>
    
    <ThemeProvider theme={theme}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar position="fixed" open={open} color="maincolor">
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            sx={{ mr: 2, ...(open && { display: 'none' }) }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap component="div">
                            TCC
                        </Typography>

                    </Toolbar>
                </AppBar>
                <Drawer
                    sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        '& .MuiDrawer-paper': {
                            width: drawerWidth,
                            boxSizing: 'border-box',
                        },
                    }}
                    variant="persistent"
                    anchor="left"
                    open={open}
                >
                    <DrawerHeader>
                        <IconButton onClick={handleDrawerClose}>
                            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                        </IconButton>
                    </DrawerHeader>
                    <Divider />
                    <List>
                        {item.map(item => (
                            <ListItem

                                onClick={() => {
                                    if (item.path === '/login') {
                                        localStorage.removeItem('token');
                                    }
                                    if(item.text== 'Log Out'){
                                        logout_on();

                                    }
                                    else{
                                        window.location = (item.path)
                                    }
                                }}
                                key={item.text}
                                disablePadding
                                sx={{ display: 'block' }} >
                                <ListItemButton
                                >
                                    <ListItemIcon
                                    >
                                        1
                                    </ListItemIcon>
                                    <ListItemText primary={item.text} sx={{ opacity: open ? 1 : 0 }} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                    <Divider />

                </Drawer>
                <Main /*open={open}*/>
                    <DrawerHeader />
                    
                    <Box sx={{ width: '100%' }}>
                        <Box sx={{ borderBottom: 3, borderColor: 'divider' }}>
                            <Tabs  onChange={handleChange} /*aria-label="basic tabs example"*/>
                                <Tab label="Employee" {...a11yProps(0)} />
                                <Tab label="Car" {...a11yProps(1)} />
                            </Tabs>
                        </Box>
                        <TabPanel value={value} index={0}>
                            <div style={{ height: 300, width: '100%' }}>
                                <TableContainer component={Paper}>
                                <Button
                                                    startIcon={<AssignmentTurnedInIcon/>}
                                                        //type="submit"
                                                        //fullWidth
                                                        variant="outlined" 
                                                        color="primary"
                                                        sx={{ mt: 1, mb: 0 }}
                                                        onClick={(e)=>handle_on_modal_add()}
                                                    >
                                                        เพิ่ม
                      </Button> <br/>
                                    <Table sx={{ minWidth: 1100 }} size="large" aria-label="a dense table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell width={100}>id_employee</TableCell>
                                                <TableCell width={200} align="left">ชื่อ</TableCell>
                                                <TableCell width={200} align="left">นามสกุล</TableCell>
                                                <TableCell width={200} align="left">แผนก</TableCell>
                                                <TableCell width={170} align="right"></TableCell>
                                                {/* <TableCell width={170} align="right"></TableCell>
                                                <TableCell width={170} align="right"></TableCell> */}
                                                
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {employee_list.map((row) => (
                                                <TableRow
                                                    key={row.id_employee}
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                >
                                                    <TableCell component="th" scope="row" >{row.id_employee} </TableCell>
                                                    <TableCell align="left">{row.first_name}</TableCell>
                                                    <TableCell align="left">{row.last_name}</TableCell>
                                                    <TableCell align="left">{row.department}</TableCell>
                                                    
                                                    <Button
                                                    startIcon={<ModeEditIcon/>}
                                                        //type="submit"
                                                        //fullWidth
                                                        variant="outlined"
                                                        color="warning"
                                                        
                                                        sx={{ mt: 1, mb: 0 }}
                                                        onClick={(e)=>handleClickOpen_Modal(row.id_employee)}
                                                        
                                                    >
                                                        แก้ไข
                                                    </Button>
                                                    
                                                    <Button
                                                    startIcon={<DeleteIcon/>}
                                                        //type="submit"
                                                        //fullWidth
                                                        variant="outlined"
                                                        color="error"
                                                        
                                                        sx={{ mt: 1, mb: 0 }}
                                                        onClick={(e) => {
                                                            delete_emp(row.id_employee);
                                                          }}
                                                        
                                                    >
                                                        ลบ
                                                    </Button>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </div>
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            <div style={{ height: 300, width: '100%' }}>
                            <Button
                                                    startIcon={<AssignmentTurnedInIcon/>}
                                                        //type="submit"
                                                        //fullWidth
                                                        variant="outlined" 
                                                        color="primary"
                                                        sx={{ mt: 1, mb: 0 }}
                                                        onClick={(e)=>handle_on_modal_add_car(e)}
                                                    >
                                                        เพิ่ม
                      </Button> <br/>
                                <TableContainer component={Paper}>
                                  
                                    <Table sx={{ minWidth: 1100 }} size="large" aria-label="a dense table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell width={300} align="left">id_car</TableCell>
                                                <TableCell width={300} align="left">หมวด</TableCell>
                                                <TableCell width={300} align="left">เลขทะเบียน</TableCell>
                                                <TableCell width={300} align="left">จังหวัด</TableCell>
                                                <TableCell width={300} align="left">ยี่ห้อ</TableCell>
                                                <TableCell width={300} align="left">รุ่น</TableCell>
                                                <TableCell width={300} align="left">ปี</TableCell>
                                                <TableCell width={300} align="left">เลขตัวถัง</TableCell>
                                                <TableCell width={1000} align="right"></TableCell>
                                                {/* <TableCell width={170} align="right"></TableCell>
                                                <TableCell width={170} align="right"></TableCell> */}
                                                
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                        {car_list.map((row) => (
                                                <TableRow
                                                    key={row.ad_username}
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                >
                                                    <TableCell component="th" scope="row">{row.id_car}</TableCell>
                                                    <TableCell align="left">{row.catagory}</TableCell>
                                                    <TableCell align="left">{row.number_car}</TableCell>
                                                    <TableCell align="left">{row.province}</TableCell>
                                                    <TableCell align="left">{row.brand}</TableCell>
                                                    <TableCell align="left">{row.model}</TableCell>
                                                    <TableCell align="left">{row.year_car}</TableCell>
                                                    <TableCell align="left">{row.vin}</TableCell>
                                                    
                                                     <Button
                                                    startIcon={<AssignmentTurnedInIcon/>}
                                                        //type="submit"
                                                        //fullWidth
                                                        variant="outlined" 
                                                        color="primary"
                                                        sx={{ mt: 1, mb: 0 }}
                                                        onClick={() => {
                                                            alert('กดปุ่มสร้าง');
                                                          }}
                                                    >
                                                        สร้าง
                                                    </Button> 
                                                    <Button
                                                    startIcon={<ModeEditIcon/>}
                                                        //type="submit"
                                                        //fullWidth
                                                        variant="outlined" 
                                                        color="warning"
                                                    
                                                        sx={{ mt: 1, mb: 0 }}
                                                        onClick={() => {
                                                            alert('กดปุ่มแก้ไข');
                                                          }}
                                                    >
                                                        แก้ไข
                                                    </Button>
                                                    <Button
                                                    startIcon={<DeleteIcon/>}
                                                        //type="submit"
                                                        //fullWidth
                                                        variant="outlined"
                                                        color="error"
                                                        sx={{ mt: 1, mb: 0 }}
                                                        onClick={() => {
                                                            alert('กดปุ่มลบ');
                                                          }}
                                                        
                                                    >
                                                        ลบ
                                                    </Button>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </div>
                        </TabPanel>
                        
                    </Box>
                    



                </Main>
            </Box>
            <Dialog
                                                    open={open_modal}
                                                    onClose={handleClose_Modal}
                                                    
                                                    maxWidth="sm"
                                                    PaperProps={{
                                                      component: 'form',
                                                      onSubmit: (event) => {
                                                        event.preventDefault();
                                                        const formData = new FormData(event.currentTarget);
                                                        const formJson = Object.fromEntries(formData.entries());
                                                        s
                                                        handleClose_Modal();
                                                      },
                                                    }}
                                                  >
                                                    <DialogTitle>แก้ไขข้อมูล</DialogTitle>
                                                    <DialogContent>
                                                      <DialogContentText>
                                                        โปรดระบุข้อมูลที่ต้องการแก้ไข.
                                                      </DialogContentText>
                                                      <TextField
                                                        autoFocus
                                                        required
                                                        margin="dense"
                                                        label="ชื่อ"
                                                        name="first_Name"
                                                        //label="First Name"
                                                        
                                                        fullWidth
                                                        variant="standard"
                                                        value={emp_first}
                                                        onChange={(event) => {
                                                          console.log(event);
                                                          setEmp_first(event.target.value);
                                                        }}
                                                      />
                                                      <TextField
                                                        autoFocus
                                                        required
                                                        margin="dense"
                                                        id="last_Name"
                                                        name="last_Name"
                                                        label="นามสกุล"
                                                        
                                                        fullWidth
                                                        variant="standard"
                                                        value={emp_last}
                                                        onChange={(event) => {
                                                          //console.log(event.target.value);
                                                          setEmp_last(event.target.value);
                                                        }}
                                                      />
                                                      <TextField
                                                        autoFocus
                                                        required
                                                        margin="dense"
                                                        id="name"
                                                        name="email"
                                                        label="แผนก"
                                                        
                                                        fullWidth
                                                        variant="standard"
                                                        value={emp_department}
                                                        onChange={(event) => {
                                                          //console.log(event.target.value);
                                                          setEmp_department(event.target.value);
                                                        }}
                                                      />
                                                    </DialogContent>
                                                    <DialogActions>
                                                      <Button onClick={handleClose_Modal}>ยกเลิก</Button>
                                                      <Button 
                                                        onClick={(e)=>edit_emp(e)}

                                                      >
                                                        ยืนยันแก้ไข
                                                      </Button>
                                                    </DialogActions>
                                                  </Dialog>
                                                  <Dialog
                                                    open={open_modal_add}
                                                    onClose={handleClose_Modal}
                                                    
                                                    maxWidth="sm"
                                                    PaperProps={{
                                                      component: 'form',
                                                      onSubmit: (event) => {
                                                        event.preventDefault();
                                                        const formData = new FormData(event.currentTarget);
                                                        const formJson = Object.fromEntries(formData.entries());
                                                        s
                                                        handleClose_Modal();
                                                      },
                                                    }}
                                                  >
                                                    <DialogTitle>เพิ่มข้อมูล</DialogTitle>
                                                    <DialogContent>
                                                      <DialogContentText>
                                                        โปรดระบุข้อมูลที่ต้องการเพิ่ม.
                                                      </DialogContentText>
                                                      <TextField
                                                        autoFocus
                                                        required
                                                        margin="dense"
                                                        label="ชื่อ"
                                                        name="first_Name"
                                                        //label="First Name"
                                                        
                                                        fullWidth
                                                        variant="standard"
                                                        //value={emp_first}
                                                        onChange={(event) => {
                                                          console.log(event);
                                                          setEmp_first(event.target.value);
                                                        }}
                                                      />
                                                      <TextField
                                                        autoFocus
                                                        required
                                                        margin="dense"
                                                        id="last_Name"
                                                        name="last_Name"
                                                        label="นามสกุล"
                                                        
                                                        fullWidth
                                                        variant="standard"
                                                        //value={emp_last}
                                                        onChange={(event) => {
                                                          //console.log(event.target.value);
                                                          setEmp_last(event.target.value);
                                                        }}
                                                      />
                                                      <TextField
                                                        autoFocus
                                                        required
                                                        margin="dense"
                                                        id="name"
                                                        name="email"
                                                        label="แผนก"
                                                        
                                                        fullWidth
                                                        variant="standard"
                                                        //value={emp_department}
                                                        onChange={(event) => {
                                                          //console.log(event.target.value);
                                                          setEmp_department(event.target.value);
                                                        }}
                                                      />
                                                    </DialogContent>
                                                    <DialogActions>
                                                      <Button onClick={handleClose_Modal_add}>ยกเลิก</Button>
                                                      <Button 
                                                        onClick={(e)=>handle_addEmp(e)}

                                                      >
                                                        ยืนยัน
                                                      </Button>
                                                    </DialogActions>
                                                  </Dialog>
        </ThemeProvider>
    </>
    
  )
}

export default CEO