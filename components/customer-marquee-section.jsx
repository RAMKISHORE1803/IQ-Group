"use client";

import React from "react";
import { CustomerMarquee } from "./ui/customer-marquee";

export default function CustomerMarqueeSection() {
  return (
    <section className="bg-[#fbfbfb] py-16 md:pt-4">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-[1350px]">
        <h2 className="text-[28px] md:text-4xl font-bold font-lato text-center text-[#203663] mb-12">
          OUR CUSTOMERS
        </h2>
      
        {/* First marquee strip - 7 logos */}
        <div className="mb-2 md:mb-8 max-w-[1350px] mx-auto overflow-hidden">
          <CustomerMarquee
            items={topCustomers}
            direction="left"
            speed="slow"
          />
        </div>
        
        {/* Second marquee strip - 6 logos */}
        <div className="max-w-[1350px] mx-auto overflow-hidden">
          <CustomerMarquee
            items={bottomCustomers}
            direction="right"
            speed="slow"
          />
        </div>
      </div>
    </section>
  );
}

// First row of customers - 7 logos
const topCustomers = [
  
  {
    logo: "https://assets.upstox.com/content/assets/images/cms/202448/Tata%20Steel.webp",
    name: "JSW Steel"
  },
  {
    logo: "https://cdn.shortpixel.ai/spai/q_lossy+w_896+to_webp+ret_img/www.a3ms.fr/wp-content/uploads/2024/12/Logo_ArcelorMittal.svg.png",
    name: "ArcelorMittal"
  },
  {
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxbHRIQteYwGQ4QBvWM_JwvKk2TRxNzUTdvw&s",
    name: "Gerdau"
  },
  {
    logo: "https://www.mukand.com/wp-content/uploads/2022/10/mukand-logo-blue.png",
    name: "Mukand"
  },
  {
    logo: "https://www.jindalstainless.com/wp-content/themes/jsl/assets/images/Logo-Dark.png",
    name: "JSL"
  },
  {
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAU9ZkugqSLuDNJ-RCIvevp59i7Py8vWo01g&s",
    name: "JSPL"
  }
];

// Second row of customers - 6 logos
const bottomCustomers = [
  {
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVrmnArLHh_tzxJS1PY4rqglohlTTCX76zkA&s",
    name: "Viraj"
  },
  {
    logo: "https://sunflagsteel.com/wp-content/uploads/2023/11/11_1-5.png",
    name: "Sunflag"
  },
  {
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQF4ehFgmrbSJqDJTei8Wmoj9sRJ1v5ptIIlg&s",
    name: "Aditya Birla"
  },
  {
    logo: "https://img.autocarpro.in/autocarpro/13654ff5-1f10-47cd-94e4-a8bb5aa02f08_AMNS-India-logo01-_2_.jpg",
    name: "AM/NS"
  },
  {
    logo: "https://www.jswbpsl.in/images/logo.png",
    name: "Bhushan Power & Steel Ltd"
  },
  {
    logo: "https://www.saarloha.com/images/logo.png",
    name: "Saarloha"
  }
]; 