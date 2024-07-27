import { Card, CardContent } from "../components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "../components/ui/avatar"
import homeImg from "./home.jpg"

export default function Home2() {
  return (
    <div className="flex flex-col min-h-dvh">
      <main className="flex-1">
        <section className="w-full pt-4 md:pt-6 lg:pt-12 border-y">
          <div className="px-4 md:px-6 space-y-10 xl:space-y-16">
            <div className="grid max-w-[1300px] mx-auto gap-4 px-4 sm:px-6 md:px-10 md:grid-cols-2 md:gap-16">
              <div>
                <h1 className="lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]">
                Elevate Your Academic Journey
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Discover, share, and collaborate on university resources with ease.
                </p>
                <div className="mt-6">
                  <div
                    href="#"
                    className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    prefetch="false"
                  >
                    Join Now
                  </div>
                </div>
              </div>
              <img
                src={homeImg}
                width="550"
                height="550"
                alt="Hero"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-bottom sm:w-full lg:order-last lg:aspect-square"
              />
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container space-y-12 px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Recently Uploaded</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Check out the latest resources shared by your fellow students.
                </p>
              </div>
            </div>
            <div className="mx-auto grid items-start gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3">
              <Card>
                <CardContent>
                  <div className="flex flex-col gap-2">
                    <div className="text-lg font-bold">Calculus Notes</div>
                    <div className="text-sm text-muted-foreground">
                      Comprehensive notes covering all topics in Calculus 1.
                    </div>
                    <div className="flex items-center gap-2">
                      <Avatar>
                        <AvatarImage src="/placeholder-user.jpg" />
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                      <div className="text-sm text-muted-foreground">John Doe</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <DownloadIcon className="w-4 h-4 text-muted-foreground" />
                      <div className="text-sm text-muted-foreground">345 downloads</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent>
                  <div className="flex flex-col gap-2">
                    <div className="text-lg font-bold">Physics Problem Sets</div>
                    <div className="text-sm text-muted-foreground">
                      Practice problems and solutions for Physics 101.
                    </div>
                    <div className="flex items-center gap-2">
                      <Avatar>
                        <AvatarImage src="/placeholder-user.jpg" />
                        <AvatarFallback>SA</AvatarFallback>
                      </Avatar>
                      <div className="text-sm text-muted-foreground">Sarah Adams</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <DownloadIcon className="w-4 h-4 text-muted-foreground" />
                      <div className="text-sm text-muted-foreground">201 downloads</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent>
                  <div className="flex flex-col gap-2">
                    <div className="text-lg font-bold">Marketing Case Studies</div>
                    <div className="text-sm text-muted-foreground">Real-world case studies for Marketing 301.</div>
                    <div className="flex items-center gap-2">
                      <Avatar>
                        <AvatarImage src="/placeholder-user.jpg" />
                        <AvatarFallback>EM</AvatarFallback>
                      </Avatar>
                      <div className="text-sm text-muted-foreground">Emily Martinez</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <DownloadIcon className="w-4 h-4 text-muted-foreground" />
                      <div className="text-sm text-muted-foreground">156 downloads</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container space-y-12 px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Most Popular</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  These are the resources that have gained the most traction among your peers.
                </p>
              </div>
            </div>
            <div className="mx-auto grid items-start gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3">
              <Card>
                <CardContent>
                  <div className="flex flex-col gap-2">
                    <div className="text-lg font-bold">Organic Chemistry Notes</div>
                    <div className="text-sm text-muted-foreground">
                      Detailed notes covering all topics in Organic Chemistry.
                    </div>
                    <div className="flex items-center gap-2">
                      <Avatar>
                        <AvatarImage src="/placeholder-user.jpg" />
                        <AvatarFallback>JW</AvatarFallback>
                      </Avatar>
                      <div className="text-sm text-muted-foreground">Jessica Wang</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <DownloadIcon className="w-4 h-4 text-muted-foreground" />
                      <div className="text-sm text-muted-foreground">1,234 downloads</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent>
                  <div className="flex flex-col gap-2">
                    <div className="text-lg font-bold">Data Structures Cheatsheet</div>
                    <div className="text-sm text-muted-foreground">
                      Quick reference guide for common data structures and algorithms.
                    </div>
                    <div className="flex items-center gap-2">
                      <Avatar>
                        <AvatarImage src="/placeholder-user.jpg" />
                        <AvatarFallback>MR</AvatarFallback>
                      </Avatar>
                      <div className="text-sm text-muted-foreground">Michael Rodriguez</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <DownloadIcon className="w-4 h-4 text-muted-foreground" />
                      <div className="text-sm text-muted-foreground">987 downloads</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent>
                  <div className="flex flex-col gap-2">
                    <div className="text-lg font-bold">Economics Textbook Solutions</div>
                    <div className="text-sm text-muted-foreground">
                      Detailed solutions to end-of-chapter problems in the Economics textbook.
                    </div>
                    <div className="flex items-center gap-2">
                      <Avatar>
                        <AvatarImage src="/placeholder-user.jpg" />
                        <AvatarFallback>LT</AvatarFallback>
                      </Avatar>
                      <div className="text-sm text-muted-foreground">Lisa Tran</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <DownloadIcon className="w-4 h-4 text-muted-foreground" />
                      <div className="text-sm text-muted-foreground">765 downloads</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">&copy; 2024 University Resource Sharing. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <div href="#" className="text-xs hover:underline underline-offset-4" prefetch="false">
            Terms of Service
          </div>
          <div href="#" className="text-xs hover:underline underline-offset-4" prefetch="false">
            Privacy
          </div>
        </nav>
      </footer>
    </div>
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