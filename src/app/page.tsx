import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-gray-200 h-screen pt-5 px-5 flex flex-col md:flex-row gap-10">
      <div className="flex flex-col w-full">
        <h2 className="font-bold text-gray-500">Assess and classify</h2>
        <div className="mt-5 flex w-full gap-4">
          <Link href="/infant" className="w-1/2 max-w-[300px] min-h-[150px]">
            <button
              type="button"
              className="flex flex-col items-center justify-center border rounded-lg bg-white p-4 cursor-pointer gap-4 h-full"
            >
              <Image src="/infant-icon.png" width={50} height={50} alt="" />
              <p className="">Sick young infant (up to 2 months old)</p>
            </button>
          </Link>

          <Link href="/child" className="w-1/2 max-w-[300px] min-h-[150px]">
            <button
              type="button"
              className="flex flex-col items-center justify-center border rounded-lg bg-white p-4 cursor-pointer gap-4 h-full"
            >
              <Image src="/children-icon.png" width={50} height={50} alt="" />
              <p className="">Sick child (2 months up to 5 years old)</p>
            </button>
          </Link>
        </div>
      </div>

      <div className="flex flex-col w-full">
        <h2 className="font-bold text-gray-500">Settings</h2>
        <div className="mt-5 flex w-full gap-4">
          <button
            type="button"
            className="w-1/2 flex flex-col items-center justify-center border rounded-lg bg-white p-4 cursor-pointer gap-4 h-full max-w-[300px] min-h-[150px]"
          >
            <Image src="/theme-icon.png" width={50} height={50} alt="" />
            <p className="">App Theme</p>
          </button>

          <button
            type="button"
            className="w-1/2 flex flex-col items-center justify-center border rounded-lg bg-white p-4 cursor-pointer gap-4 h-full max-w-[300px] min-h-[150px]"
          >
            <Image src="/children-icon.png" width={50} height={50} alt="" />
            <p className="">About</p>
          </button>
        </div>
      </div>
    </div>
  );
}
