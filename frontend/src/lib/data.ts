import Adminboard from "@/pages/adminboard/adminboard";
import AssociationPage from "@/pages/association-page/association-page";
import Login from "@/pages/login";

export const routes = [
  { path: "/login", name: "Login", element: Login},
  { path: "/signup", name: "Sign up", element: Login},
  { path: "/dashboard", name: "Dashboard", element: AssociationPage},
  { path: "/adminboard", name: "Adminboard", element: Adminboard},
];

