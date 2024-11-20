import React from 'react'
import toast from 'react-hot-toast';
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useState } from 'react';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';

export const ResetPassword = () => {
    const [loading, setLoading] = React.useState(false);
    const { token } = useParams(); // Get the token from the URL
    const navigate = useNavigate();
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = async (e)=>{
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            toast.error("Passwords do not match")
            return;
        }
        try{
            setLoading(true)
            const res = await fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/auth/reset-password/${token}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ newPassword }),
            })
            const data = await res.json();
            if (!res.ok) {
                return toast.error(data.message);
            }
            if(res.ok) {
                toast.success(data.message);
                setLoading(false)
                navigate("/login");
            }
        }catch(err){
            setLoading(false)
            return toast.error(err.message);
            
        }
    }


  return (
    <div className="flex flex-col justify-center items-center h-screen px-10">

      <div className="bg-white py-8 px-6 shadow rounded-lg sm:px-10">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Set New Password</h2>
        </div>
        <form className="mb-0 space-y-6" onSubmit={handleSubmit}>
        <div>
        
            <Input 
              type="password" 
              onChange={(e)=>setNewPassword(e.target.value)} 
              id="password" 
              placeholder="New Password" 
              required
            />
          </div>
          <div>
            <Input 
              type="password" 
              onChange={(e)=>setConfirmPassword(e.target.value)} 
              placeholder="Confirm Password" 
              required
            />
          </div>
          <div>
            <Button type='submit' className="w-full bg-[#bd1e59] text-white" disabled={loading}>
              {loading ? <div className="spinner"></div> : 'Reset Password'}
            </Button>
          </div>
        </form>
        <div className='relative flex justify-center text-sm pt-5'>
          <span className="px-2 bg-white text-gray-500">Don't Have an account?</span>
          <Link to='/signup' className='text-blue-500'>
            Sign Up here
          </Link>
        </div>
      </div>
    </div>
  )
}
