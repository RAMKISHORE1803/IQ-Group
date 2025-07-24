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
    logo: 'https://ficci.in/public/storage/uploads/P6xOAm7YXbMl3g2bzapfFrHwy0kkhpTYkRiYdm4F.png',
  }
];

export default function Associates() {
  return (
    <div className='bg-[#fbfbfb] w-screen xl:px-[8.3vw]'>
        <div className=' container px-4 md:px-0 mx-auto min-w-[1490px]:mx-auto flex flex-between'>    
            <h2 className='font-bold font-lato text-left text-[#203663]  min-w-[1490px]:mx-auto mb-4 md:pt-8 lg:text-[40px] '>
                OUR ASSOCIATES
            </h2>
        </div>
      <CustomerMarquee items={associates} direction="right" speed="fast" className='bg-[#fbfbfb] w-full h-full lg:w-full grayscale-none' />
    </div>
  )
}