import { fetchUser, login, logout} from '@/api/auth';
import React from 'react'
import AuthContext from './auth-context';
import {useQuery, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/lib/data';
import { useApiMutation } from '@/hooks/useApiMutation';
import SuccessToast from '@/components/toasts/success-toast';
import ErrorToast from '@/components/toasts/error-toast';
import { ApiError } from '@/lib/errors/apiError.class';


const AuthProvider = ({children} : {children : React.ReactNode}) => {
  const queryClient = useQueryClient();
  
  const {data : user = null, isLoading, refetch} = useQuery({
    queryKey : queryKeys.auth.user,
    queryFn : fetchUser,
    retry : false,
    staleTime : 5 * 6 * 1000,
    gcTime : 10 * 60 * 1000
  })


  const loginMutation = useApiMutation(
    login,
    {
      onSuccess : (data) => {
        console.log('login success : ', data);
        queryClient.setQueryData(queryKeys.auth.user, data.user);
        SuccessToast({
          message : `Bienvenue ${data.user.email}`,
          data : data.user
        })
      },
      onError : (error) => {
        if (error instanceof ApiError) {
          ErrorToast({error});
        } else {
          ErrorToast({
            error: new ApiError('UNKNOWN_ERROR', 'Erreur de connexion', 0),
          });
        }
      },

    }
  )

  const logoutMutation = useApiMutation(
    logout,
    {
      onSuccess : () => {
        queryClient.setQueryData(queryKeys.auth.user, null);
        queryClient.clear();
        SuccessToast({
          message : `Déconnecté avec succès.`
        })
      },
      onError : (error) => {
        if (error instanceof ApiError) {
          ErrorToast({error});
        } else {
          ErrorToast({
            error: new ApiError('UNKNOWN_ERROR', 'Erreur de connexion', 0),
          });
        }
        queryClient.setQueryData(queryKeys.auth.user, null);
      },

    }
  )

  const requestLogin = async (email : string, password : string) : Promise<void> => {
    await loginMutation.mutateAsync({email, password})
  }
  const requestLogout = async () : Promise<void> => {
    await logoutMutation.mutateAsync()
  }
  const requestRefetchUser = async () : Promise<void> => {
    await refetch();
  }
  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated : !!user,
        requestLogin,
        requestLogout,
        requestRefetchUser
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider