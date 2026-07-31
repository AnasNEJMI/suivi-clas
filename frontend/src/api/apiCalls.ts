import { apiRequest } from "./client";

export function fetchData<T>(endpoint : string){
    return () => apiRequest<T>(`/api/${endpoint}`);
}
