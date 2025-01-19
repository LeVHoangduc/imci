'use client';

import { useState, useCallback } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
import { validateCitizenId, validatePassword, validatePhone, validateUsername } from '@/utils/regex';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://imci-db.onrender.com';

interface FormState {
    name: string;
    username: string;
    phone: string;
    password: string;
    citizenId: string;
}

interface FormErrors {
    username: string;
    phone: string;
    password: string;
    citizenId: string;
}

const initialFormState: FormState = {
    name: '',
    username: '',
    phone: '',
    password: '',
    citizenId: '',
};

const initialErrors: FormErrors = {
    username: '',
    phone: '',
    password: '',
    citizenId: '',
};

export default function SignUp() {
    const [formData, setFormData] = useState<FormState>(initialFormState);
    const [errors, setErrors] = useState<FormErrors>(initialErrors);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setErrors(prev => ({ ...prev, [name]: '' })); // Clear error on input change
    }, []);

    const handleSubmit = useCallback(
        async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();

            // Validate inputs
            const usernameError = validateUsername(formData.username);
            const phoneError = validatePhone(formData.phone);
            const passwordError = validatePassword(formData.password);
            const citizenIdError = validateCitizenId(formData.citizenId);

            if (usernameError || phoneError || passwordError || citizenIdError) {
                setErrors({
                    username: usernameError,
                    phone: phoneError,
                    password: passwordError,
                    citizenId: citizenIdError,
                });
                return;
            }

            setIsLoading(true);

            try {
                const res = await axios.post(`${API_BASE_URL}/users`, {
                    name: formData.name,
                    username: formData.username,
                    phone: formData.phone,
                    password: formData.password,
                    citizenId: formData.citizenId,
                });

                if (res.status === 201) {
                    toast.success('Đăng ký thành công!');
                    setTimeout(() => {
                        router.push('/login');
                    }, 1000);
                }
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    const message = error.response?.data?.message || error.message;
                    toast.error(`Đăng ký thất bại: ${message}`);
                } else {
                    toast.error('Đăng ký thất bại: Lỗi không xác định');
                }
            } finally {
                setIsLoading(false);
            }
        },
        [formData, router]
    );

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-md mx-auto p-6 border border-gray-300 rounded-lg bg-white shadow-md"
        >
            <InputField
                label="Họ và tên"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
            />
            <InputField
                label="Tên người dùng"
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                error={errors.username}
            />
            <InputField
                label="Số điện thoại"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                error={errors.phone}
            />
            <InputField
                label="Căn cước công dân"
                type="text"
                name="citizenId"
                value={formData.citizenId}
                onChange={handleChange}
                required
                error={errors.citizenId}
            />
            <InputField
                label="Mật khẩu"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                error={errors.password}
            />
            <button
                type="submit"
                className={`w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300 ${
                    isLoading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={isLoading}
            >
                {isLoading ? 'Đang đăng ký...' : 'Đăng ký'}
            </button>

            <p className="mt-4">
                Đã có tài khoản.{' '}
                <span className="font-black hover:cursor-pointer text-blue-600" onClick={() => router.push('/login')}>
                    Đăng nhập
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
    error?: string;
}

const InputField: React.FC<InputFieldProps> = ({
    label,
    type,
    name,
    value,
    onChange,
    required = false,
    error = '',
}) => (
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
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                error ? 'border-red-500' : 'border-gray-300'
            }`}
        />
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
);
