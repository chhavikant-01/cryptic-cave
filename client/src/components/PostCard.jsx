import { useState } from 'react'
import { Button } from "../components/ui/button"
import { ClockIcon, BookmarkIcon } from "lucide-react"
import React, { useEffect } from 'react'
import { toast } from 'react-hot-toast'
import { useSelector, useDispatch } from 'react-redux'
import { updateFailure, updateStart, updateSuccess } from '../redux/user/userSlice'
import { Link } from 'react-router-dom'
import UserCard from './UserCard'
import { updatePostLikes } from '../redux/posts/postSlice'
import { Share2, Star } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns'

const PostCard = (props) => {
    const [isSaved, setIsSaved] = useState(false)
    const [isLiked, setIsLiked] = useState(false)
    const [numberOfLikes, setNumberOfLikes] = useState(props.likes)
    const currentUser = useSelector((state) => state.user.currentUser);
    const currentPosts = useSelector((state) => state.posts.posts);
    const dispatch = useDispatch();
  
    useEffect(() => {
      if (currentUser && currentUser.savedPosts.includes(props._id.toString())) {
        setIsSaved(true);
      } else {
        setIsSaved(false);
      }
      if (currentUser && props.likedBy.includes(currentUser._id)) {
        setIsLiked(true);
      }else{
        setIsLiked(false);
      }
    }, [currentUser, props._id, props.likedBy]);

    const handleSave = async () => {
        try {
          if (!currentUser) {
            return toast.error('Please login to save this post');
          }
    
          dispatch(updateStart());
          const res = await fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/posts/${props._id}/save`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
          })
    
          const data = await res.json();
          if (!res.ok) {
            dispatch(updateFailure(data.message));
            return toast.error(data.message);
          }
    
          dispatch(updateSuccess(data.rest));
          setIsSaved(!isSaved);
          return toast.success(data.message);
        } catch (err) {
          dispatch(updateFailure(err.message));
          return toast.error(err.message);
        }
      }
    
      const handleLike = async () => {
        try {
          if(!currentUser){
            return toast.error('Please login to like this post');
          }
          const res = await fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/posts/${props._id}/like`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
          });
          const data = await res.json();
          if(!res.ok){
            return toast.error('Failed to like post');
          }
          if(res.ok){
            setIsLiked(!isLiked);
            if(data.offset === 1){
              dispatch(updatePostLikes({postId: props._id, userId: currentUser._id, offset: 1}));
              setNumberOfLikes(prevLikes => prevLikes + 1);
              return toast(data.message, {icon: '🥳'});
            }
            if(data.offset === -1){
              dispatch(updatePostLikes({postId: props._id, userId: currentUser._id, offset: -1}));
              setNumberOfLikes(prevLikes => prevLikes - 1);
              return toast(data.message, {icon: '🥹' });
            }
          }
        }catch(e){
          return toast.error(e.message);
        }
      }

      let formattedDate = 'Invalid date';
      try {
        formattedDate = formatDistanceToNow(new Date(props.uploadedAt), { addSuffix: true });
      } catch (e) {
        console.error('Invalid date value:', props.uploadedAt);
      }

  return (
    <div className="rounded-lg shadow-md p-6 border-2">
      <div className="flex justify-between mb-4">
      <div className='flex items-start gap-2'>

      <UserCard user={props.author} />
        <div className="flex-grow">
          <h3 className="font-semibold text-lg">{props.author.name.split(' ')[0]}</h3>
          <p className="text-sm text-muted-foreground">{props.author.program}</p>
        </div>
      </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <ClockIcon className="w-4 h-4 mr-1" />
          <span>{formattedDate}</span>
        </div>
      </div>
      <Link to={`/dossier?id=${props._id}`} className='hover:text-[#3c82f6]'><h2 className="text-2xl font-bold mb-4">{props.title}</h2></Link>
      <div className="flex flex-wrap gap-2">
        <Button variant="ghost" onClick={handleLike} className='flex items-center gap-1'>
            <Star className={isLiked ? "h-5 w-5 fill-current text-[#e2b340]" : "h-5 w-5"} />
            <span>{numberOfLikes}</span>
        </Button>
        <Button variant="ghost" onClick={handleSave} className=''>
            <BookmarkIcon className={isSaved ? "h-5 w-5 fill-current text-blue-500" : "h-5 w-5"} />
        </Button>
        <Button variant="ghost" className='flex items-center gap-1'>
            <Share2 className='h-5 w-5' />
        </Button>
      </div>
    </div>
  )
}

export default PostCard