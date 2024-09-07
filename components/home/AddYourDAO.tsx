import Image from "next/image";
import img from "@/public/assets/images/plus_icon.svg"
import img2 from "@/public/assets/images/img2.png"

const AddYourDAO: React.FC = () => {
    return (
        <div className="bg-black relative flex items-center justify-center mb-10 overflow-x-hidden">
            <div className="relative z-50 container mx-auto flex flex-col items-center justify-center min-h-[400px]">
                <h1 className="font-mori max-w-[90%] font-semibold text-2.5xl md:text-5xl">Got a DAO? Let's Track It!</h1>
                <button
                    className='mt-8 flex flex-row button-50 justify-center items-center font-redhat font-semibold text-xl mr-8'
                    aria-label="add-your-dao">
                    <span className='ml-4 pr-2 drop-shadow-custom' >Add Your DAO</span>
                    <Image src={img} alt='arrow icon' className='rounded-full bg-[#957BFF] p-1' width={30} height={30} />
                </button>
            </div>
            <Image src={"/assets/images/img2.png"} fill={true} className="absolute object-cover" alt="background image" />
        </div>
    )
}

export default AddYourDAO;