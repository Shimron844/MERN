import React from "react";
import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import { signInStart, signInSuccess, signInFailure  } from "../redux/user/userSlice";
import {  useDispatch, useSelector } from "react-redux";
import OAuth from "../components/OAuth";

export default function Signin(){

    const [formData,setFormData]= useState({});
    const { loading, error } = useSelector((state)=>state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const handleChange =(e)=>{
        setFormData({...formData,[e.target.id]: e.target.value});
    };
    const handleSubmit = async(e)=>{
        e.preventDefault();
        try{
            
          dispatch(signInStart());
            const res = await fetch('/api/auth/signin',{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify(formData),
        });
        const data = await res.json();
        dispatch(signInSuccess(data));

         
       
        if(data.success==false){
            dispatch(signInFailure(data));
       
            return;

        }
        navigate('/')
        } catch(error){
           dispatch(signInFailure(error));
        }
        
    };
    return(
        <div className="p-3 max-w-lg mx-auto">
          
            <h1 className="text-3xl font-semibold text-center my-7">Sign In</h1>
            <form onSubmit={handleSubmit}  className="flex flex-col gap-4">
               
                <input type='text' placeholder="Email" id="email" className="bg-slate-100 p-3 rounded-lg" onChange={handleChange}></input>
                <input type='text' placeholder="Password" id="password" className="bg-slate-100 p-3 rounded-lg" onChange={handleChange}></input>
                <button disabled={loading} className="bg-black text-white p-3 rounded-lg hover:opacity-85 disabled:opacity-50">{loading ? 'Loading...' : 'Sign In'}</button>
            <OAuth/>
            
            </form>
            <div className="flex gap-2 mt-5">
                <p>Dont have an account?</p>
                <Link to='/sign-up'>
                <span className="text-blue-500">Sign Up</span>
                </Link>
            </div>
            <p className="text-red-700 mt-5">{ error ? error.message || 'Something went wrong!' : ''}</p>
            </div>
    );
}