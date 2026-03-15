import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Label } from "@/components/ui/label"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
  deleteArticle,
  updateArticle,
  createArticle,
  getArticles,
} from "@/store/articleSlice"

import {
  Pencil,
  Trash2,
  ArrowLeft,
  Plus,
  FileText,
  Search,
  CalendarDays,
  MoreHorizontal,
} from "lucide-react"

type Status = "published" | "draft"

export default function ArticlesPage() {
  const dispatch: any = useDispatch()
  const navigate = useNavigate()

  const { articles, loading } = useSelector((state: any) => state.articles)
  const user = useSelector((state: any) => state.auth.user)

  const isAdmin = user?.role_name === "Admin"
  const isStaff = user?.role_name === "Staff"

  const [editOpen, setEditOpen] = useState(false)
  const [createOpen, setCreateOpen] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [editArticle, setEditArticle] = useState<any>(null)

  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [status, setStatus] = useState<Status>("published")
  const [search, setSearch] = useState("")

  useEffect(() => {
    dispatch(getArticles())
  }, [dispatch])

  const resetForm = () => {
    setTitle("")
    setContent("")
    setStatus("published")
  }

  const handleDelete = (id: string) => {
    if (!isAdmin) return
    dispatch(deleteArticle(id))
    setDeleteId(null)
  }

  const handleEdit = (article: any) => {
    if (!isAdmin) return
    setEditArticle(article)
    setTitle(article.title)
    setContent(article.content)
    setStatus(article.status ?? "published")
    setEditOpen(true)
  }

  const handleUpdate = () => {
    if (!isAdmin) return
    dispatch(updateArticle({ id: editArticle.id, title, content, status }))
    setEditOpen(false)
    resetForm()
  }

  const handleCreate = () => {
    if (!isAdmin && !isStaff) return
    dispatch(createArticle({ title, content, status }))
    setCreateOpen(false)
    resetForm()
  }

  const openCreate = () => {
    if (!isAdmin && !isStaff) return
    resetForm()
    setCreateOpen(true)
  }

  const filtered = (articles ?? []).filter((a: any) =>
    a.title?.toLowerCase().includes(search.toLowerCase())
  )

  // Reusable status toggle
  const StatusToggle = () => (
    <div className="space-y-1.5">
      <Label className="text-xs font-medium text-white/60">Status</Label>
      <div className="flex gap-2">
        {(["published", "draft"] as Status[]).map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setStatus(s)}
            className={`flex-1 py-2 rounded-xl text-xs font-medium border transition-colors
              ${status === s
                ? s === "published"
                  ? "bg-emerald-500/15 border-emerald-500/30 text-emerald-400"
                  : "bg-amber-500/15 border-amber-500/30 text-amber-400"
                : "bg-[#0f1117] border-white/10 text-white/30 hover:text-white/60"
              }`}
          >
            {s === "published" ? "✦ Published" : "✎ Draft"}
          </button>
        ))}
      </div>
    </div>
  )

  // Reusable form body
  const FormFields = () => (
    <div className="space-y-3 py-1">
      <div className="space-y-1.5">
        <Label className="text-xs font-medium text-white/60">Title</Label>
        <Input
          placeholder="Article title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="!bg-[#0f1117] border-white/10 text-white placeholder:text-white/20 rounded-xl h-10
                     focus-visible:ring-violet-500/50 focus-visible:border-violet-500/50"
        />
      </div>
      <div className="space-y-1.5">
        <Label className="text-xs font-medium text-white/60">Content</Label>
        <Textarea
          placeholder="Write your content here…"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={5}
          className="!bg-[#0f1117] border-white/10 text-white placeholder:text-white/20 rounded-xl resize-none
                     focus-visible:ring-violet-500/50 focus-visible:border-violet-500/50"
        />
      </div>
      <StatusToggle />
    </div>
  )

  return (
    <div className="min-h-screen bg-[#0f1117] text-white">

      {/* Topbar */}
      <div className="sticky top-0 z-10 bg-[#0f1117]/80 backdrop-blur border-b border-white/5 px-4 sm:px-8 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/dashboard")}
              className="text-white/50 hover:text-white hover:bg-white/5 rounded-lg h-9 w-9"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-base font-semibold leading-tight">Articles</h1>
              <p className="text-xs text-white/40">
                {loading ? "Loading…" : `${articles?.length ?? 0} total`}
              </p>
            </div>
          </div>

          {(isAdmin || isStaff) && (
            <Button
              onClick={openCreate}
              className="bg-violet-500 hover:bg-violet-400 text-white text-sm font-medium px-4 h-9 rounded-lg gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">New Article</span>
            </Button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-8 space-y-6">

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
          <Input
            placeholder="Search articles…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 !bg-[#13151f] border-white/5 text-white placeholder:text-white/30 rounded-xl h-10
                       focus-visible:ring-violet-500/50"
          />
        </div>

        {/* Skeleton */}
        {loading && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-[#13151f] border border-white/5 rounded-xl p-5 space-y-3">
                <Skeleton className="h-4 w-3/4 bg-white/5" />
                <Skeleton className="h-3 w-full bg-white/5" />
                <Skeleton className="h-3 w-2/3 bg-white/5" />
              </div>
            ))}
          </div>
        )}

        {/* Empty */}
        {!loading && filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-4">
              <FileText className="w-6 h-6 text-white/20" />
            </div>
            <p className="text-sm font-medium text-white/50">No articles found</p>
            <p className="text-xs text-white/25 mt-1">
              {search ? "Try a different search term" : "Create your first article to get started"}
            </p>
          </div>
        )}

        {/* Grid */}
        {!loading && filtered.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((article: any) => {
              const isDraft = article.status === "draft"
              return (
                <Card
                  key={article.id}
                  className="bg-[#13151f] border border-white/5 rounded-xl shadow-none hover:border-white/10 transition-colors group flex flex-col"
                >
                  <CardHeader className="px-5 pt-5 pb-3 flex flex-row items-start justify-between gap-2">
                    <CardTitle className="text-sm font-semibold text-white/90 leading-snug line-clamp-2 flex-1">
                      {article.title}
                    </CardTitle>

                    {isAdmin && (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-7 w-7 text-white/30 hover:text-white hover:bg-white/5 rounded-lg flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="end"
                          className="bg-[#1e2030] border-white/10 text-white text-sm"
                        >
                          <DropdownMenuItem
                            onClick={() => handleEdit(article)}
                            className="flex items-center gap-2 cursor-pointer hover:bg-white/5 focus:bg-white/5"
                          >
                            <Pencil className="w-3.5 h-3.5 text-violet-400" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => setDeleteId(article.id)}
                            className="flex items-center gap-2 cursor-pointer text-red-400 hover:bg-red-500/10 focus:bg-red-500/10"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                  </CardHeader>

                  <CardContent className="px-5 pb-5 flex-1 flex flex-col justify-between gap-4">
                    <p className="text-xs text-white/40 line-clamp-3 leading-relaxed">
                      {article.content}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-[10px] text-white/25">
                        <CalendarDays className="w-3 h-3" />
                        {new Date(article.created_at).toLocaleDateString("en-US", {
                          month: "short", day: "numeric", year: "numeric",
                        })}
                      </div>
                      <Badge
                        className={`text-[10px] px-2 py-0.5 rounded-full border-0 font-medium
                          ${isDraft
                            ? "bg-amber-500/10 text-amber-400"
                            : "bg-emerald-500/10 text-emerald-400"
                          }`}
                      >
                        {isDraft ? "Draft" : "Published"}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}
      </div>

      {/* ── Create Dialog ── */}
      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent className="bg-[#13151f] border border-white/10 text-white rounded-2xl sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-base font-semibold">New Article</DialogTitle>
          </DialogHeader>
          <FormFields />
          <DialogFooter className="gap-2">
            <Button
              variant="ghost"
              onClick={() => setCreateOpen(false)}
              className="text-white/50 hover:text-white hover:bg-white/5 rounded-lg"
            >
              Cancel
            </Button>
            <Button
              onClick={handleCreate}
              disabled={!title.trim()}
              className="bg-violet-500 hover:bg-violet-400 text-white rounded-lg"
            >
              {status === "draft" ? "Save Draft" : "Publish"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ── Edit Dialog ── */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="bg-[#13151f] border border-white/10 text-white rounded-2xl sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-base font-semibold">Edit Article</DialogTitle>
          </DialogHeader>
          <FormFields />
          <DialogFooter className="gap-2">
            <Button
              variant="ghost"
              onClick={() => setEditOpen(false)}
              className="text-white/50 hover:text-white hover:bg-white/5 rounded-lg"
            >
              Cancel
            </Button>
            <Button
              onClick={handleUpdate}
              disabled={!title.trim()}
              className="bg-violet-500 hover:bg-violet-400 text-white rounded-lg"
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ── Delete Confirm Dialog ── */}
      <Dialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <DialogContent className="bg-[#13151f] border border-white/10 text-white rounded-2xl sm:max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-base font-semibold">Delete Article?</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-white/50 pb-2">
            This action cannot be undone. The article will be permanently removed.
          </p>
          <DialogFooter className="gap-2">
            <Button
              variant="ghost"
              onClick={() => setDeleteId(null)}
              className="text-white/50 hover:text-white hover:bg-white/5 rounded-lg"
            >
              Cancel
            </Button>
            <Button
              onClick={() => handleDelete(deleteId!)}
              className="bg-red-500 hover:bg-red-400 text-white rounded-lg"
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </div>
  )
}