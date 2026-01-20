import { apiRequest } from "./client"


///////////////FETCH USER//////////////////

export type User = {
    id : number,
    email : string,
    createdAt : string,
}

export async function fetchUser():Promise<User>{
    return apiRequest<User>('/api/auth/profile')
}

//////////////////LOGIN//////////////////

export type LoginPayload = {
  email: string
  password: string
}

export type LoginResponse = {
  user : {
    id: number
    email: string
  }
}

export async function login(payload : LoginPayload):Promise<LoginResponse>{
    return apiRequest<LoginResponse>('/api/auth/login',{
        method : 'POST',
        body : JSON.stringify(payload)
    })
}

//////////////////LOGOUT//////////////////

export async function logout():Promise<void>{
    return apiRequest<void>('/api/auth/logout',{
        method : 'POST',
    })
}