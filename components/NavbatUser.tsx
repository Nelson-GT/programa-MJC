"use client";
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { User } from "lucide-react";
import NavHeader from '@/components/ui/NavHeader';
import NavLink from '@/components/ui/NavLink';

const Navbar = () => {
    const [state, setState] = useState<boolean>(false);
    const menuBtnEl = useRef<HTMLButtonElement>(null) as React.RefObject<HTMLButtonElement>;

    const navigation = [
        { name: 'Sobre Nosotros', href: '/' },
        { name: 'Inscripción', href: '/registro' },
    ];

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent | Event) => {
        if (
            menuBtnEl.current &&
            !menuBtnEl.current.contains(e.target as Node)
        ) {
            setState(false);
        }
        };

        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    return (
        <header className="bg-[#721422] p-0 mb-12">
            <div className="custom-screen md:hidden">
                <NavHeader
                menuBtnEl={menuBtnEl}
                state={state}
                onClick={() => setState(!state)}
                />
            </div>
            <nav
                className={`bg-[#721422] p-0 md:text-sm md:static md:block ${
                state
                    ? 'absolute z-20 top-2 inset-x-4 shadow-lg rounded-xl border md:shadow-none md:border-none'
                    : 'hidden'
                }`}
            >
                <div className="custom-screen gap-x-20 items-center ml-10 md:flex">
                <NavHeader state={state} onClick={() => setState(!state)} />
                <div
                    className={`flex-1 items-center mt-8 mr-10 text-white text-lg md:font-medium md:mt-0 md:flex ${
                    state ? 'block' : 'hidden'
                    }`}
                >
                    <ul className="justify-center items-center space-y-6 md:flex md:space-x-6 md:space-y-0">
                    {navigation.map((item, idx) => (
                        <li key={idx} className="transform transition duration-100 hover:scale-105 text-sm">
                        <Link href={item.href} className="block font-bold" scroll={false} >
                            {item.name}
                        </Link>
                        </li>
                    ))}
                    </ul>
                    <div className="flex-1 gap-x-6 items-center justify-end mt-6 space-y-6 md:flex md:space-y-0 md:mt-0">
                    <NavLink
                        href="/login"
                        className="flex items-center justify-center gap-x-1 text-sm text-white font-bold bg-[#AD8A1F] hover:bg-[#9a7d08] active:bg-[#5e5026] md:inline-flex"
                    >
                        <User className='h-6 w-6'/>
                        Mi cuenta
                    </NavLink>
                    </div>
                </div>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;