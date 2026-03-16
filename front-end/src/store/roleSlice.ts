import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import {
  getRolesApi,
  createRoleApi,
  updateRoleApi,
  deleteRoleApi
} from "@/services/roleService"

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

    builder.addCase(getRoles.fulfilled, (state, action) => {
      state.roles = action.payload
    })

    builder.addCase(createRole.fulfilled, (state, action) => {
      state.roles.push(action.payload)
    })

    builder.addCase(updateRole.fulfilled, (state, action) => {

      const index = state.roles.findIndex(
        (r) => r.id === action.payload.id
      )

      if (index !== -1) {

        state.roles[index] = action.payload

      }
    })

    builder.addCase(deleteRole.fulfilled, (state, action) => {

      state.roles = state.roles.filter(
        (r) => r.id !== action.payload.id
      )
    })
  }
})

export default roleSlice.reducer