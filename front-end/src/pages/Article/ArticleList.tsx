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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import {
  Pencil,
  Trash2,
  ArrowLeft,
  Plus,
  Search,
  CalendarDays,
  MoreHorizontal,
} from "lucide-react"
import { getCategories } from "@/store/categorySlice"

import { useArticles } from "@/hooks/articles/useArticles"
import { useCreateArticle } from "@/hooks/articles/useCreateArticle"
import { useUpdateArticle } from "@/hooks/articles/useUpdateArticle"
import { useDeleteArticle } from "@/hooks/articles/useDeleteArticle"

import CustomScrollbar from "@/utils/CustomScrollbar"
import { showError, showSuccess } from "@/utils/notification"

type Status = "published" | "draft"


// ─── Skeleton Card ────────────────────────────────────────────────────────────

function ArticleCardSkeleton() {
  return (
    <Card className="bg-[#13151f] border border-white/5">
      <CardHeader className="flex flex-row justify-between items-start gap-2">
        <Skeleton className="h-4 w-3/4 bg-white/10 rounded-lg" />
        <Skeleton className="h-7 w-7 bg-white/10 rounded-lg shrink-0" />
      </CardHeader>
      <CardContent className="space-y-3">
        <Skeleton className="h-3 w-full bg-white/10 rounded" />
        <Skeleton className="h-3 w-5/6 bg-white/10 rounded" />
        <Skeleton className="h-3 w-4/6 bg-white/10 rounded" />
        <div className="flex justify-between items-center pt-1">
          <Skeleton className="h-3 w-20 bg-white/10 rounded" />
          <Skeleton className="h-5 w-16 bg-white/10 rounded-full" />
        </div>
      </CardContent>
    </Card>
  )
}


// ─── Status Toggle ────────────────────────────────────────────────────────────

