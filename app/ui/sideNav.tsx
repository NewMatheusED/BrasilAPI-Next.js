'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaHome, FaMapMarkerAlt, FaPhone, FaBars } from 'react-icons/fa';
import { BsBank2 } from 'react-icons/bs';

export default function SideNav() {
    const [isExpanded, setIsExpanded] = useState(false);

    const links = [
        { name: 'Home', path: '/', icon: <FaHome /> },
        { name: 'CEP', path: '/cep', icon: <FaMapMarkerAlt /> },
        { name: 'Bank', path: '/bank', icon: <BsBank2 /> },
        { name: 'DDD', path: '/ddd', icon: <FaPhone /> }
    ];

    const pathname = usePathname();

    return (
        <nav className={`bg-zinc-700 text-zinc-100 h-screen p-4 transition-all duration-300 ${isExpanded ? 'w-64' : 'w-20'}`}>
            <div className="flex justify-end mb-4">
                <button onClick={() => setIsExpanded(!isExpanded)} className="bg-zinc-800 w-full p-2 text-zinc-100 m-auto text-xl">
                    <FaBars className="text-center m-auto" />
                </button>
            </div>
            <div className="space-y-4 flex flex-col gap-1">
                {links.map((link) => (
                    <Link
                        href={link.path}
                        key={link.name}
                        className={`hover:bg-zinc-600 p-2 rounded transition-all flex items-center gap-2 relative w-full ${pathname === link.path ? 'bg-zinc-600' : ''}`}
                    >
                        <div className={`${isExpanded ? '' : 'm-auto'} transition-all duration-300` }>{link.icon}</div>
                        <span className={`transition-opacity duration-300 absolute left-12 ${isExpanded ? 'opacity-100' : 'opacity-0'}`}>{link.name}</span>
                    </Link>
                ))}
            </div>
        </nav>
    );
}