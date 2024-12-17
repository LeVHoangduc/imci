'use client';
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

interface AuthContextType {
    user: string | null;
    login: (user: string) => void;
    logout: () => void;
    isLoggedIn: boolean;
    setIsLoggedIn: (value: boolean) => void;
    treatment: string;
    setTreatment: (value: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<string | null>('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [treatment, setTreatment] = useState<string>('');
    const router = useRouter();

    const login = (user: string) => {
        setUser(user);
        setIsLoggedIn(true);
    };

    const logout = () => {
        setUser(null);
        setIsLoggedIn(false);
        router.push('/');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, isLoggedIn, setIsLoggedIn, treatment, setTreatment }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
