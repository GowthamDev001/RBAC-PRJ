import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { loginApi, registerApi } from "@/services/authService"
import { LoginPayload, RegisterPayload } from "@/types/auth"
import { encryptData, decryptData } from "@/utils/storageCrypto"

interface AuthState {
  user: any
  loading: boolean
  error: string | null
}

let storedUser = null

try {
  const encrypted = localStorage.getItem("user")
  storedUser = encrypted ? decryptData(encrypted) : null
} catch {
  localStorage.removeItem("user")
  storedUser = null
}

const initialState: AuthState = {
  user: storedUser,
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
  reducers: {
    logout: (state) => {
      state.user = null
      localStorage.removeItem("user")
      localStorage.removeItem("token")
    }
  },
  extraReducers: (builder) => {

    builder.addCase(loginUser.pending, (state) => {
      state.loading = true
    })

    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false
      state.user = action.payload.user

      const encryptedUser = encryptData(action.payload.user)
      const encryptedToken = encryptData(action.payload.token)

      localStorage.setItem("user", encryptedUser)
      localStorage.setItem("token", encryptedToken)
    })

    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload as string
    })

  }
})

export const { logout } = authSlice.actions
export default authSlice.reducer