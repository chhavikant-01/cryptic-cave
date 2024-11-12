import { useState } from "react"
import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter, DrawerClose } from "./ui/drawer"
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { Share2 } from "lucide-react";

export default function ShareButton(props) {
  const [copied, setCopied] = useState(false);
  const shareUrl = props.url;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Show hint for 2 seconds
    });
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="ghost" className='flex items-center gap-1'>
            <Share2 className='h-5 w-5' />
        </Button>
      </DrawerTrigger>
      {/* Full-width DrawerContent */}
      <DrawerContent className="w-screen p-8 md:w-3/4 lg:w-1/2 mx-auto shadow-lg rounded-lg">
        <DrawerHeader className="text-center">
          <DrawerTitle className="text-3xl font-bold">Share with your friends!</DrawerTitle>
          <DrawerDescription className="text-lg text-gray-300 mt-2">
            Copy the link or share it with your classmates.
          {copied && <span className="text-sm text-green-600">Copied!</span>}
          </DrawerDescription>
        </DrawerHeader>
        <div className="space-y-6 p-6">
          {/* Copy link section */}
          <div className="flex items-center justify-between rounded-lg border border-gray-300 bg-gray-100 p-4">
            <div className="text-base font-medium text-gray-700 truncate">
              {shareUrl}
            </div>
            <Button onClick={handleCopy} variant="ghost" size="icon" className="bg-[#3c82f6] hover:bg-[#307af3]">
              <CopyIcon className="h-6 w-6" />
              <span className="sr-only">Copy link</span>
            </Button>
          </div>
          
          {/* Social media links with hover effect */}
          {/* <div className="flex justify-center gap-6">
            <a href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`} aria-label="Share on Facebook" prefetch={false} className="hover:scale-105 transition-transform" target="_blank">
              <FacebookIcon className="h-8 w-8 text-[#1877F2]" />
            </a>
            <a href={`https://twitter.com/intent/tweet?url=${shareUrl}`} aria-label="Share on Twitter" prefetch={false} className="hover:scale-105 transition-transform" target="_blank">
              <TwitterIcon className="h-8 w-8 text-[#1DA1F2]" />
            </a>
            <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}`} aria-label="Share on LinkedIn" prefetch={false} className="hover:scale-105 transition-transform" target="_blank">
              <LinkedinIcon className="h-8 w-8 text-[#0077B5]" />
            </a>
            <a
  href={`https://www.instagram.com/?url=${shareUrl}`}  // Modify this URL as needed
  aria-label="Share on Instagram"
  prefetch={false}
  className="hover:scale-105 transition-transform"
  target="_blank"
>
  <InstagramIcon className="h-8 w-8 text-[#E1306C]" />
</a>

          </div> */}
        </div>
        <DrawerFooter className="flex justify-center">
          <DrawerClose asChild>
            <Button variant="outline" className="px-6 py-2 rounded-md">
              Close
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}



function CopyIcon() {
  return (
    <svg

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
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </svg>
  )
}


function FacebookIcon() {
  return (
    <svg

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
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}


function LinkedinIcon() {
  return (
    <svg

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
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}


function InstagramIcon() {
  return (
    <svg

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
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  )
}


function ShareIcon() {
  return (
    <svg

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
      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
      <polyline points="16 6 12 2 8 6" />
      <line x1="12" x2="12" y1="2" y2="15" />
    </svg>
  )
}


function TwitterIcon() {
  return (
    <svg

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
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  )
}