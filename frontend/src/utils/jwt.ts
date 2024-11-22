import { sign, verify } from 'jsonwebtoken';

import { jwtDecode } from 'jwt-decode';

const isValidToken = (accessToken: any) => {
   if (!accessToken) {
      return false;
   }
   const decoded: any = jwtDecode(accessToken);
   const currentTime: any = Date.now() / 1000;

   return decoded.exp > currentTime;
};

const setSession = (accessToken: any, refreshToken?: any) => {
   if (accessToken) {
      window.localStorage.setItem('accessToken', accessToken);
      if (refreshToken) {
         window.localStorage.setItem('refreshToken', refreshToken);
      }
   } else {
      window.localStorage.removeItem('accessToken');
      window.localStorage.removeItem('refreshToken');
   }
};

const setUserStorage = (user?: any) => {
   if (user) {
      window.localStorage.setItem('@user', JSON.stringify(user));
   } else {
      window.localStorage.removeItem('@user');
   }
};

export { isValidToken, setSession, setUserStorage, sign, verify };
