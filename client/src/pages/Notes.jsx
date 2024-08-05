import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem } from "../components/ui/dropdown-menu"
import { Button } from "../components/ui/button"
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "../components/ui/collapsible"
import { Label } from "../components/ui/label"
import { Checkbox } from "../components/ui/checkbox"
import HomeCard from "../components/HomeCard"
import { Input } from "../components/ui/input"
import Toggle from "../components/ToggleButton"
import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationLink, PaginationNext } from "../components/ui/pagination"
import { useSelector } from "react-redux"

export default function Notes() {
  
  const currentPosts = useSelector((state) => state.posts.posts);

  return (
    <div className="container mx-auto px-4 md:px-6 py-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
        <div className="grid gap-4">
          <div className="flex gap-4">
             <h1 className="text-2xl font-bold">Filter Resources</h1>
            <Toggle />
          </div>
          <div>
            <p className="text-muted-foreground">Refine your search by applying various filters.</p>
          </div>
         
        </div>
       {/* Search bar */} 
        <div className="flex items-center w-full max-w-md rounded-md bg-background border border-input focus-within:border-primary focus-within:ring-1 focus-within:ring-primary">
      <div className="pl-3 text-muted-foreground">
        <SearchIcon className="w-5 h-5" />
      </div>
      <Input
        type="search"
        placeholder="Search..."
        className="w-full py-2 pl-2 pr-10 text-sm bg-transparent border-none focus:outline-none"
      />
      <Button variant="ghost" size="icon" className="p-2 text-muted-foreground hover:bg-muted/50 rounded-md">
        <XIcon className="w-5 h-5" />
        <span className="sr-only">Clear search</span>
      </Button>
    </div>
         {/* Sort dropdown  */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="shrink-0">
              <ListOrderedIcon className="w-4 h-4 mr-2" />
              Sort
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[200px]">
            <DropdownMenuRadioGroup value="relevance">
              <DropdownMenuRadioItem value="relevance">Relevance</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="newest">Newest</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="oldest">Oldest</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="a-z">A-Z</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="z-a">Z-A</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="grid md:grid-cols-[240px_1fr] gap-8">
        <div className="flex flex-col gap-4">
          <Collapsible className="space-y-2">
            <div className="flex items-center justify-between space-x-4 px-4">
              <h4 className="text-sm font-semibold">Semester</h4>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="sm">
                  <ChevronDownIcon className="w-4 h-4" />
                  <span className="sr-only">Toggle</span>
                </Button>
              </CollapsibleTrigger>
            </div>
            <CollapsibleContent className="rounded-md border px-4 py-2 font-mono text-sm shadow-sm">
              <div className="grid gap-2">
                <Label className="flex items-center gap-2 font-normal">
                  <Checkbox id="semester-1" /> Semester 1
                </Label>
                <Label className="flex items-center gap-2 font-normal">
                  <Checkbox id="semester-2" /> Semester 2
                </Label>
                <Label className="flex items-center gap-2 font-normal">
                  <Checkbox id="semester-3" /> Semester 3
                </Label>
                <Label className="flex items-center gap-2 font-normal">
                  <Checkbox id="semester-4" /> Semester 4
                </Label>
              </div>
            </CollapsibleContent>
          </Collapsible>
          <Collapsible className="space-y-2">
            <div className="flex items-center justify-between space-x-4 px-4">
              <h4 className="text-sm font-semibold">Course</h4>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="sm">
                  <ChevronDownIcon className="w-4 h-4" />
                  <span className="sr-only">Toggle</span>
                </Button>
              </CollapsibleTrigger>
            </div>
            
            <CollapsibleContent className="rounded-md border px-4 py-2 font-mono text-sm shadow-sm">
              <div className="grid gap-2">
                <Label className="flex items-center gap-2 font-normal">
                  <Checkbox id="course-1" /> Computer Science
                </Label>
                <Label className="flex items-center gap-2 font-normal">
                  <Checkbox id="course-2" /> Mathematics
                </Label>
                <Label className="flex items-center gap-2 font-normal">
                  <Checkbox id="course-3" /> Physics
                </Label>
                <Label className="flex items-center gap-2 font-normal">
                  <Checkbox id="course-4" /> Chemistry
                </Label>
              </div>
              </CollapsibleContent>
            
          </Collapsible>
          <Collapsible className="space-y-2">
            <div className="flex items-center justify-between space-x-4 px-4">
              <h4 className="text-sm font-semibold">Program</h4>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="sm">
                  <ChevronDownIcon className="w-4 h-4" />
                  <span className="sr-only">Toggle</span>
                </Button>
              </CollapsibleTrigger>
            </div>
            <CollapsibleContent className="rounded-md border px-4 py-2 font-mono text-sm shadow-sm">
              <div className="grid gap-2">
                <Label className="flex items-center gap-2 font-normal">
                  <Checkbox id="program-1" /> Bachelor of Science (B.Sc.)
                </Label>
                <Label className="flex items-center gap-2 font-normal">
                  <Checkbox id="program-2" /> Bachelor of Engineering (B.E.)
                </Label>
                <Label className="flex items-center gap-2 font-normal">
                  <Checkbox id="program-3" /> Master of Science (M.Sc.)
                </Label>
                <Label className="flex items-center gap-2 font-normal">
                  <Checkbox id="program-4" /> Master of Engineering (M.E.)
                </Label>
              </div>
              </CollapsibleContent>
            
          </Collapsible>
          <Collapsible className="space-y-2">
            <div className="flex items-center justify-between space-x-4 px-4">
              <h4 className="text-sm font-semibold">File Type</h4>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="sm">
                  <ChevronDownIcon className="w-4 h-4" />
                  <span className="sr-only">Toggle</span>
                </Button>
              </CollapsibleTrigger>
            </div>
            <CollapsibleContent className="rounded-md border px-4 py-2 font-mono text-sm shadow-sm">
              <div className="grid gap-2">
                <Label className="flex items-center gap-2 font-normal">
                  <Checkbox id="file-type-pdf" /> PDF
                </Label>
                <Label className="flex items-center gap-2 font-normal">
                  <Checkbox id="file-type-doc" /> DOC
                </Label>
                <Label className="flex items-center gap-2 font-normal">
                  <Checkbox id="file-type-pptx" /> PPTX
                </Label>
              </div>
            </CollapsibleContent>
          </Collapsible>
          <Collapsible className="space-y-2">
            <div className="flex items-center justify-between space-x-4 px-4">
              <h4 className="text-sm font-semibold">Resource Type</h4>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="sm">
                  <ChevronDownIcon className="w-4 h-4" />
                  <span className="sr-only">Toggle</span>
                </Button>
              </CollapsibleTrigger>
            </div>
            <CollapsibleContent className="rounded-md border px-4 py-2 font-mono text-sm shadow-sm">
              <div className="grid gap-2">
                <Label className="flex items-center gap-2 font-normal">
                  <Checkbox id="resource-pyq" /> Past Year Questions (PYQ)
                </Label>
                <Label className="flex items-center gap-2 font-normal">
                  <Checkbox id="resource-notes" /> Notes
                </Label>
                <Label className="flex items-center gap-2 font-normal">
                  <Checkbox id="resource-ebook" /> eBook
                </Label>
                <Label className="flex items-center gap-2 font-normal">
                  <Checkbox id="resource-slides" /> Lecture Slides
                </Label>
              </div>
              </CollapsibleContent>
          </Collapsible>
        </div>
        <div className="flex flex-col gap-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentPosts && currentPosts.map((post) => (
                <HomeCard
                  key={post._id}
                  _id={post._id}
                  user={post.author}
                  likes={post.likes.length}
                  likedBy={post.likes}
                  comments={post.comments.length}
                  title={post.title}
                  description={post.desc}
                  thumbnail={post.thumbnail}
                  uploadedAt={post.createdAt} />
              ))}
          </div>
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