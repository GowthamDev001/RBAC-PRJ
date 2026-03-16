import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import {
  createCategoryApi,
  getCategoriesApi,
  updateCategoryApi,
  deleteCategoryApi
} from "@/services/categoryService"

interface CategoryState {
  categories: any[]
  loading: boolean
  error: string | null
}

const initialState: CategoryState = {
  categories: [],
  loading: false,
  error: null
}

export const getCategories = createAsyncThunk(
  "categories/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getCategoriesApi()
      return res
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message)
    }
  }
)

export const createCategory = createAsyncThunk(
  "categories/create",
  async (
    data: { name: string; description?: string },
    { rejectWithValue }
  ) => {
    try {
      const res = await createCategoryApi(data)
      return res
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message)
    }
  }
)

export const updateCategory = createAsyncThunk(
  "categories/update",
  async (
    data: { id: string; name: string; description?: string },
    { rejectWithValue }
  ) => {
    try {
      const res = await updateCategoryApi(data)
      return res
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message)
    }
  }
)

export const deleteCategory = createAsyncThunk(
  "categories/delete",
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await deleteCategoryApi(id)
      return { id, ...res }
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message)
    }
  }
)

const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {

    builder.addCase(getCategories.pending, (state) => {
      state.loading = true
    })

    builder.addCase(getCategories.fulfilled, (state, action) => {
      state.loading = false
      state.categories = action.payload
    })

    builder.addCase(getCategories.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload as string
    })

    builder.addCase(createCategory.fulfilled, (state, action) => {
      state.categories.push(action.payload)
    })

    builder.addCase(updateCategory.fulfilled, (state, action) => {
      const index = state.categories.findIndex(
        (c) => c.id === action.payload.id
      )

      if (index !== -1) {
        state.categories[index] = action.payload
      }
    })

    builder.addCase(deleteCategory.fulfilled, (state, action) => {
      state.categories = state.categories.filter(
        (c) => c.id !== action.payload.id
      )
    })

  }
})

export default categorySlice.reducer