'use client';

import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
import { validateCitizenId, validatePassword, validatePhone, validateUsername } from '@/utils/regex';

const initialErrors = {
    username: '',
    phone: '',
    password: '',
    citizenId: '',
};

export default function SignUp() {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [citizenId, setCitizenId] = useState('');
    const [errors, setErrors] = useState(initialErrors);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const usernameError = validateUsername(username);
        const phoneError = validatePhone(phone);
        const passwordError = validatePassword(password);
        const citizenIdError = validateCitizenId(citizenId);

        if (usernameError || phoneError || passwordError || citizenIdError) {
            setErrors({
                username: usernameError,
                phone: phoneError,
                password: passwordError,
                citizenId: citizenIdError,
            });
            return;
        }

        try {
            const res = await axios.post('https://imci-db.onrender.com/users', {
                name,
                username,
                phone,
                password,
                citizenId,
            });
            if (res.status === 201) {
                toast.success('Đăng ký thành công!');
                setTimeout(() => {
                    router.push('/login');
                }, 1000);
            }
        } catch (error) {
            const errorMessage = axios.isAxiosError(error) ? error.message : String(error);
            toast.error('Đăng ký thất bại: ' + errorMessage);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-md mx-auto p-6 border border-gray-300 rounded-lg bg-white shadow-md"
        >
            <InputField label="Họ và tên" type="text" value={name} onChange={setName} required />
            <InputField
                label="Tên người dùng"
                type="text"
                value={username}
                onChange={setUsername}
                required
                error={errors.username}
            />
            <InputField
                label="Số điện thoại"
                type="tel"
                value={phone}
                onChange={setPhone}
                required
                error={errors.phone}
            />
            <InputField
                label="Căn cước công dân"
                type="text"
                value={citizenId}
                onChange={setCitizenId}
                required
                error={errors.citizenId}
            />
            <InputField
                label="Mật khẩu"
                type="password"
                value={password}
                onChange={setPassword}
                required
                error={errors.password}
            />
            <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
                Đăng ký
            </button>

            <p className="mt-4">
                Đã có tài khoản.{' '}
                <span
                    className="font-black hover:cursor-pointer"
                    onClick={() => {
                        router.push('/login');
                    }}
                >
                    Đăng nhập
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
    error?: string;
}

const InputField: React.FC<InputFieldProps> = ({ label, type, value, onChange, required = false, error = '' }) => (
    <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">{label}:</label>
        <input
            title="input"
            type={type}
            value={value}
            onChange={e => onChange(e.target.value)}
            required={required}
            className={`w-full px-3 py-2 border rounded-md ${error ? 'border-red-500 ' : 'border-gray-300'}`}
        />
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
);
