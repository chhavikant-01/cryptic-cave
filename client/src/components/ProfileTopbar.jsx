import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar"
import { Button } from "./ui/button"

export default function ProfileTopbar() {
  return (
    <div className="bg-background rounded-lg shadow-md p-6 flex items-center gap-6">
      <div className="relative">
        <Avatar className="h-20 w-20">
          <AvatarImage src="/placeholder-user.jpg" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <Button
          variant="ghost"
          size="icon"
          className="absolute bottom-0 right-0 rounded-full bg-background p-1 shadow-md"
        >
          <PencilIcon className="h-4 w-4" />
          <span className="sr-only">Edit profile picture</span>
        </Button>
      </div>
      <div className="grid gap-2 flex-1">
        <div className="flex items-center justify-between">
          <div className="font-semibold text-lg">John Doe</div>
          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <span>@johndoe</span>
            <span>|</span>
            <span>johndoe@example.com</span>
          </div>
        </div>
        <div className="flex items-center gap-6 text-lg font-medium text-secondary-foreground dark:text-secondary-foreground">
          <div className="flex items-center gap-2">
            <UsersIcon className="h-6 w-6" />
            <span>1.2K Followers</span>
          </div>
          <div className="flex items-center gap-2">
            <ImageIcon className="h-6 w-6" />
            <span>234 Posts</span>
          </div>
          <div className="flex items-center gap-2">
            <BookmarkIcon className="h-6 w-6" />
            <span>87 Saved</span>
          </div>
        </div>
      </div>
    </div>
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