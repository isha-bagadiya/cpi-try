import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import hero1 from "@/public/assets/images/hero1.svg";

const Header = () => {
    return (
        <nav className="relative shadow-md h-[150px] bg-dark-gray">
            <div className="mx-auto px-4">
                <div className="flex justify-between items-center h-36 overflow-visible">
                    <div className="flex-shrink-0 flex items-center ">
                        <Link href="/">
                            <Image
                                src="/assets/images/CoPI.svg"
                                alt="Logo"
                                width={310}
                                height={50}
                                className="cursor-pointer"
                            />
                        </Link>
                    </div>

                </div>
            </div>
            <div className="absolute z-20 top-0 right-0">
                <Image
                    src={hero1}
                    alt="Hero background"
                    className=''
                    priority
                />
            </div>
        </nav>
    );
};

export default Header;