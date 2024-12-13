import React from 'react'
import { Link } from 'react-router-dom'
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';


export const ForgotPassword = () => {

    const [loading, setLoading] = React.useState(false);
    const [email, setEmail] = React.useState('');
    const [isEmailSent,setIsEmailSent] = React.useState(false);
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!email) {
            return toast.error('Please enter your email');
        }
        if(email.split('@')[1] !== process.env.REACT_APP_ALLOWED_EMAIL_DOMAIN) {
            return toast.error(`Please enter a email address ending with ${process.env.REACT_APP_ALLOWED_EMAIL_DOMAIN}`);
        }
        try {
            setLoading(true);
            const res = await fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/auth/forgot-password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
            });
            const data = await res.json();
            if (!res.ok) {
            setLoading(false);
            return toast.error(data.message)
            }
            if(res.ok) {
            setLoading(false);
            setIsEmailSent(true);
            setTimeout(() => {
                navigate("/login");  
              }, 10000);
            toast.success(data.message);
            }
        } catch (err) {
            setLoading(false);
            toast.error(err.message);
        }
    }


  return (
    <div className="flex flex-col justify-center items-center h-screen px-10">
    {
        isEmailSent && (
            <div className="bg-white py-8 px-6 shadow rounded-lg sm:px-10">
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900">Email Sent ✅</h2>
                </div>
                <p className='text-gray-900'>An email has been sent to your email address with instructions to reset your password</p>
            </div>
        ) }{!isEmailSent && (

      <div className="bg-white py-8 px-6 shadow rounded-lg sm:px-10">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Password Reset</h2>
        </div>
        <form className="mb-0 space-y-6" onSubmit={handleSubmit}>
          <div>
            <Input onChange={(e)=>setEmail(e.target.value)} type="email" id="email" placeholder="1234567890@mitwpu.edu.in" />
          </div>
          <div>
            <Button type='submit' className="w-full bg-[#bd1e59] text-white" disabled={loading}>
              {loading ? <div className="spinner"></div> : 'Send Recovery Mail'}
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
        )
    }
    </div>
  )
}
