import { useEffect, useState, useRef } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Button } from "./ui/button";
import { useSelector, useDispatch } from "react-redux";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "./ui/dropdown-menu";
import { storage } from "../firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import toast from "react-hot-toast";
import { updateStart, updateSuccess, updateFailure } from "../redux/user/userSlice";

export default function ProfileTopbar() {
  const { currentUser } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);
  const dispatch = useDispatch();
  const [followers, setFollowers] = useState(0);
  const [posts, setPosts] = useState(0);
  const [saved, setSaved] = useState(0);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (currentUser) {
      setFollowers(currentUser.followers.length);
      setPosts(currentUser.posts.length);
      setSaved(currentUser.savedPosts.length);
      if (currentUser.profilePicture) {
        setImageSrc(currentUser.profilePicture);
      }
    }
  }, [currentUser]);

  useEffect(() => {
    if (imageFile) {
      dispatch(updateStart());
      const uploadFile = async () => {
        return new Promise((resolve, reject) => {
          const storageRef = ref(storage, `image-assets/${currentUser._id}`);
          const uploadTask = uploadBytesResumable(storageRef, imageFile);

          uploadTask.on(
            "state_changed",
            (snapshot) => {
              const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            },
            (error) => {
              dispatch(updateFailure(error.message));
              reject("Failed to upload image");
            },
            async () => {
              try {
                const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                setImageSrc(downloadURL);
                resolve(downloadURL);
              } catch (error) {
                dispatch(updateFailure(error.message));
                reject("Failed to get download URL");
              }
            }
          );
        });
      };

      const updateDB = async (downloadURL) => {
        return new Promise(async (resolve, reject) => {
          try {
            const res = await fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/user/update-user`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              credentials: 'include',
              body: JSON.stringify({ profilePicture: downloadURL }), 
            });
            const data = await res.json();
            if (!res.ok) {
              reject(data.message);
            } else {
              dispatch(updateSuccess(data.rest)); 
              resolve("Image uploaded successfully");
            }
          } catch {
            dispatch(updateFailure("Failed to upload image"));
            reject("Failed to upload image");
          }
        });
      };

      toast.promise(
        (async () => {
          const downloadURL = await uploadFile();
          await updateDB(downloadURL);
        })(),
        {
          loading: 'Uploading image...',
          success: 'Image uploaded successfully!',
          error: 'Failed to upload image',
        }
      );
    }
  }, [imageFile, currentUser._id, dispatch]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleRemoveProfilePicture = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/user/update-user`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ profilePicture: "./default_pfp.svg" }),
      });
      const data = await res.json();
      if (!res.ok) {
        return toast.error(data.message);
      }
      setImageSrc("./default_pfp.svg");
      const updatedUser = { ...currentUser, profilePicture: "./default_pfp.svg" };
      dispatch(updateSuccess(updatedUser));
      return toast.success('Profile picture removed successfully');
    } catch (error) {
      return toast.error('Failed to remove profile picture');
    }
  }

  return (
    <div className="bg-background rounded-lg shadow-md p-6 flex md:flex-row flex-col-reverse items-center gap-6 justify-between">
      <div className="md:flex-row flex flex-col">
        <div className="relative md:flex-none flex flex-col justify-center items-center">
          <Avatar className="h-20 w-20">
            <AvatarImage src={imageSrc} className='object-cover' />
            <AvatarFallback>{currentUser.firstname[0].toUpperCase()}{currentUser.lastname && currentUser.lastname[0]}{!currentUser.lastname && currentUser.firstname[1].toUpperCase()}</AvatarFallback>
          </Avatar>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-0 md:right-0 rounded-full bg-background p-1 shadow-md"
                onClick={triggerFileInput}
              >
                <PencilIcon className="h-4 w-4" />
                <span className="sr-only">Edit profile picture</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="absolute top-0 left-0">
              <DropdownMenuItem className="flex items-center gap-2 cursor-pointer" onClick={triggerFileInput}>
                <FilePenIcon className="h-4 w-4" />
                <span>Upload</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-destructive flex items-center gap-2 cursor-pointer" onClick={handleRemoveProfilePicture}>
                <TrashIcon className="h-4 w-4" />
                <span>Remove</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        <div className="font-semibold text-lg">{currentUser.firstname} {currentUser.lastname}</div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </div>
        <div className="grid gap-2 flex-1 md:ml-5 ml-0 md:mt-0 mt-5">
          <div className="flex items-center gap-6 text-lg font-medium text-secondary-foreground dark:text-secondary-foreground">
            <div className="sm:flex items-center flex flex-col justify-center sm:justify-start gap-2">
              <UsersIcon className="h-6 w-6" />
              <span>{followers} Followers</span>
            </div>
            <div className="sm:flex items-center flex flex-col justify-center sm:justify-normal gap-2">
              <ImageIcon className="h-6 w-6" />
              <span>{posts} Posts</span>
            </div>
            <div className="sm:flex items-center flex flex-col justify-center sm:justify-normal gap-2">
              <BookmarkIcon className="h-6 w-6" />
              <span>{saved} Saved</span>
            </div>
          </div>
        </div>
        </div>
        <div className="sm:flex items-center justify-end">
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <span>@{currentUser.username}</span>
              <span>|</span>
              <span>{currentUser.email}</span>
            </div>
          </div>
    </div>
  );
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


function ImageIcon(props) {
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
      <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
      <circle cx="9" cy="9" r="2" />
      <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
    </svg>
  )
}


function PencilIcon(props) {
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
      <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
      <path d="m15 5 4 4" />
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

function TrashIcon(props) {
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
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
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