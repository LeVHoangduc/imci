'use client';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAuth } from '@/provider/AuthProvider';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Page = () => {
    const { id } = useParams();
    const router = useRouter();
    const { isLoggedIn, setTreatment } = useAuth();
    if (isLoggedIn === false) {
        router.push('/');
    }

    const [diagnose, setDiagnose] = useState<number[]>([]);
    const [ill, setIll] = useState<string>('KHÔNG CÓ DẤU HIỆU');
    const [colorIll, setColorIll] = useState<string>('bg-gray-400');

    const signData = [
        { id: 1, text: 'Lì bì hoặc khó đánh thức' },
        { id: 2, text: 'Mắt trũng' },
        { id: 3, text: 'Không uống được hoặc uống kém' },
        { id: 4, text: 'Nếp véo da mất rất chậm' },
        { id: 5, text: 'Vật vã, kích thích' },
        { id: 6, text: 'Mắt trũng' },
        { id: 7, text: 'Uống háo hức, khát' },
        { id: 8, text: 'Nếp véo da mất chậm' },
        { id: 9, text: 'Không đủ các dấu hiệu để phân loại có mất nước hoặc mất nước nặng' },
        { id: 10, text: 'Có mất nước hoặc mất nước nặng' },
        { id: 11, text: 'Không mất nước' },
        { id: 12, text: 'Có máu trong phân' },
    ];

    const handleCheckboxClick = (dataId: number) => {
        setDiagnose(prevState =>
            prevState.includes(dataId) ? prevState.filter(id => id !== dataId) : [...prevState, dataId]
        );
    };

    const handleViewTreatment = () => {
        if (ill === 'MẤT NƯỚC NẶNG') {
            setTreatment('1');
            router.push('/treatment');
        } else if (ill === 'CÓ MẤT NƯỚC') {
            setTreatment('2');
            router.push('/treatment');
        } else if (ill === 'KHÔNG MẤT NƯỚC') {
            setTreatment('3');
            router.push('/treatment');
        } else if (ill === 'TIÊU CHẢY KÉO DÀI NẶNG') {
            setTreatment('4');
            router.push('/treatment');
        } else if (ill === 'TIÊU CHẢY KÉO DÀI') {
            setTreatment('5');
            router.push('/treatment');
        } else if (ill === 'LỴ') {
            setTreatment('6');
            router.push('/treatment');
        } else {
            toast.warning('Xin vui lòng chọn đúng dấu hiệu');
        }
    };

    useEffect(() => {
        const checkDiagnose = () => {
            const case1 = [1, 2, 3, 4];
            const case2 = [5, 6, 7, 8];

            const case3 = diagnose.filter(id => case1.includes(id)).length;
            const case4 = diagnose.filter(id => case2.includes(id)).length;

            if (case3 >= 2 && diagnose.length === case3) {
                setIll('MẤT NƯỚC NẶNG');
                setColorIll('bg-red-500');
            } else if (case4 >= 2 && diagnose.length === case4) {
                setIll('CÓ MẤT NƯỚC');
                setColorIll('bg-yellow-500');
            } else if (diagnose.length === 1) {
                switch (diagnose[0]) {
                    case 9:
                        setIll('KHÔNG MẤT NƯỚC');
                        setColorIll('bg-green-500');
                        break;
                    case 10:
                        setIll('TIÊU CHẢY KÉO DÀI NẶNG');
                        setColorIll('bg-blue-500');
                        break;
                    case 11:
                        setIll('TIÊU CHẢY KÉO DÀI');
                        setColorIll('bg-blue-200');
                        break;
                    case 12:
                        setIll('LỴ');
                        setColorIll('bg-yellow-200');
                        break;
                    default:
                        setIll('KHÔNG CÓ DẤU HIỆU');
                        setColorIll('bg-gray-400');
                        break;
                }
            } else {
                setIll('KHÔNG CÓ DẤU HIỆU');
                setColorIll('bg-gray-400');
            }
        };

        checkDiagnose();
    }, [diagnose]);

    return (
        <div className="bg-gray-200 h-screen">
            <div className={`${colorIll} flex flex-col justify-center items-center min-h-[200px] gap-10 px-10`}>
                <h1 className="text-white font-bold text-2xl">{ill}</h1>
                <button onClick={handleViewTreatment} className="bg-gray-500 p-3 w-full rounded-md font-bold">
                    VIEW TREATMENT
                </button>
            </div>

            <div className="p-4 bg-gray-200">
                <h2 className="font-bold">Các dấu hiệu của bệnh {id === 'ho' ? 'Ho' : 'Tiêu chảy'}</h2>
                <div>
                    {signData.map(data => (
                        <div key={data.id} className="p-3 border rounded-md bg-white mt-2">
                            <label className="flex gap-4">
                                <input type="checkbox" value={data.id} onClick={() => handleCheckboxClick(data.id)} />
                                {data.text}
                            </label>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Page;
