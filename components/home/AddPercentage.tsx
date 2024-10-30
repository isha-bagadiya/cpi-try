"use client";
import Image from "next/image";
import bg from "@/public/assets/images/influencebg.png";
import Link from "next/link";
import { IoInformationCircleOutline } from "react-icons/io5";
import { useState } from "react";
import { FaCircleChevronRight } from "react-icons/fa6";

const AddPercentage: React.FC = () => {
  const [activeTooltip, setActiveTooltip] = useState<boolean | null>(false);

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
      <div className="bg-[#15141408] backdrop-blur-[215.2px] flex flex-col items-center justify-center p-7 sm:p-10 w-[80%] sm:w-[65%] h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] mx-auto rounded-[63px] border border-[#FEC5FB] relative z-20">
        <div className="flex justify-center items-center gap-4 w-[90%]">
          <h1 className="font-mori max-w-[90%] text-xl md:text-2xl lg:text-2.5xl text-center text-[#F3FD9D]">
            Add Influence for each HCCs
          </h1>
          <div className="relative">
            <div
              className="text-[#F3FD9D] hover:text-[#FFD366] transition-colors cursor-pointer text-[35px]"
              onMouseEnter={() => setActiveTooltip(true)}
              onMouseLeave={() => setActiveTooltip(false)}
            >
              <IoInformationCircleOutline />
            </div>
            {activeTooltip && (
              <div className="absolute z-10 w-72 p-2 bg-[#222222] text-white text-xs rounded-lg shadow-lg -left-14 top-12 border border-[#FEC5FB]">
                <h1 className="font-semibold text-[#FEC5FB]">Instructions: </h1>
                <p className="flex items-start gap-2 text-wrap">
                  <span className="text-[8px] mt-3">
                    <FaCircleChevronRight />
                  </span>
                  Get Started: Click the Add Here button to access the CPI
                  Simulator page.
                </p>
                <p className="flex items-start gap-2 text-wrap">
                  <span className="text-[8px] mt-3">
                    <FaCircleChevronRight />
                  </span>
                  Add Influence: On the Simulator page, enter the influence
                  percentages for each HCC in the input fields.
                </p>
                <span className="text-[10px] text-[#FEC5FB]">
                  Note: Ensure the total percentage across all HCCs equals 100.
                </span>

                <p className="flex items-start gap-2 text-wrap">
                  <span className="text-[8px] mt-3">
                    <FaCircleChevronRight />
                  </span>
                  Generate Graph: Click the Simulate button to generate a CPI
                  temporal graph based on your inputs, displayed alongside the
                  baseline graph for comparison.
                </p>
              </div>
            )}
          </div>
        </div>
        <Link href="http://cpi.lamproslabs.io/">
          <button
            className="mt-6 flex flex-row button-50 justify-center items-center font-redhat font-semibold text-xl"
            aria-label="add-percentage"
          >
            <span className="ml-4 pr-2 drop-shadow-custom">Add Here</span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default AddPercentage;
