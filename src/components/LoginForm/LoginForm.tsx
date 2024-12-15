'use client';

import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/provider/AuthProvider';
import { IUser } from '@/utils/type';

export default function LoginForm() {
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();
    const { login } = useAuth();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const res = await axios.get(`http://localhost:5000/users?identifier=${identifier}&password=${password}`);
            const user = res.data.find((user: IUser) => user.username === identifier && user.password === password);
            if (res.data.length > 0) {
                toast.success('Đăng nhập thành công!');
                login(user.name);
                setTimeout(() => {
                    router.push('/');
                }, 1000);
            } else {
                toast.error('Tài khoản hoặc mật khẩu không đúng!');
            }
        } catch (error) {
            const errorMessage = axios.isAxiosError(error) ? error.message : String(error);
            toast.error('Đăng nhập thất bại: ' + errorMessage);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-md mx-auto p-6 border border-gray-300 rounded-lg bg-white shadow-md"
        >
            <InputField
                label="Tên người dùng hoặc Số điện thoại"
                type="text"
                value={identifier}
                onChange={setIdentifier}
                required
            />
            <InputField label="Mật khẩu" type="password" value={password} onChange={setPassword} required />
            <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
                Đăng nhập
            </button>

            <p className="mt-4">
                Chưa có tài khoản.{' '}
                <span
                    className="font-black"
                    onClick={() => {
                        router.push('/signup');
                    }}
                >
                    Đăng ký
                </span>
            </p>
        </form>
    );
}

interface InputFieldProps {
    label: string;
    type: string;
    value: string;
    onChange: (value: string) => void;
    required?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({ label, type, value, onChange, required = false }) => (
    <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">{label}:</label>
        <input
            title="input"
            type={type}
            value={value}
            onChange={e => onChange(e.target.value)}
            required={required}
            className="w-full px-3 py-2 border rounded-md border-gray-300"
        />
    </div>
);
