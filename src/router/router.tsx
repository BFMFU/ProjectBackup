import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ProjectManager from "../pages/ProjectManager";
import ProjectDetails from "../pages/ProjectDetails";

export const routers = createBrowserRouter([
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/", 
    element: <Login></Login>,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/projects",
    element: <ProjectManager></ProjectManager>,
  },
  {
    path: "projects/:id",
    element: <ProjectDetails></ProjectDetails>,
  },
]);
