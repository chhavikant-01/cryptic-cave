import HomeCard from "../components/HomeCard"
import { Link } from "react-router-dom"
export default function Home() {

  const posts = [
    {
      id: 1,
      user: {
        name: "John Doe",
        major: "Computer Science",
        avatar: "/placeholder-user.jpg"
      },
      likes: 25,
      comments: 10,
      title: "Introduction to Data Structures",
      description: "A comprehensive guide to understanding data structures and their applications.",
      thumbnail: "/placeholder.svg",
      uploadedAt: "2 days ago"
    },
    {
      id: 2,
      user: {
        name: "Sarah Adams",
        major: "Business Administration",
        avatar: "/placeholder-user.jpg"
      },
      likes: 18,
      comments: 6,
      title: "Marketing Strategies for Startups",
      description: "Effective marketing tactics to help your startup stand out in a crowded market.",
      thumbnail: "/placeholder.svg",
      uploadedAt: "4 days ago"
    },
    {
      id: 3,
      user: {
        name: "Michael Johnson",
        major: "Mechanical Engineering",
        avatar: "/placeholder-user.jpg"
      },
      likes: 32,
      comments: 14,
      title: "Fundamentals of Thermodynamics",
      description: "A detailed exploration of the core principles of thermodynamics.",
      thumbnail: "/placeholder.svg",
      uploadedAt: "1 week ago"
    },
    {
      id: 4,
      user: {
        name: "Emily Wilson",
        major: "Psychology",
        avatar: "/placeholder-user.jpg"
      },
      likes: 22,
      comments: 8,
      title: "Introduction to Cognitive Psychology",
      description: "Explore the inner workings of the human mind and how it processes information.",
      thumbnail: "/placeholder.svg",
      uploadedAt: "3 days ago"
    },
    {
      id: 5,
      user: {
        name: "Jessica Bates",
        major: "Biology",
        avatar: "/placeholder-user.jpg"
      },
      likes: 15,
      comments: 4,
      title: "Cellular Biology: The Building Blocks of Life",
      description: "Dive into the fascinating world of cells and their functions.",
      thumbnail: "/placeholder.svg",
      uploadedAt: "5 days ago"
    },
    {
      id: 6,
      user: {
        name: "David Martinez",
        major: "Economics",
        avatar: "/placeholder-user.jpg"
      },
      likes: 22,
      comments: 8,
      title: "Introduction to Cognitive Psychology",
      description: "Explore the inner workings of the human mind and how it processes information.",
      thumbnail: "/placeholder.svg",
      uploadedAt: "3 days ago"
    }
  ]
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
              {posts.map((post) => (
              <Link to={`/post/${post.id}`}>
                <HomeCard
                  key={post.id}
                  user={post.user}
                  likes={post.likes}
                  comments={post.comments}
                  title={post.title}
                  description={post.description}
                  thumbnail={post.thumbnail}
                  uploadedAt={post.uploadedAt} />
                </Link>
              ))}
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




