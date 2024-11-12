import { Pagination, 
  PaginationContent, 
  PaginationItem,
  PaginationPrevious,
  PaginationNext } from "./ui/pagination"
import { useSelector } from "react-redux"
import HomeCard from "./HomeCard"
import { useEffect, useState } from "react";
import LoadingCard from "./LoadingCard";
import PostCard from "./PostCard";

export default function ProfileSavedPosts() {
  const user = useSelector((state)=>state.user.currentUser);
  const [loading, setLoading] = useState(false);
  const [savedPosts, setSavedPosts] = useState([]); 

  const fetchUserPosts = async () => {

    try{
      setLoading(true);
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/posts/saved/${user._id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
      })
      const posts = await response.json();
      setSavedPosts(posts);
      setLoading(false);
    }catch(error){
      setLoading(false);
      console.log(error);
    }
  }

  useEffect(() => {
    fetchUserPosts();
  }, [])

  return (
    <section className="w-full">
    <div className="container mx-auto px-4 md:px-6">
      <div className="mb-8 md:mb-10 lg:mb-12">
        <h2 className="text-2xl font-bold tracking-tight md:text-3xl lg:text-4xl">My Saved</h2>
      </div>
      {
        loading && (
          <div className="relative grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            <LoadingCard />
            <LoadingCard />
            <LoadingCard />
          </div>
        )
      }
      <div className="relative grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
      {savedPosts && savedPosts.map((post) => (
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
                  uploadedAt={post.createdAt}
                />
      ) )}
      {
        savedPosts.length === 0 && (
          <div className="text-center w-full">
            <p className="text-lg text-gray-600">No saved posts</p>
          </div>
        )
      }
      </div>
      {/* <div className="mt-8 md:mt-10 lg:mt-12 flex justify-center">
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
      </div> */}
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