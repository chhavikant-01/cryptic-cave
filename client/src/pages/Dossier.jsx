import { useEffect, useState } from "react"
import { Button } from "../components/ui/button"
import { StarIcon, Bookmark,FilePenLine, EyeIcon, FileIcon, FolderIcon } from "lucide-react"
import { useSelector } from "react-redux"
import UserCard from "../components/UserCard"
import { formatDistanceToNow } from "date-fns"
import toast from "react-hot-toast"
export default function Dossier() {
  const [postId, setPostId] = useState('');
  const [saved, setSaved] = useState(false);
  const [liked, setLiked] = useState(false);
  

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setPostId(params.get('id'));
  }, [])
  const post = useSelector((state) => state.posts.posts.find((post) => (post._id).toString() === postId));
  const user = useSelector((state) => state.user.currentUser);

  const numberOfLikes = post?.likes.length;

  let formattedDate = 'Invalid date';
  try {
    formattedDate = formatDistanceToNow(new Date(post?.updatedAt), { addSuffix: true });
  } catch (e) {
    console.error('Invalid date value:', post?.updatedAt);
  }

  const handleFileDownload = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/posts/download/${post?.fileUrl}`);
  
      if (!response.ok) {
        toast.error('Failed to download file');
        throw new Error('Failed to download file');
      }
  
      const blob = await response.blob(); 
      const url = window.URL.createObjectURL(blob); 
      const a = document.createElement('a'); 
      a.href = url;
      a.download = post?.fileName || 'file'; 
      document.body.appendChild(a); 
      a.click(); 
      a.remove(); 
      window.URL.revokeObjectURL(url); 
      toast.success('File downloaded successfully');
    } catch (e) {
      console.error(e);
      toast.error('Failed to download file');
    }
  };
  

  useEffect(() => {
    if (user && user.savedPosts.includes(postId)) {
      setSaved(true);
    } else {
      setSaved(false);
    }
    if (user && post?.likes.includes(user._id)) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  },[postId, user, post?.likes]);

  return (
    <div className="container mx-auto xl:px-[300px] lg:px-[200px] md:px-[100px] py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div className="flex items-center gap-2 mb-4 md:mb-0">
          {
            (post && post.author) &&
              <UserCard user={post.author} /> 
          }
          <h1 className="text-2xl font-bold">
            {post?.author.username} / <span className="text-blue-500">{post?.title.replace(/ /g,"-")}</span>
          </h1>
          
        </div>
        <div className="flex space-x-2">
          <Button size="sm" variant="outline" className="hover:cursor-text">
            {post?.category.resourceType}
          </Button>
          <Button variant="outline" size="sm">
            <StarIcon className={liked ? "h-4 mr-2 w-4 fill-current text-[#e2b340]" : "h-4 mr-2 w-4"} />
            {liked ? "Starred":"Star"}
          </Button>
          <Button variant="outline" size="sm">
            <Bookmark className={saved ? "h-5 mr-2 w-5 fill-current text-blue-500" : "h-5 mr-2 w-5"} />
            {saved ? "Saved":"Save"}
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 mb-6">
        <div className="flex items-center">
          <StarIcon className="mr-1 h-4 w-4" />
          <span className="font-semibold">{numberOfLikes}</span>
          <span className="ml-1 text-muted-foreground">stars</span>
        </div>
        <div className="flex items-center">
          <EyeIcon className="mr-1 h-4 w-4" />
          <span className="font-semibold">4</span>
          <span className="ml-1 text-muted-foreground">watch</span>
        </div>
        <div className="flex items-center">
          <Bookmark className="mr-1 h-4 w-4" />
          <span className="font-semibold">3</span>
          <span className="ml-1 text-muted-foreground">saved</span>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6">
        <div className="md:col-span-2">
          <div className="bg-card text-card-foreground border-2 rounded-lg shadow-sm mb-6">
            <div className="p-4 border-b">
              <div className="flex justify-between items-center">
                <Button size="sm" onClick={handleFileDownload} >
                  Download
                </Button>
                <Button variant="destructive" size="sm">
                  Report
                </Button>
              </div>
            </div>
            <div className="flex justify-between">
            <div className="p-4">
              <div className="flex items-center justify-between py-2 hover:bg-muted rounded px-2">
                <div className="flex items-center">
                  <FileIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span>Description.md</span>
                </div>
              </div>
              <div className="flex items-center justify-between py-2 hover:bg-muted rounded px-2">
                <div className="flex items-center">
                  <FileIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span>{post?.fileName}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end">
              <span className="p-4 text-sm text-muted-foreground">
                Updated {formattedDate}
              </span>
            </div>
            </div>
              
          </div>

          {/* Descriotion Preview */}
          <div className="bg-card border-2 text-card-foreground rounded-lg shadow-sm p-6">
            <div className="flex border-b items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Description.md</h2>
              {/* <Button variant="ghost" size="sm">
                <FilePenLine className="mr-2 h-4 w-4" />
                Edit
              </Button> */}
            </div>
            <div className="prose max-w-none">
              <p>{post?.desc}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}