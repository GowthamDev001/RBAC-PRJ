import { useState } from "react"
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "sonner"

import { loginUser } from "@/store/authSlice"
import { encryptPayload } from "@/utils/encryption"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

import { BookOpen, Eye, EyeOff } from "lucide-react"

export default function LoginPage() {

  const dispatch: any = useDispatch()
  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const validateLogin = () => {
    if (!email.trim()) { toast.error("Email is required"); return false }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) { toast.error("Enter a valid email address"); return false }
    if (!password.trim()) { toast.error("Password is required"); return false }
    if (password.length < 6) { toast.error("Password must be at least 6 characters"); return false }
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateLogin()) return
    setLoading(true)
    const encryptedPassword = encryptPayload(password)
    const result = await dispatch(loginUser({ email, password: encryptedPassword }))
    setLoading(false)
    if (loginUser.fulfilled.match(result)) {
      toast.success(result.payload.message || "Login successful")
      localStorage.setItem("token", result.payload.token)
      navigate("/dashboard")
    } else {
      toast.error(result.payload || "Login failed")
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#0f1117] px-4">

      <div className="w-full max-w-sm bg-[#13151f] border border-white/5 rounded-2xl p-8 shadow-xl">

    
        <div className="flex flex-col items-center mb-8">
          <div className="w-10 h-10 rounded-xl bg-violet-500 flex items-center justify-center mb-3">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-lg font-semibold text-white">Welcome back</h1>
          <p className="text-xs text-white/40 mt-1">Sign in to your Ackrock account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>

      
          <div className="space-y-1.5">
            <Label htmlFor="email" className="text-xs font-medium text-white/60">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-[#0f1117] border-white/10 text-white placeholder:text-white/20 rounded-xl h-10
                         focus-visible:ring-violet-500/50 focus-visible:border-violet-500/50"
            />
          </div>

  
          <div className="space-y-1.5">
            <Label htmlFor="password" className="text-xs font-medium text-white/60">
              Password
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Min. 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="!bg-[#0f1117] border-white/10 text-white placeholder:text-white/20 rounded-xl h-10 pr-10
             focus-visible:ring-violet-500/50 focus-visible:border-violet-500/50"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/80 transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4 text-black" /> : <Eye className="w-4 h-4 text-black" />}
              </button>
            </div>
          </div>

        
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-violet-500 hover:bg-violet-400 text-white font-medium h-10 rounded-xl transition-colors mt-1"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                Signing in…
              </span>
            ) : "Sign In"}
          </Button>

        </form>

        <p className="text-xs text-center text-white/30 mt-6">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-violet-400 hover:text-violet-300 font-medium transition-colors"
          >
            Register
          </Link>
        </p>

      </div>
    </div>
  )
}