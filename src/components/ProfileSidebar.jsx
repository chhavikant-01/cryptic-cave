import React, { useEffect } from 'react';
import { Button } from './ui/button';
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signoutSuccess } from '../redux/user/userSlice';
import toast from 'react-hot-toast';

const ProfileSidebar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [tab, setTab] = useState('');

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

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
        dispatch(signoutSuccess());
        toast.success(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className='pt-9'>
      <div className='flex flex-col lg:flex-row lg:h-screen bg-background px-3 lg:px-0'>
        <div className='w-full lg:w-64 flex-col border-r lg:rounded-l-none rounded-lg border bg-background p-4 lg:flex'>
          <nav className='flex flex-col space-y-1 h-full'>
            <Link
              className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-muted ${
                tab === 'profile' || !tab ? 'bg-muted' : ''
              }`}
              to='/my-profile?tab=profile'
            >
              <HomeIcon className='h-5 w-5' />
              Profile
            </Link>
            <Link
              className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-muted ${
                tab === 'posts' ? 'bg-muted' : ''
              }`}
              to='/my-profile?tab=posts'
            >
              <FilePenIcon className='h-5 w-5' />
              My Posts
            </Link>
            <Link
              className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-muted ${
                tab === 'saved' ? 'bg-muted' : ''
              }`}
              to='/my-profile?tab=saved'
            >
              <BookmarkIcon className='h-5 w-5' />
              Saved Posts
            </Link>
            <Link
              className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-muted ${
                tab === 'following' ? 'bg-muted' : ''
              }`}
              to='/my-profile?tab=following'
            >
              <UsersIcon className='h-5 w-5' />
              Following
            </Link>
            <Link
              className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-muted ${
                tab === 'followers' ? 'bg-muted' : ''
              }`}
              to='/my-profile?tab=followers'
            >
              <UserPlusIcon className='h-5 w-5' />
              Followers
            </Link>
            <div className='mt-auto'>
              <Button
                variant='ghost'
                onClick={handleLogout}
                className='w-full justify-start gap-2 text-sm font-medium hover:bg-muted'
              >
                <LogOutIcon className='h-5 w-5' />
                Logout
              </Button>
            </div>
          </nav>
        </div>
        <div className='flex-1 p-4 md:p-6 flex items-center justify-center'>
          {/* Content goes here */}
        </div>
      </div>
    </div>
  );
};

export default ProfileSidebar;

function HomeIcon(props) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    )
  }
  
  function BookmarkIcon(props) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
      </svg>
    )
  }
  
  function FilePenIcon(props) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 22h6a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v10" />
        <path d="M14 2v4a2 2 0 0 0 2 2h4" />
        <path d="M10.4 12.6a2 2 0 1 1 3 3L8 21l-4 1 1-4Z" />
      </svg>
    )
  }
  
  function LogOutIcon(props) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
        <polyline points="16 17 21 12 16 7" />
        <line x1="21" x2="9" y1="12" y2="12" />
      </svg>
    )
  }
  
  function UserPlusIcon(props) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <line x1="19" x2="19" y1="8" y2="14" />
        <line x1="22" x2="16" y1="11" y2="11" />
      </svg>
    )
  }
  
  function UsersIcon(props) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    )
  }
  