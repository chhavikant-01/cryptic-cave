import { motion } from 'framer-motion'
import { ArrowRight, Star, Share2, Layout, Brain, ThumbsUp, Search, Lock } from 'lucide-react'
import { Button } from "../components/ui/button"

export default function Features() {
  const features = [
    {
      icon: <Share2 className="h-6 w-6" />,
      title: "Seamless Resource Sharing",
      description: "Share previous year questions (PYQs), notes, projects, research papers, and more with your university community effortlessly."
    },
    {
      icon: <Layout className="h-6 w-6" />,
      title: "Personalized Dashboard",
      description: "Manage your uploads, track downloads, and save resources you find helpful, all in your own customized space. Create your own profile to showcase your expertise and let others connect with you directly!"
    },
    {
      icon: <Star className="h-6 w-6" />,
      title: "Custom Collections",
      description: "Create and organize your own categories of resources and collaborate with peers to build a richer collection.",
        locked: true
    },
    {
      icon: <Brain className="h-6 w-6" />,
      title: "AI-Powered Insights",
      description: "Get instant summaries and engage in AI-driven chats on uploaded materials to prepare faster and smarter for your exams.",
      locked: true
    },
    {
      icon: <ThumbsUp className="h-6 w-6" />,
      title: "Resource Rating and Feedback",
      description: "Rate and review resources to help others find the most relevant and high-quality materials."
    },
    {
      icon: <Search className="h-6 w-6" />,
      title: "Enhanced Discoverability",
      description: "Browse a well-categorized library for quick access to the resources you need, including starred top picks."
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  }

  return (
    <div className="bg-gray-900 text-gray-100">
      <main className="container mx-auto px-4 py-12">
        <motion.section
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="text-3xl font-semibold mb-4 text-gray-100">Join Our Open Source Community 🌍</h2>
          <p className="text-xl text-gray-300 mb-8">
            Be a part of this innovative platform! Share your ideas, contribute code, and help shape the future of academic resource sharing.
          </p>
          <Button asChild>
            <a
              href="https://www.sharespace.bio/linkuni/professional"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-lg font-medium text-white hover:scale-105 transition-transform"
            >
              Start Contributing
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </Button>
        </motion.section>

        <motion.h3 
          className="text-3xl font-semibold text-center mb-12 text-gray-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          Features of LinkUni 🌟
        </motion.h3>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 bg-gray-800 cursor-pointer"
              variants={itemVariants}
              whileHover={{ scale: 1.03 }}
            >
              <div className="absolute inset-0 bg-blue-500 opacity-10"></div>
              <div className="relative p-6 z-10">
                <div className="flex items-center mb-4 text-blue-400">
                  {feature.icon}
                  <h4 className="text-xl font-semibold ml-2">{feature.title}</h4>
                </div>
                <p className="text-gray-300">{feature.description}</p>
                {
                    feature.locked && (
                        <div className="absolute top-2 right-2 bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-xs font-semibold flex items-center">
                            <Lock className="w-3 h-3 mr-1" />
                            Coming Soon
                          </div>
                    )
                }
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/5 pointer-events-none"></div>
            </motion.div>
          ))}
        </motion.div>
      </main>
    </div>
  )
}

