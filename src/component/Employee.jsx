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






function Employee() {

  const [open_modal, setOpen_Modal] = useState(false);
  const [open_modal_add, setOpen_Modal_add] = useState(false);


  // const [department_, setDepartment_list] = useState([]);
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);

  const [admin_list,setAdmin_list] = useState([]);

  const [ad_username, setAd_Username] = useState("");
  const [ad_pass, setAd_Pass] = useState("");
  const [ad_license, setAd_license] = useState("");


 


  const [emp_first, setEmp_first] = useState("world");
  const [emp_last, setEmp_last] = useState("hello");
  const [emp_department, setEmp_department] = useState("world");
  const [emp_id, setEmp_id] = useState("world");


  //-------------------------------------------------------------------------------------------------------

  const delete_admin = (id) => {
    console.log(id);

    var ans = confirm("ยืนยันลบพนักงาน id :" + id);
    if (ans == true) {
      Axios.delete(`http://localhost:3001/delete_admin/${id}`).then((response) => {
        setAdmin_list(
          admin_list.filter((val) => {
            return val.ad_username != id;
          })
        );
      });
      setAd_Username("");
      //window.location = '/EditData';
    }
  }

  
  //-------------------------------------------------------------------------------------------------------



  const handle_add_admin = (e) => {
    Axios.post("http://localhost:3001/add_admin", {
      ad_username: ad_username,
      ad_pass: ad_pass,
      ad_license: ad_license,

    }).then((response) => {
      console.log(response);

    });

    Axios.get("http://localhost:3001/admin_history").then((response) => {
      setAdmin_list(response.data);

    });
    setOpen_Modal_add(false);
  };

  






  //--------------------------------------------------------------------------------

  const handleClickOpen_Modal = (e) => {
    setAd_Username(e)
    let id = e;
    //setCheck_Click('edit');
    Axios.get(`http://localhost:3001/edit_admin/${id}`).then((response) => {
      //console.log(response.data[0].kl_name);
      //setInput_value(response.data[0].ml_name);
      setAd_Username(response.data[0].ad_username)
      setAd_Pass(response.data[0].ad_pass)
      setAd_license(response.data[0].ad_license)

      //setMemberID(response.data[0].ml_id);
    }
    )

    //console.log(e)
    //setInput_value(e)
    setOpen_Modal(true);
  };

  const edit_admin = (e) => {
    Axios.put("http://localhost:3001/update_admin", {
      //ad_username: ad_username,
      ad_pass: ad_pass,
      ad_license: ad_license,
      ad_username: ad_username,
    }).then(
      (response) => {
        window.location = '/employee';

      }
    );
  }


  

 




  useEffect(() => {
    const timer = setTimeout(() => {
      console.log('This will run after 1 second!');
      Axios.get('http://localhost:3001/admin_list').then((response) => {
        //console.log(response);
        setAdmin_list(response.data);
      })
    }, 10);

  


    return () => {
      clearTimeout(timer);
   
 


    }

  }, []);

  



  const theme = createTheme({
    palette: {
      maincolor: {
        main: "#86a8c5",
        contrastText: "#ffffff",
      },
    },
  });
  






  const license_list = [
    {id_de: '10',name:'ceo'},
    {id_de: '20',name:'manager'},
    {id_de: '30',name:'employee'},
    
  
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

  const handle_on_modal_add=()=>{
    setOpen_Modal_add(true);
  }

  const handleClose_Modal=()=>{
    setAd_license('')
    setOpen_Modal(false);
  }

  const handleClose_Modal_add=()=>{
    setAd_license('');
    setOpen_Modal_add(false);
  }

  
  const haddleSetLicense=(e)=>{
    setAd_license(e)
  }

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  


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
                    if (item.text == 'Log Out') {
                      // logout_on();
                      window.location = '/login';

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
                  <Tab label="ข้อมูลพนักงาน" {...a11yProps(0)} />
                  
                </Tabs>
              </Box>

              <TabPanel value={value} index={0}>
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
                      <InputLabel id="demo-simple-select-label">ตำแหน่ง</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={search}
                        label="ตำแหน่ง"
                        onChange={(e) => { setSearch(e.target.value) }}
                        //onChange={(e)=>console.log(e)}
                        //onChange={(e)=>haddleSetDepartment(e.target.value)}
                      >
                      {license_list.map((row1) => (
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
                    </FormControl>  */}
                    

                    
                     
                    <br />
                    <Table sx={{ minWidth: 1100 }} size="large" aria-label="a dense table">
                      <TableHead>
                        <TableRow>
                          <TableCell width={100}>id</TableCell>
                          <TableCell width={200} align="left">username</TableCell>
                          <TableCell width={200} align="left">password</TableCell>
                          <TableCell width={200} align="left">ตำแหน่ง</TableCell>
                          <TableCell width={170} align="right"></TableCell>
                          {/* <TableCell width={170} align="right"></TableCell>
                                                <TableCell width={170} align="right"></TableCell> */}

                        </TableRow>
                      </TableHead>
                      <TableBody>
                      {admin_list.filter((row) => {
                        if(search.toLowerCase() === ''){
                          return row;
                        }
                        else if(search.toLowerCase() !== ''){
                          return row.ad_license.toLowerCase().includes(search.toLowerCase())
                        }

                      })
                      .map((row,index) => (
                          <TableRow
                            key={index+1}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                            <TableCell component="th" scope="row" >{index+1} </TableCell>
                            <TableCell align="left">{row.ad_username}</TableCell>
                            <TableCell align="left">{row.ad_pass}</TableCell>
                            <TableCell align="left">{row.ad_license}</TableCell>

                            <Button
                              startIcon={<ModeEditIcon />}
                              //type="submit"
                              //fullWidth
                              variant="outlined"
                              color="warning"

                              sx={{ mt: 1, mb: 0 }}
                              onClick={(e) => handleClickOpen_Modal(row.ad_username)}

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
                                delete_admin(row.ad_username);
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
              label="username"
              name="username"
              inputProps={{ maxLength: 6 }}
              //label="First Name"

              fullWidth
              variant="standard"
              value={ad_username}
              
              onChange={(event) => {
                console.log(event);
                setAd_Username(event.target.value);
              }}
            />
            <TextField
              autoFocus
              required
              margin="dense"
              id="password"
              name="password"
              label="password"
              inputProps={{ maxLength: 6 }}
              

              fullWidth
              variant="standard"
              value={ad_pass}
              onChange={(event) => {
                //console.log(event.target.value);
                setAd_Pass(event.target.value);
              }}
            />
            <FormControl variant="standard" fullWidth>
            <InputLabel id="demo-simple-select-label">ตำแหน่ง</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={ad_license}
              label="ตำแหน่ง"
              //onChange={(e)=>console.log(e)}
              onChange={(e)=>haddleSetLicense(e.target.value)}
            >
            {license_list.map((row1) => (
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
              //onClick={(e) => edit_emp(e)}
              onClick={(e) => edit_admin(e)}
            >
              ยืนยันแก้ไข
            </Button>
          </DialogActions>
        </Dialog>

        

        {/* เพิ่มข้อมูลพนักงาน */}
        <Dialog
          open={open_modal_add}
          onClose={handleClose_Modal_add}

          maxWidth="sm"
          PaperProps={{
            component: 'form',
            onSubmit: (event) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              const formJson = Object.fromEntries(formData.entries());
              s
              handleClose_Modal_add();
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
              label="username"
              name="username"
              //label="First Name"

              fullWidth
              variant="standard"
              //value={emp_first}
              onChange={(event) => {
                console.log(event);
              
                setAd_Username(event.target.value);
              }}
            />
            <TextField
              autoFocus
              required
              margin="dense"
              id="passwword"
              name="passwword"
              label="passwword"

              fullWidth
              variant="standard"
              //value={emp_last}
              onChange={(event) => {
                //console.log(event.target.value);
                setAd_Pass(event.target.value);
              
              }}
            />

          <FormControl variant="standard" fullWidth>
            <InputLabel id="demo-simple-select-label">ตำแหน่ง</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={ad_license}
              label="ตำแหน่ง"
              //onChange={(e)=>console.log(e)}
              onChange={(e)=>haddleSetLicense(e.target.value)}
            >
            {license_list.map((row1) => (
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
              //onClick={(e) => handle_addEmp(e)}
              onClick={(e) => handle_add_admin(e)}
            >
              ยืนยัน
            </Button>
          </DialogActions>
        </Dialog>
        
        
      </ThemeProvider>
    </>

  )
}

export default Employee;