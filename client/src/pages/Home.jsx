import { Button } from "../components/ui/button"
import { Card, CardContent, CardFooter } from "../components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "../components/ui/avatar"
import { Link } from "react-router-dom"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="py-8 md:py-12">
          <div className="container grid gap-8 px-4 md:px-6">
            <div className="space-y-4">
              <h1 className="text-3xl font-bold">Recent Notes</h1>
              <p className="text-muted-foreground">Check out the latest notes and resources shared by your peers.</p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Avatar>
                        <AvatarImage src="/placeholder-user.jpg" />
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">John Doe</p>
                        <p className="text-sm text-muted-foreground">Computer Science</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <HeartIcon className="h-5 w-5" />
                      <span>25</span>
                      <MessageCircleIcon className="h-5 w-5" />
                      <span>10</span>
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
                    <h3 className="text-lg font-medium">Introduction to Data Structures</h3>
                    <p className="text-sm text-muted-foreground">
                      A comprehensive guide to understanding data structures and their applications.
                    </p>
                  </div>
                </CardContent>
                <CardFooter className="text-sm text-muted-foreground">Uploaded 2 days ago</CardFooter>
              </Card>
              <Card>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Avatar>
                        <AvatarImage src="/placeholder-user.jpg" />
                        <AvatarFallback>SA</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">Sarah Adams</p>
                        <p className="text-sm text-muted-foreground">Business Administration</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <HeartIcon className="h-5 w-5" />
                      <span>18</span>
                      <MessageCircleIcon className="h-5 w-5" />
                      <span>6</span>
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
                    <h3 className="text-lg font-medium">Marketing Strategies for Startups</h3>
                    <p className="text-sm text-muted-foreground">
                      Effective marketing tactics to help your startup stand out in a crowded market.
                    </p>
                  </div>
                </CardContent>
                <CardFooter className="text-sm text-muted-foreground">Uploaded 4 days ago</CardFooter>
              </Card>
              <Card>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Avatar>
                        <AvatarImage src="/placeholder-user.jpg" />
                        <AvatarFallback>MJ</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">Michael Johnson</p>
                        <p className="text-sm text-muted-foreground">Mechanical Engineering</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <HeartIcon className="h-5 w-5" />
                      <span>32</span>
                      <MessageCircleIcon className="h-5 w-5" />
                      <span>14</span>
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
                    <h3 className="text-lg font-medium">Fundamentals of Thermodynamics</h3>
                    <p className="text-sm text-muted-foreground">
                      A detailed exploration of the core principles of thermodynamics.
                    </p>
                  </div>
                </CardContent>
                <CardFooter className="text-sm text-muted-foreground">Uploaded 1 week ago</CardFooter>
              </Card>
              <Card>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Avatar>
                        <AvatarImage src="/placeholder-user.jpg" />
                        <AvatarFallback>EW</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">Emily Wilson</p>
                        <p className="text-sm text-muted-foreground">Psychology</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <HeartIcon className="h-5 w-5" />
                      <span>22</span>
                      <MessageCircleIcon className="h-5 w-5" />
                      <span>8</span>
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
                    <h3 className="text-lg font-medium">Introduction to Cognitive Psychology</h3>
                    <p className="text-sm text-muted-foreground">
                      Explore the inner workings of the human mind and how it processes information.
                    </p>
                  </div>
                </CardContent>
                <CardFooter className="text-sm text-muted-foreground">Uploaded 3 days ago</CardFooter>
              </Card>
              <Card>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Avatar>
                        <AvatarImage src="/placeholder-user.jpg" />
                        <AvatarFallback>JB</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">Jessica Bates</p>
                        <p className="text-sm text-muted-foreground">Biology</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <HeartIcon className="h-5 w-5" />
                      <span>15</span>
                      <MessageCircleIcon className="h-5 w-5" />
                      <span>4</span>
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
                    <h3 className="text-lg font-medium">Cellular Biology: The Building Blocks of Life</h3>
                    <p className="text-sm text-muted-foreground">
                      Dive into the fascinating world of cells and their functions.
                    </p>
                  </div>
                </CardContent>
                <CardFooter className="text-sm text-muted-foreground">Uploaded 5 days ago</CardFooter>
              </Card>
              <Card>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Avatar>
                        <AvatarImage src="/placeholder-user.jpg" />
                        <AvatarFallback>DM</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">David Martinez</p>
                        <p className="text-sm text-muted-foreground">Economics</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <HeartIcon className="h-5 w-5" />
                      <span>28</span>
                      <MessageCircleIcon className="h-5 w-5" />
                      <span>12</span>
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
                    <h3 className="text-lg font-medium">Principles of Microeconomics</h3>
                    <p className="text-sm text-muted-foreground">
                      Understand the fundamental concepts of microeconomics and how they shape individual and market
                      behavior.
                    </p>
                  </div>
                </CardContent>
                <CardFooter className="text-sm text-muted-foreground">Uploaded 1 week ago</CardFooter>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-muted border-t">
        <div className="container flex items-center justify-between h-14 px-4 md:px-6">
          <p className="text-sm text-muted-foreground">&copy; 2024 Student Notes. All rights reserved.</p>
          <nav className="flex items-center gap-4">
            <div href="#" className="text-sm text-muted-foreground hover:underline" prefetch={false}>
              Privacy
            </div>
            <div href="#" className="text-sm text-muted-foreground hover:underline" prefetch={false}>
              Terms
            </div>
            <div href="#" className="text-sm text-muted-foreground hover:underline" prefetch={false}>
              Contact
            </div>
          </nav>
        </div>
      </footer>
    </div>
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

