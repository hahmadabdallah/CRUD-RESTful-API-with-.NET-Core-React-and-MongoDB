import React,{ useState,useEffect }from 'react'
import axios from "axios";
import {useNavigate } from 'react-router-dom';
export default function Employees() {
  const navigate = useNavigate();
  const [data,setData]=useState([]);

  const getData = () =>{
    axios
    .get("http://localhost:5002/api/Employees/")
    .then((res) => {
      console.log(res.data)
      setData(res.data)
  
    })
    .catch((error) => {
      console.log(error);
   
    });
  }
  useEffect(() => {
    getData()
  }, [])

  const deleteEmp = (id,e) =>{
    console.log(id)
    axios.delete(`http://localhost:5002/api/Employees/${id}`).then((res) => {
        getData();
     })
     .catch((error) => {
       console.log(error);
    
     });
  }
  const addEmployee = () =>{
    navigate('/add-employee')
  }
  return (
    <div className='container mt-5'>
         <div className='row'>
            <div className='col-md-12'>
                <h1>Employees</h1>
                <button className='btn btn-success' onClick={addEmployee}>Add Employee</button>
            <table className="table">
  <thead>
    <tr>

      <th scope="col">Name</th>
      <th scope="col">Age</th>
      <th scope="col">Email</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
    {
        data.map(employe=>(
         
            <tr key={employe.id}>
                <td>{employe.name}</td>
                <td>{employe.age}</td>
                <td>{employe.email}</td>
                <td><button className='btn bg-danger text-white border-0' onClick={(e)=>deleteEmp(employe.id,e)}>Delete</button> <button className='btn bg-primary ms-3 text-white border-0' onClick={(e)=>navigate(`editEmployee/${employe.id}`)}>Edit</button> </td>
            </tr>
        ))
    }
  
  
  </tbody>
</table>
            </div>
         </div>
      
    </div>
  )
}
