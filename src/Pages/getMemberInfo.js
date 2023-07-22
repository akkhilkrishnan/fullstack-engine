
import React, { useEffect, useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';

import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

function GetMemberInfo() {
  const [memberDetails, setMemberDetails] = useState({});
  const [apiLoading, setApiLoading] = useState(false);
  const [successFlag, setSuccessFlag] = useState(false);



  useEffect(() => {
    memberDetails['subscription'] = 'Monthly'

  }, [])
  async function insertMember(member) {
    setApiLoading(true)
    await fetch("http://localhost:5000/addmember", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        "Content-Type": "application/json",
      },
      body: JSON.stringify(member)
    })
      .then((response) => {
        console.log('response', response)
        setApiLoading(false)
        return response.json();
      })
      .then((msg) => {
        msg.status == 'Success' ? setSuccessFlag(true) : setSuccessFlag(false)
      });
  }
  const addMemberHandle = (event) => {
    event.preventDefault();
    console.log(memberDetails)
    insertMember(memberDetails)

  };

  return (
    <form onSubmit={addMemberHandle}>
      <div className="member-details-page">
        <div className="form-section">
          <h2>Member Details</h2>
          <div style={{ marginBottom: "30px" }} >
            <h5>Basic Details</h5>
            <div className="fields">
              <TextField
                required
                size="small"
                label="Member Name"
                value={memberDetails.name}
                onChange={event => (memberDetails['name'] = event.target.value)}
                prop sx={{ width: 400 }}
              />

              <LocalizationProvider
                size="small"
                dateAdapter={AdapterDayjs}
              >
                <DatePicker
                  label="DOB"
                  required
                  slotProps={{ textField: { size: 'small' } }} value={memberDetails.dob}
                  onChange={(newValue) => (memberDetails['dob'] = new Date(newValue))}
                  prop sx={{ width: 350 }}
                />
              </LocalizationProvider>
            </div>
          </div >
          <hr style={{ color: "#3088ed" }} />

          <div style={{ marginBottom: "30px" }}>
            <div><h5>Personal Details</h5></div>
            <div className="fields">
              <TextField
                required
                size="small"
                id="standard-basic"
                label="Phone Number"
                variant="filled"
                value={memberDetails.phnnumber}
                onChange={(newValue) => (memberDetails['phonenumber'] = newValue.target.value)}
              />
              <TextField
                size="small"
                id="standard-basic"
                label="Email Id"
                variant="filled"
                value={memberDetails.email}
                onChange={(newValue) => (memberDetails['emailid'] = newValue.target.value)}
              />
              <TextField
                size="small"
                id="standard-basic"
                label="Instagram Id"
                variant="filled"
                value={memberDetails.insta}
                onChange={(newValue) => (memberDetails['instaid'] = newValue.target.value)}
              />
            </div>
          </div>
          <hr />


          <div style={{ marginBottom: "30px" }}>

            <h5>Membership Details</h5>
            <div className="fields">
              <LocalizationProvider
                dateAdapter={AdapterDayjs}
              >
                <DatePicker
                  label="Joining date"
                  required
                  slotProps={{ textField: { size: 'small', required: true } }}
                  value={memberDetails.joiningdate}
                  onChange={(newValue) => (memberDetails['doj'] = new Date(newValue))}
                />
              </LocalizationProvider>
              <TextField
                required
                id="subscription"
                select
                label="subscription"
                defaultValue="Monthly"
                // helperText="Please select member subscription"
                size="small"
                prop sx={{ width: 250 }}
                onChange={(newValue) =>
                  memberDetails['subscription'] = newValue.target.value

                }
              >

                <MenuItem key="MON" value="Monthly">
                  Monthly
                </MenuItem>
                <MenuItem key="QRT" value="Quarterly">
                  Quarterly
                </MenuItem>
                <MenuItem key="HFY" value="Half-yearly">
                  Half-yearly
                </MenuItem>
                <MenuItem key="ANL" value="Annual">
                  Annual
                </MenuItem>

              </TextField>
              <TextField
                required
                size="small"
                id="standard-basic"
                label="Amount Paid"
                variant="filled"
                value={memberDetails.amountpaid}
                onChange={(newValue) => (memberDetails['amountpaid'] = newValue.target.value)}
              />
            </div>
          </div>
        </div>
        <button
          className="btn-style"
          variant="contained"
          type="submit"
          disabled={apiLoading}
        >
          {apiLoading ? 'Adding...' : 'Add Member'}
        </button>
      </div>

      {/* {successFlag && <Alert severity="success">
        <AlertTitle>Success</AlertTitle>
        <strong>{memberDetails.name}</strong> Added as Member
      </Alert>} */}

      <Snackbar
        open={successFlag}
        onClose={() => setSuccessFlag(false)}
        TransitionComponent="fade"
        // message="I love snacks"  
        // key={'akk'}
        autoHideDuration={3000}
      >
        <Alert severity="success">
          <AlertTitle>Success</AlertTitle>
          <strong>{memberDetails.name}</strong> Added as Member
        </Alert>
      </Snackbar>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={apiLoading}
        onClick={!apiLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </form>
  )
}

export default GetMemberInfo;


