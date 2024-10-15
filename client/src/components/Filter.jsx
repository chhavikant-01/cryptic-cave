import { useState, useEffect } from 'react'
import { Search, ChevronDown } from 'lucide-react'
import { Input } from "../components/ui/input"
import { Button } from "../components/ui/button"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "../components/ui/select"   
  import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
  } from "../components/ui/command"
  import {
    Calculator,
    Calendar,
    CreditCard,
    Settings,
    Smile,
    User,
  } from "lucide-react"

// Mock data for dropdowns
const programs = ['BTech', 'BSc', 'BBA', 'BA', 'BCom']
const semesters = ['1', '2', '3', '4', '5', '6', '7', '8']
const courses = {
  BTech: ['Computer Science', 'Electrical Engineering', 'Mechanical Engineering', 'Civil Engineering'],
  BSc: ['Physics', 'Chemistry', 'Mathematics', 'Biology'],
  BBA: ['Finance', 'Marketing', 'Human Resources', 'Operations Management'],
  BA: ['English', 'History', 'Psychology', 'Sociology'],
  BCom: ['Accounting', 'Economics', 'Business Law', 'Taxation']
}
const resourceTypes = ['Research Paper', 'PYQ', 'Notes', 'Textbook', 'Lab Manual']
const fileTypes = ['PDF', 'PPT', 'DOC', 'XLSX', 'TXT']

export default function FilterBar() {
  const [searchQuery, setSearchQuery] = useState('')
  const [sortOption, setSortOption] = useState('newest')
  const [selectedProgram, setSelectedProgram] = useState('')
  const [selectedSemester, setSelectedSemester] = useState('')
  const [selectedCourse, setSelectedCourse] = useState('')
  const [selectedResourceType, setSelectedResourceType] = useState('')
  const [selectedFileType, setSelectedFileType] = useState('')
  const [openCourseDialog, setOpenCourseDialog] = useState(false)
  const [filteredCourses, setFilteredCourses] = useState([])

  useEffect(() => {
    if (selectedProgram && courses[selectedProgram]) {
        setSelectedCourse('')
        setFilteredCourses(courses[selectedProgram])
    } else {
      setFilteredCourses([])  // Reset when there's no valid program
    }
  }, [selectedProgram])
  

  const handleCourseSearch = (value) => {
    if (selectedProgram) {
      const filtered = courses[selectedProgram].filter(course => 
        course.toLowerCase().includes(value.toLowerCase())
      )
      setFilteredCourses(filtered)
    }
  }

  return (
    <div className="p-4 space-y-4 bg-[#020817] rounded-lg shadow">
      <div className="flex space-x-2">
        <div className="relative flex-grow">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>
        <Select value={sortOption} onValueChange={setSortOption}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="oldest">Oldest</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-wrap gap-2 justify-center">
        <Select value={selectedProgram} onValueChange={setSelectedProgram}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Program" />
          </SelectTrigger>
          <SelectContent>
            {programs.map((program) => (
              <SelectItem key={program} value={program}>{program}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select 
          value={selectedSemester} 
          onValueChange={setSelectedSemester}
          disabled={!selectedProgram}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Semester" />
          </SelectTrigger>
          <SelectContent>
            {semesters.map((semester) => (
              <SelectItem key={semester} value={semester}>{semester}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={openCourseDialog}
          className="w-[200px] justify-between"
          disabled={!selectedSemester}
          onClick={() => setOpenCourseDialog(true)}
        >
          {selectedCourse || "Select Course"}
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>

        <CommandDialog open={openCourseDialog} onOpenChange={setOpenCourseDialog}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem>
              <Calendar className="mr-2 h-4 w-4" />
              <span>Calendar</span>
            </CommandItem>
            <CommandItem>
              <Smile className="mr-2 h-4 w-4" />
              <span>Search Emoji</span>
            </CommandItem>
            <CommandItem>
              <Calculator className="mr-2 h-4 w-4" />
              <span>Calculator</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Settings">
            <CommandItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
              <CommandShortcut>⌘P</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <CreditCard className="mr-2 h-4 w-4" />
              <span>Billing</span>
              <CommandShortcut>⌘B</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
              <CommandShortcut>⌘S</CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>


        <Select value={selectedResourceType} onValueChange={setSelectedResourceType}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Resource Type" />
          </SelectTrigger>
          <SelectContent>
            {resourceTypes.map((type) => (
              <SelectItem key={type} value={type}>{type}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedFileType} onValueChange={setSelectedFileType}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="File Type" />
          </SelectTrigger>
          <SelectContent>
            {fileTypes.map((type) => (
              <SelectItem key={type} value={type}>{type}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}