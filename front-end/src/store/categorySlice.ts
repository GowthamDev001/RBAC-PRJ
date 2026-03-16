import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import {
  createCategoryApi,
  getCategoriesApi,
  updateCategoryApi,
  deleteCategoryApi
} from "@/services/categoryService"
import { showSuccess, showError } from "@/utils/notification"

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

    // GET CATEGORIES
    builder.addCase(getCategories.pending, (state) => {
      state.loading = true
    })

    builder.addCase(getCategories.fulfilled, (state, action) => {
      state.loading = false
      state.categories = action.payload.data || []

      // showSuccess(action.payload.message || "Categories fetched successfully")
    })

    builder.addCase(getCategories.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload as string

      showError(action.payload as string || "Failed to fetch categories")
    })


    // CREATE CATEGORY
    builder.addCase(createCategory.fulfilled, (state, action) => {

      state.categories.unshift(action.payload.data)

      showSuccess(action.payload.message || "Category created successfully")
    })

    builder.addCase(createCategory.rejected, (state, action) => {
      showError(action.payload as string || "Failed to create category")
    })


    // UPDATE CATEGORY
    builder.addCase(updateCategory.fulfilled, (state, action) => {

      const updated = action.payload.data

      const index = state.categories.findIndex(
        (c) => c.id === updated.id
      )

      if (index !== -1) {
        state.categories[index] = updated
      }

      showSuccess(action.payload.message || "Category updated successfully")
    })

    builder.addCase(updateCategory.rejected, (state, action) => {
      showError(action.payload as string || "Failed to update category")
    })


    // DELETE CATEGORY
    builder.addCase(deleteCategory.fulfilled, (state, action) => {

      state.categories = state.categories.filter(
        (c) => c.id !== action.payload.id
      )

      showSuccess(action.payload.message || "Category deleted successfully")
    })

    builder.addCase(deleteCategory.rejected, (state, action) => {
      showError(action.payload as string || "Failed to delete category")
    })

  }
})

export default categorySlice.reducer