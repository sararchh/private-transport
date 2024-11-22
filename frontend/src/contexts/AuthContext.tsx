'use client';
import { usePathname, useRouter } from 'next/navigation';
import React, { useContext } from 'react';
import { toast } from 'react-toastify';
// routes
import { authRoutes, publicRoutes } from '@/routes/mapRoutes';
import { PATHS } from '@/routes/paths';
// utils
import { setSession, setUserStorage } from '@/utils/jwt';
// libs
import { api } from '@/libs/axios/apiClient';

interface AuthContextData {
   user: any;
   loading: boolean;
   signInRequest: (email: string, password: string) => void;
   signOutRequest: () => void;
}

interface AuthProviderProps {
   children: React.ReactNode;
}

export const AuthContext = React.createContext({} as AuthContextData);

export function AuthProvider({ children, ...rest }: AuthProviderProps) {
   const router = useRouter();
   const pathname = usePathname();

   const [loading, setLoading] = React.useState(true);
   const [user, setUser] = React.useState<any>(null);

   React.useEffect(() => {
      const initialize = async () => {
         const route = pathname;

         try {
            if (authRoutes.includes(route) || route == '/') {
               const accessToken = window.localStorage.getItem('accessToken');

               const dataUser: any = window.localStorage.getItem('@user');
               const userStorage = JSON.parse(dataUser);
               if (userStorage) {
                  setUser(userStorage);
               }

               if (accessToken) {
                  if (!authRoutes.includes(route)) {
                     await router.replace('/');
                  }
               } else {
                  if (!publicRoutes.includes(route)) {
                     await router.replace('/login');
                  }

                  setUser(null);
                  setUserStorage(null);
               }
            }
         } catch (err) {
            if (!publicRoutes.includes(route)) {
               await router.replace('/login');
            }

            setSession(null);
            setUser(null);
            setUserStorage(null);
         }

         setLoading(false);
      };

      initialize();

      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   const signInRequest = async (email: string, password: string) => {
      try {
         if (!email || !password) {
            return;
         }
         setLoading(true);

         setSession(null);

         const response = await api.post('/sign-in', {
            email: email,
            password: password,
         });
         // console.log("response", response.data);

         const { user, token, refreshToken } = response.data;

         setSession(token, refreshToken);

         setUser(user);
         setUserStorage(user);

         setLoading(false);

         router.push(PATHS?.dashboard?.index);
         return user;
      } catch (error: any) {
         setLoading(false);
         // console.log("error", error?.response.data);
         if (error?.response?.data) {
            if (error?.response.data?.name == 'InvalidCredentialsError') {
               toast.error('Credenciais inválidas.');
            }
            if (error?.response.data?.name == 'registerIsNotActiveError') {
               toast.error('Usuário não está ativo para acesso.');
            }
         } else {
            toast('Falha ao realizar login, tente novamente.');
         }

         return false;
      }
   };

   const signOutRequest = async () => {
      setSession(null);
      setUser(null);
      setUserStorage(null);
   };

   return (
      <AuthContext.Provider
         value={{
            loading,
            user,
            signInRequest,
            signOutRequest,
         }}
      >
         {children}
      </AuthContext.Provider>
   );
}

export const useAuth = () => useContext(AuthContext);
