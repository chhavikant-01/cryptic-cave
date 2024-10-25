import { useState } from "react"
import { Button } from "./ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog"
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux"
import { updateSuccess } from "../redux/user/userSlice"
import { anonymizePost } from "../redux/posts/postSlice"
import {  Trash2 } from "lucide-react"

export default function DropMenu(props) {
    const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);
    const currentUser = useSelector((state)=>state.user.currentUser);
    const dispatch = useDispatch();

    const handleDeletePost = async () => {
      try{
        console.log(props._id)
        const res = await fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/posts/${props._id}/anonymize`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
      const data = await res.json()
      if(!res.ok){
        setIsAlertDialogOpen(false)
        return toast.error(data.message)
      }
      if(res.ok){
        const author = {
          _id: data.anonymousId,
          username: 'anonymous',
          name: "Anonymous User",
          profilePicture: ""
        }
        const restPosts = currentUser.posts.filter(post => post !== props._id)
        const updatedUser = {...currentUser, posts: restPosts}
        dispatch(updateSuccess(updatedUser))
        dispatch(anonymizePost({postId: props._id, author}))
        setIsAlertDialogOpen(false)
        return toast.success(data.message)
      }
      }catch(err){
        return toast.error('Something went wrong, try again later!')
      }
    }
  
    const handleDeleteClick = () => {
      setIsAlertDialogOpen(true);
    };
  
    const handleCloseAlertDialog = () => {
      setIsAlertDialogOpen(false);
    };
  
    return (
      <>
        <Button variant="ghost" size="icon" className="text-red-600" onClick={handleDeleteClick}>
            <Trash2 className="h-5 w-5" />  
        </Button>
  
        {isAlertDialogOpen && (
          <AlertDialog open={isAlertDialogOpen} onOpenChange={setIsAlertDialogOpen}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete your
                  account and remove your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel onClick={handleCloseAlertDialog}>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDeletePost}>Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </>
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



