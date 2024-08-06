import { Popover, PopoverTrigger, PopoverContent } from "./ui/popover"
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar"
import { Button } from "./ui/button"
import toast from "react-hot-toast"
import { useDispatch, useSelector } from "react-redux"
import { updateStart, updateSuccess, updateFailure } from "../redux/user/userSlice"

export default function UserCard(props) {
  const dispatch = useDispatch()  
  const currentUser = useSelector((state)=> state.user.currentUser);
  const handleFollow = async() =>{
      console.log("follow called")
        try{
          dispatch(updateStart());
          const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/user/${props.user._id}/follow`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          });
          const data = await response.json();
          if(!response.ok){
            toast(data.message, {icon: "😿"})
          }
          if(response.ok){
            const updatedUser = {...currentUser, followings: [...currentUser.followings, props.user._id]}
            dispatch(updateSuccess(updatedUser));
            toast(data.message, {icon: "👏"})
          }
        }catch(err){
            dispatch(updateFailure(err.message));
            toast(err.message, {icon: "😿"})
        }
  }
  return (
    <Popover>
      <PopoverTrigger asChild>
      <Avatar className="cursor-pointer">
            <AvatarImage src="/placeholder-user.jpg" />
            <AvatarFallback>{props.user.name ? props.user.name.split(" ")[0][0] + props.user.name.split(" ")[1][0] : "UN"}</AvatarFallback>
        </Avatar>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="flex flex-col items-center justify-center space-y-4 p-6">
          <div className="flex flex-col items-center space-y-2">
            <div className="text-xl font-bold">{props.user.name}s</div>
            <div className="text-sm text-muted-foreground">{props.user.program}</div>
          </div>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="space-y-1">
              <div className="text-xl font-bold">{props.user.yearOfGraduation}</div>
              <div className="text-sm text-muted-foreground">Graduation</div>
            </div>
            <div className="space-y-1">
              <div className="text-xl font-bold">{props.user.numberOfPosts}</div>
              <div className="text-sm text-muted-foreground">Posts</div>
            </div>
            <div className="space-y-1">
              <div className="text-xl font-bold">{props.user.numberOfFollowers}</div>
              <div className="text-sm text-muted-foreground">Followers</div>
            </div>
          </div>
          <Button variant="outline" onClick={handleFollow} className="w-full">
            Follow
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}