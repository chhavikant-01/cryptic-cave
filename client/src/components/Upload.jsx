import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "./ui/dialog"
import { Button } from "./ui/button"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "./ui/select"

export default function Upload() {
  return (
    <Dialog defaultClose>
      <DialogTrigger asChild>
        <Button>
            <UploadIcon className="h-5 w-5 mr-2" />
                Upload
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add New Resource</DialogTitle>
          <DialogDescription>Fill out the form to add a new resource to the system.</DialogDescription>
        </DialogHeader>
        <form className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" placeholder="Enter course title" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" placeholder="Enter course description" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
                <Label htmlFor="program">Program</Label>
                <Select id="program">
                    <SelectTrigger>
                    <SelectValue placeholder="Select program" />
                    </SelectTrigger>
                    <SelectContent>
                    <SelectItem value="program1">Program 1</SelectItem>
                    <SelectItem value="program2">Program 2</SelectItem>
                    <SelectItem value="program3">Program 3</SelectItem>
                    </SelectContent>
                </Select>
                </div>
            
            <div className="space-y-2">
              <Label htmlFor="semester">Semester</Label>
              <Select id="semester">
                <SelectTrigger>
                  <SelectValue placeholder="Select semester" />
                </SelectTrigger>
                <SelectContent>
                {
                    [...Array(8)].map((_,index) => {
                        return <SelectItem value={`semester${index + 1}`}>Semester {index + 1}</SelectItem>
                    })
                }
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
                <Label htmlFor="course">Course</Label>
                <Select id="course">
                    <SelectTrigger>
                    <SelectValue placeholder="Select course" />
                    </SelectTrigger>
                    <SelectContent>
                    <SelectItem value="course1">Course 1</SelectItem>
                    <SelectItem value="course2">Course 2</SelectItem>
                    <SelectItem value="course3">Course 3</SelectItem>
                    </SelectContent>
                </Select>
                </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select id="category">
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="category1">Category 1</SelectItem>
                  <SelectItem value="category2">Category 2</SelectItem>
                  <SelectItem value="category3">Category 3</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="file">File</Label>
            <div className="grid gap-2">
              <div className="flex items-center justify-center border-2 border-dashed border-muted rounded-md p-4 transition-colors hover:border-primary cursor-pointer">
                <div className="text-center">
                  <Input id="file" type="file" className="sr-only" />
                  <label htmlFor="file" className="flex flex-col items-center gap-2">
                    <UploadIcon className="w-6 h-6 text-muted-foreground" />
                    <p className="text-muted-foreground">Drag and drop files here or click to upload</p>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </form>
        <DialogFooter>
          <Button variant="outline" onClick={() => {}}>
            Cancel
          </Button>
          <Button type="submit">Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

function UploadIcon(props) {
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
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" x2="12" y1="3" y2="15" />
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