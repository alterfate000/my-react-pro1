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
import AddRoundedIcon from '@mui/icons-material/AddRounded';
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
import { FormControl } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';

// import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';



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


const filterData = (query, data) => {
  if (!query) {
      return data;
  } else {
      return data.filter((d) => d.toLowerCase().includes(query));
  }
};


function Item(props) {
  const { sx, ...other } = props;
  return (
    <Box
      sx={{
        p: 0,
        m: 0,
        // bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : 'grey.100'),
        // color: (theme) => (theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800'),
        // border: '1px solid',
        // borderColor: (theme) =>
        //   theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
        // borderRadius: 2,
        fontSize: '0.875rem',
        fontWeight: '700',
        ...sx,
      }}
      {...other}
    />
  );
}

Item.propTypes = {
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool]),
    ),
    PropTypes.func,
    PropTypes.object,
  ]),
};






function Ceo_car() {

  const [open_modal, setOpen_Modal] = useState(false);
  const [open_modal_add, setOpen_Modal_add] = useState(false);
  
  const [loginStatus, setLoginStatus] = useState(true);

  const [age, setAge] = useState();
  // const [department_, setDepartment_list] = useState([]);
  const [search, setSearch] = useState('');
  const [car_search, setCar_search] = useState('');
  const [car_search1, setCar_search1] = useState('');





  const [emp_first, setEmp_first] = useState("world");
  const [emp_last, setEmp_last] = useState("hello");
  const [emp_department, setEmp_department] = useState("world");
  const [emp_id, setEmp_id] = useState("world");

  const [open_modal_car, setOpen_Modal_car] = useState(false);
  const [open_modal_add_car, setOpen_Modal_add_car] = useState(false);

  const [car_catagory, setCar_catagory] = useState("world");
  const [car_number_car, setCar_number_car] = useState("hello");
  const [car_province, setCar_province] = useState("world");
  const [car_brand, setCar_brand] = useState("world");
  const [car_model, setCar_model] = useState("world");
  const [car_year_car, setCar_year_car] = useState("world");
  const [car_vin, setCar_vin] = useState("world");
  const [car_id, setCar_id] = useState("world");

  //-------------------------------------------------------------------------------------------------------

  const delete_emp = (id) => {
    console.log(id);

    var ans = confirm("ยืนยันลบพนักงาน id :" + id);
    if (ans == true) {
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

  const delete_car = (id) => {
    console.log(id);

    var ans = confirm("ยืนยันลบรถยนต์ id :" + id);
    if (ans == true) {
      Axios.delete(`http://localhost:3001/delete_car/${id}`).then((response) => {
        setCar_list(
          car_list.filter((val) => {
            return val.id_car != id;
          })
        );
      });
      setCar_id("");
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

  const handle_addCar = (e) => {
    Axios.post("http://localhost:3001/add_car", {
      catagory: car_catagory,
      number_car: car_number_car,
      province: car_province,
      brand: car_brand,
      model: car_model,
      year_car: car_year_car,
      vin: car_vin,

    }).then((response) => {
      console.log(response);

    });

    Axios.get("http://localhost:3001/car_history").then((response) => {
      setCar_list(response.data);

    });
    setOpen_Modal_add_car(false);
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

  const edit_emp = (e) => {
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

  const handleClickOpen_Modal_car = (e) => {
    setCar_id(e)
    let id = e;
    //setCheck_Click('edit');
    Axios.get(`http://localhost:3001/edit_car/${id}`).then((response) => {
      //console.log(response.data[0].kl_name);
      //setInput_value(response.data[0].ml_name);
      setCar_catagory(response.data[0].catagory)
      setCar_number_car(response.data[0].number_car)
      setCar_province(response.data[0].province)
      setCar_brand(response.data[0].brand)
      setCar_model(response.data[0].model)
      setCar_year_car(response.data[0].year_car)
      setCar_vin(response.data[0].vin)

      //setMemberID(response.data[0].ml_id);
    }
    )

    //console.log(e)
    //setInput_value(e)
    setOpen_Modal_car(true);
  };

  const edit_car = (e) => {
    Axios.put("http://localhost:3001/update_car", {
      catagory: car_catagory,
      number_car: car_number_car,
      province: car_province,
      brand: car_brand,
      model: car_model,
      year_car: car_year_car,
      vin: car_vin,
      id_car: car_id,
    }).then(
      (response) => {
        window.location = '/Ceo_car';

      }
    );
  }

  //--------------------------------------------------------------------------------

  const handleClose_Modal = () => {
    setEmp_department('');
    setOpen_Modal(false);
  };
  const handleClose_Modal_add = () => {
    setEmp_department('');
    setOpen_Modal_add(false);
  };
  const handleClose_Modal_car = () => {
    setCar_province('')
    setOpen_Modal_car(false);
  };
  const handleClose_Modal_add_car = () => {
    setCar_province('')
    setOpen_Modal_add_car(false);
  };





  const [employee_list, setEmployee_list] = useState([]);
  const [car_list, setCar_list] = useState([]);

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

    const timer2 = setTimeout(() => {
        Axios.get('http://localhost:3001/login_admin_check').then((response) => {
          //console.log(response);
          if (response.data.loggedIn_admin == true) {
            console.log("ttt");

            setLoginStatus(response.data.loggedIn_admin);
          }
          else{
            setLoginStatus(response.data.loggedIn_admin);
          }

        })
    }, 1);

    return () => {
      clearTimeout(timer);
      clearTimeout(timer1);
      clearTimeout(timer2);


    }

  }, []);

  const data = [
    {
      username: "ceo",
      password: "000",
      State: "ceo"

    },
    {
      username: "manager1",
      password: "m111",
      State: "manager"
    },
    {
      username: "employee1",
      password: "e111",
      State: "employee"
    },
    {
      username: "employee2",
      password: "e222",
      State: "employee"
    },
    {
      username: "manager2",
      password: "m222",
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

  const haddleSetDepartment = (e) =>{
    setEmp_department(e)

  }

  const haddleSetProvince =(e) =>{
    setCar_province(e)
  }



  const department_list = [
    {id_de: '10',name:'เคาะ'},
    {id_de: '20',name:'เตรียมพื้น'},
    {id_de: '30',name:'ผสมสี/พ่นสี'},
    {id_de: '40',name:'ประกอบ/ขัดสี'},
  
  ];

  const province_th = [
    'กรุงเทพฯ',
    'กระบี่',
    'กาญจนบุรี',
    'กาฬสินธุ์',
    'กำแพงเพชร',
    'ขอนแก่น',
    'จันทบุรี',
    'ฉะเชิงเทรา',
    'ชลบุรี',
    'ชัยนาท',
    'ชัยภูมิ',
    'ชุมพร',
    'เชียงใหม่',
    'เชียงราย',
    'ตรัง',
    'ตราด',
    'ตาก',
    'นครนายก',
    'นครปฐม',
    'นครพนม',
    'นครราชสีมา',
    'นครศรีธรรมราช',
    'นครสวรรค์',
    'นนทบุรี',
    'นราธิวาส',
    'น่าน',
    'บึงกาฬ',
    'บุรีรัมย์',
    'ปทุมธานี',
    'ประจวบคีรีขันธ์',
    'ปราจีนบุรี',
    'ปัตตานี',
    'พระนครศรีอยุธยา',
    'พะเยา',
    'พังงา',
    'พัทลุง',
    'พิจิตร',
    'พิษณุโลก',
    'เพชรบุรี',
    'เพชรบูรณ์',
    'แพร่',
    'ภูเก็ต',
    'มหาสารคาม',
    'มุกดาหาร',
    'แม่ฮ่องสอน',
    'ยโสธร',
    'ยะลา',
    'ร้อยเอ็ด',
    'ระนอง',
    'ระยอง',
    'ราชบุรี',
    'ลพบุรี',
    'ลำปาง',
    'ลำพูน',
    'เลย',
    'ศรีสะเกษ',
    'สกลนคร',
    'สงขลา',
    'สตูล',
    'สมุทรปราการ',
    'สมุทรสงคราม',
    'สมุทรสาคร',
    'สระแก้ว',
    'สระบุรี',
    'สิงห์บุรี',
    'สุโขทัย',
    'สุพรรณบุรี',
    'สุราษฎร์ธานี',
    'สุรินทร์',
    'หนองคาย',
    'หนองบัวลำภู',
    'อ่างทอง',
    'อำนาจเจริญ',
    'อุดรธานี',
    'อุตรดิตถ์',
    'อุทัยธานี',
    'อุบลราชธานี',
  ];


  






  const item = [
    {
      text: 'พนักงาน',
      icon: <ManageAccountsIcon />,
      path: '/CEO'
    },
    {
      text: 'รถยนต์',
      icon: <SearchIcon />,
      path: '/Ceo_car'
    },
    
    {
        text: 'ผู้ใช้งาน',
        icon: <SearchIcon />,
        path: '/Employee'
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

  const logout_on=()=>{

    Axios.get('http://localhost:3001/logout').then((response) => {
    console.log(response);
    window.location = "/Login";

  });
}



  return (
    <div>
    {/* { loginStatus == true ?  */}
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
                    if (item.text == 'Log Out') {
                      // logout_on();
                      window.location = '/login'

                    }
                    else {
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
                <Tabs onChange={handleChange} /*aria-label="basic tabs example"*/>
                  {/* <Tab label="Employee" {...a11yProps(0)} /> */}
                  <Tab label="ข้อมูลรถยนต์" {...a11yProps(0)} />
                </Tabs>
              </Box>

              {/* <TabPanel value={value} index={0}>
                <div style={{ height: 300, width: '100%' }}>
                  <TableContainer component={Paper}>

                  <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  p: 0,
                  m: 0,
                  bgcolor: 'background.paper',
                  borderRadius: 0,
                }}
              >
                <Item>
                <FormControl sx={{ m: 1, minWidth: 120 }} size="small" >
                      <InputLabel id="demo-simple-select-label">แผนก</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={search}
                        label="แผนก"
                        onChange={(e) => { setSearch(e.target.value) }}
                        //onChange={(e)=>console.log(e)}
                        //onChange={(e)=>haddleSetDepartment(e.target.value)}
                      >
                      {department_list.map((row1) => (
                            <MenuItem
                              key={row1.id_de}
                              value={row1.name}
                              //name={row1.name}
                              //style={getStyles(name, personName, theme)}
                            >
                              {row1.name}
                            </MenuItem>
                      ))}
                        
                      </Select>
                      <Button
                      //startIcon={<AddRoundedIcon />}
                      //type="submit"
                      //fullWidth
                      variant="outlined"
                      color="primary"
                      sx={{ mt: 1, mb: 0 }}
                      onClick={(e) => { setSearch('') }}
                      >
                      ค่าเริ่มต้น
                      </Button>
                    </FormControl>
                
                  
                </Item>
                <Item>
                  
                  </Item>
                <Item>
                <Button
                      startIcon={<AddRoundedIcon />}
                      //type="submit"
                      //fullWidth
                      variant="outlined"
                      color="primary"
                      sx={{ mt: 1, mb: 0 }}
                      onClick={(e) => handle_on_modal_add()}
                    >
                      เพิ่มข้อมูลพนักงาน
                    </Button>

                </Item>
              </Box>




                  
                    {/* <FormControl sx={{ m: 1, width: 233, mt: 0 }}>
                    ค้นหาข้อมูลแผนก
                    </FormControl>  
                    

                    
                     
                    <br />
                    <Table sx={{ minWidth: 1100 }} size="large" aria-label="a dense table">
                      <TableHead>
                        <TableRow>
                          <TableCell width={100}>id_employee</TableCell>
                          <TableCell width={200} align="left">ชื่อ</TableCell>
                          <TableCell width={200} align="left">นามสกุล</TableCell>
                          <TableCell width={200} align="left">แผนก</TableCell>
                          <TableCell width={170} align="right"></TableCell>
                          {/* <TableCell width={170} align="right"></TableCell>
                                                <TableCell width={170} align="right"></TableCell> 

                        </TableRow>
                      </TableHead>
                      <TableBody>
                      {employee_list.filter((row) => {
                        if(search.toLowerCase() === ''){
                          return row;
                        }
                        else if(search.toLowerCase() !== ''){
                          return row.department.toLowerCase().includes(search.toLowerCase())
                        }

                      })
                      .map((row) => (
                          <TableRow
                            key={row.id_employee}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                            <TableCell component="th" scope="row" >{row.id_employee} </TableCell>
                            <TableCell align="left">{row.first_name}</TableCell>
                            <TableCell align="left">{row.last_name}</TableCell>
                            <TableCell align="left">{row.department}</TableCell>

                            <Button
                              startIcon={<ModeEditIcon />}
                              //type="submit"
                              //fullWidth
                              variant="outlined"
                              color="warning"

                              sx={{ mt: 1, mb: 0 }}
                              onClick={(e) => handleClickOpen_Modal(row.id_employee)}

                            >
                              แก้ไข
                            </Button>

                            <Button
                              startIcon={<DeleteIcon />}
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
              </TabPanel> */}

              <TabPanel value={value} index={0}>
                <div style={{ height: 300, width: '100%' }}>
                <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  p: 1,
                  m: 1,
                  bgcolor: 'background.paper',
                  borderRadius: 1,
                }}
              >
                <Item>
                <TextField
                    autoFocus
                    required
                    margin="dense"
                    label="ค้นหาตามหมวด"
                    name="first_Name"
                    //label="First Name"

                    sx={{ m: 1, minWidth: 50 }}
                    variant="standard"
                    value={car_search}
                    onChange={(event) => {
                      console.log(event);
                      setCar_search(event.target.value);
                    }}
                  />
                  <TextField
                    autoFocus
                    required
                    margin="dense"
                    label="ค้นหาตามเลขทะเบียน"
                    name="first_Name"
                    //label="First Name"

                    sx={{ m: 1, minWidth: 50 }}
                    variant="standard"
                    value={car_search1}
                    onChange={(event) => {
                      console.log(event);
                      setCar_search1(event.target.value);
                    }}
                  />
                </Item>
                <Item>
                  
                  </Item>
                <Item><Button
                    startIcon={<AddRoundedIcon />}
                    //type="submit"
                    //fullWidth
                    variant="outlined"
                    color="primary"
                    sx={{ mt: 2, mb: 0 }}
                    onClick={(e) => handle_on_modal_add_car(e)}
                  >
                    เพิ่มข้อมูลรถยนต์
                  </Button></Item>
              </Box>
                  
                  
                  
                   
                 
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 1100 }} size="large" aria-label="a dense table">
                      <TableHead>
                        <TableRow>
                          <TableCell width={100} align="left">id_car</TableCell>
                          <TableCell width={100} align="left">หมวด</TableCell>
                          <TableCell width={200} align="left">เลขทะเบียน</TableCell>
                          <TableCell width={300} align="left">จังหวัด</TableCell>
                          <TableCell width={300} align="left">ยี่ห้อ</TableCell>
                          <TableCell width={300} align="left">รุ่น</TableCell>
                          <TableCell width={200} align="left">ปี</TableCell>
                          <TableCell width={300} align="left">เลขตัวถัง</TableCell>
                          <TableCell width={1000} align="right"></TableCell>
                          {/* <TableCell width={170} align="right"></TableCell>
                                                <TableCell width={170} align="right"></TableCell> */}

                        </TableRow>
                      </TableHead>
                      <TableBody>
                      {car_list.filter((row) => {
                        if(car_search.toLowerCase() === '' && car_search1.toLowerCase() === ''){
                          return row;
                        }
                        else if(car_search.toLowerCase() !== '' && car_search1.toLowerCase() !== ''){
                          return row.catagory.toLowerCase().includes(car_search.toLowerCase()) && row.number_car.toLowerCase().includes(car_search1.toLowerCase())
                        }
                        else if(car_search.toLowerCase() !== '' && car_search1.toLowerCase() === ''){
                          return row.catagory.toLowerCase().includes(car_search.toLowerCase()) 
                        }
                        else if(car_search.toLowerCase() === '' && car_search1.toLowerCase() !== ''){
                          return row.number_car.toLowerCase().includes(car_search1.toLowerCase()) 
                        }

                      }).map((row) => (
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
                              startIcon={<AssignmentTurnedInIcon />}
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
                              startIcon={<ModeEditIcon />}
                              //type="submit"
                              //fullWidth
                              variant="outlined"
                              color="warning"

                              sx={{ mt: 1, mb: 0 }}
                              onClick={(e) => handleClickOpen_Modal_car(row.id_car)}
                            >
                              แก้ไข
                            </Button>
                            <Button
                              startIcon={<DeleteIcon />}
                              //type="submit"
                              //fullWidth
                              variant="outlined"
                              color="error"
                              sx={{ mt: 1, mb: 0 }}
                              onClick={(e) => {
                                delete_car(row.id_car);
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

        {/* แก้ไขข้อมูลพนักงาน */}
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
          <DialogTitle>แก้ไขข้อมูลพนักงาน</DialogTitle>
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
            <FormControl variant="standard" fullWidth>
            <InputLabel id="demo-simple-select-label">แผนก</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={emp_department}
              label="แผนก"
              //onChange={(e)=>console.log(e)}
              onChange={(e)=>haddleSetDepartment(e.target.value)}
            >
            {department_list.map((row1) => (
                  <MenuItem
                    key={row1.id_de}
                    value={row1.name}
                    //name={row1.name}
                    //style={getStyles(name, personName, theme)}
                  >
                    {row1.name}
                  </MenuItem>
            ))}
              
            </Select>
          </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose_Modal}>ยกเลิก</Button>
            <Button
              onClick={(e) => edit_emp(e)}

            >
              ยืนยันแก้ไข
            </Button>
          </DialogActions>
        </Dialog>

        {/* แก้ไขข้อมูลรถยนต์ */}
        <Dialog
          open={open_modal_car}
          onClose={handleClose_Modal_car}

          maxWidth="sm"
          PaperProps={{
            component: 'form',
            onSubmit: (event) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              const formJson = Object.fromEntries(formData.entries());
              s
              handleClose_Modal_car();
            },
          }}
        >
          <DialogTitle>แก้ไขข้อมูลรถยนต์</DialogTitle>
          <DialogContent>
            <DialogContentText>
              โปรดระบุข้อมูลที่ต้องการแก้ไข.
            </DialogContentText>
            <TextField
              autoFocus
              required
              margin="dense"
              label="หมวด"
              name="car_catagory"
              //label="First Name"

              fullWidth
              variant="standard"
              value={car_catagory}
              onChange={(event) => {
                console.log(event);
                setCar_catagory(event.target.value);
              }}
            />
            <TextField
              autoFocus
              required
              margin="dense"
              id="car_number_car"
              name="car_number_car"
              label="เลขทะเบียน"

              fullWidth
              variant="standard"
              value={car_number_car}
              onChange={(event) => {
                //console.log(event.target.value);
                setCar_number_car(event.target.value);
              }}
            />
            <FormControl variant="standard" fullWidth>
            <InputLabel id="demo-simple-select-label">จังหวัด</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={car_province}
              label="จังหวัด"
              
              //onChange={(e)=>console.log(e)}
              onChange={(e)=>haddleSetProvince(e.target.value)}
            >
            {province_th.map((row1) => (
                  <MenuItem
                    key={row1}
                    value={row1}
                    //name={row1.name}
                    //style={getStyles(name, personName, theme)}
                  >
                    {row1}
                  </MenuItem>
            ))}
              
            </Select>
          </FormControl>
            <TextField
              autoFocus
              required
              margin="dense"
              id="car_brand"
              name="car_brand"
              label="ยี่ห้อ"

              fullWidth
              variant="standard"
              value={car_brand}
              onChange={(event) => {
                //console.log(event.target.value);
                setCar_brand(event.target.value);
              }}
            />
            <TextField
              autoFocus
              required
              margin="dense"
              id="car_model"
              name="car_model"
              label="รุ่น"

              fullWidth
              variant="standard"
              value={car_model}
              onChange={(event) => {
                //console.log(event.target.value);
                setCar_model(event.target.value);
              }}
            />
            <TextField
              autoFocus
              required
              margin="dense"
              id="car_year_car"
              name="car_year_car"
              label="ปี"

              fullWidth
              variant="standard"
              value={car_year_car}
              onChange={(event) => {
                //console.log(event.target.value);
                setCar_year_car(event.target.value);
              }}
            />
            <TextField
              autoFocus
              required
              margin="dense"
              id="car_vin"
              name="car_vin"
              label="เลขตัวถัง"

              fullWidth
              variant="standard"
              value={car_vin}
              onChange={(event) => {
                //console.log(event.target.value);
                setCar_vin(event.target.value);
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose_Modal_car}>ยกเลิก</Button>
            <Button
              onClick={(e) => edit_car(e)}

            >
              ยืนยันแก้ไข
            </Button>
          </DialogActions>
        </Dialog>

        {/* เพิ่มข้อมูลพนักงาน */}
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
          <DialogTitle>เพิ่มข้อมูลพนักงาน</DialogTitle>
          <DialogContent>
            <DialogContentText>
              โปรดระบุข้อมูลที่ต้องการเพิ่ม
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

          <FormControl variant="standard" fullWidth>
            <InputLabel id="demo-simple-select-label">แผนก</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={emp_department}
              label="แผนก"
              //onChange={(e)=>console.log(e)}
              onChange={(e)=>haddleSetDepartment(e.target.value)}
            >
            {department_list.map((row1) => (
                  <MenuItem
                    key={row1.id_de}
                    value={row1.name}
                    //name={row1.name}
                    //style={getStyles(name, personName, theme)}
                  >
                    {row1.name}
                  </MenuItem>
            ))}
              
            </Select>
          </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose_Modal_add}>ยกเลิก</Button>
            <Button
              onClick={(e) => handle_addEmp(e)}

            >
              ยืนยัน
            </Button>
          </DialogActions>
        </Dialog>
        
        {/* เพิ่มข้อมูลรถยนต์ */}
        <Dialog
          open={open_modal_add_car}
          onClose={handleClose_Modal_car}

          maxWidth="sm"
          PaperProps={{
            component: 'form',
            onSubmit: (event) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              const formJson = Object.fromEntries(formData.entries());
              s
              handleClose_Modal_car();
            },
          }}
        >
          <DialogTitle>เพิ่มข้อมูลรถยนต์</DialogTitle>
          <DialogContent>
            <DialogContentText>
              โปรดระบุข้อมูลที่ต้องการเพิ่ม
            </DialogContentText>
            <TextField
              autoFocus
              required
              margin="dense"
              label="หมวด"
              name="catagory"
              //label="First Name"
              //pattern="[0-9]{1-4}"
              //maxLength={4}

              fullWidth
              variant="standard"
              //value={emp_first}
              onChange={(event) => {
                console.log(event);
                setCar_catagory(event.target.value);
              }}
            />
            <TextField
              autoFocus
              required
              margin="dense"
              id="number_car"
              name="number_car"
              label="เลขทะเบียน"
              //pattern="[0-9]{1-4}"

              fullWidth
              variant="standard"
              //value={emp_last}
              onChange={(event) => {
                //console.log(event.target.value);
                setCar_number_car(event.target.value);
              }}
            />
            <FormControl variant="standard" fullWidth>
            <InputLabel id="demo-simple-select-label">จังหวัด</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={car_province}
              label="จังหวัด"
              
              //onChange={(e)=>console.log(e)}
              onChange={(e)=>haddleSetProvince(e.target.value)}
            >
            {province_th.map((row1) => (
                  <MenuItem
                    key={row1}
                    value={row1}
                    //name={row1.name}
                    //style={getStyles(name, personName, theme)}
                  >
                    {row1}
                  </MenuItem>
            ))}
              
            </Select>
          </FormControl>

           {/* <TextField
              autoFocus
              required
              margin="dense"
              id="province"
              name="province"
              label="จังหวัด"

              fullWidth
              variant="standard"
              //value={emp_department}
              onChange={(event) => {
                //console.log(event.target.value);
                setCar_province(event.target.value);
              }}
            /> */}
            <TextField
              autoFocus
              required
              margin="dense"
              id="brand"
              name="brand"
              label="ยี่ห้อ"

              fullWidth
              variant="standard"
              //value={emp_department}
              onChange={(event) => {
                //console.log(event.target.value);
                setCar_brand(event.target.value);
              }}
            />
            <TextField
              autoFocus
              required
              margin="dense"
              id="model"
              name="model"
              label="รุ่น"

              fullWidth
              variant="standard"
              //value={emp_department}
              onChange={(event) => {
                //console.log(event.target.value);
                setCar_model(event.target.value);
              }}
            />
            <TextField
              autoFocus
              required
              margin="dense"
              id="year_car"
              name="year_car"
              label="ปี"
              //pattern="[0-9]{1-4}"

              fullWidth
              variant="standard"
              //value={emp_department}
              onChange={(event) => {
                //console.log(event.target.value);
                setCar_year_car(event.target.value);
              }}
            />
            <TextField
              autoFocus
              required
              margin="dense"
              id="vin"
              name="vin"
              label="เลขตัวถัง"
              //pattern="{17}"

              fullWidth
              variant="standard"
              //value={emp_department}
              onChange={(event) => {
                //console.log(event.target.value);
                setCar_vin(event.target.value);
              }}
            />

          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose_Modal_add_car}>ยกเลิก</Button>
            <Button
              onClick={(e) => handle_addCar(e)}

            >
              ยืนยัน
            </Button>
          </DialogActions>
        </Dialog>
      </ThemeProvider>
    {/* // :
    // <>
    // {/* {window.location = '/Login'}  
    // </>}*/}
    </div>

  )
}

export default Ceo_car;