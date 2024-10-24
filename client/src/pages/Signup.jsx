import React, { useState } from "react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import "./custom.css";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

export const Signup = () => {
  const [formData, setFormData] = useState({});
  const [emailSent, setEmailSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handlePasswordConfirmationChange = (e) => {
    setPasswordConfirmation(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Ensure all fields are filled
    if (!formData.email || !formData.password || !formData.firstname || !passwordConfirmation) {
      toast.error("Please enter all fields!");
      setLoading(false);
      return;
    }

    // Convert email to lowercase
    formData.email = formData.email.toLowerCase();

    // Check if passwords match
    if (formData.password !== passwordConfirmation) {
      toast.error("Passwords do not match!");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setLoading(false);
        return toast.error(data.message);
      }
      setLoading(false);
      setEmailSent(true);
      setTimeout(() => {
        navigate("/");  
      }, 10000);
    } catch (err) {
      console.log(err);
      setLoading(false);
      toast.error("Something went wrong, please try again.");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen px-10">
      {!emailSent && (
      <div className="bg-white py-8 px-6 shadow rounded-lg sm:px-10">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Create an account</h2>
        </div>
        <form className="mb-0 space-y-6" onSubmit={handleSubmit}>
          <div>
            <Input onChange={handleChange} id="firstname" placeholder="firstname" />
          </div>
          <div>
            <Input onChange={handleChange} id="lastname" placeholder="lastname" />
          </div>
          <div>
            <Input onChange={handleChange} id="email" placeholder="name@example.com" />
          </div>
          <div>
            <Input 
              type="password" 
              onChange={handleChange} 
              id="password" 
              placeholder="password" 
            />
          </div>
          <div>
            <Input 
              type="password" 
              onChange={handlePasswordConfirmationChange} 
              placeholder="confirm password" 
            />
          </div>
          <div>
            <Button type='submit' className="w-full bg-[#bd1e59] text-white" disabled={loading}>
              {loading ? <div className="spinner"></div> : 'Sign Up'}
            </Button>
          </div>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">OR CONTINUE WITH</span>
            </div>
          </div>
          <div>
            <Button className="w-full bg-white text-gray-700 border border-gray-300 shadow-sm">Google</Button>
          </div>
        </form>
        <p className="mt-6 text-xs text-gray-500">
          By continuing, you agree to our Terms of Service and Privacy Policy.
        </p>
        <div className='relative flex justify-center text-sm pt-5'>
          <span className="px-2 bg-white text-gray-500">Have an account?</span>
          <Link to='/login' className='text-blue-500'>
            Login here
          </Link>
        </div>
      </div>)}
      {emailSent && (
        <div className="bg-white text-center py-8 px-6 flex flex-col justify-center shadow rounded-lg sm:px-10">
          <h2 className="text-2xl font-bold text-gray-900">Verification Email Sent ✅</h2>
          <p className="text-gray-500">Please check your email to verify your account.</p>
          <p className="text-[#bd1e59]">Link expires in 5 minutes! </p>
        </div>
      )}
    </div>
  );
}

export default Signup;
