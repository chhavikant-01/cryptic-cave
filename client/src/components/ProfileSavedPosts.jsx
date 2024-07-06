import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationNext } from "./ui/pagination"

export default function ProfileSavedPosts() {
  return (
    <section className="w-full py-12 md:py-16 lg:py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-8 md:mb-10 lg:mb-12">
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl lg:text-4xl">Saved Posts</h2>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <div className="group bg-slate-900 relative overflow-hidden rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl">
            <div href="#" className="absolute inset-0 z-10" prefetch={false}>
              <span className="sr-only">View post</span>
            </div>
            <img
              src="https://picsum.photos/seed/picsum/300/200"
              alt="Post thumbnail"
              width={300}
              height={200}
              className="h-40 w-full object-cover transition-all duration-300 group-hover:scale-105"
            />
            <div className="p-4">
              <div className="flex flex-col gap-2 mb-2">
                <div className="text-sm text-muted-foreground">PDF, Semester: 1, Subject: Computer Science</div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <HeartIcon className="w-4 h-4" />
                  <span>12</span>
                  <MessageCircleIcon className="w-4 h-4" />
                  <span>4</span>
                </div>
              </div>
              <h3 className="text-lg font-semibold transition-colors duration-300 group-hover:text-primary">
                Exploring the Wonders of Nature
              </h3>
            </div>
          </div>
          <div className="group bg-slate-900 relative overflow-hidden rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl">
            <div href="#" className="absolute inset-0 z-10" prefetch={false}>
              <span className="sr-only">View post</span>
            </div>
            <img
              src="https://picsum.photos/seed/picsum/300/200"
              alt="Post thumbnail"
              width={300}
              height={200}
              className="h-40 w-full object-cover transition-all duration-300 group-hover:scale-105"
            />
            <div className="p-4">
              <div className="flex flex-col gap-2 mb-2">
                <div className="text-sm text-muted-foreground">DOCX, Semester: 2, Subject: Biology</div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <HeartIcon className="w-4 h-4" />
                  <span>8</span>
                  <MessageCircleIcon className="w-4 h-4" />
                  <span>2</span>
                </div>
              </div>
              <h3 className="text-lg font-semibold transition-colors duration-300 group-hover:text-primary">
                The Art of Mindful Living
              </h3>
            </div>
          </div>
          <div className="group bg-slate-900 relative overflow-hidden rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl">
            <div href="#" className="absolute inset-0 z-10" prefetch={false}>
              <span className="sr-only">View post</span>
            </div>
            <img
              src="https://picsum.photos/seed/picsum/300/200"
              alt="Post thumbnail"
              width={300}
              height={200}
              className="h-40 w-full object-cover transition-all duration-300 group-hover:scale-105"
            />
            <div className="p-4">
              <div className="flex flex-col gap-2 mb-2">
                <div className="text-sm text-muted-foreground">XLSX, Semester: 3, Subject: Mathematics</div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <HeartIcon className="w-4 h-4" />
                  <span>15</span>
                  <MessageCircleIcon className="w-4 h-4" />
                  <span>6</span>
                </div>
              </div>
              <h3 className="text-lg font-semibold transition-colors duration-300 group-hover:text-primary">
                The Power of Positive Thinking
              </h3>
            </div>
          </div>
          <div className="group bg-slate-900 relative overflow-hidden rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl">
            <div href="#" className="absolute inset-0 z-10" prefetch={false}>
              <span className="sr-only">View post</span>
            </div>
            <img
              src="https://picsum.photos/seed/picsum/300/200"
              alt="Post thumbnail"
              width={300}
              height={200}
              className="h-40 w-full object-cover transition-all duration-300 group-hover:scale-105"
            />
            <div className="p-4">
              <div className="flex flex-col gap-2 mb-2">
                <div className="text-sm text-muted-foreground">DOCX, Semester: 4, Subject: English</div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <HeartIcon className="w-4 h-4" />
                  <span>9</span>
                  <MessageCircleIcon className="w-4 h-4" />
                  <span>3</span>
                </div>
              </div>
              <h3 className="text-lg font-semibold transition-colors duration-300 group-hover:text-primary">
                The Art of Storytelling
              </h3>
            </div>
          </div>
        </div>
        <div className="mt-8 md:mt-10 lg:mt-12 flex justify-center">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </section>
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