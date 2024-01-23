import React from "react";
import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import OAuth from "../components/OAuth";

export default function Signup(){

    const [formData,setFormData]= useState({});
    const [error,setError]= useState(false);
    const [loading,setLoading]= useState(false);
    const navigate = useNavigate();
    const handleChange =(e)=>{
        setFormData({...formData,[e.target.id]: e.target.value});
    };
    const handleSubmit = async(e)=>{
        e.preventDefault();
        try{
            
            setLoading(true);
            setError(false);
            const res = await fetch('/api/auth/signup',{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify(formData),
        });
        const data = await res.json();
        console.log(data);{message:'User created successfully'}
        setLoading(false);
        if(data.success==false){
          setError(true);
            return;

        }
        navigate('/sign-in');
        } catch(error){
            setLoading(false);
            setError(true);
        }
        
    };
    return(
        <div className="p-3 max-w-lg mx-auto">
          
            <h1 className="text-3xl font-semibold text-center my-7">Sign Up</h1>
            <form onSubmit={handleSubmit}  className="flex flex-col gap-4">
                <input type='text' placeholder="Username" id="username" className="bg-slate-100 p-3 rounded-lg" onChange={handleChange}></input>
                <input type='text' placeholder="Email" id="email" className="bg-slate-100 p-3 rounded-lg" onChange={handleChange}></input>
                <input type='text' placeholder="Password" id="password" className="bg-slate-100 p-3 rounded-lg" onChange={handleChange}></input>
                <button disabled={loading} className="bg-black text-white p-3 rounded-lg hover:opacity-85 disabled:opacity-50">{loading ? 'Loading...' : 'Sign Up'}</button>
            <OAuth/>
            </form>
            <div className="flex gap-2 mt-5">
                <p>Have an account?</p>
                <Link to='/sign-in'>
                <span className="text-blue-500">Sign In</span>
                </Link>
            </div>
            <p className="text-red-700 mt-5">{ error && 'Something went wrong!'}</p>
            </div>
    );
}