import { useState } from "react"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "./ui/dropdown-menu"
import { Button } from "./ui/button"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "./ui/dialog"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "./ui/select"
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

export default function DropMenu(props) {
    const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

    const handleDeletePost = async () => {
      try{
        console.log(props._id)
        const res = await fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/posts/${props._id}/delete`, {
        method: 'DELETE',
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
        setIsAlertDialogOpen(false)
        return toast.success(data.message)
      }
      }catch(err){
        return toast.error('Something went wrong, try again later!')
      }
    }

    const handleEditClick = () => {
      setIsAlertDialogOpen(false);
      setIsEditDialogOpen(true);
    };

    const handleCloseEditDialog = () => {
      setIsEditDialogOpen(false);
    }
  
    const handleDeleteClick = () => {
      setIsEditDialogOpen(false);
      setIsAlertDialogOpen(true);
    };
  
    const handleCloseAlertDialog = () => {
      setIsAlertDialogOpen(false);
    };
  
    return (
      <>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full bg-primary">
              <PencilIcon className="h-4 w-4 text-primary-foreground" />
              <span className="sr-only">Edit post</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" sideOffset={8}>
            <DropdownMenuItem className="flex items-center gap-2" onClick={handleEditClick}>
                <FilePenIcon className="h-4 w-4" />
                <span>Edit</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="text-destructive flex items-center gap-2 cursor-pointer" onClick={handleDeleteClick}>
              <TrashIcon className="h-4 w-4" />
              <span>Delete</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
  
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
        {isEditDialogOpen && (
          <Dialog open={isEditDialogOpen} onOpenChange={setIsAlertDialogOpen}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Edit</DialogTitle>
          <DialogDescription>Update the details for this post.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid items-center grid-cols-4 gap-4">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input id="title" defaultValue={props.title} className="col-span-3" />
          </div>
          <div className="grid items-center grid-cols-4 gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Textarea
              id="description"
              defaultValue={props.description}
              className="col-span-3 min-h-[100px]"
            />
          </div>
          <div className="grid items-center grid-cols-4 gap-4">
            <Label htmlFor="program" className="text-right">
              Program
            </Label>
            <Select id="program" defaultValue={props.program}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select program" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cs">Computer Science</SelectItem>
                <SelectItem value="ee">Electrical Engineering</SelectItem>
                <SelectItem value="me">Mechanical Engineering</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid items-center grid-cols-4 gap-4">
            <Label htmlFor="course" className="text-right">
              Course
            </Label>
            <Select id="course" defaultValue={props.course}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select course" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="intro-programming">Introduction to Programming</SelectItem>
                <SelectItem value="data-structures">Data Structures</SelectItem>
                <SelectItem value="algorithms">Algorithms</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid items-center grid-cols-4 gap-4">
            <Label htmlFor="semester" className="text-right">
              Semester
            </Label>
            <Select id="semester" defaultValue={props.semester}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select semester" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1</SelectItem>
                <SelectItem value="2">2</SelectItem>
                <SelectItem value="3">3</SelectItem>
                <SelectItem value="4">4</SelectItem>
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="6">6</SelectItem>
                <SelectItem value="7">7</SelectItem>
                <SelectItem value="8">8</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid items-center grid-cols-4 gap-4">
            <Label htmlFor="category" className="text-right">
              Category
            </Label>
            <Select id="category" defaultValue={props.category}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pyq">pyq</SelectItem>
                <SelectItem value="notes">notes</SelectItem>
                <SelectItem value="lecturePPT">lecturePPT</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save Changes</Button>
          <div>
            <Button variant="outline" onClick={handleCloseEditDialog}>Cancel</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
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

function XIcon(props) {
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
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}
