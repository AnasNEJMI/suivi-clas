import Adminboard from "@/pages/adminboard/adminboard";
import Orgboard from "@/pages/orgboard/orgboard";
import Login from "@/pages/login";

export const routes = [
  { path: "/login", name: "Login", element: Login},
  { path: "/signup", name: "Sign up", element: Login},
  { path: "/dashboard", name: "Dashboard", element: Orgboard},
  { path: "/adminboard", name: "Adminboard", element: Adminboard},
];

