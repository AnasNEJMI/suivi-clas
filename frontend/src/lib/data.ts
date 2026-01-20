import Adminboard from "@/pages/adminboard";
import Dashboard from "@/pages/dashboard";
import Login from "@/pages/login";

export const routes = [
  { path: "/login", name: "Login", element: Login},
  { path: "/signup", name: "Sign up", element: Login},
  { path: "/dashboard", name: "Dashboard", element: Dashboard},
  { path: "/adminboard", name: "Adminboard", element: Adminboard},
];

