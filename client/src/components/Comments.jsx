import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "./ui/dialog"
import { Button } from "./ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar"


export default function Comments(props) {
  return (
    <Dialog defaultClose>
      <DialogTrigger asChild>
      <Button variant="ghost" className='flex items-center gap-1'>
        <MessageCircleIcon className="h-5 w-5" />
            <span>{props.comments}</span>
      </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>Comments</DialogTitle>
          <DialogDescription>View and discuss the latest comments on this post.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="flex items-start gap-4 text-sm">
            <Avatar className="w-10 h-10 border">
              <AvatarImage src="/placeholder-user.jpg" />
              <AvatarFallback>AC</AvatarFallback>
            </Avatar>
            <div className="grid gap-1.5">
              <div className="flex items-center gap-2">
                <div className="font-semibold">@iamwillpursell</div>
                <div className="text-xs text-muted-foreground">5 months ago</div>
              </div>
              <div>
                I really love the ecosystem Vercel is creating. The way each component can be added and modified with
                ease really makes these tools attractive.
              </div>
            </div>
          </div>
          <div className="flex items-start gap-4 text-sm">
            <Avatar className="w-10 h-10 border">
              <AvatarImage src="/placeholder-user.jpg" />
              <AvatarFallback>AC</AvatarFallback>
            </Avatar>
            <div className="grid gap-1.5">
              <div className="flex items-center gap-2">
                <div className="font-semibold">@iamwillpursell</div>
                <div className="text-xs text-muted-foreground">5 months ago</div>
              </div>
              <div>
                I really love the ecosystem Vercel is creating. The way each component can be added and modified with
                ease really makes these tools attractive.
              </div>
            </div>
          </div>
          <div className="flex items-start gap-4 text-sm">
            <Avatar className="w-10 h-10 border">
              <AvatarImage src="/placeholder-user.jpg" />
              <AvatarFallback>AC</AvatarFallback>
            </Avatar>
            <div className="grid gap-1.5">
              <div className="flex items-center gap-2">
                <div className="font-semibold">@HackSoft</div>
                <div className="text-xs text-muted-foreground">2 months ago</div>
              </div>
              <div>
                We are more than excited to leverage all the new stuff, building better products for our clients ✨
              </div>
            </div>
          </div>
          <div className="flex items-start gap-4 text-sm">
            <Avatar className="w-10 h-10 border">
              <AvatarImage src="/placeholder-user.jpg" />
              <AvatarFallback>AC</AvatarFallback>
            </Avatar>
            <div className="grid gap-1.5">
              <div className="flex items-center gap-2">
                <div className="font-semibold">@greed7513</div>
                <div className="text-xs text-muted-foreground">6 days ago</div>
              </div>
              <div>does anyone know which monospace are they using when showing code?</div>
            </div>
          </div>
          <div className="flex items-start gap-4 text-sm">
            <Avatar className="w-10 h-10 border">
              <AvatarImage src="/placeholder-user.jpg" />
              <AvatarFallback>AC</AvatarFallback>
            </Avatar>
            <div className="grid gap-1.5">
              <div className="flex items-center gap-2">
                <div className="font-semibold">@greed7513</div>
                <div className="text-xs text-muted-foreground">6 days ago</div>
              </div>
              <div>does anyone know which monospace are they using when showing code?</div>
            </div>
          </div>
          <div className="flex items-start gap-4 text-sm">
            <Avatar className="w-10 h-10 border">
              <AvatarImage src="/placeholder-user.jpg" />
              <AvatarFallback>AC</AvatarFallback>
            </Avatar>
            <div className="grid gap-1.5">
              <div className="flex items-center gap-2">
                <div className="font-semibold">@greed7513</div>
                <div className="text-xs text-muted-foreground">6 days ago</div>
              </div>
              <div>does anyone know which monospace are they using when showing code?</div>
            </div>
          </div>
          <div className="flex items-start gap-4 text-sm">
            <Avatar className="w-10 h-10 border">
              <AvatarImage src="/placeholder-user.jpg" />
              <AvatarFallback>AC</AvatarFallback>
            </Avatar>
            <div className="grid gap-1.5">
              <div className="flex items-center gap-2">
                <div className="font-semibold">@greed7513</div>
                <div className="text-xs text-muted-foreground">6 days ago</div>
              </div>
              <div>does anyone know which monospace are they using when showing code?</div>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="ghost" onClick={() => {}}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
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