import React from 'react'
import { CustomerMarquee } from './ui/customer-marquee'

const associates = [
  {
    id: 1,
    name: 'Customer 1',
    logo: 'https://www.stainlessindia.org/assets/img/Logo-hd.png',
  },
  {
    id: 2,
    name: 'Customer 2',
    logo: 'https://www.assocham.org/assets/images/assocham-logo-new.jpg',
  },
  {
    id: 3,
    name: 'Customer 3',
    logo: 'https://media.potatopro.com/ficci-logo-2025-1200x589.jpg?width=750&height=360&mode=fit',
  }
];

export default function Associates() {
  return (
    <div className='bg-[#fbfbfb] pt-[30px] md:pt-0 w-screen xl:px-[8.3vw]'>
        <div className=' container  px-4 md:px-0 mx-auto min-w-[1490px]:mx-auto flex justify-center md:flex-between'>    
            <h2 className='font-bold font-lato text-center md:text-left text-[#203663] text-[28px] md:text-[40px] min-w-[1490px]:mx-auto mb-4 md:pt-8 lg:text-[40px] '>
                OUR ASSOCIATES
            </h2>
        </div>
      <CustomerMarquee items={associates} direction="right" speed="fast" className='bg-[#fbfbfb] w-full h-full lg:w-full grayscale-none' />
    </div>
  )
}