import CPIChartForOP from "@/components/common/CPIChartForOp";
import CPIChartofDAOs from "@/components/common/CPIChartofDAOs";
import LineGraph from "@/components/common/LineGraph";
import AddPercentage from "@/components/home/AddPercentage";
import ExpertAnalysis from "@/components/home/ExpertAnalysis";
import FeaturedDAOChart from "@/components/home/FeaturedDAOChart";
import HeroSection from "@/components/home/HeroSection";
import HomeHeader from "@/components/home/HomeHeader";
import Methodology from "@/components/home/Methodology";
import Resources from "@/components/home/Resources";
import WhatIsCPI from "@/components/home/WhatIsCPI";

import dynamic from "next/dynamic";

const Panels = dynamic(() => import("@/components/home/Panels"), {
  ssr: false,
  loading: () => (
    <div className="h-[500px] animate-pulse bg-black" />
  ),
});
const AddYourDAO = dynamic(() => import("@/components/home/AddYourDAO"), {
  ssr: false,
});
const Footer = dynamic(() => import("@/components/layout/Footer"), {
  ssr: false,
});

export default function Home() {
  return (
    <>
      {/* <SmoothScrolling> */}
      {/* <main className="flex min-h-screen flex-col items-center"> */}
      <div className="w-[100%] overflow-x-hidden">
        <HomeHeader />
        <HeroSection />
        <AddPercentage />
        <WhatIsCPI />
        <Methodology />
        <FeaturedDAOChart />
        <ExpertAnalysis />
        <Panels />
        <Resources />
        <AddYourDAO />
        <Footer />
      </div>
      {/* </main> */}
      {/* </SmoothScrolling> */}
    </>
  );
}