function StatusToggle({
  status,
  setStatus,
}: {
  status: Status
  setStatus: (s: Status) => void
}) {
  return (
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
}


// ─── Category Select ──────────────────────────────────────────────────────────

function CategorySelect({
  categoryId,
  setCategoryId,
  categories,
}: {
  categoryId: string
  setCategoryId: (id: string) => void
  categories: any[]
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs font-medium text-white/60">Category</Label>
      <Select value={categoryId} onValueChange={setCategoryId}>
        <SelectTrigger className="!bg-[#0f1117] border-white/10 text-white rounded-xl h-10 focus:ring-violet-500/50">
          <SelectValue placeholder="Select a category" />
        </SelectTrigger>
        <SelectContent className="bg-[#1a1d2a] border border-white/10 text-white">
          {categories?.length > 0 ? (
            categories.map((cat: any) => (
              <SelectItem
                key={cat.id}
                value={String(cat.id)}
                className="hover:bg-white/5 focus:bg-white/5 cursor-pointer text-white/80 hover:text-white"
              >
                {cat.name}
              </SelectItem>
            ))
          ) : (
            <div className="px-3 py-2 text-xs text-white/30">
              No categories available
            </div>
          )}
        </SelectContent>
      </Select>
    </div>
  )
}



function FormFields({
  title,
  setTitle,
  content,
  setContent,
  status,
  setStatus,
  categoryId,
  setCategoryId,
  categories,
  showCategory = false,
}: any) {
  return (
    <div className="space-y-3 py-1">
      <div className="space-y-1.5">
        <Label className="text-xs font-medium text-white/60">Title</Label>
        <Input
          placeholder="Article title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="!bg-[#0f1117] border-white/10 text-white placeholder:text-white/20 rounded-xl h-10 focus-visible:ring-violet-500/50"
        />
      </div>

      <div className="space-y-1.5">
        <Label className="text-xs font-medium text-white/60">Content</Label>
        <Textarea
          placeholder="Write your content here…"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={5}
          className="!bg-[#0f1117] border-white/10 text-white placeholder:text-white/20 rounded-xl resize-none focus-visible:ring-violet-500/50"
        />
      </div>

      {showCategory && (
        <CategorySelect
          categoryId={categoryId}
          setCategoryId={setCategoryId}
          categories={categories}
        />
      )}

      <StatusToggle status={status} setStatus={setStatus} />
    </div>
  )
}




export default function ArticlesPage() {
  const dispatch: any = useDispatch()
  const navigate = useNavigate()
  const [page, setPage] = useState(1);
  const limit = 6
  const { data, isLoading } = useArticles(page, limit);
  const articles = data?.data ?? [];
  const totalPages = data?.totalPages ?? 1;
  const createArticleMutation = useCreateArticle()
  const updateArticleMutation = useUpdateArticle()
  const deleteArticleMutation = useDeleteArticle()

  const user = useSelector((state: any) => state.auth.user)
  const { categories } = useSelector((state: any) => state.categories)

  const canCreate = user?.role?.can_create
  const canUpdate = user?.role?.can_update
  const canDelete = user?.role?.can_delete

  const [editOpen, setEditOpen] = useState(false)
  const [createOpen, setCreateOpen] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [editArticle, setEditArticle] = useState<any>(null)

  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [status, setStatus] = useState<Status>("published")
  const [search, setSearch] = useState("")
  const [categoryId, setCategoryId] = useState("")

  useEffect(() => {
    dispatch(getCategories())
  }, [dispatch])

  const resetForm = () => {
    setTitle("")
    setContent("")
    setStatus("published")
    setCategoryId("")
  }


  const handleDelete = (id: string) => {
    if (!canDelete) return

    deleteArticleMutation.mutate(id, {
      onSuccess: (res: any) => {
        showSuccess(res?.message || "Article deleted successfully")
        setDeleteId(null)
      },

      onError: (err: any) => {
        showError(
          err?.response?.data?.message ||
          err?.message ||
          "Failed to delete article"
        )
      },
    })
  }

  const handleEdit = (article: any) => {
    if (!canUpdate) return

    setEditArticle(article)
    setTitle(article.title)
    setContent(article.content)
    setStatus(article.status ?? "published")
    setCategoryId(article.category_id ? String(article.category_id) : "")
    setEditOpen(true)
  }

  const handleUpdate = () => {
    if (!canUpdate || !editArticle) return

    if (!title.trim()) {
      showError("Title is required")
      return
    }

    if (!categoryId) {
      showError("Category is required")
      return
    }

    updateArticleMutation.mutate(
      { id: editArticle.id, title, content, status, category_id: categoryId },
      {
        onSuccess: (res: any) => {
          showSuccess(res?.message)
          setEditOpen(false)
          resetForm()
        },

        onError: (err: any) => {
          showError(
            err?.response?.data?.message ||
            err?.message ||
            "Failed to update article"
          )
        },
      }
    )
  }

  const handleCreate = () => {
    if (!canCreate) return

    if (!title.trim()) {
      showError("Title is required")
      return
    }

    if (!categoryId) {
      showError("Category is required")
      return
    }

    createArticleMutation.mutate(
      { title, content, status, category_id: categoryId },
      {
        onSuccess: (res: any) => {
          showSuccess(res?.message)
          setCreateOpen(false)
          resetForm()
        },

        onError: (err: any) => {
          showError(
            err?.response?.data?.message ||
            err?.message ||
            "Failed to create article"
          )
        },
      }
    )
  }

  const openCreate = () => {
    resetForm()
    setCreateOpen(true)
  }

  const filtered = (articles ?? []).filter((a: any) =>
    a.title?.toLowerCase().includes(search.toLowerCase())
  )

  const categoryMap = Object.fromEntries(
    (categories || []).map((c: any) => [String(c.id), c.name])
  )

  return (
    <div className="h-screen overflow-hidden bg-[#0f1117] text-white">

      <div className="sticky top-0 bg-[#0f1117]/80 backdrop-blur border-b border-white/5 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/dashboard")}
              className="text-white/50 hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="font-semibold">Articles</h1>
              <p className="text-xs text-white/40">
                {isLoading ? "Loading..." : `${articles?.length ?? 0} total`}
              </p>
            </div>
          </div>

          {canCreate && (
            <Button onClick={openCreate} className="bg-violet-500 hover:bg-violet-400">
              <Plus className="w-4 h-4 mr-1" />
              New Article
            </Button>
          )}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8 space-y-6">

        <div className="relative">
          <Search className="absolute left-3 top-3 w-4 h-4 text-white/30" />
          <Input
            placeholder="Search articles..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 bg-[#13151f] border-white/5"
          />
        </div>

        <CustomScrollbar style={{ height: "calc(100vh - 150px)" }}>


          {isLoading && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <ArticleCardSkeleton key={i} />
              ))}
            </div>
          )}


          {!isLoading && filtered.length > 0 && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((article: any) => {
                const isDraft = article.status === "draft"
                return (
                  <Card key={article.id} className="bg-[#13151f] border border-white/5">
                    <CardHeader className="flex flex-row justify-between">
                      <CardTitle className="text-sm">{article.title}</CardTitle>

                      {(canUpdate || canDelete) && (
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="text-white/30 hover:text-white -mt-1 -mr-1"
                            >
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="bg-[#1a1d2a] border border-white/10 text-white shadow-xl">
                            {canUpdate && (
                              <DropdownMenuItem
                                onClick={() => handleEdit(article)}
                                className="hover:bg-white/5 cursor-pointer text-white/70 hover:text-white"
                              >
                                <Pencil className="w-4 h-4 mr-2 text-white/40" />
                                Edit
                              </DropdownMenuItem>
                            )}
                            {canDelete && (
                              <DropdownMenuItem
                                onClick={() => setDeleteId(article.id)}
                                className="hover:bg-red-500/10 cursor-pointer text-red-400"
                              >
                                <Trash2 className="w-4 h-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      )}
                    </CardHeader>

                    <CardContent>
                      <p className="text-xs text-white/40 line-clamp-3">{article.content}</p>
                      <div className="flex justify-between mt-4">
                        <span className="text-xs text-white/25 flex items-center gap-1">
                          <CalendarDays className="w-3 h-3" />
                          {new Date(article.created_at).toLocaleDateString()}
                        </span>
                        <div className="flex gap-2">
                          {article.category_id && categoryMap[article.category_id] && (
                            <Badge className="bg-violet-500/10 text-violet-400">
                              {categoryMap[article.category_id]}
                            </Badge>
                          )}
                          <Badge
                            className={
                              isDraft
                                ? "bg-amber-500/10 text-amber-400"
                                : "bg-emerald-500/10 text-emerald-400"
                            }
                          >
                            {isDraft ? "Draft" : "Published"}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}

            </div>
          )}
          <div className="flex justify-center mt-6 gap-2">

            <Button
              variant="outline"
              disabled={page === 1}
              onClick={() => setPage((prev) => prev - 1)}
            >
              Prev
            </Button>

            {Array.from({ length: totalPages }, (_, i) => (
              <Button
                key={i}
                variant={page === i + 1 ? "default" : "outline"}
                onClick={() => setPage(i + 1)}
              >
                {i + 1}
              </Button>
            ))}

            <Button
              variant="outline"
              disabled={page === totalPages}
              onClick={() => setPage((prev) => prev + 1)}
            >
              Next
            </Button>

          </div>


          {!isLoading && filtered.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 text-white/20">
              <Search className="w-8 h-8 mb-3" />
              <p className="text-sm">No articles found</p>
            </div>
          )}

        </CustomScrollbar>
      </div>


      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent className="bg-[#13151f]">
          <DialogHeader>
            <DialogTitle>New Article</DialogTitle>
          </DialogHeader>
          <FormFields
            title={title}
            setTitle={setTitle}
            content={content}
            setContent={setContent}
            status={status}
            setStatus={setStatus}
            categoryId={categoryId}
            setCategoryId={setCategoryId}
            categories={categories}
            showCategory={true}
          />
          <DialogFooter>
            <Button variant="ghost" onClick={() => setCreateOpen(false)}>Cancel</Button>
            <Button
              onClick={handleCreate}
              disabled={createArticleMutation.isPending}
            >
              {createArticleMutation.isPending
                ? "Saving..."
                : status === "draft" ? "Save Draft" : "Publish"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>


      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="bg-[#13151f]">
          <DialogHeader>
            <DialogTitle>Edit Article</DialogTitle>
          </DialogHeader>
          <FormFields
            title={title}
            setTitle={setTitle}
            content={content}
            setContent={setContent}
            status={status}
            setStatus={setStatus}
            categoryId={categoryId}
            setCategoryId={setCategoryId}
            categories={categories}
            showCategory={true}
          />
          <DialogFooter>
            <Button variant="ghost" onClick={() => setEditOpen(false)}>Cancel</Button>
            <Button
              onClick={handleUpdate}
              disabled={updateArticleMutation.isPending}
            >
              {updateArticleMutation.isPending ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <DialogContent className="bg-[#13151f]">
          <DialogHeader>
            <DialogTitle>Delete Article?</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-white/50">
            This action cannot be undone. The article will be permanently removed.
          </p>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setDeleteId(null)}>Cancel</Button>
            <Button
              onClick={() => handleDelete(deleteId!)}
              disabled={deleteArticleMutation.isPending}
              className="bg-red-500 hover:bg-red-400"
            >
              {deleteArticleMutation.isPending ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </div>
  )
}