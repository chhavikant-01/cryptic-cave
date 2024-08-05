import { HoverCard, HoverCardTrigger, HoverCardContent } from "./ui/hover-card"
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar"
import { Button } from "./ui/button"

export default function UserCard(props) {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Avatar className="cursor-pointer">
            <AvatarImage src="/placeholder-user.jpg" />
            <AvatarFallback>{props.user.name ? props.user.name.split(" ")[0][0] + props.user.name.split(" ")[1][0] : "UN"}</AvatarFallback>
        </Avatar>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex flex-col items-center justify-center space-y-4 p-6">
          <div className="flex flex-col items-center space-y-2">
            <div className="text-xl font-bold">{props.user.name}</div>
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
          <Button variant="outline" className="w-full">
            Follow
          </Button>
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}