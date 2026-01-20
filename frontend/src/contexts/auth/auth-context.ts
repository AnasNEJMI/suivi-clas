import { createContext } from "react";

export type user = {
  id : number,
  email : string,
  createdAt : string,
}

type AuthContextType = {
  user : user | null,
  isLoading : boolean,
  isAuthenticated : boolean,
  requestLogin: (email : string, password : string) => Promise<void>,
  requestLogout : () => Promise<void>,
  requestRefetchUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default AuthContext;
