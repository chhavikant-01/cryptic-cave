import Logo from "./Logo";

export default function Footer() {
    return (
      <footer className="bg-[#020817] text-primary-foreground border-t">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col items-center">
            <div className="mb-4">
              <Logo />
            </div>
            <div className="text-center text-gray-500 text-sm">
              <p>&copy; {new Date().getFullYear()} Link Uni. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    )
  }