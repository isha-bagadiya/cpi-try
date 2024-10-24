"use client";
import Image from "next/image";
import bg from "@/public/assets/images/influencebg.png";
import Link from "next/link";

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
      <div className="bg-[#15141408] backdrop-blur-[215.2px] flex flex-col items-center justify-center p-7 sm:p-10 w-[80%] sm:w-[65%] h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] mx-auto rounded-[63px] border border-[#FEC5FB] relative z-20">
        <h1 className="font-mori max-w-[90%] text-xl md:text-2xl lg:text-2.5xl text-center text-[#F3FD9D]">
          Add Influence for each HCCs
        </h1>
        <Link href="/influence">
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
