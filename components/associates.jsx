import React from 'react'
import { CustomerMarquee } from './ui/customer-marquee'
import {motion} from 'framer-motion'

const associates = [
  {
    id: 1,
    name: 'Customer 1',
    logo: '/icons/1.png',
  },
  {
    id: 2,
    name: 'Customer 2',
    logo: '/icons/2.jpg',
  },
  {
    id: 3,
    name: 'Customer 3',
    logo: '/icons/3.jpg',
  }
];

export default function Associates() {
  return (
    <div className='bg-[#fbfbfb] pt-[30px] md:pt-0 w-screen xl:px-[8.3vw]'>
        <div className=' container  px-4 md:px-0 mx-auto min-w-[1490px]:mx-auto flex justify-center md:justify-start md:ml-[-2vw]'>    
            <motion.h2
            initial={{opacity: 0, y:30}}
            whileInView={{opacity: 1, y:0 }}
            viewport={{once: false,amount: 0.5}}
            transition={{duration: 0.4, delay: 0.2}}
             className='font-bold font-lato text-center md:text-left lg:text-left text-[#203663] text-[28px] md:text-[40px]  mb-4 md:pt-8 lg:text-[40px] '>
                WE ARE PART OF 
            </motion.h2>
        </div>
      <CustomerMarquee items={associates} direction="left" speed="fast" className='bg-[#fbfbfb] w-full h-full lg:w-full grayscale-none' />
    </div>
  )
}