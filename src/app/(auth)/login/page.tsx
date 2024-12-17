import LoginForm from '@/components/LoginForm/LoginForm';

export default function LoginPage() {
    return (
        <div className="flex flex-col items-center justify-center mt-5">
            <h2 className="uppercase font-bold mb-5 text-center">Đăng Nhập</h2>
            <LoginForm />
        </div>
    );
}
