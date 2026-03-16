import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./authSlice"
import articleReducer from "./articleSlice"
import roleReducer from "./roleSlice"
import categoryReducer from "./categorySlice"
import reviewReducer from "./reviewSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    articles: articleReducer,
    roles: roleReducer,
    categories: categoryReducer,
    reviews: reviewReducer
  }
})