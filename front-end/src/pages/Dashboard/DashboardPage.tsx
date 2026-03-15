import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useLogout } from "@/hooks/useLogout"
import { Link, useLocation } from "react-router-dom"
import {
  LayoutDashboard,
  FileText,
  User,
  LogOut,
  TrendingUp,
  BookOpen,
  PenLine,
  Bell,
  Search,
  ChevronRight,
  Menu,
  X,
} from "lucide-react"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getArticles } from "@/store/articleSlice"
import { ThemeToggle } from "@/components/layouts/theme-toggle"

const NAV_ITEMS = [
  { to: "/articles", label: "Articles", icon: FileText },
  { to: "/profile", label: "Profile", icon: User },
]



export default function DashboardPage() {
  const dispatch: any = useDispatch()
  const logout = useLogout()
  const location = useLocation()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const articles = useSelector((state: any) => state.articles.articles)
  const user = useSelector((state: any) => state.auth.user)

  const stats = [
    {
      label: "Total Articles",
      value: articles.length,
      change: `${articles.length} total`,
      positive: true,
      icon: BookOpen,
      accent: "bg-violet-500/10 text-violet-500",
    },
    {
      label: "Published",
      value: articles.filter((a: any) => a.is_published).length,
      change: "Published articles",
      positive: true,
      icon: TrendingUp,
      accent: "bg-emerald-500/10 text-emerald-500",
    },
    {
      label: "Drafts",
      value: articles.filter((a: any) => !a.is_published).length,
      change: "Draft articles",
      positive: false,
      icon: PenLine,
      accent: "bg-amber-500/10 text-amber-500",
    },
  ]

  useEffect(() => {
    dispatch(getArticles())
  }, [dispatch])

  return (
    <div className="flex min-h-screen bg-[#0f1117] text-white font-sans">

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/60 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed z-30 inset-y-0 left-0 w-64 bg-[#13151f] border-r border-white/5
          flex flex-col py-6 px-4 transition-transform duration-300
          lg:static lg:translate-x-0
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Logo */}
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

        {/* Nav */}
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
                className={`
                  flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors
                  ${active
                    ? "bg-violet-500/15 text-violet-400"
                    : "text-white/50 hover:text-white hover:bg-white/5"
                  }
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

        {/* Logout */}
        <button
          onClick={logout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-white/40 hover:text-red-400 hover:bg-red-500/10 transition-colors w-full text-left"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Topbar */}
        <header className="sticky top-0 z-10 bg-[#0f1117]/80 backdrop-blur border-b border-white/5 px-4 sm:px-8 py-4 flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">
            <button
              className="lg:hidden text-white/50 hover:text-white"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-base font-semibold leading-tight">Articles Dashboard</h1>
              <p className="text-xs text-white/40">Welcome back, manage your content</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle/>
            <button className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-colors">
              <Search className="w-4 h-4" />
            </button>
            <button className="relative w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-colors">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-violet-500" />
            </button>
            <div className="w-9 h-9 rounded-lg bg-violet-500/20 flex items-center justify-center text-violet-400 text-xs font-bold select-none">
               {user?.name?.charAt(0)?.toUpperCase( ) || "U"}

            </div>
          </div>

        </header>

        {/* Content */}
        <main className="flex-1 px-4 sm:px-8 py-8 space-y-8">

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {stats.map(({ label, value, change, positive, icon: Icon, accent }) => (
              <Card
                key={label}
                className="bg-[#13151f] border border-white/5 rounded-xl shadow-none"
              >
                <CardHeader className="flex flex-row items-center justify-between pb-2 pt-5 px-5">
                  <CardTitle className="text-xs font-medium text-white/50 uppercase tracking-wide">
                    {label}
                  </CardTitle>
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${accent}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                </CardHeader>
                <CardContent className="px-5 pb-5">
                  <p className="text-3xl font-bold tracking-tight text-white">{value}</p>
                  <p className={`text-xs mt-1 ${positive ? "text-emerald-400" : "text-amber-400"}`}>
                    {change}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>


        </main>
      </div>
    </div>
  )
}
