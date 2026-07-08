import { fetchUser, login, logout} from '@/api/auth';
import React from 'react'
import AuthContext from './auth-context';
import {useQuery, useQueryClient } from '@tanstack/react-query';
import { useApiMutation } from '@/hooks/useApiMutation';
import SuccessToast from '@/components/toasts/success-toast';
import ErrorToast from '@/components/toasts/error-toast';
import { ApiError } from '@/lib/errors/apiError.class';
import { queryKeys } from '@/lib/query/keys';
import { useNavigate } from 'react-router';
import type { UserType } from '@/api/api.types';


const AuthProvider = ({children} : {children : React.ReactNode}) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
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
          message : `Bienvenue ${data.user.firstName}`,
        });

        if(data.user.userType === 'student'){
          navigate('/etudiant', {replace : true});
        }else if(data.user.userType === 'animator'){
          navigate('/animateur', {replace : true});
        }else if(data.user.userType === 'associationMember'){
          navigate('/association', {replace : true});
        }
      },
      onError : (error) => {
        if (error instanceof ApiError) {
          ErrorToast({error});
        } else {
          console.log('unknown error : ', error);
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
        queryClient.invalidateQueries({queryKey : queryKeys.auth.user});
        queryClient.clear();
        SuccessToast({
          message : `Déconnecté avec succès.`
        })
        navigate('/', {replace : true});
      },
      onError : (error) => {
        queryClient.setQueryData(queryKeys.auth.user, null);
        queryClient.invalidateQueries({queryKey : queryKeys.auth.user});
        queryClient.clear();
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

  const requestLogin = async (username : string, password : string, userType : UserType) : Promise<void> => {
    await loginMutation.mutateAsync({username, password, userType})
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
        isAuthenticated : !!user && !isLoading,
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