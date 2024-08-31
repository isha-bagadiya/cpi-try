// File: components/home/HeroSection.tsx

import React from 'react';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import hero2 from "@/public/assets/images/hero2.png";
import arrow from "@/public/assets/images/pixelarticons_arrow-up.svg";
import cb1 from "@/public/assets/images/mask_grp_1.svg";
import cb2 from "@/public/assets/images/mask_grp_1.svg";
import Link from 'next/link';

const HeroSection: React.FC = () => {
    return (
        <section className="relative bg-dark-gray text-white min-h-[700px] h-screen">
            <div className="container mx-auto pt-10 w-[85%] md:px-auto flex flex-col">
                <div className='font-mori font-semibold md:text-8xl lg:text-10xl relative z-30 text-[#FFFCE1]' >
                    Concentration of
                </div>
                <div className=' z-30 flex flex-row items-center text-[#FFFCE1] ml-24'>
                    <Link className='button-50 heroarrowbtn flex flex-row justify-center items-center font-redhat font-semibold text-2xl' href="/explore">
                        <span className='ml-4 drop-shadow-custom' >Explore Index</span>
                        <Image src={arrow} alt='arrow icon' className='inline border border-white rounded-full bg-[#FF0E00] p-3' width={50} height={50} />
                    </Link>
                    <div className='font-mori font-semibold md:text-8xl lg:text-10xl'>
                        P
                        <Image src={hero2} alt='icon' className='inline' />
                        wer Index</div>
                </div >
                <div className='font-mori font-semibold md:text-8xl lg:text-10xl z-30 flex flex-row justify-between text-[#FFFCE1]'>
                    in DAOs
                    <div className='relative block flex justify-center items-center text-center max-w-[50%]'>
                        <Image src={cb1} alt="curly bracket" className='absolute inline rotate-180 left-0' />
                        <p className='font-normal text-[1.2rem] text-white max-w-[80%] break-word tracking-normal leading-8'>Tracking and analyzing the distribution of influence within decentralized governance structures</p>
                        <Image src={cb2} alt="curly bracket" className='absolute inline right-0' />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;