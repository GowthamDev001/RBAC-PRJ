import { BrowserRouter, Routes, Route } from "react-router-dom"

import LoginPage from "../pages/login/LoginPage"
import RegisterPage from "../pages/Register/RegisterPage"

import CreateArticle from "../pages/Articles/CreateArticle"
import ProfilePage from "../pages/Profile/ProfilePage"
import ArticleList from "../pages/Articles/ArticleList"
import DashboardPage from "../pages/Dashboard/DashboardPage"

import ProtectedRoute from "./ProtectedRoute"
import DashboardLayout from "@/components/layouts/DashboardLayout"

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/articles" element={<ArticleList />} />
          <Route path="/articles/create" element={<CreateArticle />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes