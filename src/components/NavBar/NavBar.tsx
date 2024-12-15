'use client';

import Image from 'next/image';
import { useAuth } from '@/provider/AuthProvider';
import { usePathname } from 'next/navigation';
import { ArrowLeft, CircleUser, LogOut } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const NavBar = () => {
    const pathname = usePathname();
    const router = useRouter();
    const { isLoggedIn, user, logout } = useAuth();

    return (
        <div className="flex w-full p-4 bg-[#03DAC5] justify-between items-center">
            <div className="flex gap-5 items-center">
                {pathname === '/' && <Image src="/logo.png" width={40} height={40} alt="logo" />}

                {pathname !== '/' && <ArrowLeft onClick={() => router.back()} />}

                <p className="font-bold text-lg">IMCI</p>
            </div>

            {!isLoggedIn ? (
                <Link href="/login">
                    <CircleUser className="size-10 text-white" />
                </Link>
            ) : (
                <div className="flex gap-4">
                    <p className="font-bold">Xin chào {user}</p>
                    <button title="button" onClick={logout}>
                        <LogOut />
                    </button>
                </div>
            )}
        </div>
    );
};

export default NavBar;
