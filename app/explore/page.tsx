import DataTable from "@/components/common/DataTable";
import FilterButtons from "@/components/common/FilterButtons";
import Header from "@/components/layout/Header";
import { getItem, getItemCompound, getItemsAave, getItemsUniswap } from "@/lib/utils/fetchDataOnServer";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import arrow from "@/public/assets/images/pixelarticons_arrow-up.svg";
import OptimismDataTable from "@/components/common/OptimismDataTable";
import path from 'path';
import { promises as fs } from 'fs';

interface explorePageProps {
    searchParams: { [key: string]: string | string[] | undefined };
}

const explore: React.FC<explorePageProps> = async ({ searchParams }) => {

    const activeFilters = (searchParams.filter as string)?.split(',') || ['All'];

    const isVisible = (component: string): boolean => {
        return activeFilters.includes('All') || activeFilters.includes(component);
    };

    // let initialDataOptimism = [];
    // let initialDataAave = [];
    // let initialUniswapData = [];
    // let initialCompoundData = [];

    // try {
    //     initialDataOptimism = await getItem();
    //     if (isVisible('Aave')) initialDataAave = await getItemsAave();
    //     if (isVisible('Uniswap')) initialUniswapData = await getItemsUniswap();
    //     if (isVisible('Compound')) initialCompoundData = await getItemCompound();
    // } catch (error) {
    //     console.error("Error fetching data:", error);
    // }

    const jsonDirectory = path.join(process.cwd(), 'public');
    const fileContentAave = await fs.readFile(jsonDirectory + '/aave_delegates.json', 'utf8');
    const initialDataAave = JSON.parse(fileContentAave);

    const fileContentUniswap = await fs.readFile(jsonDirectory + '/uniswap_delegates.json', 'utf8');
    const initialUniswapData = JSON.parse(fileContentUniswap);

    const fileContentCompound = await fs.readFile(jsonDirectory + '/compound_delegates.json', 'utf8');
    const initialCompoundData = JSON.parse(fileContentCompound);


    return <div className="bg-dark-gray">
        <Header />
        <div className="container mx-auto mt-8 pb-4 flex flex-col bg-dark-gray">
            <h1 className="font-mori font-semibold text-[#fffce1] text-2xl md:text-4xl lg:text-6xl tracking-tight text-center my-6 md:my-12">All Delegates</h1>
            <FilterButtons />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 m-4 md:gap-8 md:m-8 min-h-[100vh]">
                {/* {isVisible('Optimism') && (
                    <div className="custom-scrollbar">
                        <Suspense fallback={<>Loading...</>}>
                            <DataTable initialData={initialDataOptimism} background="bg-optimism" platform="optimism" member={true} iconURL="/assets/images/op_small.svg" />
                        </Suspense>
                    </div>
                )} */}
                {isVisible('Aave') && (
                    <div className="custom-scrollbar">
                        <Suspense fallback={<>Loading...</>}>
                            {/* <DataTable initialData={initialDataAave} background="bg-gradient-aave" platform="aave" member={false} iconURL="/assets/images/aave_small.svg" /> */}
                            <OptimismDataTable initialData={initialDataAave} background="bg-gradient-aave" platform="aave" member={false} iconURL="/assets/images/aave_small.svg" />

                        </Suspense>
                    </div>
                )}
                {isVisible('Compound') && (
                    <div className="custom-scrollbar">
                        <Suspense fallback={<>Loading...</>}>
                            {/* <DataTable initialData={initialCompoundData} background="bg-compound" platform="compound" member={false} iconURL="/assets/images/compound_small.svg" /> */}
                            <OptimismDataTable initialData={initialCompoundData} background="bg-compound" platform="compound" member={false} iconURL="/assets/images/compound_small.svg" />
                        </Suspense>
                    </div>
                )}
                {isVisible('Uniswap') && (
                    <div className="custom-scrollbar">
                        <Suspense fallback={<>Loading...</>}>
                            {/* <DataTable initialData={initialUniswapData} background="bg-uniswap" platform="uniswap" member={false} iconURL="/assets/images/uniswap_small.svg" /> */}
                            <OptimismDataTable initialData={initialUniswapData} background="bg-uniswap" platform="uniswap" member={false} iconURL="/assets/images/uniswap_small.svg" />
                        </Suspense>
                    </div>
                )}
            </div>
            <div className="my-20 flex items-center justify-center">
                <Link className='flex flex-row button-50 heroarrowbtn max-w-max justify-center items-center font-redhat font-semibold text-xl mr-8' href="/explore/optimism">
                    <span className='ml-4 drop-shadow-custom' >OP Delegates</span>
                    <Image src={arrow} alt='arrow icon' className='border border-white rounded-full bg-[#FF0E00] p-3' width={50} height={50} />
                </Link>
            </div>
        </div>
    </div>;
}

export default explore;