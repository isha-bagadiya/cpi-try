'use client'
import React from 'react';
import Image from 'next/image';
import hero1 from "@/public/assets/images/hero1.svg";
import { usePathname } from 'next/navigation';



const HeaderImage = () => {
    const pathname = usePathname()

    if (pathname !== '/') {
        return null;
    }

    return (
        <div className="absolute z-20 top-0 right-0">
            <Image
                src={hero1}
                alt="Hero background"
                className=''
                priority
            />
        </div>
    );
};

export default HeaderImage;