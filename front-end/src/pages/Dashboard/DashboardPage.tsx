import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

import { getArticles } from "@/store/articleSlice"
import { getCategories } from "@/store/categorySlice"
import { getRoles } from "@/store/roleSlice"

import {
  TrendingUp,
  BookOpen,
  PenLine,
  Folder,
  ShieldCheck
} from "lucide-react"

export default function DashboardPage() {

  const dispatch: any = useDispatch()

  const articles = useSelector((state: any) => state.articles.articles || [])
  const categories = useSelector((state: any) => state.categories.categories || [])
  const roles = useSelector((state: any) => state.roles.roles || [])

  useEffect(() => {
    dispatch(getArticles())
    dispatch(getCategories())
    dispatch(getRoles())
  }, [dispatch])

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
      value: articles.filter((a: any) => a.status === "published").length,
      change: "Published articles",
      positive: true,
      icon: TrendingUp,
      accent: "bg-emerald-500/10 text-emerald-500",
    },

    {
      label: "Drafts",
      value: articles.filter((a: any) => a.status === "draft").length,
      change: "Draft articles",
      positive: false,
      icon: PenLine,
      accent: "bg-amber-500/10 text-amber-500",
    },

    {
      label: "Categories",
      value: categories.length,
      change: "Total categories",
      positive: true,
      icon: Folder,
      accent: "bg-blue-500/10 text-blue-500",
    },

    {
      label: "Roles",
      value: roles.length,
      change: "Total roles",
      positive: true,
      icon: ShieldCheck,
      accent: "bg-pink-500/10 text-pink-500",
    },

  ]

  return (

    <div className="px-4 sm:px-8 py-8 space-y-8">

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">

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

              <p className="text-3xl font-bold tracking-tight text-white">
                {value}
              </p>

              <p className={`text-xs mt-1 ${positive ? "text-emerald-400" : "text-amber-400"}`}>
                {change}
              </p>

            </CardContent>

          </Card>

        ))}

      </div>

    </div>

  )
}