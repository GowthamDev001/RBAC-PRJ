import { Outlet, Link, useLocation } from "react-router-dom"
import {
  LayoutDashboard,
  FileText,
  User,
  LogOut,
  BookOpen,
  ChevronRight,
  Menu,
  X,
} from "lucide-react"

import { useLogout } from "@/hooks/useLogout"
import { Separator } from "@/components/ui/separator"
import { useState } from "react"

const NAV_ITEMS = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/articles", label: "Articles", icon: FileText },
  { to: "/profile", label: "Profile", icon: User },
]

export default function DashboardLayout() {
  const location = useLocation()
  const logout = useLogout()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-[#0f1117] text-white">

    
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/60 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

     
      <aside
        className={`
          fixed z-30 inset-y-0 left-0 w-64 bg-[#13151f] border-r border-white/5
          flex flex-col py-6 px-4 transition-transform duration-300
          lg:static lg:translate-x-0
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >

     
        <div className="flex items-center justify-between px-2 mb-8">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-violet-500 flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold text-base tracking-tight">
              Ackrock
            </span>
          </div>

          <button
            className="lg:hidden text-white/40 hover:text-white"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

       
        <nav className="flex-1 space-y-1">
          <p className="px-2 text-[10px] font-semibold uppercase tracking-widest text-white/30 mb-3">
            Menu
          </p>

          {NAV_ITEMS.map(({ to, label, icon: Icon }) => {
            const active = location.pathname === to

            return (
              <Link
                key={to}
                to={to}
                onClick={() => setSidebarOpen(false)}
                className={`
                  flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors
                  ${active
                    ? "bg-violet-500/15 text-violet-400"
                    : "text-white/50 hover:text-white hover:bg-white/5"}
                `}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                {label}

                {active && (
                  <ChevronRight className="w-3.5 h-3.5 ml-auto text-violet-400" />
                )}
              </Link>
            )
          })}
        </nav>

        <Separator className="bg-white/5 my-4" />


        <button
          onClick={logout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-white/40 hover:text-red-400 hover:bg-red-500/10 transition-colors w-full text-left"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>

      </aside>

 
      <div className="flex-1 flex flex-col">


        <header className="flex items-center gap-3 h-14 px-4 border-b border-white/5 bg-[#0f1117]">
          <button
            className="lg:hidden text-white/60 hover:text-white"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="w-5 h-5" />
          </button>
          
        </header>

  
        <main className="flex-1">
          <Outlet />
        </main>

      </div>

    </div>
  )
}