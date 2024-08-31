// File: components/home/HeroSection.tsx

import React from 'react';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import hero2 from "@/public/assets/images/hero2.png"
import arrow from "@/public/assets/images/pixelarticons_arrow-up.svg"
import Link from 'next/link';

const HeroSection: React.FC = () => {
    return (
        <section className="relative bg-dark-gray text-white min-h-[700px] h-screen">
            <div className="container mx-auto py-12 px-12 md:px-auto flex flex-col">
                <div className='font-mori font-semibold md:text-8xl lg:text-10xl relative z-30 text-[#FFFCE1]'>
                    Concentration of
                </div>
                <div className=' z-30 flex flex-row items-center text-[#FFFCE1] ml-24'>
                    <Link className='button-50 heroarrowbtn flex flex-row justify-center items-center font-redhat font-semibold text-2xl' href="/explore">
                        <span className='ml-4 drop-shadow-custom' >Explore Index</span>
                        <Image src={arrow} alt='arrow icon' className='inline border border-white rounded-full bg-[#FF0E00] p-3' width={50} height={50} />
                    </Link>
                    <div className='font-mori font-semibold md:text-8xl lg:text-10xl'>P<Image src={hero2} alt='icon' className='inline' />wer Index</div>
                </div >
                <div className='font-mori font-semibold md:text-8xl lg:text-10xl z-30 flex flex-row text-[#FFFCE1] ml-24'>in DAOs <div>{ }</div></div>
            </div>
        </section>
    );
};

export default HeroSection;