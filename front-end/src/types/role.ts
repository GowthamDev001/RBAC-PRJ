export interface Role {

  id: string
  role_name: string

  can_view: boolean
  can_create: boolean
  can_update: boolean
  can_delete: boolean

  created_at: string
}