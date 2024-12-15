import SignUp from '@/components/SignupForm/SignupForm';
import React from 'react';

const page = () => {
    return (
        <div className="p-4">
            <h2 className="uppercase font-bold mb-5 text-center">Đăng ký người dùng</h2>
            <SignUp />
        </div>
    );
};

export default page;
