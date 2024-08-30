import HomePage from "@/components/pages/Home";
import Image from "next/image";

export default function Home() {
  return (
    <main className="border border-2 border-red flex min-h-screen flex-col items-center">
      <div className="container border-2 border-red overflow-x-hidden">
        {/* <h1 className="bg-gradient-radial h-screen ">Hello <span className="text-[70px] border border-2 p-0 m-0">Nextjs</span> 14</h1>
        <button className="button-50" role="button">Button 50</button> */}
        <HomePage />
      </div>
    </main>
  );
}
