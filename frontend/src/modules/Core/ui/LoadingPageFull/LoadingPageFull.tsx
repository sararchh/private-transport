import { ConfigContext } from '@/contexts/ConfigContext';
import Image from 'next/image';
import { useContext } from 'react';

import styles from './LoadingPageFull.module.css';

export const LoadingPageFull = () => {
   const { configApp, isMobile } = useContext(ConfigContext);

   return (
      <div
         className={`${styles['container-loading-page-full']} w-screen h-screen flex flex-col items-center pt-[80px] bg-[var(--color-black)]`}
      >
         <div className="mb-[0px] opacity-[0.8] rounded-full overflow-hidden">
            <Image
               src="/assets/logo.png"
               alt="loading"
               width={isMobile ? 120 : 200}
               height={isMobile ? 120 : 200}
            />
         </div>
         {/* <div>loadingPageFull</div> */}
         <p className="text-[30px] md:text-[50px] font-bold text-white">{configApp?.nameApp}</p>
      </div>
   );
};
