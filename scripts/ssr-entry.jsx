import { createElement } from "react"
import { renderToString } from "react-dom/server"
import { StoreProvider } from "../src/core/StoreContext.jsx"
import App from "../src/App.jsx"

export function renderApp() {
  return renderToString(createElement(StoreProvider, null, createElement(App)))
}