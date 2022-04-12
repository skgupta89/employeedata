import React, { useState } from "react";
import  './EmployeeData.css'
import data from "../Emp-data.json";   //import json data

const EmployeeData = () => {
  console.log(data);

  const [empData, setEmpData] = useState(data);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [mailId, setMailId] = useState('');
  const [mobileNum, setMobileNum] = useState('');
  const[toggleBtn,setToggleBtn] = useState(true);
  const [isEditRow,setIsEditedRow] = useState(null)



  const AddEmployee =(e)=>{
    e.preventDefault();
    if(name ==="" || address ===""|| mailId === "" || mobileNum ===""){
        alert("please fill the form")
    }

    else{
        if(!name && !address &&  !mailId && !mobileNum && !toggleBtn){
            setEmpData(
                empData.map((ele)=>{
                    if(ele.index === isEditRow){
                        return{ ...ele,"name":name}
                    }
                    return ele;
                })
            )
        }
    
    else{
          const newEmployeeData= {
              "name": name,
              "address":address,
              "mailId":mailId,
              "mobileNum":mobileNum
          }
    
          setEmpData([...empData,newEmployeeData]);
          setName('')
          setAddress('')
          setMailId('')
          setMobileNum('')
      }
    }
     

   
}


  console.log(empData)

//   function to delete table row
  const deleteTableRows = (index)=>{
    const rows = [...empData];
    rows.splice(index, 1);
    setEmpData(rows);
}


//  funcion to update table row
const updateTableRow =(index)=>{
// console.log(index)

    let editRow = empData.find((ele)=>{
        return ele.index === index
            
    })
    console.log(editRow);
    setToggleBtn(false);
    setName(editRow.name)
      setAddress(editRow.address)
      setMailId(editRow.mailId)
      setMobileNum(editRow.mobileNum)
      setIsEditedRow(index)
      
     

    //   console.log(isEditRow)
}




console.log(isEditRow)
  return (
    <>
      <div className="head">
        <h1 align='center'> Employee Details Form</h1>
      </div>

      {/* form section ends */}

      <div className="emp-form">
          <form>
          <label>Enter your Name: </label>  <br />
        <input
          type="text" 
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder='enter name...'
        />
        <br />
      
          <label>Enter your Address:</label> <br />
        <input
          type="text" 
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder='enter address...'
        />
      
      <br />
          <label>Enter your Mail Id:  </label> <br />
        <input
          type="text" 
          value={mailId}
          onChange={(e) => setMailId(e.target.value)}
          placeholder='enter Mail Id...'
        />
     
    <br />
          <label>Enter your Mobile Number:   </label> <br />
        <input
          type="text" 
          value={mobileNum}
          onChange={(e) => setMobileNum(e.target.value)}
          placeholder='enter Mobile Number...'
        />
    
      <br />

      <button onClick={AddEmployee} className='addEmpBtn'> 
      {
        toggleBtn ? "Add Employee " : "Update Data"
      }
      
      </button>
          </form>
      </div>

      {/* form section ends */}

      {/* table section start */}
    <div className="data-table">
    <div>
        <h1>Employee Details</h1>
    </div>
    <table>
        <thead>
            <th>Employee Name</th>
            <th>Employee Address</th>
            <th>Employee Mail ID</th>
            <th>Employee Mobile Number</th>
            <th>Actions</th>
        </thead>
        <tbody>
            {
empData.map((data,index)=>{
    return(
        <>
            <tr key={index}>
                <td>{data.name}</td>
                <td>{data.address}</td>
                <td>{data.mailId}</td>
                <td>{data.mobileNum}</td>
                <td>
                    <button className="update btn" onClick={()=>(updateTableRow(data.index))}>Update</button>
                    <button className="delete btn" onClick={()=>(deleteTableRows(index))}>Delete</button>
                </td>
            </tr>
        </>
    )
})
            }
        </tbody>
    </table>

    </div>

      {/* table section start */}
    </>
  );
};

export default EmployeeData;
