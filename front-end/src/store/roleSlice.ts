import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import {
  getRolesApi,
  createRoleApi,
  updateRoleApi,
  deleteRoleApi
} from "@/services/roleService"
import { showSuccess, showError } from "@/utils/notification"

interface RoleState {
  roles: any[]
  loading: boolean
  error: string | null
}

const initialState: RoleState = {
  roles: [],
  loading: false,
  error: null
}

export const getRoles = createAsyncThunk(
  "roles/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getRolesApi()
      return res
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message)
    }
  }
)

export const createRole = createAsyncThunk(
  "roles/create",
  async (data: any, { rejectWithValue }) => {
    try {
      const res = await createRoleApi(data)
      return res
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message)
    }
  }
)

export const updateRole = createAsyncThunk(
  "roles/update",
  async (data: any, { rejectWithValue }) => {
    try {
      const res = await updateRoleApi(data)
      return res
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message)
    }
  }
)

export const deleteRole = createAsyncThunk(
  "roles/delete",
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await deleteRoleApi(id)
      return { id, ...res }
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message)
    }
  }
)

const roleSlice = createSlice({
  name: "roles",
  initialState,
  reducers: {},
  extraReducers: (builder) => {

    // GET ROLES
    builder.addCase(getRoles.pending, (state) => {
      state.loading = true
    })

    builder.addCase(getRoles.fulfilled, (state, action) => {
      state.loading = false
      state.roles = action.payload.data || []

      // showSuccess(action.payload.message || "Roles fetched successfully")
    })

    builder.addCase(getRoles.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload as string

      showError(action.payload as string || "Failed to fetch roles")
    })


    // CREATE ROLE
    builder.addCase(createRole.fulfilled, (state, action) => {

      state.roles.unshift(action.payload.data)

      showSuccess(action.payload.message || "Role created successfully")
    })

    builder.addCase(createRole.rejected, (state, action) => {
      showError(action.payload as string || "Failed to create role")
    })


    // UPDATE ROLE
    builder.addCase(updateRole.fulfilled, (state, action) => {

      const updated = action.payload.data

      const index = state.roles.findIndex(
        (r) => r.id === updated.id
      )

      if (index !== -1) {
        state.roles[index] = updated
      }

      showSuccess(action.payload.message || "Role updated successfully")
    })

    builder.addCase(updateRole.rejected, (state, action) => {
      showError(action.payload as string || "Failed to update role")
    })


    // DELETE ROLE
    builder.addCase(deleteRole.fulfilled, (state, action) => {

      state.roles = state.roles.filter(
        (r) => r.id !== action.payload.id
      )

      showSuccess(action.payload.message || "Role deleted successfully")
    })

    builder.addCase(deleteRole.rejected, (state, action) => {
      showError(action.payload as string || "Failed to delete role")
    })

  }
})

export default roleSlice.reducer