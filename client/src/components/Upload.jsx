import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "./ui/select";
import { useEffect,useRef, useState } from "react";
import { storage } from "../firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import toast from "react-hot-toast";

export default function Upload() {

  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadTask, setUploadTask] = useState(null);
  const fileInputRef = useRef(null);
  const [formValues, setFormValues] = useState({
    title: "",
    desc: "",
    fileType: "",
    fileName: "",
    fileUrl: "",
    category: {
      program: "",
      semester: "",
      course: "",
      resourceType: "",
    }
  });


  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!formValues.title || !formValues.desc || !formValues.category.program || !formValues.category.semester || !formValues.category.course){
      return toast.error("Please fill out all the fields");
    }
    console.log(formValues);
    const res = await fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/posts/create-post`,{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(formValues),
    })
    const data  = await res.json();
    if(!res.ok){
      return toast.error(data.message);
    }
    if(res.ok){
      toast.success(data.message);
      setFormValues({
        title: "",
        desc: "",
        fileType: "",
        fileName: "",
        fileUrl: "",
        category: {
          program: "",
          semester: "",
          course: "",
          resourceType: "",
            }
        });
      setFile(null);
      setUploadProgress(0);
    }
  };

  const handleRemoveFile = () => {
    if (uploadTask) {
      uploadTask.cancel();
      toast.error("File Removed");
    }
    setFile(null);
    setUploadProgress(0);
  };

  useEffect(() => {
    if (file) {
      const uploadFile = async () => {
        const storageRef = ref(storage, "uploaded-files/" + file.name + Math.floor(Math.random() * 1000000));
        const task = uploadBytesResumable(storageRef, file);
        setUploadTask(task);

        task.on(
          "state_changed",
          (snapshot) => {
            setIsUploading(true);
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setUploadProgress(progress);
          },
          (error) => {
            setIsUploading(false);
            toast.error("An error occurred while uploading the file");
          },
          () => {
            getDownloadURL(task.snapshot.ref).then((downloadURL) => {
              setFormValues({...formValues, fileUrl: downloadURL, fileName: file.name, fileType: file.type.split("/")[1]});
              console.log(formValues);
              toast.success("File uploaded successfully");
              setIsUploading(false);
            });
          }
        );
      };

      uploadFile();
    }
  }, [file]);

  const handleFileUpload = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    if (!selectedFile) toast.error("Please select a file to upload");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      category: {
        ...prevValues.category,
        [name]: value,
      },
    }));
  };

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
        <form className="grid gap-4 py-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" placeholder="Enter course title" value={formValues.title} onChange={(e)=>setFormValues({...formValues, title:e.target.value})} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" placeholder="Enter course description" value={formValues.desc} onChange={(e)=>setFormValues({...formValues, desc: e.target.value})} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="program">Program</Label>
              <Select id="program" name="program" onValueChange={(value)=>handleChange({target:{name:'program', value}})} value={formValues.category.program} >
                <SelectTrigger>
                  <SelectValue placeholder="Select program"  />
                </SelectTrigger>
                <SelectContent >
                  <SelectItem value="program1">Program 1</SelectItem>
                  <SelectItem value="program2">Program 2</SelectItem>
                  <SelectItem value="program3">Program 3</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="semester">Semester</Label>
              <Select id="semester" name="semester" onValueChange={(value)=>handleChange({target:{name:'semester', value}})} value={formValues.category.semester}>
                <SelectTrigger>
                  <SelectValue placeholder="Select semester"  />
                </SelectTrigger>
                <SelectContent>
                  {[...Array(8)].map((_, index) => (
                    <SelectItem key={index} value={`${index + 1}`}>Semester {index + 1}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="course">Course</Label>
              <Select id="course" name="course" onValueChange={(value)=>handleChange({target:{name:'course', value}})} value={formValues.category.course}>
                <SelectTrigger>
                  <SelectValue placeholder="Select course"  />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="course1">Course 1</SelectItem>
                  <SelectItem value="course2">Course 2</SelectItem>
                  <SelectItem value="course3">Course 3</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="resourceType">Resource Type</Label>
              <Select id="resourceType" name="resourceType" onValueChange={(value)=>handleChange({target:{name:'resourceType', value}})} value={formValues.category.resourceType}>
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
              {file ? (
                <div className="flex items-center justify-between border rounded-md p-4">
                  <div className="flex items-center gap-2">
                    <FileIcon className="w-6 h-6 text-muted-foreground" />
                    <p>{file.name}</p>
                  </div>
                  <Button variant="ghost" onClick={handleRemoveFile}>
                    <XIcon className="w-4 h-4" />
                  </Button>
                </div>
              ) : (
                <div className="flex items-center justify-center border-2 border-dashed border-muted rounded-md p-4 transition-colors hover:border-primary cursor-pointer">
                  <div className="text-center w-full">
                    <Input id="file" type="file" className="sr-only" onChange={handleFileUpload} ref={fileInputRef} />
                    <label htmlFor="file" className="flex flex-col items-center gap-2">
                      <UploadIcon className="w-6 h-6 text-muted-foreground" />
                      <p className="text-muted-foreground">Drag and drop files here or click to upload</p>
                    </label>
                  </div>
                </div>
              )}
              {isUploading && (
                <div className="w-full bg-muted rounded-md overflow-hidden">
                  <div className="bg-primary h-2 transition-all" style={{ width: `${uploadProgress}%` }} />
                </div>
              )}
            </div>
          </div>
          <Button type="submit">Confirm</Button>
          <Button variant="outline" onClick={() => {}}>Clear All</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
function FileIcon(props) {
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
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
    </svg>
  );
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
  );
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
  );
}
