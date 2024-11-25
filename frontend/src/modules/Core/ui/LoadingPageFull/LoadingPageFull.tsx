
import Image from 'next/image';
import { useContext } from 'react';

import { ConfigContext } from '@/contexts/config.context';

export const LoadingPageFull = () => {
   const { configApp, isMobile } = useContext(ConfigContext);

   return (
      <div
      className={`w-screen h-screen flex flex-col items-center justify-center pt-[80px] bg-[rgba(211, 211, 211, 0.05)]`}
      >
         <div className="mb-[0px] opacity-[0.8] rounded-full overflow-hidden">
            <Image
               src="/assets/logo.png"
               alt="loading"
               width={isMobile ? 120 : 200}
               height={isMobile ? 120 : 200}
            />
         </div>
         <p className="text-[30px] md:text-[50px] font-bold text-white">{configApp?.nameApp}</p>
      </div>
   );
};
