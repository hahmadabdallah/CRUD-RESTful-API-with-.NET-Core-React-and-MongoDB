import React ,{useEffect} from 'react'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import axios from "axios";
import {useNavigate ,useParams} from 'react-router-dom';

export default function EditEmployee(props) {

   
    let { id } = useParams(); 
   
    useEffect(() => {
        
        let defaultValues = {};
        axios
        .get(`http://localhost:5002/api/Employees/${id}`)
        .then((res) => {
          console.log(res.data)
          defaultValues.name =res.data.name ;
          defaultValues.age = res.data.age;
          defaultValues.email =res.data.email;
          reset({ ...defaultValues });
      
        })
        .catch((error) => {
          console.log(error);
       
        });
       
      }, []);
  const navigate = useNavigate();
  const validationSchema = Yup.object().shape({
    name: Yup.string()
    .max(40)
    .required(" name is required"),
    age: Yup.string()
    .max(40)
    .required("age is required"),
    email: Yup.string()
       .required('Email is required')
       .email('Email is invalid'),


    // phoneNumber: Yup.string().matches(new RegExp('[0-9]{7}'))
 });
 const formOptions = { resolver: yupResolver(validationSchema) };
 const { register, handleSubmit, formState, reset } = useForm(formOptions);
 const { errors } = formState;
 const form = new FormData();

 const onSubmit = async (data) => {
   console.log(data);
  form.append('name',data.name)
 form.append('age',data.age)
 form.append('email',data.email)
  axios
  .put(`http://localhost:5002/api/Employees/${id}`,form,{ headers: { 'Content-Type': 'multipart/form-data' } })
  .then((res) => {
     navigate("/")
  })
  .catch((error) => {
    console.log(error);
 
  });
 }
  return (
    <div className='container'>
        <div className='row'>
            <div className='col-md-8 mt-5'>
            <form onSubmit={handleSubmit(onSubmit)}>
                
                <div className="form-group mt-3">
                    <label >Name</label>
                    <input type="input" className="form-control"  placeholder="Name" {...register("name")} />
                    <span className='errorValidation'>{errors.name?.message}</span>
                </div>
                <div className="form-group mt-3">
                    <label >Age</label>
                    <input type="input" className="form-control"  placeholder="Age"  {...register("age")} />
                    <span className='errorValidation'>{errors.age?.message}</span>
                </div>
                <div className="form-group mt-3">
                    <label >Email address</label>
                    <input type="email" className="form-control"  placeholder="name@example.com"  {...register("email")} />
                    <span className='errorValidation'>{errors.email?.message}</span>
                </div>
                <div className="form-group mt-3">
                    <button type="submit" className='btn btn-primary'>Update Employee</button>
                </div>
            </form>
            </div>
        </div>
      
    </div>
  )
}
