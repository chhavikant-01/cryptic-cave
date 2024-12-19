import React, { useEffect } from 'react';
import toast from 'react-hot-toast';
import { Button } from '../components/ui/button';
import { useDispatch } from 'react-redux';
import { signoutSuccess } from '../redux/user/userSlice';
import { LogOutIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';




export const SessionError = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
          const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/user/logout`, {
            method: 'POST',
            credentials: 'include',
          });
          const data = await response.json();
          if (!response.ok) {
            toast.error(data.message);
          }
          if (response.ok) {
            navigate('/login');
            dispatch(signoutSuccess());
            toast.success(data.message);
          }
        } catch (error) {
          toast.error(error.message);
        }
      };

    return (
        <div className="flex flex-col justify-center items-center h-screen w-full gap-y-5">
            <h1 className="font-bold text-3xl">Something Went Wrong...</h1>
            <h1 className="text-2xl"> We encountered an error with your session.Please try logging in again.</h1>
            <div className=''>
              <Button
                variant='ghost'
                onClick={handleLogout}
                className='w-ful justify-start gap-2 text-sm font-medium bg-muted hover:bg-slate-700'
              >
                <LogOutIcon className='h-5 w-5' />
                Logout
              </Button>
            </div>
        </div>
    );
};
