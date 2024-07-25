import React, { useEffect } from 'react'
import { Card, CardContent, CardFooter } from "../components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "../components/ui/avatar"
import Thumbnail from "../components/rusty-morning-view-through-windows.jpg"
import { formatDistanceToNow } from 'date-fns'
import { toast } from 'react-hot-toast'
import { Button } from './ui/button'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateFailure, updateStart, updateSuccess } from '../redux/user/userSlice'

const HomeCard = (props) => {
  const [isSaved, setIsSaved] = useState(false)
  const currentUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentUser && currentUser.savedPosts.includes(props._id.toString())) {
      setIsSaved(true);
    } else {
      setIsSaved(false);
    }
  }, [currentUser, props._id]);

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.substring(0, maxLength) + '...';
  }

  let formattedDate = 'Invalid date';
  try {
    formattedDate = formatDistanceToNow(new Date(props.uploadedAt), { addSuffix: true });
  } catch (e) {
    console.error('Invalid date value:', props.uploadedAt);
  }

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

  return (
    <div>
      <Card>
        <CardContent>
          <div className="flex items-center justify-between p-2">
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage src="/placeholder-user.jpg" />
                <AvatarFallback>{props.user.name.split(" ")[0][0] + props.user.name.split(" ")[1][0]}</AvatarFallback>
              </Avatar>
              <div className='text-center'>
                <p className="font-medium">{props.name}</p>
                <p className="text-sm text-muted-foreground">Computer Science</p>
              </div>
            </div>
            <Button variant="ghost" onClick={handleSave} className=''>
              <BookmarkIcon className={isSaved ? "h-5 w-5 fill-current text-blue-500" : "h-5 w-5"} />
            </Button>
          </div>
          <div className="mt-4 h-[100px]">
            <img
              src={Thumbnail}
              width={400}
              height={225}
              alt="Note thumbnail"
              className="rounded-md object-cover aspect-video"
            />
          </div>
          <div className="mt-4">
            <h3 className="text-lg font-medium">{props.title}</h3>
            <p className="text-sm text-muted-foreground">
              {truncateText((props.description), 80)}
            </p>
          </div>
        </CardContent>
        <CardFooter className="text-sm text-muted-foreground">
          <div className='flex mt-4 items-center gap-5 p-2'>
            <div className="flex items-center gap-2 text-muted-foreground">
              <HeartIcon className="h-5 w-5" />
              <span>{props.likes}</span>
              <MessageCircleIcon className="h-5 w-5" />
              <span>{props.comments}</span>
            </div>
            <h3>
              {formattedDate}
            </h3>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

export default HomeCard

function HeartIcon(props) {
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
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
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

function MessageCircleIcon(props) {
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
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
    </svg>
  )
}
