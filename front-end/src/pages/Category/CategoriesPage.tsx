import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"

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
  MoreHorizontal
} from "lucide-react"

export default function CategoriesPage() {

  const dispatch: any = useDispatch()
  const { categories } = useSelector((state: any) => state.categories)
  const user = useSelector((state: any) => state.auth.user)

  const canCreate = user?.role?.can_create
  const canUpdate = user?.role?.can_update
  const canDelete = user?.role?.can_delete

  const [createOpen, setCreateOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const [editCategory, setEditCategory] = useState<any>(null)

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [search, setSearch] = useState("")

  useEffect(() => {
    dispatch(getCategories())
  }, [])

  const resetForm = () => {
    setName("")
    setDescription("")
  }

  const handleCreate = () => {

    dispatch(createCategory({
      name,
      description
    }))

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
      description
    }))

    resetForm()
    setEditOpen(false)

  }

  const handleDelete = (id: string) => {

    dispatch(deleteCategory(id))
    setDeleteId(null)

  }

  const filtered = categories.filter((c: any) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  )

  return (

    <div className="p-8 space-y-6">

      <div className="flex justify-between">

        <Input
          placeholder="Search categories"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-72"
        />

        {canCreate && (
          <Button onClick={() => setCreateOpen(true)}>
            <Plus className="w-4 h-4 mr-1" />
            New Category
          </Button>
        )}

      </div>

      <div className="grid md:grid-cols-3 gap-4">

        {filtered.map((category: any) => (

          <Card key={category.id}>

            <CardHeader className="flex flex-row justify-between">

              <CardTitle className="text-sm">
                {category.name}
              </CardTitle>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="icon" variant="ghost" className="text-white/30 hover:text-white -mt-1 -mr-1">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-[#1a1d2a] border border-white/10 text-white shadow-xl">
                  <DropdownMenuItem
                    onClick={() => handleEdit(category)}
                    className="hover:bg-white/5 cursor-pointer text-white/70 hover:text-white"
                  >
                    <Pencil className="w-4 h-4 mr-2 text-white/40" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setDeleteId(category.id)}
                    className="hover:bg-red-500/10 cursor-pointer text-red-400"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

            </CardHeader>

            <CardContent className="text-sm text-muted-foreground">

              {category.description}

            </CardContent>

          </Card>

        ))}

      </div>

      {/* CREATE */}
      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent>

          <DialogHeader>
            <DialogTitle>Create Category</DialogTitle>
          </DialogHeader>

          <div className="space-y-3">

            <div>
              <Label>Name</Label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <Label>Description</Label>
              <Input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

          </div>

          <DialogFooter>

            <Button variant="ghost" onClick={() => setCreateOpen(false)}>
              Cancel
            </Button>

            <Button onClick={handleCreate}>
              Create
            </Button>

          </DialogFooter>

        </DialogContent>
      </Dialog>

      {/* EDIT */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent>

          <DialogHeader>
            <DialogTitle>Edit Category</DialogTitle>
          </DialogHeader>

          <div className="space-y-3">

            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <Input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

          </div>

          <DialogFooter>

            <Button variant="ghost" onClick={() => setEditOpen(false)}>
              Cancel
            </Button>

            <Button onClick={handleUpdate}>
              Save
            </Button>

          </DialogFooter>

        </DialogContent>
      </Dialog>

      {/* DELETE */}
      <Dialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <DialogContent>

          <DialogHeader>
            <DialogTitle>Delete Category?</DialogTitle>
          </DialogHeader>

          <DialogFooter>

            <Button variant="ghost" onClick={() => setDeleteId(null)}>
              Cancel
            </Button>

            <Button
              className="bg-red-500"
              onClick={() => handleDelete(deleteId!)}
            >
              Delete
            </Button>

          </DialogFooter>

        </DialogContent>
      </Dialog>

    </div>

  )
}