import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
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
  createRole,
  updateRole,
  deleteRole,
  getRoles,
} from "@/store/roleSlice"

import {
  Pencil,
  Trash2,
  ArrowLeft,
  Plus,
  Search,
  MoreHorizontal,
  ShieldCheck,
} from "lucide-react"


// ─── Permission Toggle ────────────────────────────────────────────────────────

function PermissionToggle({ label, value, setValue }: any) {
  return (
    <div className="flex items-center justify-between border border-white/10 rounded-xl px-3 py-2.5 bg-[#0f1117]">
      <span className="text-sm text-white/70">{label}</span>
      <button
        onClick={() => setValue(!value)}
        className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
          value
            ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
            : "bg-white/5 text-white/30 border border-white/10 hover:text-white/50"
        }`}
      >
        {value ? "✦ Enabled" : "Disabled"}
      </button>
    </div>
  )
}


// ─── Role Form ────────────────────────────────────────────────────────────────

function RoleForm({
  roleName, setRoleName,
  canView, setCanView,
  canCreate, setCanCreate,
  canUpdate, setCanUpdate,
  canDelete, setCanDelete,
}: any) {
  return (
    <div className="space-y-4 py-1">
      <div className="space-y-1.5">
        <Label className="text-xs font-medium text-white/60">Role Name</Label>
        <Input
          value={roleName}
          onChange={(e) => setRoleName(e.target.value)}
          placeholder="e.g. Editor, Viewer, Admin"
          className="!bg-[#0f1117] border-white/10 text-white placeholder:text-white/20 rounded-xl h-10 focus-visible:ring-violet-500/50"
        />
      </div>

      <div className="space-y-2">
        <Label className="text-xs font-medium text-white/60">Permissions</Label>
        <PermissionToggle label="View" value={canView} setValue={setCanView} />
        <PermissionToggle label="Create" value={canCreate} setValue={setCanCreate} />
        <PermissionToggle label="Update" value={canUpdate} setValue={setCanUpdate} />
        <PermissionToggle label="Delete" value={canDelete} setValue={setCanDelete} />
      </div>
    </div>
  )
}


// ─── Permission Pill ──────────────────────────────────────────────────────────

function PermPill({ label, active }: { label: string; active: boolean }) {
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-lg text-[11px] font-medium border ${
        active
          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
          : "bg-white/5 text-white/25 border-white/10"
      }`}
    >
      {active ? "✦ " : ""}{label}
    </span>
  )
}


// ─── Page ─────────────────────────────────────────────────────────────────────

