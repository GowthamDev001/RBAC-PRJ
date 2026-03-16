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




function FormFields({
  title,
  setTitle,
  content,
  setContent,
  status,
  setStatus,
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

      <StatusToggle status={status} setStatus={setStatus} />
    </div>
  )
}




export default function ArticlesPage() {

  const dispatch: any = useDispatch()
  const navigate = useNavigate()

  const { articles, loading } = useSelector((state: any) => state.articles)
  const user = useSelector((state: any) => state.auth.user)




  const canView = user?.role?.can_view
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

  useEffect(() => {
    dispatch(getArticles())
  }, [dispatch])


  const resetForm = () => {
    setTitle("")
    setContent("")
    setStatus("published")
  }


  const handleDelete = (id: string) => {
    if (!canDelete) return
    dispatch(deleteArticle(id))
    setDeleteId(null)
  }


  const handleEdit = (article: any) => {
    if (!canUpdate) return

    setEditArticle(article)
    setTitle(article.title)
    setContent(article.content)
    setStatus(article.status ?? "published")
    setEditOpen(true)
  }


  const handleUpdate = () => {
    if (!canUpdate) return

    dispatch(updateArticle({
      id: editArticle.id,
      title,
      content,
      status
    }))

    setEditOpen(false)
    resetForm()
  }


  const handleCreate = () => {
    if (!canCreate) return

    dispatch(createArticle({
      title,
      content,
      status
    }))

    setCreateOpen(false)
    resetForm()
  }


  const openCreate = () => {
    resetForm()
    setCreateOpen(true)
  }


  const filtered = (articles ?? []).filter((a: any) =>
    a.title?.toLowerCase().includes(search.toLowerCase())
  )


  return (
    <div className="min-h-screen bg-[#0f1117] text-white">



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
                {loading ? "Loading..." : `${articles?.length ?? 0} total`}
              </p>
            </div>

          </div>

          {canCreate && (
            <Button
              onClick={openCreate}
              className="bg-violet-500 hover:bg-violet-400"
            >
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


  

        {!loading && filtered.length > 0 && (

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">

            {filtered.map((article: any) => {

              const isDraft = article.status === "draft"

              return (

                <Card
                  key={article.id}
                  className="bg-[#13151f] border border-white/5"
                >

                  <CardHeader className="flex flex-row justify-between">

                    <CardTitle className="text-sm">
                      {article.title}
                    </CardTitle>


                    {(canUpdate || canDelete) && (
                      <DropdownMenu>

                        <DropdownMenuTrigger asChild>
                          <Button size="icon" variant="ghost">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent
                          className="bg-white text-black border border-gray-200 shadow-lg"
                        >
                          {canUpdate && (
                            <DropdownMenuItem
                              onClick={() => handleEdit(article)}
                              className="hover:bg-gray-100 cursor-pointer"
                            >
                              <Pencil className="w-4 h-4 mr-2 text-gray-600" />
                              Edit
                            </DropdownMenuItem>
                          )}
                          {canDelete && (
                            <DropdownMenuItem
                              onClick={() => setDeleteId(article.id)}
                              className="hover:bg-red-50 text-red-600 cursor-pointer"
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

                    <p className="text-xs text-white/40 line-clamp-3">
                      {article.content}
                    </p>

                    <div className="flex justify-between mt-4">

                      <span className="text-xs text-white/25 flex items-center gap-1">
                        <CalendarDays className="w-3 h-3" />
                        {new Date(article.created_at).toLocaleDateString()}
                      </span>

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

                  </CardContent>

                </Card>

              )

            })}

          </div>

        )}

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
          />

          <DialogFooter>

            <Button variant="ghost" onClick={() => setCreateOpen(false)}>
              Cancel
            </Button>

            <Button onClick={handleCreate}>
              {status === "draft" ? "Save Draft" : "Publish"}
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
          />

          <DialogFooter>

            <Button variant="ghost" onClick={() => setEditOpen(false)}>
              Cancel
            </Button>

            <Button onClick={handleUpdate}>
              Save Changes
            </Button>

          </DialogFooter>

        </DialogContent>

      </Dialog>




      <Dialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>

        <DialogContent className="bg-[#13151f]">

          <DialogHeader>
            <DialogTitle>Delete Article?</DialogTitle>
          </DialogHeader>

          <DialogFooter>

            <Button variant="ghost" onClick={() => setDeleteId(null)}>
              Cancel
            </Button>

            <Button
              onClick={() => handleDelete(deleteId!)}
              className="bg-red-500"
            >
              Delete
            </Button>

          </DialogFooter>

        </DialogContent>

      </Dialog>

    </div>
  )
}