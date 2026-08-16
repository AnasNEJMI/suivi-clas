import { apiRequest } from "./client";

export function fetchPayloadlessData<T>(relativeEnpoint : string, apiEndpoint : string) {
    return () =>  apiRequest<T>(`${apiEndpoint+relativeEnpoint}`);
}
