import HomeCard from "../components/HomeCard"
import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationLink, PaginationNext } from "../components/ui/pagination"
import { useSelector } from "react-redux"
import FilterBar from "../components/FilterBar"
import LoadingCard from "../components/LoadingCard"
import PostCard from "../components/PostCard"

export default function Notes() {
  
  const currentPosts = useSelector((state) => state.posts.posts);
  const status = useSelector((state) => state.posts.status);

  return (
    <div className="container mx-auto px-4 md:px-6 py-8">
        <FilterBar />
        <div className="flex flex-col gap-6">
        {
          status === 'loading' ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <LoadingCard />
              <LoadingCard />
              <LoadingCard />
              <LoadingCard />
              <LoadingCard />
              <LoadingCard />
              <LoadingCard />
              <LoadingCard />
              <LoadingCard />
            </div>
          ):(
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentPosts && currentPosts.map((post) => (
                <PostCard
                  key={post._id}
                  _id={post._id}
                  author={post.author}
                  likes={post.likes.length}
                  likedBy={post.likes}
                  comments={post.comments.length}
                  title={post.title}
                  program={post.category.program}
                  description={post.desc}
                  course={post.category.course}
                  resourceType={post.category.resourceType}
                  thumbnail={post.thumbnail}
                  uploadedAt={post.createdAt} />
              ))}
          </div>
          )
        }{
          currentPosts.length === 0 && status !== 'loading' && (
            <div className="flex items-center justify-center h-[50vh]">
              <p className="text-muted-foreground">No posts found</p>
            </div>
          )
        }
          <div className="flex justify-end">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive>
                    2
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>

    </div>
  )
}

function ChevronDownIcon(props) {
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
      <path d="m6 9 6 6 6-6" />
    </svg>
  )
}


function ListOrderedIcon(props) {
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
      <line x1="10" x2="21" y1="6" y2="6" />
      <line x1="10" x2="21" y1="12" y2="12" />
      <line x1="10" x2="21" y1="18" y2="18" />
      <path d="M4 6h1v4" />
      <path d="M4 10h2" />
      <path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1" />
    </svg>
  )
}

function SearchIcon(props) {
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
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}


function XIcon(props) {
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
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}