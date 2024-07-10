import { Card, CardContent } from "../components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "../components/ui/avatar"

export default function Test() {
    return (
        <Card className="w-full max-w-md shadow-lg">
          <CardContent className="grid grid-cols-[100px_1fr] gap-4 p-6">
            <div className="flex items-center justify-center rounded-lg bg-gray-100 p-2">
              <img src="/placeholder.svg" alt="File thumbnail" width={80} height={80} className="object-contain" />
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xl font-semibold text-white">Calculus Midterm Exam</h4>
                <div className="rounded-full bg-blue-600 px-2 py-1 text-xs text-white">PDF</div>
              </div>
              <div className="text-sm text-white space-y-1">
                <div>Course: Calculus I</div>
                <div>Department: Computer Science</div>
                <div>Semester: Fall 2023</div>
                <div>File Type: Past Year Question</div>
              </div>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex flex-col space-y-1">
                <div className="flex items-center gap-2">
                      <Avatar>
                        <AvatarImage src="/placeholder-user.jpg" />
                        <AvatarFallback>LT</AvatarFallback>
                      </Avatar>
                      <div className="text-sm text-muted-foreground">Lisa Tran</div>
                    </div>
                  <span className="text-xs">1 week ago</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <HeartIcon className="h-4 w-4 text-red-500" />
                    <span>12</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageCircleIcon className="h-4 w-4 text-gray-500" />
                    <span>4</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
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