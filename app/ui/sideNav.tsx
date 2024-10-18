import Link from 'next/link'

export default function SideNav() {
    return (
        <nav className="bg-zinc-700 text-zinc-100 h-screen w-64 p-4">
            <div className="space-y-4 flex flex-col gap-1">
                <Link className="hover:bg-zinc-600 p-2 rounded" href="/">Home</Link>
                <Link className="hover:bg-zinc-600 p-2 rounded" href="/cpf">CPF</Link>
                <Link className="hover:bg-zinc-600 p-2 rounded" href="/cnpj">CNPJ</Link>
            </div>
        </nav>
    )
}