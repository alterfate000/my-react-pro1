import * as React from 'react';
import { useState,useEffect,useRef } from 'react';
import Nav from './Nav'
import Axios from 'Axios';
//import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
//import TextareaAutosize from '@material-ui/core/TextareaAutosize';
//import Textarea from '@mui/joy/Textarea';
//import TextareaAutosize from '@mui/base/TextareaAutosize';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
//import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
//import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
//import Select from '@mui/material/Select';
import { Divider,Radio, Select, Space,Tag } from 'antd';
//import { Divider, Select, Space } from 'antd';
//import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
//import Stack from '@mui/material/Stack';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

//import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Modal from '@mui/material/Modal';
//import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { Avatar} from 'antd';
import { UserOutlined } from '@ant-design/icons';


import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import FileUploadIcon from '@mui/icons-material/FileUploadOutlined';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';

import { useDemoData } from '@mui/x-data-grid-generator';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import {
    GridRowModes,
    DataGrid,
    GridToolbarContainer,
    GridActionsCellItem,
    GridRowEditStopReasons,
  } from '@mui/x-data-grid';
import {
    random,
    randomCreatedDate,
    randomTraderName,
    randomUpdatedDate,
    randomId,
    randomArrayItem,
  } from '@mui/x-data-grid-generator';

  //---------------------------------
  import AddIcon from '@mui/icons-material/Add';
  import EditIcon from '@mui/icons-material/Edit';
import { useParams } from 'react-router-dom';




//const [number_id,setNumber_id] = useState(0);
let number_id = 0;


const themes = createTheme({
    palette: {
        maincolor: {
            main: "#0000ff",
            contrastText: "#ffffff",
        },
    },
});

const inlineStyles = {
    color: '#86a8c5',
    fontSize: '50px',
    marginTop: '2em',
    'border-bottom': 'solid 3px #86a8c5'
};

const background = {
    backgroundColor: '#0000ff',
};

const bg = {
    backgroundColor: '#ffffff',

};

const { TextArea } = Input;

const textshadow = {
    fontSize: 100,
    color: '#FFFFFF',
    fontFamily: 'Times New Roman',
    paddingLeft: 30,
    paddingRight: 30,
    textShadowColor: '#86a8c5',
    textShadowOffset: { width: 5, height: 5 },
    textShadowRadius: 10,
};


//---------------------------------------------------------------------
const roles = ['Market', 'Finance', 'Development'];
const randomRole = () => {
  return randomArrayItem(roles);
};

const initialRows = [
    {
      id: 1,
      id_order: 1,
      spares_parts: "ล้อ",
      location_part: "L",
    },
    {
      id: 2,
      id_order:2,
      spares_parts: "กันชน",
      location_part: "L",
    },
    {
      id: 3,
      id_order: 3,
      spares_parts: "กระจกข้าง",
      location_part: "R",
    },
    
];




function EditToolbar(props) {
  const { setRows, setRowModesModel } = props;
  const [input_test,setInput_test] = useState('')

  const handleClick = () => {
    const id = number_id;
    number_id = number_id + 1 ;
    setRows((oldRows) => [...oldRows, { id, pair_detail: '',pair_location:'', isNew: true }]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: 'pair_detail' },
    }));
  };

  return (
    <GridToolbarContainer>
        <Typography  
            fontFamily='Century Gothic'
            letterSpacing={1} 
            // textAlign='right'
            sx={{ p: 1, borderRadius: 2 }}                                     
        >
            รายการซ่อม
        </Typography>
      <Button color="primary" variant="contained" startIcon={<AddIcon />} onClick={handleClick}>
        เพิ่มรายการซ่อม
      </Button>
    </GridToolbarContainer>
  );
}







