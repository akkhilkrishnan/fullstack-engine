import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
function ViewMembersInfo() {
  const [membersData, setMembersData] = useState([]);
  useEffect(() => {
    getmembersData();
  }, []);

  const getmembersData = () => {
    fetch("http://localhost:5000/data", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => setMembersData(data));
  };

  const extendHandle = (record_index) => {
    let joiningDate = new Date(membersData[record_index].DOJ);
    membersData[record_index].DOJ = joiningDate.setDate(
      joiningDate.getDate() + 7
    );
  };

  const currencyFormatter = (amount) => {
    let paidamount = amount.toLocaleString("en-IN", {
      style: "currency",
      currency: "INR",
    });
    return paidamount;
  };
  const calculateExpiryDate = (doj, subscription) => {
    var joiningDate = new Date(doj);
    let expiryDate;
    let expireFlag;
    switch (subscription) {
      case "Monthly":
        expiryDate = joiningDate.setDate(joiningDate.getDate() + 30);
        break;
      case "quarterly":
        expiryDate = joiningDate.setDate(joiningDate.getDate() + 90);
        break;
      case "Half yearly":
        expiryDate = joiningDate.setDate(joiningDate.getDate() + 180);
        break;
      case "Annual":
        expiryDate = joiningDate.setDate(joiningDate.getDate() + 365);
        break;
    }
    expireFlag = new Date(expiryDate) <= new Date() ? true : false;
    expiryDate = new Date(expiryDate).toString().slice(0, 15);

    return { expiryDate, expireFlag };
  };
  return (
    <div className="view-container">
      <div className="record-style">
        <h4>Member name</h4>
        <h4>Date of joining</h4>
        <h4>Paid Amount</h4>
        <h4>Expiry Date</h4>
      </div>

      {membersData.map((member, index) => {
        return (
          <div >
            <div key={Math.random()} className="record-style">
              <div
                style={
                  calculateExpiryDate(member.DOJ, member.package).expireFlag
                    ? { color: "red", fontWeight: 500 }
                    : { color: "green", fontWeight: 500 }
                }
              >
                {member.name}
              </div>
              <div>{member.DOJ}</div>
              <div>{currencyFormatter(member.amountpaid)}</div>
              <div className="exp-field-style">
                {calculateExpiryDate(member.DOJ, member.package).expiryDate}
                <Button
                variant="contained"
                  onClick={() => {
                    extendHandle(index);
                  }}
                >
                  update Membership
                </Button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ViewMembersInfo;
