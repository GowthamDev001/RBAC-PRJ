import { useState } from "react"
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "sonner"

import { registerUser } from "@/store/authSlice"
import { encryptPayload } from "@/utils/encryption"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"

import { BookOpen, Eye, EyeOff, ShieldCheck } from "lucide-react"

export default function RegisterPage() {

  const dispatch: any = useDispatch()
  const navigate = useNavigate()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)

  const validateRegister = () => {
    if (!name.trim()) { toast.error("Name is required"); return false }
    if (name.length < 3) { toast.error("Name must be at least 3 characters"); return false }
    if (!email.trim()) { toast.error("Email is required"); return false }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) { toast.error("Enter a valid email address"); return false }
    if (!password.trim()) { toast.error("Password is required"); return false }
    if (password.length < 6) { toast.error("Password must be at least 6 characters"); return false }
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateRegister()) return
    setLoading(true)
    const encryptedPassword = encryptPayload(password)
    const result = await dispatch(registerUser({ name, email, password: encryptedPassword, isAdmin }))
    setLoading(false)
    if (registerUser.fulfilled.match(result)) {
      toast.success(result.payload.message || "User created")
      navigate("/")
    } else {
      toast.error(result.payload || "Registration failed")
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#0f1117] px-4">

      {/* Card */}
      <div className="w-full max-w-sm bg-[#13151f] border border-white/5 rounded-2xl p-8 shadow-xl">

        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-10 h-10 rounded-xl bg-violet-500 flex items-center justify-center mb-3">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-lg font-semibold text-white">Create an account</h1>
          <p className="text-xs text-white/40 mt-1">Join Ackrock and start publishing</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>

          {/* Name */}
          <div className="space-y-1.5">
            <Label className="text-xs font-medium text-white/60">Full Name</Label>
            <Input
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-[#0f1117] border-white/10 text-white placeholder:text-white/20 rounded-xl h-10
                         focus-visible:ring-violet-500/50 focus-visible:border-violet-500/50"
            />
          </div>

          {/* Email */}
          <div className="space-y-1.5">
            <Label className="text-xs font-medium text-white/60">Email</Label>
            <Input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-[#0f1117] border-white/10 text-white placeholder:text-white/20 rounded-xl h-10
                         focus-visible:ring-violet-500/50 focus-visible:border-violet-500/50"
            />
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <Label className="text-xs font-medium text-white/60">Password</Label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Min. 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-[#0f1117] border-white/10 text-white placeholder:text-white/20 rounded-xl h-10 pr-10
                           focus-visible:ring-violet-500/50 focus-visible:border-violet-500/50"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4 text-black" /> : <Eye className="w-4 h-4 text-black" />}
              </button>
            </div>
          </div>

          {/* Admin Switch — FIXED */}
          <div
            className={`flex items-center justify-between rounded-xl p-3.5 border transition-colors cursor-pointer
              ${isAdmin
                ? "bg-violet-500/10 border-violet-500/30"
                : "bg-[#0f1117] border-white/10"
              }`}
            onClick={() => setIsAdmin(!isAdmin)}
          >
            <div className="flex items-center gap-2.5">
              <ShieldCheck className={`w-4 h-4 ${isAdmin ? "text-violet-400" : "text-white/30"}`} />
              <div>
                <p className={`text-sm font-medium ${isAdmin ? "text-violet-300" : "text-white/60"}`}>
                  Register as Admin
                </p>
                <p className="text-[10px] text-white/25">Full access to manage content</p>
              </div>
            </div>

            {/* Custom switch — avoids shadcn theme conflicts */}
            <div
              className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors duration-200 flex-shrink-0
                ${isAdmin ? "bg-violet-500" : "bg-white/10"}`}
            >
              <span
                className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow transition-transform duration-200
                  ${isAdmin ? "translate-x-[18px]" : "translate-x-[3px]"}`}
              />
            </div>
          </div>

          {/* Submit */}
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-violet-500 hover:bg-violet-400 text-white font-medium h-10 rounded-xl transition-colors mt-1"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                Creating account…
              </span>
            ) : "Create Account"}
          </Button>

        </form>

        <p className="text-xs text-center text-white/30 mt-6">
          Already have an account?{" "}
          <Link to="/" className="text-violet-400 hover:text-violet-300 font-medium transition-colors">
            Sign in
          </Link>
        </p>

      </div>
    </div>
  )
}