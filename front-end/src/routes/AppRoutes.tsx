import { BrowserRouter, Routes, Route } from "react-router-dom"
import LoginPage from "../pages/login/LoginPage"
import CreateArticle from "../pages/Articles/CreateArticle"
import ProfilePage from "../pages/Profile/ProfilePage"
import ArticleList from "../pages/Articles/ArticleList"
import DashboardPage from "@/pages/Dashboard/DashboardPage"
import RegisterPage from "@/pages/Register/RegisterPage"
import ProtectedRoute from "./ProtectedRoute"

function AppRoutes() {

  return (

    <BrowserRouter>

      <Routes>

        {/* Public Routes */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected Routes */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/articles"
          element={
            <ProtectedRoute>
              <ArticleList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/articles/create"
          element={
            <ProtectedRoute>
              <CreateArticle />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />

      </Routes>

    </BrowserRouter>

  )

}

export default AppRoutes