'use client';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/provider/AuthProvider';

const InfantPage = () => {
    const router = useRouter();
    const { isLoggedIn } = useAuth();
    if (isLoggedIn === false) {
        router.push('/');
    }

    const childData = [
        { id: 'ho', title: 'Ho' },
        { id: 'tieuchay', title: 'Tiêu chảy' },
    ];

    const handleSelectIll = (id: string) => {
        router.push(`/infant/${id}`);
    };

    return (
        <div className="pt-5 px-5 bg-gray-200 h-screen">
            <h2 className="font-bold text-gray-500 text-lg">Chẩn đoán</h2>

            <div className="mt-2 flex flex-col gap-2">
                {childData.map(data => (
                    <button
                        onClick={() => handleSelectIll(data.id)}
                        key={data.id}
                        className=" p-3 rounded bg-white border w-full text-start hover:cursor-pointer"
                    >
                        {data.title}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default InfantPage;
