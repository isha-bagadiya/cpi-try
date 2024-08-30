import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Header = () => {
    return (
        <nav className="bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex-shrink-0 flex items-center">
                        <Link href="/">
                            <Image
                                src="/api/placeholder/120/40"
                                alt="Logo"
                                width={120}
                                height={40}
                                className="cursor-pointer"
                            />
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Header;