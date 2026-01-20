import { apiRequest } from "./client"

export type CreateUserPayload = {
  email: string
  password: string
}

export type CreateUserResponse = {
  id: number
  email: string
}

export async function createUser(
    payload : CreateUserPayload
):Promise<CreateUserResponse>{
    return apiRequest<CreateUserResponse>('/api/users',{
        method : 'POST',
        body : JSON.stringify(payload)
    })
}

