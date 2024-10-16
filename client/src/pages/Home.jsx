import { Card, CardContent } from "../components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "../components/ui/avatar"
import Lottie from "lottie-react";
import animationData from "./animationData.json";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import HomeCard from "../components/HomeCard";


export default function Home() {
  const currentPosts = useSelector((state) => state.posts.posts);
  const [topThreeRecent, setTopThreeRecent] = useState([]);
  const [topThreePopular, setTopThreePopular] = useState([]);

  useEffect(() => {
    if (currentPosts) {
      const posts = currentPosts.map((post) => {
        return {
          _id: post._id,
          createdAt: post.createdAt,
        };
      });

      const sortedPosts = posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      const topThree1 = currentPosts.filter((post) => {
        return sortedPosts.slice(0, 3).some((sortedPost) => sortedPost._id === post._id);
      });

      const popularPosts = posts.sort((a, b) => b.likes?.length - a.likes?.length);
      const topThree2 = currentPosts.filter((post) => {
        return popularPosts.slice(0, 3).some((sortedPost) => sortedPost._id === post._id);
      });

  setTopThreeRecent(topThree1);
  setTopThreePopular(topThree2);
}
  }, [currentPosts]);


  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  }
  return (
    <div className="flex flex-col min-h-dvh">
      <main className="flex-1">
        <section className="w-full py-4 md:py-6 lg:py-12 border-y">
          <div className="px-4 md:px-6 space-y-10 xl:space-y-16">
            <div className="flex md:flex-row flex-col max-w-[1300px] mx-auto gap-4 px-4 sm:px-6 md:px-10 md:grid-cols-2 md:gap-16">
              <div className="md:w-1/2 w-full md:text-left text-center ">
              <motion.h1
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-white"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.span className="block mb-2 md:mb-4" variants={itemVariants}>
                  Discover
                </motion.span>
                <motion.span className="block mb-2 md:mb-4 text-[#4169e1]" variants={itemVariants}>
                  share
                </motion.span>
                <motion.span className="block mb-2 md:mb-4" variants={itemVariants}>
                  and <span className="text-[#4169e1]">collaborate on</span>
                </motion.span>
                <motion.span className="block mb-2 md:mb-4" variants={itemVariants}>
                  university resources
                </motion.span>
                <motion.span
                  className="block text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-gray-400"
                  variants={itemVariants}
                >
                  with ease.
                </motion.span>
              </motion.h1>
              </div>
              <div className="md:w-1/2 w-full ">
              <Lottie
                animationData={animationData}
                className="flex justify-center items-center w-full h-full"  
                loop={true}
              />
              </div>
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
              {topThreeRecent && topThreeRecent.map((post) => (
                <HomeCard
                  key={post._id}
                  _id={post._id}
                  author={post.author}
                  likes={post.likes.length}
                  likedBy={post.likes}
                  comments={post.comments.length}
                  title={post.title}
                  program={post.category.program}
                  description={post.desc}
                  thumbnail={post.thumbnail}
                  uploadedAt={post.createdAt}
                />
              ))}
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
            {topThreePopular && topThreePopular.map((post) => (
                <HomeCard
                  key={post._id}
                  _id={post._id}
                  author={post.author}
                  likes={post.likes.length}
                  likedBy={post.likes}
                  comments={post.comments.length}
                  title={post.title}
                  program={post.category.program}
                  description={post.desc}
                  thumbnail={post.thumbnail}
                  uploadedAt={post.createdAt}
                />
              ))}
            </div>
          </div>
        </section>
      </main>
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