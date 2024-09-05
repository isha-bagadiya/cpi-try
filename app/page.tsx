import FeaturedDAOChart from "@/components/home/FeaturedDAOChart";
import HeroSection from "@/components/home/HeroSection";
import Methodology from "@/components/home/Methodology";
import WhatIsCPI from "@/components/home/WhatIsCPI";
import Header from "@/components/layout/Header";
import Image from "next/image";


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <div className="w-[100%] overflow-x-hidden">
        {/* <h1 className="bg-gradient-radial h-screen ">Hello <span className="text-[70px] border border-2 p-0 m-0">Nextjs</span> 14</h1>
        <button className="button-50" role="button">Button 50</button> */}
        <Header />
        <HeroSection />
        <WhatIsCPI />
        <Methodology />
        <FeaturedDAOChart />
      </div>
    </main>
  );
}
