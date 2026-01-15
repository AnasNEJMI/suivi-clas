export type ApiSuccessResponse<T = unknown> = {
    success : true;
    data : T
};

export type ApiErrorResponse = {
    success : false;
    error : {
        code : string,
        message : string,
        details? : Record<string, unknown>
    };
};


export type ApiResponse<T = unknown> = ApiSuccessResponse<T> | ApiErrorResponse;