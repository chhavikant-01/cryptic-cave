import React from 'react'
import { Card, CardContent, CardFooter } from "../components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "../components/ui/avatar"
const HomeCard = (props) => {
  return (
    <div>
        <Card>
            <CardContent>
                <div className="flex items-center justify-between p-2">
                    <div className="flex items-center gap-2">
                        <Avatar>
                            <AvatarImage src="/placeholder-user.jpg" />
                                <AvatarFallback>{props.user.name.split(" ")[0][0] + props.user.name.split(" ")[1][0]}</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="font-medium">{props.name}</p>
                            <p className="text-sm text-muted-foreground">Computer Science</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <HeartIcon className="h-5 w-5" />
                            <span>{props.likes}</span>
                        <MessageCircleIcon className="h-5 w-5" />
                        <span>{props.comments}</span>
                    </div>
                </div>
                    <div className="mt-4">
                        <img
                        src="/placeholder.svg"
                        width={400}
                        height={225}
                        alt="Note thumbnail"
                        className="rounded-md object-cover aspect-video"
                        />
                    </div>
                    <div className="mt-4">
                        <h3 className="text-lg font-medium">{props.title}</h3>
                        <p className="text-sm text-muted-foreground">
                        {props.description}
                        </p>
                    </div>
            </CardContent>
            <CardFooter className="text-sm text-muted-foreground">
                {props.uploadedAt}
            </CardFooter>
        </Card>
    </div>
  )
}

export default HomeCard

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
  