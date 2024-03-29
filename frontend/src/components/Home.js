import React, {useState, useEffect} from 'react';
import Drawer from './Drawer'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import { makeStyles, responsiveFontSizes } from '@material-ui/core/styles';
const axios = require("axios");

function Home(){
  const initData={
    aadharid:"",
    role:"",
    blood_group:"",
    city:"",
    contactno:"",
    dob:"",
    email:"",
    fname:"",
    lname:"",
    mname:"",
    pincode:"",
    state:"",
    street:"",
    uid:"",
    
  
  };

  const indocData = {
    degree:"",
    hospital_work_for:"",
    isPrivate: 0,
    specialization : "",
    start_dop : 0,
    work_city : "",
    work_pincode : "",
    work_state : "",
    work_street : "",
    check_val : false 
  }
  const [userData, changeuserData]= useState(initData);
  const [docData, changedocData]= useState(indocData);
  console.log(localStorage.getItem("role"));
  console.log(localStorage.getItem("token"));
  React.useEffect(() => {
    if(localStorage.getItem("role") == "Patient"){
    axios.get(`http://localhost:5000/api/users/${localStorage.getItem("uid")}`,{
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
          
        }

      })    
     
    
    
    .then(function(response){
    console.log(response.data.data);  
    changeuserData(prevState => ({
      uid:response.data.data.uid,
      fname:response.data.data.fname,
      email:response.data.data.email,
      city:response.data.data.city,
      state:response.data.data.state,
      pincode:response.data.data.pincode,
      street:response.data.data.street,
      aadharid:response.data.data.aadharid,
      role:response.data.data.role,
      blood_group:response.data.data.blood_group,
      dob:response.data.data.dob,
      mname:response.data.data.mname,
      lname:response.data.data.lname,

      contactno:response.data.data.contactno})) 
    
    
    }).catch(function (error) {
        console.log("Invalid Request");
      });
   
    }
    else if(localStorage.getItem("role") == "Doctor")
    {
        axios.get(`http://localhost:5000/api/doctor/all/${localStorage.getItem("uid")}`,{
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token")
              
            }

          })
         
        
        
        .then(function(response){
        console.log(response.data.data);  
        changeuserData(prevState => ({
          uid:response.data.data.uid,
          fname:response.data.data.fname,
          email:response.data.data.email,
          city:response.data.data.city,
          state:response.data.data.state,
          pincode:response.data.data.pincode,
          street:response.data.data.street,
          aadharid:response.data.data.aadharid,
          role:response.data.data.role,
          blood_group:response.data.data.blood_group,
          dob:response.data.data.dob,
          mname:response.data.data.mname,
          lname:response.data.data.lname,
    
          contactno:response.data.data.contactno,

        }));
        var checks;
        if(response.data.data.isPrivate == 0)
        checks = false;
        else
        checks = true;

        changedocData(prevState => ({
          
          work_city:response.data.data.work_city,
          work_state:response.data.data.work_state,
          work_pincode:response.data.data.work_pincode,
          work_street:response.data.data.work_street,
          start_dop:response.data.data.start_dop,
          degree : response.data.data.degree,
          hospital_work_for : "",
          isPrivate : response.data.data.isPrivate,
          specialization : response.data.data.specialization,
          check_val:checks
         
        
          
            
        }));
        
       
        
        }).catch(function (error) {
            console.log("Invalid Request");
          });
       

    }
  },[]);
  console.log("The work is " + userData.fname);
  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    
    content: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing(3),
      paddingLeft:theme.spacing(20)
    },
  }));
  const classes = useStyles();

  const updateData = () => {
    // POST THE NORMAL DATA IN USER TABLE
    // POST DOCTOR RELATED DATA IN THE DOCTOR TABLE
    localStorage.setItem("blood_group",userData.blood_group);
    localStorage.setItem("fname",userData.fname);
    localStorage.setItem("lname",userData.lname);
  
    if(docData.check_val == false)
    docData.isPrivate = 0;
    else if(docData.check_val == true)
    docData.isPrivate = 1;
    
    if(userData.role === "Doctor")
    {
    axios.put(`http://localhost:5000/api/users/doctor/${localStorage.getItem("uid")}`,{
      uid: userData.uid,
      fname:userData.fname,
      email:userData.email,
      city:userData.city,
      state:userData.state,
      pincode:userData.pincode,
      street:userData.street,
      aadharid:userData.aadharid,
      role:userData.role,
      blood_group:userData.blood_group,
      dob:userData.dob.substring(0,10),
      mname:userData.mname,
      lname:userData.lname,
      contactno:userData.contactno,   
      work_city:docData.work_city,
      work_state:docData.work_state,
      work_pincode:docData.work_pincode,
      work_street:docData.work_street,
      start_dop:docData.start_dop.substring(0,10),
      degree : docData.degree,
      hospital_work_for : docData.hospital_work_for,
      isPrivate : docData.isPrivate,
      specialization : docData.specialization
      


               
           
        }).then(function(response){

          if(response.data.success === 1)
          {
          console.log('Data posted successfully');
          
          }
          
            
            
            }).catch(function (error) {
                console.log("Invalid Post Request");
              });
            
            }

            else if(userData.role === "Patient")
            {
              axios.put(`http://localhost:5000/api/users/${localStorage.getItem("uid")}`,{
              uid: userData.uid,
              fname:userData.fname,
              email:userData.email,
              city:userData.city,
              state:userData.state,
              pincode:userData.pincode,
              street:userData.street,
              aadharid:userData.aadharid,
              role:userData.role,
              blood_group:userData.blood_group,
              dob:userData.dob.substring(0,10),
              mname:userData.mname,
              lname:userData.lname,
              contactno:userData.contactno,   
   
              }).then(function(response){

                if(response.data.success === 1)
                {
                console.log('Data posted successfully');
                
                }
                
                  
                  
                  }).catch(function (error) {
                      console.log("Invalid Post Request");
                    });
                  
            }
            window.location.reload();
  }
  
    return(
        <div className = {classes.content}>
        <Drawer />
        <div style={{marginTop:"10vh"}}>
          
          <Typography align = "center" variant="h2">HOME</Typography>
          
          <br />
          <Divider />
          <br />
          <Grid container spacing={3}>
                <Grid item xs={2}>
                </Grid>
                <Grid item xs={3}>
                <TextField
                  required
                  id="outlined-required"
                  label="First Name"
                  value={userData.fname}
                  variant="outlined"
                  onChange={(e)=>changeuserData({...userData, fname :e.target.value})}
                />
                </Grid>
                <Grid item xs={3}>
                <TextField
                  required
                  id="outlined-required"
                  label="Middle Name"
                  value={userData.mname}
                  variant="outlined"
                  onChange={(e)=>changeuserData({...userData, mname :e.target.value})}
                />
                </Grid>
                <Grid item xs={3}>
                <TextField
                  required
                  id="outlined-required"
                  label="Last Name"
                  value={userData.lname}
                  variant="outlined"
                  onChange={(e)=>changeuserData({...userData, lname :e.target.value})}
                />
                </Grid>
                <Grid item xs={1}>
                </Grid>
         </Grid>
         <br />
         <Divider />
         <br />
         <Grid container spacing={3}>
                <Grid item xs={2}>
                </Grid>
                <Grid item xs={4}>
                <TextField
                  required
                  id="outlined-required"
                  label="Aadhar ID"
                  value={userData.aadharid}
                  variant="outlined"
                  onChange={(e)=>changeuserData({...userData, aadharid :e.target.value})}
                />
                </Grid>
                <Grid item xs={4}>
                <TextField
                  required
                  id="outlined-required"
                  label="Phone Number"
                  value={userData.contactno}
                  variant="outlined"
                  onChange={(e)=>changeuserData({...userData, contactno :e.target.value})}
                />
                </Grid>
                <Grid item xs={2}>
                </Grid>
         </Grid>
         <br />
         <Divider />
         <br />
         <Grid container spacing={3}>
          <Grid item xs={2}>
              </Grid>
              <Grid item xs={2}>
                <TextField
                  required
                  id="outlined-required"
                  label="Street"
                  value={userData.street}
                  variant="outlined"
                  onChange={(e)=>changeuserData({...userData, street :e.target.value})}
                />
                </Grid>
                <Grid item xs={2}>
                <TextField
                  required
                  id="outlined-required"
                  label="City"
                  value={userData.city}
                  variant="outlined"
                  onChange={(e)=>changeuserData({...userData, city :e.target.value})}
                />
                </Grid>
                <Grid item xs={2}>
                <TextField
                  required
                  id="outlined-required"
                  label="State"
                  value={userData.state}
                  variant="outlined"
                  onChange={(e)=>changeuserData({...userData, state :e.target.value})}
                />
                </Grid>
                <Grid item xs={2}>
                <TextField
                  required
                  id="outlined-required"
                  label="Pincode"
                  value={userData.pincode}
                  variant="outlined"
                  onChange={(e)=>changeuserData({...userData, pincode :e.target.value})}
                />
                </Grid>
                <Grid item xs={2}>
                </Grid>
          </Grid>
          <br />
          <Divider />
         <br />
         <Grid container spacing={3}>
              <Grid item xs={3}>
                </Grid>
            <Grid item xs={3}>
            <InputLabel htmlFor="blood-group">Blood Group</InputLabel>
            <Select
          native
          value={userData.blood_group}
          onChange={(e)=>changeuserData({...userData, blood_group :e.target.value})}
          inputProps={{
            name: 'Blood Group',
            id: 'blood-group',
          }}
        >
          <option aria-label="None" value="" />
          <option value="A+ve">A+ve</option>
          <option value="A-ve">A-ve</option>
          <option value="B+ve">B+ve</option>
          <option value="B-ve">B-ve</option>
          <option value="AB+ve">AB+ve</option>
          <option value="AB-ve">AB-ve</option>
          <option value="O+ve">O+ve</option>
          <option value="O-ve">O-ve</option>
        </Select>
            </Grid>
            <Grid item xs={3}>
            <TextField
                id="date"
                label="Date Of Birth"
                type="date"
                value={userData.dob}
                onChange={(e)=>changeuserData({...userData, dob :e.target.value})}
                InputLabelProps={{
                  shrink: true,
                  }}
                />
              </Grid>
            <Grid item xs={3}>
            </Grid>
         </Grid>
         <br />
          <Divider />
         <br />
         {localStorage.getItem("role")==="Doctor"&&
           (
           <div>
           <Grid container spacing={3}>
           <Grid item xs={2}></Grid>
           <Grid item xs={2}>
            <TextField
                id="outlined-required"
                label="Degree"
                value={docData.degree}
                variant="outlined"
                onChange={(e)=>changedocData({...docData, degree :e.target.value})}
                />
              </Grid>
              <Grid item xs={2}>
            <TextField
                id="outlined-required"
                label="Specialization"
               value={docData.specialization}
                variant="outlined"
                onChange={(e)=>changedocData({...docData, specialization :e.target.value})}
                />
              </Grid>
              <Grid item xs={2}>
            <TextField
                id="date"
                label="Start date of practice"
                type="date"
                value={docData.start_dop}
                onChange={(e)=>changedocData({...docData, start_dop :e.target.value})}
                InputLabelProps={{
                  shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={2}>
                  
                   <InputLabel htmlFor="isp">Is Private?</InputLabel>
                   <Checkbox
                    value = {docData.isPrivate}
                    checked = {docData.check_val}
                    inputProps={{ id:'isp'}}
                    onChange={(e)=>changedocData({...docData, check_val :e.target.checked})}
                  />
                
              </Grid>
              
              <Grid item xs={2}> 
          
              </Grid>
           </Grid>
           <br />
          <Divider />
         <br />
         {docData.check_val == true?
         <Grid container spacing={3}>
         <Grid item xs={2}>
              </Grid>
              <Grid item xs={2}>
                <TextField
                  required
                  id="outlined-required"
                  label="Work Street"
                  defaultValue={docData.work_street}
                  variant="outlined"
                  onChange={(e)=>changedocData({...docData, work_street :e.target.value})}
                />
                </Grid>
                <Grid item xs={2}>
                <TextField
                  required
                  id="outlined-required"
                  label="Work City"
                  defaultValue={docData.work_city}
                  variant="outlined"
                  onChange={(e)=>changedocData({...docData, work_city :e.target.value})}
                />
                </Grid>
                <Grid item xs={2}>
                <TextField
                  required
                  id="outlined-required"
                  label="Work State"
                  defaultValue={docData.work_state}
                  variant="outlined"
                  onChange={(e)=>changedocData({...docData, work_state :e.target.value})}
                />
                </Grid>
                <Grid item xs={2}>
                <TextField
                  required
                  id="outlined-required"
                  label="Work Pincode"
                  defaultValue={docData.work_pincode}
                  variant="outlined"
                  onChange={(e)=>changedocData({...docData, work_pincode :e.target.value})}
                />
                </Grid>
                <Grid item xs={2}>
                </Grid>
                
           
         </Grid>
         :
         <Grid container spacing={3}>
           <Grid item xs = {4}></Grid>
         <Grid item xs = {4}>
         <InputLabel htmlFor="hospital">Hospital</InputLabel>
            <Select
          native
          value={docData.hospital_work_for}
          onChange={(e)=>changedocData({...docData, hospital_work_for :e.target.value})}
          inputProps={{
            name: 'hospital_work_for',
            id: 'hospital_work_for',
          }}
        >
          <option aria-label="None" value="" />
          <option value="Kokilaben Hospital">Kokilaben Hospital</option>
          <option value="Cooper Hospital">Cooper Hospital</option>
          <option value="Nanavati Hospital">Nanavati Hospital</option>
          <option value="Lilavati Hospital">Lilavati Hospital</option>
          <option value="Lifeline Hospital">Lifeline Hospital</option>
        </Select>  


         </Grid>
        <Grid item xs = {4}></Grid> 
         </Grid>
         }
         <br />
          <Divider />
         <br />

           </div>
           )
         }
         <Grid container spacing = {0}>
           <Grid item xs = {6}></Grid>
           <Grid item xs = {4}>
         <Button size="large"  variant="contained" color="secondary" onClick={updateData}>
                Save
            </Button>
           <Grid item xs = {3}></Grid>
            </Grid>
            
            </Grid>
            <br />
            <br />







         

        </div>
            
        </div>
    )
}

export default Home