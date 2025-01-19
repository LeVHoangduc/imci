'use client';

import { useState, useCallback } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/provider/AuthProvider';
import { IUser } from '@/utils/type';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://imci-db.onrender.com';

export default function LoginForm() {
    const [credentials, setCredentials] = useState({ identifier: '', password: '' });
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const { login } = useAuth();

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCredentials(prev => ({ ...prev, [name]: value }));
    }, []);

    const handleSubmit = useCallback(
        async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            setIsLoading(true);

            try {
                // Sử dụng GET với query parameters như ban đầu
                const res = await axios.get(`${API_BASE_URL}/users`, {
                    params: {
                        identifier: credentials.identifier,
                        password: credentials.password,
                    },
                });

                const user = res.data.find(
                    (user: IUser) => user.username === credentials.identifier && user.password === credentials.password
                );
                if (user) {
                    toast.success('Đăng nhập thành công!');
                    login(user.name);
                    router.push('/');
                } else {
                    toast.error('Tài khoản hoặc mật khẩu không đúng!');
                }
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    const message = error.response?.data?.message || error.message;
                    toast.error(`Đăng nhập thất bại: ${message}`);
                } else {
                    toast.error('Đăng nhập thất bại: Lỗi không xác định');
                }
            } finally {
                setIsLoading(false);
            }
        },
        [credentials, login, router]
    );

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-md mx-auto p-6 border border-gray-300 rounded-lg bg-white shadow-md"
        >
            <InputField
                label="Tên người dùng hoặc Số điện thoại"
                type="text"
                name="identifier"
                value={credentials.identifier}
                onChange={handleChange}
                required
            />
            <InputField
                label="Mật khẩu"
                type="password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                required
            />
            <button
                type="submit"
                className={`w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 ${
                    isLoading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={isLoading}
            >
                {isLoading ? 'Đang đăng nhập...' : 'Đăng nhập'}
            </button>

            <p className="mt-4">
                Chưa có tài khoản.{' '}
                <span className="font-black hover:cursor-pointer text-blue-600" onClick={() => router.push('/signup')}>
                    Đăng ký
                </span>
            </p>
        </form>
    );
}

interface InputFieldProps {
    label: string;
    type: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({ label, type, name, value, onChange, required = false }) => (
    <div className="mb-4">
        <label htmlFor={name} className="block text-gray-700 font-bold mb-2">
            {label}:
        </label>
        <input
            id={name}
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            required={required}
            className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
    </div>
);
