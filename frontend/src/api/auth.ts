import { ApiError } from "@/lib/errors/apiError.class"
import { apiRequest } from "./client"
import { ErrorCodes, ErrorStatusMap } from "@/lib/errors/errors.constants"
import type { UserType } from "./api.types"


///////////////FETCH USER//////////////////

export type User = {
    id  : number,
    username : string,
    firstName : string,
    lastName : string
    userType : UserType,
    gender : 'f' | 'm',
    class : {id : number, label : string} | null,
    level : {id : number, label : string} | null,
    association : {id : number, label : string} | null,
    createdAt : Date,
}

export async function fetchUser():Promise<User | null>{
    try{
        const response =  await apiRequest<{user : User}>('/api/auth/profile')
        return response.user;
    }catch(error){
        if(error instanceof ApiError
        && error.statusCode === ErrorStatusMap[ErrorCodes.UNAUTHORIZED]){
            return null;
        }

        throw error;
    }
}

//////////////////LOGIN//////////////////

export type LoginPayload = {
  username: string
  password: string
  userType : UserType
}

export type LoginResponse = {
  user : User
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

/////////////////////////////////////////