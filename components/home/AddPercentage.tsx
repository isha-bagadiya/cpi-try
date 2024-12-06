"use client";
import Image from "next/image";
import bg from "@/public/assets/images/influencebg.svg";
import Link from "next/link";
import { LuChevronRight } from "react-icons/lu";

const AddPercentage: React.FC = () => {
  return (
    <div className="bg-dark-gray pb-[80px] sm:pb-[120px] w-full relative">
      <div className="absolute right-0 -top-[120px] sm:-top-[50px] h-[290px] sm:h-[320px] md:h-[380px] lg:h-[430px] z-10">
        <Image
          src={bg}
          alt="bg-image"
          className="h-full w-auto"
          loading="lazy"
          quality={85}
        ></Image>
      </div>
      <div className="bg-[#15141408] backdrop-blur-[215.2px] flex flex-col items-center justify-center p-7 sm:p-10 w-[80%] sm:w-[65%] mx-auto rounded-[63px] border border-[#FEC5FB] relative z-20">
        <h1 className="font-mori max-w-[90%] text-xl md:text-2xl lg:text-[31px] font-semibold text-center text-[#F3FD9D]">
          Personalize HCC Influence and Visualize CPI Trends
        </h1>

        <div className="flex flex-col md:flex-row gap-6 w-full my-8">
          {/* Box 1 */}
          <div className="group relative flex-1 min-w-0">
            <div className="relative  backdrop-blur-md rounded-2xl p-6 border border-[#FEC5FB] h-full transition-colors duration-100">
              <div className="flex flex-col items-start gap-3">
                <h2 className="text-[#FEC5FB] font-semibold text-sm transition-colors duration-100 flex gap-2 items-center">
                  <span className="text-xs transition-colors duration-100 mt-[2px] rounded-full border border-[#FEC5FB] p-[2px]">
                    <LuChevronRight />
                  </span>
                  Get Started
                </h2>
                <p className="text-white text-xs leading-relaxed">
                  Start by clicking 'Start Simulation' to explore the CPI
                  Simulator page.
                </p>
              </div>
            </div>
          </div>

          {/* Box 2 */}
          <div className="group relative flex-1 min-w-0">
            <div className="relative backdrop-blur-md rounded-2xl p-6 border border-[#FEC5FB] h-full  transition-colors duration-100">
              <div className="flex flex-col items-start gap-3">
                <h2 className="text-[#FEC5FB] font-semibold text-sm transition-colors duration-100 flex gap-2 items-center">
                  <span className="text-xs transition-colors duration-100 mt-[2px] rounded-full border border-[#FEC5FB] p-[2px]">
                    <LuChevronRight />
                  </span>
                  Add Influence
                </h2>
                <div className="space-y-2">
                  <p className="text-white text-sm leading-relaxed">
                    Assign influence percentages to each HCC in the fields
                    provided.
                  </p>
                  <p className="text-[#FEC5FB] text-sm italic tracking-wide font-medium">
                    Ensure the total equals 100%.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Box 3 */}
          <div className="group relative flex-1 min-w-0">
            <div className="relative backdrop-blur-md rounded-2xl p-6 border border-[#FEC5FB] h-full  transition-colors duration-100">
              <div className="flex flex-col items-start gap-3">
                <h2 className="text-[#FEC5FB] font-semibold text-sm  transition-colors duration-100 flex gap-2 items-center">
                  <span className="text-xs transition-colors duration-100 mt-[2px] rounded-full border border-[#FEC5FB] p-[2px]">
                    <LuChevronRight />
                  </span>
                  Generate Graph
                </h2>
                <p className="text-white text-sm leading-relaxed">
                  Press 'Simulate' to create a CPI graph and compare it with
                  baseline data.
                </p>
              </div>
            </div>
          </div>
        </div>

        <Link href="https://optimism.daocpi.com/" target='_blank'>
          <button
            className="mt-6 flex flex-row button-50 justify-center items-center font-redhat font-semibold text-xl"
            aria-label="add-percentage"
          >
            <span className="ml-4 pr-2 drop-shadow-custom">
              Start Simulation
            </span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default AddPercentage;
