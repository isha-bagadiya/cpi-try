"use client";
import Image from "next/image";
import img from "@/public/assets/images/plus_icon.svg";
import bg from "@/public/assets/images/influencebg.svg";
import Experience from "../ui/Experiment";
import Link from "next/link";

const AddPercentage: React.FC = () => {
  return (
    <div className="bg-dark-gray pb-[150px] w-full relative">
      <div className="absolute right-0 -top-[50px] h-[430px] z-10">
        <Image src={bg} alt="bg-image" className="h-full w-auto"></Image>
      </div>
      <div className="bg-[#15141408] backdrop-blur-[215.2px] flex flex-col items-center justify-center py-10 w-[65%] h-[400px] mx-auto rounded-[63px] border border-[#FEC5FB] relative z-20">
        <h1 className="font-mori max-w-[90%] text-xl md:text-2.5xl text-center text-[#F3FD9D]">
          Add the influence for each HCCs!
        </h1>
        <Link href="/influence">
          <button
            className="mt-8 flex flex-row button-50 justify-center items-center font-redhat font-semibold text-xl mr-8"
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
