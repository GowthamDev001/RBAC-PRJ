import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

export default function RoleProtectedRoute({ children }: any) {

  const user = useSelector((state: any) => state.auth.user)

  if (!user) return <Navigate to="/" />

  // Only  Admin
  if (user.role?.name !== "Admin") {
    return <Navigate to="/dashboard" />
  }

  return children
}