export default function RolesPage() {
  const dispatch: any = useDispatch()
  const navigate = useNavigate()

  const { roles } = useSelector((state: any) => state.roles)

  const [search, setSearch] = useState("")
  const [createOpen, setCreateOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [editRole, setEditRole] = useState<any>(null)

  const [roleName, setRoleName] = useState("")
  const [canView, setCanView] = useState(false)
  const [canCreate, setCanCreate] = useState(false)
  const [canUpdate, setCanUpdate] = useState(false)
  const [canDelete, setCanDelete] = useState(false)

  useEffect(() => {
    dispatch(getRoles())
  }, [dispatch])

  const resetForm = () => {
    setRoleName("")
    setCanView(false)
    setCanCreate(false)
    setCanUpdate(false)
    setCanDelete(false)
  }

  const handleCreate = () => {
    dispatch(createRole({ role_name: roleName, can_view: canView, can_create: canCreate, can_update: canUpdate, can_delete: canDelete }))
    setCreateOpen(false)
    resetForm()
  }

  const handleEdit = (role: any) => {
    setEditRole(role)
    setRoleName(role.role_name)
    setCanView(role.can_view)
    setCanCreate(role.can_create)
    setCanUpdate(role.can_update)
    setCanDelete(role.can_delete)
    setEditOpen(true)
  }

  const handleUpdate = () => {
    dispatch(updateRole({ id: editRole.id, role_name: roleName, can_view: canView, can_create: canCreate, can_update: canUpdate, can_delete: canDelete }))
    setEditOpen(false)
    resetForm()
  }

  const handleDelete = (id: string) => {
    dispatch(deleteRole(id))
    setDeleteId(null)
  }

  const filtered = (roles ?? []).filter((r: any) =>
    r.role_name.toLowerCase().includes(search.toLowerCase())
  )

  const enabledCount = (role: any) =>
    [role.can_view, role.can_create, role.can_update, role.can_delete].filter(Boolean).length

  return (
    <div className="min-h-screen bg-[#0f1117] text-white">


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
              <h1 className="font-semibold">Roles</h1>
              <p className="text-xs text-white/40">{(roles ?? []).length} total</p>
            </div>
          </div>

          <Button
            onClick={() => { resetForm(); setCreateOpen(true) }}
            className="bg-violet-500 hover:bg-violet-400"
          >
            <Plus className="w-4 h-4 mr-1" />
            New Role
          </Button>

        </div>
      </div>

 
      <div className="max-w-6xl mx-auto px-6 py-8 space-y-6">

        <div className="relative">
          <Search className="absolute left-3 top-3 w-4 h-4 text-white/30" />
          <Input
            placeholder="Search roles..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 bg-[#13151f] border-white/5"
          />
        </div>


        {filtered.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((role: any) => (
              <Card key={role.id} className="bg-[#13151f] border border-white/5 hover:border-white/10 transition-colors">

                <CardHeader className="flex flex-row items-start justify-between pb-2 pt-5 px-5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-violet-500/15 flex items-center justify-center flex-shrink-0">
                      <ShieldCheck className="w-4 h-4 text-violet-400" />
                    </div>
                    <div>
                      <CardTitle className="text-sm font-semibold text-white leading-tight">
                        {role.role_name}
                      </CardTitle>
                      <p className="text-[11px] text-white/30 mt-0.5">
                        {enabledCount(role)} of 4 permissions
                      </p>
                    </div>
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button size="icon" variant="ghost" className="text-white/30 hover:text-white -mt-1 -mr-1">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-[#1a1d2a] border border-white/10 text-white shadow-xl">
                      <DropdownMenuItem
                        onClick={() => handleEdit(role)}
                        className="hover:bg-white/5 cursor-pointer text-white/70 hover:text-white"
                      >
                        <Pencil className="w-4 h-4 mr-2 text-white/40" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => setDeleteId(role.id)}
                        className="hover:bg-red-500/10 cursor-pointer text-red-400"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </CardHeader>

                <CardContent className="px-5 pb-5">
                  <div className="flex flex-wrap gap-1.5">
                    <PermPill label="View" active={role.can_view} />
                    <PermPill label="Create" active={role.can_create} />
                    <PermPill label="Update" active={role.can_update} />
                    <PermPill label="Delete" active={role.can_delete} />
                  </div>
                </CardContent>

              </Card>
            ))}
          </div>
        )}


        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-12 h-12 rounded-xl bg-violet-500/10 flex items-center justify-center mb-4">
              <ShieldCheck className="w-6 h-6 text-violet-400" />
            </div>
            <p className="text-white/40 text-sm">No roles found</p>
            <p className="text-white/20 text-xs mt-1">Create your first role to get started</p>
          </div>
        )}

      </div>

      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent className="bg-[#13151f] border border-white/10">
          <DialogHeader>
            <DialogTitle className="text-white">Create Role</DialogTitle>
          </DialogHeader>
          <RoleForm
            roleName={roleName} setRoleName={setRoleName}
            canView={canView} setCanView={setCanView}
            canCreate={canCreate} setCanCreate={setCanCreate}
            canUpdate={canUpdate} setCanUpdate={setCanUpdate}
            canDelete={canDelete} setCanDelete={setCanDelete}
          />
          <DialogFooter>
            <Button variant="ghost" onClick={() => setCreateOpen(false)} className="text-white/50 hover:text-white">
              Cancel
            </Button>
            <Button onClick={handleCreate} className="bg-violet-500 hover:bg-violet-400">
              Create Role
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

   
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="bg-[#13151f] border border-white/10">
          <DialogHeader>
            <DialogTitle className="text-white">Edit Role</DialogTitle>
          </DialogHeader>
          <RoleForm
            roleName={roleName} setRoleName={setRoleName}
            canView={canView} setCanView={setCanView}
            canCreate={canCreate} setCanCreate={setCanCreate}
            canUpdate={canUpdate} setCanUpdate={setCanUpdate}
            canDelete={canDelete} setCanDelete={setCanDelete}
          />
          <DialogFooter>
            <Button variant="ghost" onClick={() => setEditOpen(false)} className="text-white/50 hover:text-white">
              Cancel
            </Button>
            <Button onClick={handleUpdate} className="bg-violet-500 hover:bg-violet-400">
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>


      <Dialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <DialogContent className="bg-[#13151f] border border-white/10">
          <DialogHeader>
            <DialogTitle className="text-white">Delete Role?</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-white/40 -mt-2">This action cannot be undone.</p>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setDeleteId(null)} className="text-white/50 hover:text-white">
              Cancel
            </Button>
            <Button onClick={() => handleDelete(deleteId!)} className="bg-red-500 hover:bg-red-400">
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </div>
  )
}