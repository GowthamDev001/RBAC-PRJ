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
  Search,
  Bell,
  UserStarIcon,
  Tags,
} from "lucide-react"

import { useLogout } from "@/hooks/useLogout"
import { Separator } from "@/components/ui/separator"
import { ThemeToggle } from "@/components/themes/theme-toggle"
import { useSelector } from "react-redux"
import { useState } from "react"


const NAV_ITEMS = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/articles", label: "Articles", icon: FileText },
  { to: "/profile", label: "Profile", icon: User },
  { to: "/roles", label: "Role", icon: UserStarIcon, adminOnly: true },
  { to: "/category", label: "Category", icon: Tags, adminOnly: true },
]

export default function DashboardLayout() {
  const location = useLocation()
  const logout = useLogout()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const user = useSelector((state: any) => state.auth.user)

  return (
    <div className="flex h-screen overflow-hidden bg-[#0f1117] text-white">

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
            <span className="font-semibold text-base tracking-tight">Ackrock</span>
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
          {NAV_ITEMS
            .filter((item) => {
              if (item.adminOnly) {
                return user?.role?.name === "Admin"
              }
              return true
            })
            .map(({ to, label, icon: Icon }) => {
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
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="flex-shrink-0 sticky top-0 z-10 bg-[#0f1117]/80 backdrop-blur border-b border-white/5 px-4 sm:px-8 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              className="lg:hidden text-white/60 hover:text-white"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-base font-semibold leading-tight">Dashboard</h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-colors">
              <Search className="w-4 h-4" />
            </button>
            <button className="relative w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-colors">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-violet-500" />
            </button>
            <div className="w-9 h-9 rounded-lg bg-violet-500/20 flex items-center justify-center text-violet-400 text-xs font-bold select-none">
              {user?.name?.charAt(0)?.toUpperCase() || "U"}
            </div>
          </div>
        </header>
        <main className="flex-1">
          <Outlet />
        </main>

      </div>
    </div>
  )
}