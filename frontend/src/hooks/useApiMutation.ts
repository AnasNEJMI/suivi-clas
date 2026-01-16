import { ApiError } from "@/lib/errors/apiError.class";
import { ErrorCodes, ErrorMessagesMap } from "@/lib/errors/errors.constants";
import { useMutation, type UseMutationOptions, type UseMutationResult } from "@tanstack/react-query";

type apiMutationOptions<TData, TVariables> = {
    onSuccess? : (data : TData) => void,
    onError? : (error : ApiError) => void,
    mutationOptions? : Omit<UseMutationOptions<TData, Error, TVariables>, 'mutationFn' | 'onSuccess' | 'onError'>
}

export function useApiMutation<TData = unknown, TVariables = void>(
    mutationFn : (variables : TVariables) => Promise<TData>,
    options? : apiMutationOptions<TData, TVariables>
) : UseMutationResult<TData, ApiError, TVariables>{
    return useMutation<TData, ApiError, TVariables>({
        mutationFn,
        onSuccess : (data) => {
            options?.onSuccess?.(data);
        },
        onError : (error) => {
            let apiError : ApiError;
            
            if(error instanceof ApiError){
                apiError = error
            }else{
                apiError = new ApiError(
                    ErrorCodes.UNKNOWN_ERROR,
                    ErrorMessagesMap[ErrorCodes.UNKNOWN_ERROR],
                    0
                )
            }

            options?.onError?.(apiError);
        },
        ...options?.mutationOptions,
    })
}