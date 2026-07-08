import type { UserType } from "@/api/api.types";
import type { User } from "@/api/auth";
import { createContext } from "react";

type AuthContextType = {
  user : User | null ,
  isLoading : boolean,
  isAuthenticated : boolean,
  requestLogin: (username : string, password : string, userType : UserType) => Promise<void>,
  requestLogout : () => Promise<void>,
  requestRefetchUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default AuthContext;
