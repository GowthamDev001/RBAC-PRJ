import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import {
  createArticleApi,
  getArticlesApi,
  deleteArticleApi,
  updateArticleApi
} from "@/services/articleService"

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
  async (data: { title: string; content: string ; status: string }, { rejectWithValue }) => {
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
    data: { id: string; title: string; content: string ; status: string },
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
      state.articles = action.payload
    })

    builder.addCase(getArticles.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload as string
    })

    // CREATE ARTICLE
    builder.addCase(createArticle.pending, (state) => {
      state.loading = true
    })

    builder.addCase(createArticle.fulfilled, (state, action) => {
      state.loading = false
      state.articles.push(action.payload)
    })

    builder.addCase(createArticle.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload as string
    })

    // UPDATE ARTICLE
    builder.addCase(updateArticle.fulfilled, (state, action) => {
      const index = state.articles.findIndex(
        (a) => a.id === action.payload.id
      )

      if (index !== -1) {
        state.articles[index] = action.payload
      }
    })

    // DELETE ARTICLE
    builder.addCase(deleteArticle.fulfilled, (state, action) => {
      state.articles = state.articles.filter(
        (a) => a.id !== action.payload.id
      )
    })
  }
})

export default articleSlice.reducer