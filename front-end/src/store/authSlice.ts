import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { loginApi, registerApi } from "@/services/authService"
import { LoginPayload, RegisterPayload } from "@/types/auth"

interface AuthState {
  user: any
  loading: boolean
  error: string | null
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null
}

export const loginUser = createAsyncThunk(
  "auth/login",
  async (data: LoginPayload, { rejectWithValue }) => {
    try {
      const res = await loginApi(data)
      return res
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message)
    }
  }
)

export const registerUser = createAsyncThunk(
  "auth/register",
  async (data: RegisterPayload, { rejectWithValue }) => {
    try {
      const res = await registerApi(data)
      return res
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message)
    }
  }
)

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {

    builder.addCase(loginUser.pending, (state) => {
      state.loading = true
    })

    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false
      state.user = action.payload.user
    })

    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload as string
    })

  }
})

export default authSlice.reducer