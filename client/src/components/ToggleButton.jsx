import { useState } from "react"


export default function Toggle() {
  const [activeView, setActiveView] = useState("explore")
  return (
    <div className="flex items-center justify-center">
      <div className="relative inline-flex h-10 w-48 rounded-full bg-[#1e293b] p-1">
        <div
          className={`absolute left-1 h-8 w-[calc(50%-0.25rem)] rounded-full bg-[#4c6ef5] transition-transform duration-300 ${
            activeView === "explore" ? "translate-x-0" : "translate-x-full"
          }`}
        />
        <button
          type="button"
          className={`relative z-10 ${
            activeView === "explore" ? "bg-[#4c6ef5] text-white" : "bg-transparent text-[#495057]"
          } flex-1 rounded-full py-1.5 text-base transition-colors duration-300 focus:outline-none focus-visible:ring-1 focus-visible:ring-ring`}
          onClick={() => setActiveView("explore")}
        >
          <span className={`${activeView === "explore" ? "text-white" : "text-[#e0e0e0]"}`}>Explore</span>
        </button>
        <button
          type="button"
          className={`relative z-10 ${
            activeView === "organized" ? "bg-[#4c6ef5] text-white" : "bg-transparent text-[#495057]"
          } flex-1 rounded-full py-1.5 text-base transition-colors duration-300 focus:outline-none focus-visible:ring-1 focus-visible:ring-ring`}
          onClick={() => setActiveView("organized")}
        >
          <span className={`${activeView === "organized" ? "text-white" : "text-[#e0e0e0]"}`}>Organised</span>
        </button>
      </div>
    </div>
  )
}