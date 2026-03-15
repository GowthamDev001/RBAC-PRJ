import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "./index.css"

import { Toaster } from "sonner"

import { QueryClientProvider } from "@tanstack/react-query"
import { queryClient } from "./utils/queryClient"

import { ThemeProvider } from "@/components/theme-provider"

import { Provider } from "react-redux"
import { store } from "@/store/store"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>

    <Provider store={store}>

      <QueryClientProvider client={queryClient}>

        <ThemeProvider defaultTheme="system" storageKey="ui-theme">

          <Toaster richColors position="top-right" />

          <App />

        </ThemeProvider>


      </QueryClientProvider>

    </Provider>

  </React.StrictMode>
)