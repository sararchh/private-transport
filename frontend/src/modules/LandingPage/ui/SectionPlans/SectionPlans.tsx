import React from 'react';
import styles from './SectionPlans.module.css';
import { formatCurrency } from '@/utils/format';
import Link from 'next/link';
import { PATHS } from '@/routes/paths';
import { useAuth } from '@/contexts/AuthContext';

export const SectionPlans = () => {
   const { user } = useAuth();
   const HREFLOGGED = user?.name ? PATHS?.dashboard?.index : PATHS?.auth?.login;
   return (
      <div
         className={`${styles['section-subscription']} w-full min-h-[700px] flex flex-col justify-start items-center bg-[var(--bg-secondary-100)] pt-[60px] pb-[200px]`}
      >
         <h2
            className="text-[45px] text-center mb-6 text-white font-semibold font-braahone"
            data-aos="zoom-in"
            data-aos-duration="900"
         >
            Assinaturas
         </h2>
         <div className="w-[800px] flex flex-col-reverse md:flex-row flex-wrap justify-center items-center">
            {cardsPlans.map((card, index) => (
               <div
                  key={index}
                  className={`${styles['card-plan']} relative w-[300px] h-auto min-h-[400px] bg-white m-4 shadow-md rounded-md`}
                  data-aos="fade-up"
                  data-aos-duration="900"
               >
                  <div className="w-full h-[50px] absolute top-0 bg-[var(--color-black)] rounded-t-[5px]">
                     <h3 className="text-center text-[30px] text-white font-semibold mb-4">
                        {card?.title}
                     </h3>
                  </div>
                  <div className="px-4 pb-4 pt-[60px]">
                     <div className={`w-full flex flex-col justify-center items-center`}>
                        <div
                           className={`${styles['bagde-price']} relative w-[120px] h-[45px] flex flex-col justify-center items-center rounded-full`}
                        >
                           <p className="text-center text-[30px] font-bold text-[var(--color-primary)] z-10">
                              {card?.price == 'FREE'
                                 ? card?.price
                                 : formatCurrency(Number(card?.price))}
                           </p>
                           <div
                              className={`${styles['bagde-price-color']} w-[120px] h-[45px] flex flex-col justify-center items-center bg-[var(--bg-primary-600)] rounded-full`}
                           />
                        </div>
                     </div>

                     <hr className="w-[100%] h-[2px] my-4 bg-slate-200" />
                     <p className="text-center text-[16px] font-bold mt-4">Benefícios</p>
                     <ul className="flex flex-col justify-center items-start py-2 px-6 list-disc">
                        {card?.bullets.map((bullet: any, index: number) => (
                           <li key={index} className="my-2">
                              <p className="text-[16px]">{bullet}</p>
                           </li>
                        ))}
                     </ul>
                  </div>
               </div>
            ))}
         </div>
         <Link
            href={HREFLOGGED}
            className="w-[200px] md:w-[250px] h-[45px] md:h-[60px] flex flex-row justify-center items-center bg-white hover:bg-[#eaecec] mt-4 md:mt-12 rounded-[5px] hover:scale-105 transition-all"
            // data-aos='fade-up'
            // data-aos-duration='900'
         >
            <p className="text-[14px] md:text-[18px] text-[var(--bg-primary-600)] uppercase font-bold">
               Acessar
            </p>
         </Link>
         <p className="text-[14px] md:text-[14px] text-white mt-4">
            * Após cadastro gratuito faça upgrade.
         </p>
      </div>
   );
};

const cardsPlans = [
   {
      title: 'Basic',
      price: 'FREE',
      bullets: ['Acesso aos ofertas gratuitas', 'Sorteios em geral', 'Indicações de influencers'],
   },
   {
      title: 'Starter',
      price: '7.99',
      bullets: [
         'Acesso a todas ofertas',
         'Sorteios e cupons',
         'Indicações de influencers',
         'Cupons de influencers',
      ],
   },
];
