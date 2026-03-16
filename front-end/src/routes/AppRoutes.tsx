import { BrowserRouter, Routes, Route } from "react-router-dom"

import LoginPage from "../pages/login/LoginPage"
import RegisterPage from "../pages/Register/RegisterPage"

// import CreateArticle from "../pages/Article/CreateArticle"
import ProfilePage from "../pages/Profile/ProfilePage"
import ArticleList from "../pages/Article/ArticleList"
import DashboardPage from "../pages/Dashboard/DashboardPage"

import ProtectedRoute from "./ProtectedRoute"
import RoleProtectedRoute from "./RoleProtectedRoute"

import DashboardLayout from "@/components/layouts/DashboardLayout"

import RolesPage from "@/pages/Role/RolesPage"
import CategoriesPage from "@/pages/Category/CategoriesPage"
// import ReviewsPage from "@/pages/Review/ReviewsPage"

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

          {/* <Route path="/articles/create" element={<CreateArticle />} /> */}

          <Route path="/profile" element={<ProfilePage />} />
          <Route
            path="/roles"
            element={
              <RoleProtectedRoute>
                <RolesPage />
              </RoleProtectedRoute>
            }
          />

          <Route
            path="/category"
            element={
              <RoleProtectedRoute>
                <CategoriesPage />
              </RoleProtectedRoute>
            }
          />

          {/* <Route
            path="/review"
            element={
              <RoleProtectedRoute>
                <ReviewsPage />
              </RoleProtectedRoute>
            }
          /> */}

        </Route>

      </Routes>

    </BrowserRouter>

  )
}

export default AppRoutes