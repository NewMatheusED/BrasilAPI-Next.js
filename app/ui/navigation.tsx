import Link from "next/link";
import { BsBank2 } from "react-icons/bs";
import { FaMapMarkerAlt, FaPhone } from "react-icons/fa";

const Navigation = () => {

    const links = [
        {name: 'CEP', path: '/cep', icon:  <FaMapMarkerAlt />},
        {name: 'Bank', path: '/bank', icon: <BsBank2 />},
        {name: 'DDD', path: '/ddd', icon: <FaPhone />}
    ]

    return (
        <nav className="flex flex-row gap-4 w-full">
            {links.map((link) => (
                <Link
                    href={link.path}
                    key={link.name}
                    className={'bg-slate-600 tx-slate-100 p-2 rounded hover:bg-slate-500 w-1/6 text-center flex flex-col items-center justify-center gap-2 transition-all text-lg'}
                >
                    {link.icon}
                    {link.name}
                </Link>
        ))}
        </nav>
    );
};

export default Navigation;