import React from "react"
import ReactDOM from "react-dom/client"
import { Toaster } from "@/components/ui/sonner"
import App from "./App"
import { StoreProvider } from "./core/StoreContext"
import "./index.css"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <StoreProvider>
      <App />
      <Toaster position="top-center" richColors />
    </StoreProvider>
  </React.StrictMode>,
)