import type { Config } from 'tailwindcss';

const config: Config = {
   content: [
      './src/app/**/*.{js,ts,jsx,tsx,mdx}',
      './src/components/**/*.{js,ts,jsx,tsx,mdx}',
      './src/screens/**/*.{js,ts,jsx,tsx,mdx}',
      './src/modules/**/*.{js,ts,jsx,tsx,mdx}',
   ],
   theme: {
      screens: {
         sm: '600px',
         md: '1100px',
         lg: '1300px',
         xl: '1580px',
         '2xl': '1836px',
      },
      extend: {
          transitionProperty: {
            all: 'all',
         },
         transitionTimingFunction: {
            'ease-in-out': 'ease-in-out',
         },
         scale: {
            '175': '1.75',
            '150': '1.5',
         },
      },
   },
   plugins: [],
 };
export default config;

