import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const HeaderImage = dynamic(() => import('./HeaderImage'), { ssr: false });

const Header = () => {
    return (
        <nav className="relative min-h-[100px] md:min-h-[150px] bg-dark-gray">
            <div className="px-4">
                <div className="flex justify-between items-center h-30 overflow-visible">
                    <div className="flex-shrink-0 flex items-center">
                        <Link href="/">
                            <Image
                                src="/assets/images/CoPI.svg"
                                alt="Logo"
                                width={300}
                                height={50}
                                className="cursor-pointer w-[200px] md:w-[300px] "
                            />
                        </Link>
                    </div>

                </div>
            </div>
            {/* <div className="absolute z-20 top-0 right-0">
                <Image
                    src={hero1}
                    alt="Hero background"
                    className=''
                    priority
                />
            </div> */}
            <HeaderImage />
        </nav>
    );
};

export default Header;