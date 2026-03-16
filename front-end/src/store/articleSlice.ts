import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import {
  createArticleApi,
  getArticlesApi,
  deleteArticleApi,
  updateArticleApi
} from "@/services/articleService"
import { showSuccess, showError } from "@/utils/notification"

interface ArticleState {
  articles: any[]
  loading: boolean
  error: string | null
}

const initialState: ArticleState = {
  articles: [],
  loading: false,
  error: null
}

export const createArticle = createAsyncThunk(
  "articles/create",
  async (
    data: { title: string; content: string; status: string; category_id: string },
    { rejectWithValue }
  ) => {
    try {
      const res = await createArticleApi(data)
      return res
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message)
    }
  }
)

export const getArticles = createAsyncThunk(
  "articles/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getArticlesApi()
      return res
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message)
    }
  }
)

export const updateArticle = createAsyncThunk(
  "articles/update",
  async (
    data: { id: string; title: string; content: string; status: string; category_id: string },
    { rejectWithValue }
  ) => {
    try {
      const res = await updateArticleApi(data)
      return res
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message)
    }
  }
)

export const deleteArticle = createAsyncThunk(
  "articles/delete",
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await deleteArticleApi(id)
      return { id, ...res }
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message)
    }
  }
)

const articleSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {},
  extraReducers: (builder) => {

    // GET ARTICLES
    builder.addCase(getArticles.pending, (state) => {
      state.loading = true
    })

    builder.addCase(getArticles.fulfilled, (state, action) => {
      state.loading = false
      state.articles = action.payload.data || []

      if (action.payload.message) {
        // showSuccess(action.payload.message)
      }
    })

    builder.addCase(getArticles.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload as string

      showError(action.payload as string || "Failed to fetch articles")
    })


    // CREATE ARTICLE
    builder.addCase(createArticle.pending, (state) => {
      state.loading = true
    })

    builder.addCase(createArticle.fulfilled, (state, action) => {
      state.loading = false
      state.articles.unshift(action.payload.data)

      showSuccess(action.payload.message || "Article created successfully")
    })

    builder.addCase(createArticle.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload as string

      showError(action.payload as string || "Failed to create article")
    })


    // UPDATE ARTICLE
    builder.addCase(updateArticle.fulfilled, (state, action) => {

      const updated = action.payload.data

      const index = state.articles.findIndex(
        (a) => a.id === updated.id
      )

      if (index !== -1) {
        state.articles[index] = updated
      }

      showSuccess(action.payload.message || "Article updated successfully")
    })

    builder.addCase(updateArticle.rejected, (state, action) => {
      showError(action.payload as string || "Failed to update article")
    })


    // DELETE ARTICLE
    builder.addCase(deleteArticle.fulfilled, (state, action) => {

      state.articles = state.articles.filter(
        (a) => a.id !== action.payload.id
      )

      showSuccess(action.payload.message || "Article deleted successfully")
    })

    builder.addCase(deleteArticle.rejected, (state, action) => {
      showError(action.payload as string || "Failed to delete article")
    })
  }
})

export default articleSlice.reducer