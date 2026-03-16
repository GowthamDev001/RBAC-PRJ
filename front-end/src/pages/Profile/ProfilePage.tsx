import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Mail, User, ShieldCheck } from "lucide-react"

export default function ProfilePage() {
  const user = useSelector((state: any) => state.auth.user)
  const navigate = useNavigate()

  if (!user) {
    return (
      <div className="min-h-screen bg-[#0f1117] flex items-center justify-center">
        <p className="text-white/40 text-sm">No user data found</p>
      </div>
    )
  }

  const initials = user.name
    ?.split(" ")
    .map((n: string) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)

  const isAdmin = user.role_name === "Admin"

  return (
    <div className="min-h-screen bg-[#0f1117] text-white">

    
      <div className="sticky top-0 z-10 bg-[#0f1117]/80 backdrop-blur border-b border-white/5 px-4 sm:px-8 py-4">
        <div className="max-w-2xl mx-auto flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/dashboard")}
            className="text-white/50 hover:text-white hover:bg-white/5 rounded-lg h-9 w-9"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-base font-semibold leading-tight">Profile</h1>
            <p className="text-xs text-white/40">Your account details</p>
          </div>
        </div>
      </div>

      
      <div className="max-w-2xl mx-auto px-4 sm:px-8 py-10 space-y-4">

      
        <div className="bg-[#13151f] border border-white/5 rounded-2xl p-6 flex flex-col sm:flex-row items-center sm:items-start gap-5">
          <Avatar className="h-16 w-16 rounded-2xl bg-violet-500/20 text-violet-400 text-xl font-bold flex-shrink-0">
            <AvatarFallback className="bg-violet-500/20 text-violet-400 text-xl font-bold rounded-2xl">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="text-center sm:text-left">
            <h2 className="text-lg font-semibold text-white">{user.name}</h2>
            <p className="text-sm text-white/40 mt-0.5">{user.email}</p>
            <div className="mt-2">
              <Badge
                className={`text-[11px] px-2.5 py-0.5 rounded-full border-0 font-medium
                  ${isAdmin
                    ? "bg-violet-500/15 text-violet-400"
                    : "bg-emerald-500/10 text-emerald-400"
                  }`}
              >
                 {user?.role?.name}
              </Badge>
            </div>
          </div>
        </div>

      
        <div className="bg-[#13151f] border border-white/5 rounded-2xl divide-y divide-white/5 overflow-hidden">

          <div className="flex items-center gap-4 px-5 py-4">
            <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
              <User className="w-4 h-4 text-white/30" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[11px] text-white/30 uppercase tracking-wide font-medium">Full Name</p>
              <p className="text-sm text-white font-medium mt-0.5 truncate">{user.name}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 px-5 py-4">
            <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
              <Mail className="w-4 h-4 text-white/30" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[11px] text-white/30 uppercase tracking-wide font-medium">Email Address</p>
              <p className="text-sm text-white font-medium mt-0.5 truncate">{user.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 px-5 py-4">
            <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-4 h-4 text-white/30" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[11px] text-white/30 uppercase tracking-wide font-medium">Role</p>
              <p className="text-sm text-white font-medium mt-0.5">
                {user?.role?.name}
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  )
}