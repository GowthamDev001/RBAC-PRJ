import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import {
  createReviewApi,
  getReviewsByArticleApi,
  updateReviewApi,
  deleteReviewApi
} from "@/services/reviewService"

interface ReviewState {
  reviews: any[]
  loading: boolean
  error: string | null
}

const initialState: ReviewState = {
  reviews: [],
  loading: false,
  error: null
}

export const getReviewsByArticle = createAsyncThunk(
  "reviews/getByArticle",
  async (articleId: string, { rejectWithValue }) => {
    try {
      const res = await getReviewsByArticleApi(articleId)
      return res
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message)
    }
  }
)

export const createReview = createAsyncThunk(
  "reviews/create",
  async (
    data: { article_id: string; rating: number; review: string },
    { rejectWithValue }
  ) => {
    try {
      const res = await createReviewApi(data)
      return res
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message)
    }
  }
)

export const updateReview = createAsyncThunk(
  "reviews/update",
  async (
    data: { id: string; rating: number; review: string },
    { rejectWithValue }
  ) => {
    try {
      const res = await updateReviewApi(data)
      return res
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message)
    }
  }
)

export const deleteReview = createAsyncThunk(
  "reviews/delete",
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await deleteReviewApi(id)
      return { id, ...res }
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message)
    }
  }
)

const reviewSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {},
  extraReducers: (builder) => {

    builder.addCase(getReviewsByArticle.pending, (state) => {
      state.loading = true
    })

    builder.addCase(getReviewsByArticle.fulfilled, (state, action) => {
      state.loading = false
      state.reviews = action.payload
    })

    builder.addCase(getReviewsByArticle.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload as string
    })

    builder.addCase(createReview.fulfilled, (state, action) => {
      state.reviews.push(action.payload)
    })

    builder.addCase(updateReview.fulfilled, (state, action) => {
      const index = state.reviews.findIndex(
        (r) => r.id === action.payload.id
      )

      if (index !== -1) {
        state.reviews[index] = action.payload
      }
    })

    builder.addCase(deleteReview.fulfilled, (state, action) => {
      state.reviews = state.reviews.filter(
        (r) => r.id !== action.payload.id
      )
    })

  }
})

export default reviewSlice.reducer