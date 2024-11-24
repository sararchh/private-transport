export const apiConfig = {
   baseUrl: 'http://localhost:3001',
   routes: {
      drivers: {
         list: '/ride',
         create: '/ride/estimate',
         patch: '/ride/confirm',
         listDrivers: '/ride/drivers/all',
      },
   },
};
