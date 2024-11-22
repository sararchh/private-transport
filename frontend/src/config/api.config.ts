export const apiConfig = {
   baseUrl: 'http://localhost:3000',
   routes: {
      drivers: {
         list: '/ride/:customer_id',
         create: '/ride/estimate',
         patch: '/ride/confirm',
      },
   },
};
