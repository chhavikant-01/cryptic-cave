import { Button } from "../components/ui/button"
import { Textarea } from "../components/ui/textarea"
import { Avatar, AvatarImage, AvatarFallback } from "../components/ui/avatar"
import GooglePreview from "../components/GooglePreview"
import { useLocation } from "react-router-dom"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"

export default function Post() {
  const location = useLocation()
  const [id, setId] = useState('')
  const [post, setPost] = useState(null)

  useEffect(() => {
    const query = new URLSearchParams(location.search)
    const queryFromUrl = query.get("id")
    if (queryFromUrl) {
      setId(queryFromUrl)
    }
  }, [location.search])

  useEffect(() => {
    if (!id) return

    const getPost = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/posts/${id}`, {
          method: 'GET',
        })
        const data = await response.json()
        if (!response.ok) {
          return toast(data.message, { icon: "😭" })
        }
        if (response.ok) {
          setPost(data)
          console.log(data.fileUrl)
        }
      } catch (e) {
        return toast(e.message, { icon: "🥲" })
      }
    }
    getPost()
  }, [id])

  return (
    <div className="flex h-screen w-full">
      {id && post && 
      <div className="flex-1 bg-background">
        <div className="h-full w-full flex items-center justify-center">
          <GooglePreview fileUrl={post.fileUrl} />
        </div>
      </div>
      }
      <div className="w-[400px] bg-muted border-l transition-all duration-300 data-[collapsed=true]:w-[60px]">
        <div className="sticky top-0 z-10 flex items-center justify-between bg-background px-4 py-3 shadow">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="data-[collapsed=true]:rotate-180 transition-transform">
              <ChevronLeftIcon className="w-5 h-5" />
              <span className="sr-only">Toggle Sidebar</span>
            </Button>
            <h3 className="text-xl font-bold">Presentation.pptx</h3>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <HeartIcon className="w-5 h-5" />
              <span className="sr-only">Like</span>
            </Button>
            <Button variant="ghost" size="icon">
              <SaveIcon className="w-5 h-5" />
              <span className="sr-only">Save</span>
            </Button>
            <Button variant="ghost" size="icon">
              <DownloadIcon className="w-5 h-5" />
              <span className="sr-only">Download</span>
            </Button>
          </div>
        </div>
        <div className="p-4 space-y-4">
          <div>
            <h4 className="text-lg font-bold">Description</h4>
            <p className="text-muted-foreground">
              This is a presentation file with information about our latest product launch.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-bold">Uploaded by</h4>
            <div className="flex items-center gap-3">
              <Avatar className="w-8 h-8">
                <AvatarImage src="/placeholder-user.jpg" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <div className="font-medium">John Doe</div>
                <p className="text-muted-foreground text-sm">Product Manager</p>
              </div>
              <Button variant="outline" className="ml-auto">
                Follow
              </Button>
            </div>
          </div>
          <div>
            <h4 className="text-lg font-bold">Comments</h4>
            <div className="space-y-2">
              <Textarea placeholder="Add a comment..." className="w-full rounded-md border bg-background p-2 text-sm" />
              <div className="space-y-2">
                <div className="flex items-start gap-3">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src="/placeholder-user.jpg" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <div className="font-medium">John Doe</div>
                      <time className="text-muted-foreground text-sm">2 days ago</time>
                    </div>
                    <p className="text-muted-foreground text-sm">
                      Great presentation, can't wait to see the final product!
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src="/placeholder-user.jpg" />
                    <AvatarFallback>JA</AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <div className="font-medium">Jane Appleseed</div>
                      <time className="text-muted-foreground text-sm">1 week ago</time>
                    </div>
                    <p className="text-muted-foreground text-sm">
                      Looks good, but I have a few suggestions for the design.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


function ChevronLeftIcon(props) {
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
      <path d="m15 18-6-6 6-6" />
    </svg>
  )
}


function DownloadIcon(props) {
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
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" x2="12" y1="15" y2="3" />
    </svg>
  )
}


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


function SaveIcon(props) {
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
      <path d="M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" />
      <path d="M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7" />
      <path d="M7 3v4a1 1 0 0 0 1 1h7" />
    </svg>
  )
}