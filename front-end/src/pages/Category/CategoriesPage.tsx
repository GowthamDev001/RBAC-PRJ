import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
  createCategory,
  updateCategory,
  deleteCategory,
  getCategories,
} from "@/store/categorySlice"

import {
  Plus,
  Trash2,
  Pencil,
  Search,
  MoreHorizontal,
  ArrowLeft,
  Folder,
  AlertTriangle,
} from "lucide-react"

export default function CategoriesPage() {

  const dispatch: any = useDispatch()
  const navigate = useNavigate()

  const { categories } = useSelector((state: any) => state.categories)
  const user = useSelector((state: any) => state.auth.user)

  const canCreate = user?.role?.can_create
  const canUpdate = user?.role?.can_update
  const canDelete = user?.role?.can_delete

  const [createOpen, setCreateOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)   // ✅ NEW: delete dialog state
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const [editCategory, setEditCategory] = useState<any>(null)

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [search, setSearch] = useState("")

  useEffect(() => {
    dispatch(getCategories())
  }, [dispatch])

  const resetForm = () => {
    setName("")
    setDescription("")
  }

  const handleCreate = () => {
    dispatch(createCategory({ name, description }))
    resetForm()
    setCreateOpen(false)
  }

  const handleEdit = (category: any) => {
    setEditCategory(category)
    setName(category.name)
    setDescription(category.description)
    setEditOpen(true)
  }

  const handleUpdate = () => {
    dispatch(updateCategory({
      id: editCategory.id,
      name,
      description,
    }))
    resetForm()
    setEditOpen(false)
  }

  // ✅ FIXED: open delete dialog instead of deleting directly
  const handleDeleteClick = (id: string) => {
    setDeleteId(id)
    setDeleteOpen(true)
  }

  // ✅ FIXED: confirm delete handler
  const handleDeleteConfirm = () => {
    if (deleteId) {
      dispatch(deleteCategory(deleteId))
    }
    setDeleteId(null)
    setDeleteOpen(false)
  }

  const filtered = (categories ?? []).filter((c: any) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-[#0f1117] text-white">

      {/* Header */}
      <div className="sticky top-0 bg-[#0f1117]/80 backdrop-blur border-b border-white/5 px-6 py-4 z-10">
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
              <h1 className="font-semibold">Categories</h1>
              <p className="text-xs text-white/40">
                {(categories ?? []).length} total
              </p>
            </div>
          </div>

          {canCreate && (
            <Button
              onClick={() => { resetForm(); setCreateOpen(true) }}
              className="bg-violet-500 hover:bg-violet-400"
            >
              <Plus className="w-4 h-4 mr-1" />
              New Category
            </Button>
          )}

        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-8 space-y-6">

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-3 w-4 h-4 text-white/30" />
          <Input
            placeholder="Search categories..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 bg-[#13151f] border-white/5"
          />
        </div>

        {/* Grid */}
        {filtered.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((category: any) => (
              <Card
                key={category.id}
                className="bg-[#13151f] border border-white/5 hover:border-white/10 transition-colors"
              >
                <CardHeader className="flex flex-row items-start justify-between pb-2 pt-5 px-5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-violet-500/15 flex items-center justify-center flex-shrink-0">
                      <Folder className="w-4 h-4 text-violet-400" />
                    </div>
                    <div>
                      <CardTitle className="text-sm font-semibold text-white leading-tight">
                        {category.name}
                      </CardTitle>
                      <p className="text-[11px] text-white/30 mt-0.5">Category</p>
                    </div>
                  </div>

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
                            onClick={() => handleEdit(category)}
                            className="hover:bg-white/5 cursor-pointer text-white/70 hover:text-white"
                          >
                            <Pencil className="w-4 h-4 mr-2 text-white/40" />
                            Edit
                          </DropdownMenuItem>
                        )}

                        {canDelete && (
                          <DropdownMenuItem
                            onClick={() => handleDeleteClick(category.id)}  // ✅ FIXED
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

                <CardContent className="px-5 pb-5 text-sm text-white/50">
                  {category.description || "No description"}
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Empty State */}
        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-12 h-12 rounded-xl bg-violet-500/10 flex items-center justify-center mb-4">
              <Folder className="w-6 h-6 text-violet-400" />
            </div>
            <p className="text-white/40 text-sm">No categories found</p>
            <p className="text-white/20 text-xs mt-1">Create your first category</p>
          </div>
        )}

      </div>

      {/* ── Create Dialog ── */}
      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent className="bg-[#13151f] border border-white/10">
          <DialogHeader>
            <DialogTitle className="text-white">Create Category</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label className="text-xs text-white/60">Name</Label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-[#0f1117] border-white/10"
              />
            </div>
            <div>
              <Label className="text-xs text-white/60">Description</Label>
              <Input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="bg-[#0f1117] border-white/10"
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="ghost"
              onClick={() => setCreateOpen(false)}
              className="text-white/50 hover:text-white"
            >
              Cancel
            </Button>
            <Button
              onClick={handleCreate}
              className="bg-violet-500 hover:bg-violet-400"
            >
              Create Category
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ── Edit Dialog ── ✅ FIXED: was missing entirely */}
      <Dialog open={editOpen} onOpenChange={(open) => { setEditOpen(open); if (!open) resetForm() }}>
        <DialogContent className="bg-[#13151f] border border-white/10">
          <DialogHeader>
            <DialogTitle className="text-white">Edit Category</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label className="text-xs text-white/60">Name</Label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-[#0f1117] border-white/10"
              />
            </div>
            <div>
              <Label className="text-xs text-white/60">Description</Label>
              <Input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="bg-[#0f1117] border-white/10"
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="ghost"
              onClick={() => { setEditOpen(false); resetForm() }}
              className="text-white/50 hover:text-white"
            >
              Cancel
            </Button>
            <Button
              onClick={handleUpdate}
              className="bg-violet-500 hover:bg-violet-400"
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ── Delete Confirmation Dialog ── ✅ FIXED: was missing entirely */}
      <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <DialogContent className="bg-[#13151f] border border-white/10">
          <DialogHeader>
            <DialogTitle className="text-white flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-400" />
              Delete Category
            </DialogTitle>
          </DialogHeader>

          <p className="text-sm text-white/50">
            Are you sure you want to delete this category? This action cannot be undone.
          </p>

          <DialogFooter>
            <Button
              variant="ghost"
              onClick={() => { setDeleteOpen(false); setDeleteId(null) }}
              className="text-white/50 hover:text-white"
            >
              Cancel
            </Button>
            <Button
              onClick={handleDeleteConfirm}
              className="bg-red-500 hover:bg-red-400 text-white"
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </div>
  )
}