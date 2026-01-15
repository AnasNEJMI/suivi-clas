export type CreateUserPayload = {
  email: string
  password: string
}

export type CreateUserResponse = {
  id: number
  email: string
}

export async function createUser(payload : CreateUserPayload) : Promise<CreateUserPayload>{
    const response = await fetch(
        "http://localhost:3000/api/users",
        {
            method : 'POST',
            headers : {
                "Content-Type": "application/json",
            },
            body : JSON.stringify(payload),
        }
    )

    if(!response.ok){
        const errorBody = await response.json().catch(() => null);
        console.log(errorBody)
        throw new Error(errorBody?.message ?? "Erreur Serveur");
    }

    return response.json();
}