function Show_job_detail() { 

    

    const [testdata,setTestdata] = useState([]);
    const { id_job } = useParams();
   
    

    
    

    const [value, setValue] = useState("");
    const [cm_date, setCM_date] = useState(null);
    const [cd_date, setCD_date] = useState(null);



    //-----------เตรียมข้อมูลลง DB

    //------------------------------------------


    const [repair_list,setRair_list] = useState("");

    const [nbRows, setNbRows] =useState(3);
    const removeRow = () => setNbRows((x) => Math.max(0, x - 1));
    const addRow = () => setNbRows((x) => Math.min(100, x + 1));


    const [inputDB_id, setInputDB_id] = useState("");
    const [inputDB_pair_detail, setInputDB_pair_detail] = useState('');
    const [inputDB_pair_location, setInputDB_pair_location] = useState('n');
    const [inputDB_id_job, setInputDB_id_job] = useState('');
    



    const { data } = useDemoData({
        dataSet: 'Commodity',
        rowLength: 10,
        maxColumns: 6,
    });

    const onChangeStartDate = (date, dateString) => {
        if(date == null){
            setCM_date(null)
            setStart_date(new Date());
            return ;
        }
        setCM_date(date)
        const str_day = date.$D;
        const str_month = date.$M + 1;
        const str_year = date.$y;
        setStart_date(str_year+"-"+str_month+"-"+str_day);
        // console.log(str_day);
        // console.log(str_month);
        // console.log(str_year);
        //console.log(str_year+"-"+str_month+"-"+str_day);
      };
    
    const onChangeEndDate = (date, dateString) => {
        if(date == null){
            setCD_date(null)
            setEnd_date(new Date());
            return ;
        }
        setCD_date(date)
        const str_day = date.$D;
        const str_month = date.$M + 1;
        const str_year = date.$y;
        setEnd_date(str_year+"-"+str_month+"-"+str_day);
        // console.log(str_day);
        // console.log(str_month);
        // console.log(str_year);
        //console.log(str_year+"-"+str_month+"-"+str_day);
    };

    const haddleClickDeleteJob = (id) =>{
        console.log(id);

    }

    //-------------------------------------------------------------------------

    


    //-------------------------------------------------------------------------

    const [rows, setRows] = useState(/*initialRows*/[]);
  const [rowModesModel, setRowModesModel] = useState({});
  
  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => () => {
    
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    

  };

  const handleDeleteClick = (id) => () => {
    console.log('handleCancelClick')
    console.log(id)


    var ans = confirm("ยืนยันลบรายการซ่อมที่ :" + id);
    if (ans == true) {
      Axios.delete('http://localhost:3001/delete_job_list',{
        params: {
            id: id,
            id_job: pageNumber,
      }}   
        
      ).then((response) => {
        
        
      });
      
      //window.location = '/EditData';
    }





    setRows(rows.filter((row) => row.id !== id));
  };

  const handleCancelClick = (id) => () => {
    
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    console.log('rows = ');
    console.log(rows[number_id-2]);

    Axios.post("http://localhost:3001/add_job_list", {
        id: rows[number_id-2].id,
        pair_detail: rows[number_id-2].pair_detail,
        pair_location: rows[number_id-2].pair_location,
        id_job: pageNumber,
        
    }).then((response) => {
      console.log(response);

    });



    setRowModesModel(newRowModesModel);
  };

  const columns = [
    {   field: 'id',
        headerName: '',
        width: 80,
        editable: true 
    },
    
    {
        field: 'pair_detail',
        headerName: 'รายการซ่อม',
    //   type: 'number',
        width: 180,
        align: 'left',
        headerAlign: 'left',
        editable: true,
    },
    {
        field: 'pair_location',
        headerName: 'ตำแหน่ง',
        width: 80,
        editable: true,
        type: 'singleSelect',
        valueOptions: ['L', 'R'],
    },
    
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: 'primary.main',
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];



      //----------------------------------------------------------------

      const [emp_step1_list,setEmp_step1_list] = useState([]);
      const [emp_step2_list,setEmp_step2_list] = useState([]);
      const [emp_step3_list,setEmp_step3_list] = useState([]);
      const [emp_step4_list,setEmp_step4_list] = useState([]);
      const [emp_step5_list,setEmp_step5_list] = useState([]);
      const [emp_step6_list,setEmp_step6_list] = useState([]);
      const [emp_step7_list,setEmp_step7_list] = useState([]);


      //------------แสดงค่าที่เลือก

      const [show_emp_step1,setShow_Emp_step1] = useState('--โปรดเลือกรายชื่อช่างที่ต้องการ--');
      const [show_emp_step2,setShow_Emp_step2] = useState('--โปรดเลือกรายชื่อช่างที่ต้องการ--');
      const [show_emp_step3,setShow_Emp_step3] = useState('--โปรดเลือกรายชื่อช่างที่ต้องการ--');
      const [show_emp_step4,setShow_Emp_step4] = useState('--โปรดเลือกรายชื่อช่างที่ต้องการ--');
      const [show_emp_step5,setShow_Emp_step5] = useState('--โปรดเลือกรายชื่อช่างที่ต้องการ--');
      const [show_emp_step6,setShow_Emp_step6] = useState('--โปรดเลือกรายชื่อช่างที่ต้องการ--');
      const [show_emp_step7,setShow_Emp_step7] = useState('--โปรดเลือกรายชื่อช่างที่ต้องการ--');

      //------------แสดงค่าที่เก็บลง DB

      const [emp_step1,setEmp_step1] = useState('');
      const [emp_step2,setEmp_step2] = useState('');
      const [emp_step3,setEmp_step3] = useState('');
      const [emp_step4,setEmp_step4] = useState('');
      const [emp_step5,setEmp_step5] = useState('');
      const [emp_step6,setEmp_step6] = useState('');
      const [emp_step7,setEmp_step7] = useState('');

      //--------------------------------------

      const [chk_emp_step1,setChk_Emp_step1] = useState(false);
      const [chk_emp_step2,setChk_Emp_step2] = useState(false);
      const [chk_emp_step3,setChk_Emp_step3] = useState(false);
      const [chk_emp_step4,setChk_Emp_step4] = useState(false);
      const [chk_emp_step5,setChk_Emp_step5] = useState(false);
      const [chk_emp_step6,setChk_Emp_step6] = useState(false);
      const [chk_emp_step7,setChk_Emp_step7] = useState(false);


      //--------------------------------------------------------

      const haddle_emp1=(e)=>{
        // console.log('haddle_emp1')
        // console.log(e)
        setEmp_step1(e);
        Axios.get(`http://localhost:3001/get_name_emp/${e}`).then((response) => {
            //console.log(response.data);
            setShow_Emp_step1(response.data[0].first_name +' ' + response.data[0].last_name);
        })
      }

      const haddle_emp2=(e)=>{
        setEmp_step2(e);
        Axios.get(`http://localhost:3001/get_name_emp/${e}`).then((response) => {
            //console.log(response);
            setShow_Emp_step2(response.data[0].first_name +' ' + response.data[0].last_name);
        })
        
        
      }

      const haddle_emp3=(e)=>{
        setEmp_step3(e);
        Axios.get(`http://localhost:3001/get_name_emp/${e}`).then((response) => {
            //console.log(response);
            setShow_Emp_step3(response.data[0].first_name +' ' + response.data[0].last_name);
        })
      }

      const haddle_emp4=(e)=>{
        setEmp_step4(e);
        Axios.get(`http://localhost:3001/get_name_emp/${e}`).then((response) => {
            //console.log(response);
            setShow_Emp_step4(response.data[0].first_name +' ' + response.data[0].last_name);
        })
      }

      const haddle_emp5=(e)=>{
        setEmp_step5(e);
        Axios.get(`http://localhost:3001/get_name_emp/${e}`).then((response) => {
            //console.log(response);
            setShow_Emp_step5(response.data[0].first_name +' ' + response.data[0].last_name);
        })
      }

      const haddle_emp6=(e)=>{
        setEmp_step6(e);
        Axios.get(`http://localhost:3001/get_name_emp/${e}`).then((response) => {
            //console.log(response);
            setShow_Emp_step6(response.data[0].first_name +' ' + response.data[0].last_name);
        })
      }

      const haddle_emp7=(e)=>{
        //console.log('haddle')
        //console.log(e)
        setEmp_step7(e);
        Axios.get(`http://localhost:3001/get_name_emp/${e}`).then((response) => {
            //console.log(response);
            setShow_Emp_step7(response.data[0].first_name +' ' + response.data[0].last_name);
        })

        
      }

      const haddle_summit_order=(e)=>{

        var ans = confirm("ยืนยันอัพเดทใบสั่งซ่อม" );
        if (ans == true) {
            Axios.put("http://localhost:3001/update_status_job", {
                status_job:'01',
                id_job:id_job,
            

            }).then((response) => {
                window.location = '/Emp_search_job';
            

        });


        }







        


        

      }






      const [job_detail_list,setJob_detail_list] = useState([]);

      //---------------------------------- เก็บข้อมูลที่ส่งจาก DB


        const [car_number,setCar_number] = useState("");
        const [car_vin,setCar_vin] = useState("");
        const [car_brand,setCar_brand] = useState("");
        const [car_year,setCar_year] = useState("");
        const [start_date, setStart_date] = useState();
        const [end_date, setEnd_date] = useState();
        const [car_status, setCar_status] = useState("ปกติ");
        const [pay_status, setPay_status] = useState("เงินสด");
        const [input_detail, setInput_detail] = useState('');
        const [status_job, setStatus_job] = useState('00');


        const [show_order_pair, setShow_order_pair] = useState([]);

        


      useEffect(() => {

        const timer0 = setTimeout(() => {
            console.log('This will run after 1 second!');
            Axios.get(`http://localhost:3001/show_job_detail/${id_job}`).then((response) => {
              //console.log(response);
              setCar_number(response.data[0].car_number);
              setCar_vin(response.data[0].car_vin);
              setCar_brand(response.data[0].car_brand);
              setCar_status(response.data[0].status)
              setCar_year(response.data[0].car_year);
              setStart_date(response.data[0].first_date);
              setEnd_date(response.data[0].end_date);
              setInput_detail(response.data[0].detail);
              setPay_status(response.data[0].payment);
              setStatus_job(response.data[0].status_job);
            })
          }, 10);




        const timer = setTimeout(() => {
          console.log('This will run after 1 second!');
          Axios.get('http://localhost:3001/test_data').then((response) => {
            //console.log(response);
            setTestdata(response.data);
          })
        }, 10);

        const timer2 = setTimeout(() => {
            console.log('length(initialRows');
            Axios.get(`http://localhost:3001/order_pair_list/${pageNumber}`).then((response) => {
                //console.log(response);
                //setPair_job_list(response.data);
                setRows(response.data);
                console.log(response.data.length);
                number_id = response.data.length + 1;
               
             
            })
        }, 30);

        const timer1 = setTimeout(() => {
            Axios.get(`http://localhost:3001/car_detail/${pageNumber}`).then((response) => {
                //console.log(response);
                //setPair_job_list(response.data);
                setCar_number(response.data[0].catagory+"-"+response.data[0].number_car+"-"+response.data[0].province);
                setCar_vin(response.data[0].vin);
                setCar_year(response.data[0].year_car);
                setCar_brand(response.data[0].brand+"-"+response.data[0].model);
            })
        }, 50);

        const timer3 = setTimeout(() => {
            Axios.get(`http://localhost:3001/show_employee_step1/${id_job}`).then((response) => {
                //console.log(response);
                //setPair_job_list(response.data);
                if(response.data[0]!= ''){
                    setShow_Emp_step1(response.data[0].first_name + ' '+ response.data[0].last_name);
                    setChk_Emp_step1(true);
                    console.log('hello in step1');

                }
                
                
                
            })
        }, 50);

        const timer4 = setTimeout(() => {
            Axios.get(`http://localhost:3001/show_employee_step2/${id_job}`).then((response) => {
                //console.log(response);
                //setPair_job_list(response.data);
                if(response.data[0] != ''){
                    setShow_Emp_step2(response.data[0].first_name + ' '+ response.data[0].last_name);
                    setChk_Emp_step2(true);

                }
                
            })
        }, 70);

        const timer5 = setTimeout(() => {
            Axios.get(`http://localhost:3001/show_employee_step3/${id_job}`).then((response) => {
                //console.log(response);
                //setPair_job_list(response.data);
                if(response.data[0] != ''){
                    setShow_Emp_step3(response.data[0].first_name + ' '+ response.data[0].last_name);
                    setChk_Emp_step3(true);

                }
                
            })
        }, 90);

        const timer6 = setTimeout(() => {
            Axios.get(`http://localhost:3001/show_employee_step4/${id_job}`).then((response) => {
                //console.log(response);
                //setPair_job_list(response.data);
                if(response.data[0] != ''){
                    setShow_Emp_step4(response.data[0].first_name + ' '+ response.data[0].last_name);
                    setChk_Emp_step4(true);

                }
                
            })
        }, 100);

        const timer7 = setTimeout(() => {
            Axios.get(`http://localhost:3001/show_employee_step5/${id_job}`).then((response) => {
                //console.log(response);
                //setPair_job_list(response.data);
                if(response.data[0] != ''){
                    setShow_Emp_step5(response.data[0].first_name + ' '+ response.data[0].last_name);
                    setChk_Emp_step5(true);

                }
                
            })
        }, 110);

        const timer8 = setTimeout(() => {
            Axios.get(`http://localhost:3001/show_employee_step6/${id_job}`).then((response) => {
                //console.log(response);
                //setPair_job_list(response.data);
                if(response.data[0] != ''){
                    setShow_Emp_step6(response.data[0].first_name + ' '+ response.data[0].last_name);
                    setChk_Emp_step6(true);

                }
                
            })
        }, 120);

        const timer9 = setTimeout(() => {
            Axios.get(`http://localhost:3001/show_employee_step7/${id_job}`).then((response) => {
                //console.log(response);
                //setPair_job_list(response.data);
                if(response.data[0] != ''){
                    setShow_Emp_step7(response.data[0].first_name + ' '+ response.data[0].last_name);
                    setChk_Emp_step7(true);

                }
                
            })
        }, 130);

        const timer10 = setTimeout(() => {
            Axios.get(`http://localhost:3001/show_order_pair/${id_job}`).then((response) => {
                //console.log(response);
                //setPair_job_list(response.data);
                setShow_order_pair(response.data); 
                
            })
        }, 200);

        
    
        
    
        return () => {
            clearTimeout(timer0);
            clearTimeout(timer);
            clearTimeout(timer1);
            clearTimeout(timer2);
            clearTimeout(timer3);
            clearTimeout(timer4);
            clearTimeout(timer5);
            clearTimeout(timer6);
            clearTimeout(timer7);
            clearTimeout(timer8);
            clearTimeout(timer9);
            clearTimeout(timer10);
      
         
    
    
        }
    
      }, []);


      const haddle_test=(e)=>{
        console.log(e.target.checked)
        setChk_Emp_step1(e.target.checked) ;
        
      }


      const onChangeDate = (e) => {
        const isoDate = new Date(e);
        const formattedDate = `${isoDate.getDate()}/${isoDate.getMonth() + 1}/${isoDate.getFullYear()}`;
        console.log('formattedDate');
        console.log(formattedDate);
    
        // console.log(d.getMonth() + 1);
        // console.log(d.getFullYear());
        return formattedDate;
      }

      





return (
    <div>
        {/* <Nav/> */}
        <br/>
        <ThemeProvider theme={themes}>
        <CssBaseline />
        
        {/* sx={{ bgcolor: 'text.primary', color: 'background.paper'}} */}
            <Container component="main" maxWidth="lg" style={{ paddingTop:20,paddingBottom:20}}>
                    <CssBaseline />
                    {/* <Box
                        sx={{
                            marginTop: 3,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >

                        <Box component="form" noValidate  sx={{ mt: 3, ml: 70, }}>


                            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} >
                                <Grid item md>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box> */}



                    <Box
                        sx={{
                            marginTop: 0,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            boxShadow: 1
                        }}
                    >
                         
                        {/* <Typography component="h5" variant="h7" color="#ffffff" fontFamily='Century Gothic' letterSpacing={1} textAlign='left'
                            style={background} sx={{ p: 1, borderRadius: 2 }} width={1150}>
                            New Project
                        </Typography> */}
                        

                        <Box component="form" noValidate    sx={{ mt: 3 ,pb: 3,pt:3}}>
                            <Grid container rowSpacing={5} columnSpacing={{ xs: 1, sm: 2, md: 4 }} >
                                <Grid item xs={12} sm={2} >
                                    <Typography  
                                        fontFamily='Century Gothic'
                                        letterSpacing={1} 
                                        textAlign='right'
                                        // style={background} 
                                        sx={{ p: 1, borderRadius: 2 }} 
                                       
                                    >
                                        หมายเลขทะเบียน :
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        autoComplete="given-name"
                                        name="th_name"
                                        disabled
                                        //required
                                        // fullWidth
                                        //id="Name"
                                        // label="ชื่อโครงการ (ภาษาไทย)"

                                        color='maincolor'   
                                        size="small"
                                        width='10'
                                        
                                        // autoFocus
                                        //placeholder = "render"
                                        value={car_number}
                                        variant="filled"
                                        // value={car_number}
                                        // onChange={(event) => {
                                        //     //console.log(event.target.value);
                                        //     setCar_number(event.target.value);
                                        // }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={2}>
                                    <Typography  
                                        fontFamily='Century Gothic'
                                        letterSpacing={1} 
                                        textAlign='right'
                                        // style={background} 
                                        sx={{ p: 1, borderRadius: 2 }} 
                                       
                                    >
                                        เลขตัวถัง :
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        autoComplete="given-name"
                                        name="th_name"
                                        //required
                                        // fullWidth
                                        //id="Name"
                                        // label="ชื่อโครงการ (ภาษาไทย)"
                                        color='maincolor'   
                                        size="small"
                                        width='10'
                                        disabled
                                        value={car_vin}
                                        variant="filled"
                                        // autoFocus
                                        //placeholder = "render"
                                        // value={chassis_number}
                                        // onChange={(event) => {
                                        //     //console.log(event.target.value);
                                        //     setChassis_number(event.target.value);
                                        // }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={2}>
                                    <Typography  
                                        fontFamily='Century Gothic'
                                        letterSpacing={1} 
                                        textAlign='right'
                                        // style={background} 
                                        sx={{ p: 1, borderRadius: 2 }} 
                                       
                                    >
                                        ยี่ห้อ/รุ่น :
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        autoComplete="given-name"
                                        name="th_name"
                                        //required
                                        // fullWidth
                                        //id="Name"
                                        // label="ชื่อโครงการ (ภาษาไทย)"
                                        color='maincolor'   
                                        size="small"
                                        width='10'
                                        disabled
                                        value={car_brand}
                                        variant="filled"
                                        // autoFocus
                                        //placeholder = "render"
                                        // onChange={(event) => {
                                        //     //console.log(event.target.value);
                                        //     setCar_vin(event.target.value);
                                        // }}
                                        
                                    />
                                </Grid>
                                <Grid item xs={12} sm={2}>
                                    <Typography  
                                        fontFamily='Century Gothic'
                                        letterSpacing={1} 
                                        textAlign='right'
                                        // style={background} 
                                        sx={{ p: 1, borderRadius: 2 }} 
                                       
                                    >
                                       ปี :
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        autoComplete="given-name"
                                        name="th_name"
                                        //required
                                        // fullWidth
                                        //id="Name"
                                        // label="ชื่อโครงการ (ภาษาไทย)"
                                        color='maincolor'   
                                        size="small"
                                        width='10'
                                        disabled
                                        value={car_year}
                                        variant="filled"

                                        // autoFocus
                                        //placeholder = "render"
                                        
                                    />
                                </Grid>
                                <Grid item xs={12} sm={2}>
                                    <Typography  
                                        fontFamily='Century Gothic'
                                        letterSpacing={1} 
                                        textAlign='right'
                                        // style={background} 
                                        sx={{ p: 1, borderRadius: 2 }} 
                                       
                                    >
                                        เงินสด/ประกัน :
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        autoComplete="given-name"
                                        name="th_name"
                                        //required
                                        // fullWidth
                                        //id="Name"
                                        // label="ชื่อโครงการ (ภาษาไทย)"
                                        color='maincolor'   
                                        size="small"
                                        width='10'
                                        disabled
                                        value={pay_status}
                                        variant="filled"

                                        // autoFocus
                                        //placeholder = "render"
                                        
                                    />
                                </Grid>
                                <Grid item xs={12} sm={2}>
                                    <Typography  
                                        fontFamily='Century Gothic'
                                        letterSpacing={1} 
                                        textAlign='right'
                                        // style={background} 
                                        sx={{ p: 1, borderRadius: 2 }} 
                                       
                                    >
                                        สภาพรถ :
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        autoComplete="given-name"
                                        name="th_name"
                                        //required
                                        // fullWidth
                                        //id="Name"
                                        // label="ชื่อโครงการ (ภาษาไทย)"
                                        color='maincolor'   
                                        size="small"
                                        width='10'
                                        disabled
                                        value={car_status}
                                        variant="filled"

                                        // autoFocus
                                        //placeholder = "render"
                                        
                                    />
                                </Grid>
                                <Grid item xs={12} sm={2}>
                                    <Typography  
                                        fontFamily='Century Gothic'
                                        letterSpacing={1} 
                                        textAlign='right'
                                        // style={background} 
                                        sx={{ p: 1, borderRadius: 2 }} 
                                       
                                    >
                                        วันรับเข้า :
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        autoComplete="given-name"
                                        name="th_name"
                                        //required
                                        // fullWidth
                                        //id="Name"
                                        // label="ชื่อโครงการ (ภาษาไทย)"
                                        color='maincolor'   
                                        size="small"
                                        width='10'
                                        disabled
                                        value={onChangeDate(start_date)}
                                        variant="filled"

                                        // autoFocus
                                        //placeholder = "render"
                                        
                                    />
                                </Grid>
                                <Grid item xs={12} sm={2}>
                                    <Typography  
                                        fontFamily='Century Gothic'
                                        letterSpacing={1} 
                                        textAlign='right'
                                        // style={background} 
                                        sx={{ p: 1, borderRadius: 2 }} 
                                       
                                    >
                                        วันรับรถ :
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        autoComplete="given-name"
                                        name="th_name"
                                        //required
                                        // fullWidth
                                        //id="Name"
                                        // label="ชื่อโครงการ (ภาษาไทย)"
                                        color='maincolor'   
                                        size="small"
                                        width='10'
                                        disabled
                                        value={onChangeDate(end_date)}
                                        variant="filled"

                                        // autoFocus
                                        //placeholder = "render"
                                        
                                    />
                                </Grid>
                                <Grid item xs={12} sm={2}>
                                    <Typography  
                                        fontFamily='Century Gothic'
                                        letterSpacing={1} 
                                        textAlign='right'
                                        // style={background} 
                                        sx={{ p: 1, borderRadius: 2 }} 
                                       
                                    >
                                        เพิ่มเติม :
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                    <TextField
                                        autoComplete="given-name"
                                        name="th_name"
                                        //required
                                        // fullWidth
                                        //id="Name"
                                        // label="ชื่อโครงการ (ภาษาไทย)"
                                        color='maincolor'   
                                        size="small"
                                        width='10'
                                        disabled
                                        value={input_detail}
                                        variant="filled"

                                        // autoFocus
                                        //placeholder = "render"
                                        
                                    />
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                    {/* <Typography  
                                        fontFamily='Century Gothic'
                                        letterSpacing={1} 
                                        textAlign='right'
                                        // style={background} 
                                        sx={{ p: 1, borderRadius: 2 }} 
                                       
                                    >
                                        {repair_list}
                                    </Typography> */}
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                    {/* <Button
                                        //type="submit"
                                        fullWidth
                                        variant="outlined"
                                        color="maincolor"
                                        sx={{ mt: 2, mb: 2 }}
                                        onClick={()=>{
                                            //setRair_list(car_number +" "+chassis_number);
                                            console.log(rows)
                                        }}
                                            
                                    >
                                        test
                                    </Button> */}
                                </Grid>
                            </Grid>
                            
                            <Grid item xs={12} sm={6} sx={{ mt: 1 }}>
                               
                            </Grid>
                            

                        </Box>
                        
                    </Box>
                    <Box
                        sx={{
                            paddingTop:2,
                            marginTop: 3,
                            paddingBottom:3,
                            display: 'flex',
                            flexDirection: 'column',
                            
                            boxShadow: 1
                        }}
                    >
                        <Typography  sx={{pl: 5,fontSize: 'h6.fontSize', fontStyle: 'italic'}}>
                            รายการซ่อม
                        </Typography>
                        
                        <Box component="form" noValidate    sx={{ mt: 3}}>
                            <Grid container rowSpacing={5} columnSpacing={{ xs: 1, sm: 2, md: 4 }} >
                                
                            
                                <Grid item xs={12} sm={12}>
                                    
                                
                                    <Box sx={{ width: '90%' ,pl:3}}>
                                    <div style={{ height: 300, width: '100%' }}>
                                    <TableContainer component={Paper}>
                                    
                                        <Table sx={{ minWidth: 300 }} size="large" aria-label="a dense table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell width={10} align="left"></TableCell>
                                                    <TableCell width={100} align="left">รายละเอียด</TableCell>
                                                    <TableCell width={50} align="left">ตำแหน่ง</TableCell>                                                    
                                                    
                                                </TableRow>
                                            </TableHead>
                                        <TableBody>
                                        {show_order_pair.map((row,index) => (
                                            <TableRow
                                                key={row.id_job}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                    <TableCell component="th" scope="row">{index+1}</TableCell>
                                                    <TableCell align="left" >{row.pair_detail}</TableCell>
                                                    <TableCell align="left" >{row.pair_location}</TableCell>
                                                   
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                        </Table>
                                    </TableContainer>
                                        
                                        
                                    </div>                                   
                                    </Box>                                 
                                </Grid>
                                
                                
                               
                                
                                
                               
                            </Grid>
                            
                            
                            {/* <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ mb: 1 }}>
                                <Grid item xs={12} sm={6}>
                                    <Button
                                        //type="submit"
                                        fullWidth
                                        variant="outlined"
                                        color="maincolor"
                                        sx={{ mt: 2, mb: 2 }}
                                        
                                    >
                                        Cancle
                                    </Button>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                   
                                        <Button
                                        startIcon={<FileUploadIcon/>}
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            color="maincolor"
                                            sx={{ mt: 2, mb: 2 }}
                                            
                                            //addProject
                                        >
                                        Upload
                                        </Button>
                                
                                </Grid>
                            </Grid> */}

                        </Box>
                        
                    </Box>
                    <Box
                        sx={{
                            paddingTop:2,
                            marginTop: 3,
                            paddingBottom:3,
                            display: 'flex',
                            flexDirection: 'column',                       
                            boxShadow: 1
                        }}
                    >
                        <Box component="form" noValidate    sx={{ mt: 2}}>
                            <Grid container rowSpacing={5} columnSpacing={{ xs: 1, sm: 2, md: 4 }} >                     
                                <Grid item xs={12} sm={12}>
                                    <FormControlLabel control={<Checkbox  checked={chk_emp_step1}  disabled/>} label="เคาะ" sx={{pl:5}} />                                
                                </Grid>                        
                            </Grid>                          
                        </Box>
                        {chk_emp_step1 == true?
                            <Typography  sx={{pl: 5}}>
                                {show_emp_step1}
                            </Typography>
                            :
                            <></>


                        }
                        
                        
                    </Box>
                    <Box
                        sx={{
                            paddingTop:2,
                            marginTop: 3,
                            paddingBottom:3,
                            display: 'flex',
                            flexDirection: 'column',                       
                            boxShadow: 1
                        }}
                    >
                        <Box component="form" noValidate    sx={{ mt: 2}}>
                            <Grid container rowSpacing={5} columnSpacing={{ xs: 1, sm: 2, md: 4 }} >                     
                                <Grid item xs={12} sm={12}>
                                    <FormControlLabel control={<Checkbox checked={chk_emp_step2} disabled/>} label="เตรียมพื้น" sx={{pl:5}} />                                
                                </Grid>                        
                            </Grid>                          
                        </Box>
                        {chk_emp_step2 == true?
                            <Typography  sx={{pl: 5}}>
                                {show_emp_step2}
                            </Typography>
                            :
                            <></>


                        }
                        
                    </Box>
                    <Box
                        sx={{
                            paddingTop:2,
                            marginTop: 3,
                            paddingBottom:3,
                            display: 'flex',
                            flexDirection: 'column',                       
                            boxShadow: 1
                        }}
                    >
                        <Box component="form" noValidate    sx={{ mt: 2}}>
                            <Grid container rowSpacing={5} columnSpacing={{ xs: 1, sm: 2, md: 4 }} >                     
                                <Grid item xs={12} sm={12}>
                                    <FormControlLabel control={<Checkbox checked={chk_emp_step3} disabled />} label="ผสมสี" sx={{pl:5}} />                                
                                </Grid>                        
                            </Grid>                          
                        </Box>
                        {chk_emp_step3 == true?
                            <Typography  sx={{pl: 5}}>
                                {show_emp_step3}
                            </Typography>
                            :
                            <></>


                        }
                        
                    </Box>
                    
                    <Box
                        sx={{
                            paddingTop:2,
                            marginTop: 3,
                            paddingBottom:3,
                            display: 'flex',
                            flexDirection: 'column',                       
                            boxShadow: 1
                        }}
                    >
                        <Box component="form" noValidate    sx={{ mt: 2}}>
                            <Grid container rowSpacing={5} columnSpacing={{ xs: 1, sm: 2, md: 4 }} >                     
                                <Grid item xs={12} sm={12}>
                                    <FormControlLabel control={<Checkbox checked={chk_emp_step4} disabled />} label="พ่นสี" sx={{pl:5}} />                                
                                </Grid>                        
                            </Grid>                          
                        </Box>
                        {chk_emp_step4 == true?
                        <Typography  sx={{pl: 5}}>
                            {show_emp_step4}
                        </Typography>
                            :
                            <></>


                        }
                        
                    </Box>
                    <Box
                        sx={{
                            paddingTop:2,
                            marginTop: 3,
                            paddingBottom:3,
                            display: 'flex',
                            flexDirection: 'column',                       
                            boxShadow: 1
                        }}
                    >
                        <Box component="form" noValidate    sx={{ mt: 2}}>
                            <Grid container rowSpacing={5} columnSpacing={{ xs: 1, sm: 2, md: 4 }} >                     
                                <Grid item xs={12} sm={12}>
                                    <FormControlLabel control={<Checkbox checked={chk_emp_step5} disabled />} label="ประกอบ" sx={{pl:5}} />                                
                                </Grid>                        
                            </Grid>                          
                        </Box>
                        {chk_emp_step5 == true?
                            <Typography  sx={{pl: 5}}>
                                {show_emp_step5}
                            </Typography>
                            :
                            <></>


                        }
                        
                    </Box>
                    <Box
                        sx={{
                            paddingTop:2,
                            marginTop: 3,
                            paddingBottom:3,
                            display: 'flex',
                            flexDirection: 'column',                       
                            boxShadow: 1
                        }}
                    >
                        <Box component="form" noValidate    sx={{ mt: 2}}>
                            <Grid container rowSpacing={5} columnSpacing={{ xs: 1, sm: 2, md: 4 }} >                     
                                <Grid item xs={12} sm={12}>
                                    <FormControlLabel control={<Checkbox checked={chk_emp_step6} disabled />} label="ขัดสี" sx={{pl:5}} />                                
                                </Grid>                        
                            </Grid>                          
                        </Box>
                        {chk_emp_step6 == true?
                            <Typography  sx={{pl: 5}}>
                                {show_emp_step6}
                            </Typography>
                            :
                            <></>


                        }
                        
                    </Box>
                    <Box
                        sx={{
                            paddingTop:2,
                            marginTop: 3,
                            paddingBottom:3,
                            display: 'flex',
                            flexDirection: 'column',                       
                            boxShadow: 1
                        }}
                    >
                        <Box component="form" noValidate    sx={{ mt: 2}}>
                            <Grid container rowSpacing={5} columnSpacing={{ xs: 1, sm: 2, md: 4 }} >                     
                                <Grid item xs={12} sm={12}>
                                    <FormControlLabel control={<Checkbox checked={chk_emp_step7} disabled />} label="ทำความสะอาด" sx={{pl:5}} />                                
                                </Grid>                        
                            </Grid>                          
                        </Box>
                        {chk_emp_step7 == true?
                            <Typography  sx={{pl: 5}}>
                                {show_emp_step7}
                            </Typography>
                            :
                            <></>


                        }
                        
                    </Box>
                    <Box
                        sx={{
                            paddingTop:2,
                            marginTop: 3,
                            paddingBottom:3,
                            display: 'flex',
                            flexDirection: 'column',                       
                            boxShadow: 0
                        }}
                    >
                        <Box component="form" noValidate    sx={{ mt: 2}}>
                        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ mb: 1 }}>
                                <Grid item xs={12} sm={3}>
                                    
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                    <Button
                                        //type="submit"
                                        fullWidth
                                        variant="outlined"
                                        color="maincolor"
                                        sx={{ mt: 2, mb: 2 }}
                                        onClick={()=>{window.location = '/Emp_search_job'}}
                                    >
                                        ย้อนกลับ
                                    </Button>
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                   {status_job == '00'?
                                   <Button
                                        startIcon={<FileUploadIcon/>}
                                        //type="submit"
                                        fullWidth
                                        variant="contained"
                                        color="maincolor"
                                        sx={{ mt: 2, mb: 2 }}
                                        onClick={(e)=>{haddle_summit_order(e)}}
                                        //addProject
                                    >
                                        อัพเดทสถานะงาน
                                    </Button>
                                   :
                                   <></>

                                
                                    }
                                        
                                
                                </Grid>
                            </Grid>                          
                        </Box>
                        
                    </Box>
                           
                </Container>
                </ThemeProvider>
        
        
    </div>
    
    
  )
}

export default Show_job_detail;

