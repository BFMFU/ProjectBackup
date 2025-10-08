import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import store from "./store/store.ts";
import { Provider } from "react-redux";
import { routers } from "./router/router.tsx";
import { RouterProvider } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <App />
    <RouterProvider router={routers}></RouterProvider>
  </Provider>
);
