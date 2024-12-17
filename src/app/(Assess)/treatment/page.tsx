'use client';
import { useAuth } from '@/provider/AuthProvider';
import { useRouter } from 'next/navigation';

const Page = () => {
    const { isLoggedIn, treatment } = useAuth();
    const router = useRouter();
    if (isLoggedIn === false) {
        router.push('/');
    }

    const ill1 = [
        {
            id: 1,
            text: 'Nếu trẻ có các phân loại bệnh nặng khác: chuyển GẤP đi bệnh viện. Nhắc mẹ cho uống liên tục từng thìa ORS trên đường đi và tiếp tục cho bú.',
        },
        { id: 2, text: 'Nếu trẻ không có các phân loại bệnh nặng khác: bù dịch đối với mất nước nặng (Phác đồ C)' },
        { id: 3, text: 'Nếu trẻ 2 tuổi hoặc lớn hơn và đang có dịch tả tại địa phương, cho một liều kháng sinh' },
    ];

    const ill2 = [
        {
            id: 1,
            text: 'Nếu trẻ có các phân loại bệnh nặng khác: chuyển GẤP đi bệnh viện. Nhắc mẹ cho uống liên tục từng thìa ORS trên đường đi và tiếp tục cho bú.',
        },
        { id: 2, text: 'Bù dịch và cho ăn theo phác đồ B' },
        { id: 3, text: 'Bổ sung kẽm' },
        { id: 4, text: 'Dặn mẹ khi nào cần đưa trẻ đến khám ngay' },
        { id: 5, text: 'Khám lại sau 5 ngày nếu không tiến triển tốt' },
    ];

    const ill3 = [
        { id: 1, text: 'Uống thêm dịch và cho ăn theo phác đồ A' },
        { id: 2, text: 'Bổ sung kẽm' },
        { id: 3, text: 'Dặn mẹ khi nào cần đưa trẻ đến khám ngay' },
        { id: 4, text: 'Khám lại sau 5 ngày nếu không tiến triển tốt' },
    ];

    const ill4 = [
        { id: 1, text: 'Điều trị mất nước trước khi chuyển trừ trường hợp có phân loại nặng khác' },
        { id: 2, text: 'Chuyển đi bệnh viện' },
    ];

    const ill5 = [
        { id: 1, text: 'Khuyên mẹ cách nuôi dưỡng trẻ tiêu chảy kéo dài' },
        { id: 2, text: 'Khám lại sau 5 ngày' },
    ];

    const ill6 = [
        { id: 1, text: 'Cho kháng sinh thích hợp đối với lỵ' },
        { id: 2, text: 'Khám lại sau 2 ngày' },
    ];

    const renderSteps = () => {
        switch (treatment) {
            case '1':
                return ill1.map(step => (
                    <li className="" key={step.id}>
                        {step.text}
                    </li>
                ));
            case '2':
                return ill2.map(step => (
                    <li className="" key={step.id}>
                        {step.text}
                    </li>
                ));
            case '3':
                return ill3.map(step => (
                    <li className="" key={step.id}>
                        {step.text}
                    </li>
                ));
            case '4':
                return ill4.map(step => (
                    <li className="" key={step.id}>
                        {step.text}
                    </li>
                ));
            case '5':
                return ill5.map(step => (
                    <li className="" key={step.id}>
                        {step.text}
                    </li>
                ));
            case '6':
                return ill6.map(step => (
                    <li className="" key={step.id}>
                        {step.text}
                    </li>
                ));
            default:
                return null;
        }
    };

    return (
        <div className="bg-gray-200 h-screen p-3 mx-auto">
            <h2 className="font-bold">CÁCH ĐIỀU TRỊ :</h2>

            <ul className="mt-5 list-disc list-inside flex flex-col gap-4">{renderSteps()}</ul>
        </div>
    );
};

export default Page;
