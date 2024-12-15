'use client';
import Image from 'next/image';
import { useAuth } from '@/provider/AuthProvider';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
    const { isLoggedIn } = useAuth();
    const router = useRouter();
    console.log(isLoggedIn);

    const handleToPageInfant = () => {
        if (isLoggedIn) {
            router.push('/infant');
        } else {
            toast.success('Vui lòng đăng nhập');
            router.push('/login');
        }
    };

    return (
        <div className="bg-gray-200 h-screen pt-5 px-5 flex flex-col md:flex-row gap-10">
            <div className="flex flex-col w-full">
                <h2 className="font-bold text-gray-500 uppercase">Đánh giá và phân loại</h2>
                <div className="mt-5 flex w-full gap-4">
                    <button
                        type="button"
                        className="w-1/2 max-w-[300px] min-h-[150px] flex flex-col items-center justify-center border rounded-lg bg-white p-4 cursor-pointer gap-4 h-full"
                        onClick={handleToPageInfant}
                    >
                        <Image src="/infant-icon.png" width={50} height={50} alt="" />
                        <p className="">Trẻ ốm (từ 2 tháng đến 12 tháng)</p>
                    </button>

                    <button
                        type="button"
                        className="w-1/2 max-w-[300px] min-h-[150px] flex flex-col items-center justify-center border rounded-lg bg-white p-4 cursor-pointer gap-4 h-full"
                    >
                        <Image src="/children-icon.png" width={50} height={50} alt="" />
                        <p className="">Trẻ ốm (từ 12 tháng đến 5 tuổi)</p>
                    </button>
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
