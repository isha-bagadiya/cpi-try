'use client'
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const Panels: React.FC = () => {
    const component = useRef<HTMLDivElement>(null); // Component ref
    const slider = useRef<HTMLDivElement>(null); // Slider/container ref

    useGSAP(() => {
        // Use GSAP's matchMedia for responsive animations
        let ctx = gsap.context(() => {
            let panels = gsap.utils.toArray(".panel") as HTMLElement[];

            // Media queries for responsiveness
            let mm = gsap.matchMedia();

            mm.add("(min-width: 768px)", () => {
                // Desktop/Tablet version - larger screens
                gsap.to(panels, {
                    xPercent: -100 * (panels.length - 1), // Move horizontally
                    ease: "none", // No easing for continuous scroll
                    scrollTrigger: {
                        trigger: slider.current, // The slider container is the scroll trigger
                        pin: true, // Pin the container
                        scrub: 1, // Smooth scrolling
                        snap: 1 / (panels.length - 1), // Snap to each panel
                        end: () => "+=" + slider.current!.offsetWidth, // End after the width of all panels is scrolled
                        markers: false, // Remove markers for production
                    },
                });
            });

            mm.add("(max-width: 767px)", () => {
                // Mobile version
                gsap.to(panels, {
                    xPercent: -100 * (panels.length - 1), // Move horizontally
                    ease: "none", // No easing for continuous scroll
                    scrollTrigger: {
                        trigger: slider.current, // The slider container is the scroll trigger
                        pin: true, // Pin the container
                        scrub: 1, // Smooth scrolling
                        snap: 1 / (panels.length - 1), // Snap to each panel
                        end: () => "+=" + slider.current!.scrollWidth, // End after the width of all panels is scrolled
                        markers: false, // Remove markers for production
                    },
                });
            });

        }, component);

        // Cleanup on component unmount
        return () => ctx.revert();
    }, { scope: component });


    return (
        <div ref={component} className="relative w-full bg-black">
            {/* Horizontal scroll container */}
            <div ref={slider} className="flex  min-h-[500px] h-screen overflow-hidden">
                <div className="panel min-w-[100vw] h-screen p-10 md:p-20 flex flex-col justify-center">
                    <div className="container  mx-auto">
                        <div className="p-5 mb-8 bg-custom-green rounded-xl w-max">
                            <h2 className="font-mori text-black text-[5vw] md:text-[3vw] leading-10 tracking-tighter font-bold">Delegates</h2>
                        </div>
                        <p className="font-mori font-normal tracking-tight text-xl md:text-[2vw] leading-6 md:leading-10 mt-8">Delegates are individuals or entities that are entrusted by token holders with voting power in DAO governance. Delegates play a critical role in representing the interests of the community, making decisions on their behalf in key governance matters. The distribution of voting power among delegates is crucial in determining the level of decentralization within the DAO.
                        </p>
                    </div>
                </div>
                <div className="panel min-w-[100vw] h-screen p-10 md:p-20 flex flex-col justify-center ">
                    <div className="container  mx-auto">
                        <div className="p-5 mb-8 bg-custom-pink rounded-xl w-max max-w-[80%]">
                            <h2 className="font-mori text-black text-[5vw] md:text-[3vw] leading-10 tracking-tighter font-bold">Modified Herfindahl-Hirschman Index (mHHI)</h2>
                        </div>
                        <p className="font-mori font-normal tracking-tight text-xl md:text-[2vw] leading-6 md:leading-10 mt-8">The Modified Herfindahl-Hirschman Index (mHHI) is a variation of the traditional HHI, specifically adapted to measure power concentration in DAOs like the Optimism Collective. The mHHI considers both the voting power of delegates and the influence exerted by various governance bodies. By calculating the weighted sum of squared voting power, it captures the level of decentralization, with a higher mHHI indicating more concentration (less decentralization) and a lower mHHI indicating greater decentralization.</p>
                    </div>
                </div>
                <div className="panel min-w-[100vw] h-screen p-10 md:p-20 flex flex-col justify-center">
                    <div className="container  mx-auto">
                        <div className="p-5 mb-8 bg-custom-orange rounded-xl w-max max-w-[80%]">
                            <h2 className="font-mori text-black text-[5vw] md:text-[3vw] leading-10 font-bold">Influence Factor</h2>
                        </div>
                        <p className="font-mori font-normal tracking-tight text-xl md:text-[2vw] leading-6 md:leading-10 mt-8">The Influence Factor represents the weight or importance assigned to each governance body in the mHHI calculation. This factor accounts for the varying levels of influence that different governance bodies have on decision-making. By incorporating the influence factor, the mHHI provides a more accurate measure of decentralization, recognizing that some bodies may have a stronger impact on governance than others.</p>
                    </div>
                </div>
                <div className="panel min-w-[100vw] h-screen p-10 md:p-20 flex flex-col justify-center">
                    <div className="container  mx-auto">
                        <div className="p-5 mb-8 bg-custom-green rounded-xl w-max max-w-[80%]">
                            <h2 className="font-mori text-black text-[5vw] md:text-[3vw] leading-10 tracking-tighter font-bold">Power Concentration</h2>
                        </div>
                        <p className="font-mori font-normal tracking-tight text-xl md:text-[2vw] leading-6 md:leading-10 mt-8">Power Concentration refers to the degree of centralization in a DAO. A high concentration of power suggests that decision-making is centralized among a few delegates or governance bodies, indicating lower decentralization. Conversely, a low concentration of power implies a more decentralized structure where decision-making authority is more evenly distributed across delegates. The mHHI captures this by measuring the sum of squared voting power, helping to quantify the level of decentralization in the Optimism Collective.</p>
                    </div>
                </div>
                <div className="panel min-w-[100vw] h-screen p-10 md:p-20 flex flex-col justify-center">
                    <div className="container  mx-auto">
                        <div className="p-5 mb-8 bg-custom-pink rounded-xl w-max max-w-[80%]">
                            <h2 className="font-mori text-black text-[5vw] md:text-[3vw] leading-10 tracking-tighter font-bold">Decentralized Autonomous Organization (DAO)</h2>
                        </div>
                        <p className="font-mori font-normal tracking-tight text-xl md:text-[2vw] leading-6 md:leading-10 mt-8">A Decentralized Autonomous Organization (DAO) is a self-governed entity that operates through blockchain-based smart contracts, allowing stakeholders to make decisions collectively without the need for centralized leadership. In a DAO, governance decisions such as protocol upgrades, funding allocations, and strategic directions are made by the community through transparent voting processes.
                        </p>
                    </div>
                </div>
                <div className="panel min-w-[100vw] h-screen p-10 md:p-20 flex flex-col justify-center">
                    <div className="container  mx-auto">
                        <div className="p-5 mb-8 bg-custom-orange rounded-xl w-max max-w-[80%]">
                            <h2 className="font-mori text-black text-[5vw] md:text-[3vw] leading-10 tracking-tighter font-bold">Retroactive Public Goods Funding</h2>
                        </div>
                        <p className="font-mori font-normal tracking-tight text-xl md:text-[2vw] leading-6 md:leading-10 mt-8">Retroactive Public Goods Funding is a unique governance initiative within the Optimism Collective, where funding is allocated to projects after they have demonstrated a positive impact on the ecosystem. This approach incentivizes and rewards contributions that have already proven their value to the community, fostering sustainable growth and development.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Panels;
