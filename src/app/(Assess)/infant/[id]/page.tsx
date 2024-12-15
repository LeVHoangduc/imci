'use client';
import { useParams } from 'next/navigation';

const Page = () => {
    const { id } = useParams();

    return (
        <div className="bg-gray-200 p-4 h-screen">
            <h2 className="font-bold">Các dấu hiệu của bệnh {id === 'ho' ? 'Ho' : 'Tiêu chảy'}</h2>
            <div></div>
        </div>
    );
};

export default Page;
