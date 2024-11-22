import { useAuth } from '@/contexts/AuthContext';
import { PATHS } from '@/routes/paths';
import Link from 'next/link';
import React from 'react';
import { FiList, FiPercent, FiSidebar } from 'react-icons/fi';

import styles from './SectionFeatures.module.css';

export const SectionFeatures = () => {
   const { user } = useAuth();
   const HREFLOGGED = user?.name ? PATHS?.dashboard?.index : PATHS?.auth?.login;
   return (
      <div className="w-full min-h-[750px] md:min-h-[400px] flex flex-col justify-evenly items-center px-6 md:px-12 py-6 bgc-white">
         <div className="w-full min-h-[300px] flex flex-row flex-wrap justify-evenly items-center">
            {cardsFeatures.map((card, index) => (
               <div
                  key={index}
                  className={`${styles['card-feature']} relative w-[300px] h-[150px] flex flex-col justify-center items-start px-6 py-2 m-4 bg-white rounded-sm shadow-sm`}
                  data-aos="fade-up"
                  data-aos-duration="700"
                  data-aos-delay={index * 200}
               >
                  <div className="z-10">
                     <span className="w-[35px] h-[35px] -mt-[20px]">{card?.icon}</span>
                     <h3 className="text-[18px] h-[40px] mt-[10px]">{card?.text}</h3>
                  </div>
                  <div className={styles['border-to-hover']} />
               </div>
            ))}
         </div>

         <Link
            href={HREFLOGGED}
            className="w-[200px] md:w-[250px] h-[45px] md:h-[60px] flex flex-row justify-center items-center bg-[var(--color-primary)] hover:bg-[var(--color-secondary)] mt-4 md:mt-0 rounded-[5px] hover:scale-105 transition-all"
            // data-aos='fade-up'
            // data-aos-duration='900'
         >
            <p className="text-[14px] md:text-[18px] text-white uppercase font-bold">Acessar</p>
         </Link>
      </div>
   );
};

const cardsFeatures = [
   {
      text: 'Encontre influenciadores e micro influenciadores',
      icon: <FiList size={40} color="#F57B29" strokeWidth={1} />,
   },
   {
      text: 'Crie campanhas para buscar divulgadores',
      icon: <FiSidebar size={40} color="#F57B29" strokeWidth={1} />,
   },
   {
      text: 'Descontos exclusivos e grandes ofertas',
      icon: <FiPercent size={40} color="#F57B29" strokeWidth={1} />,
   },
];
