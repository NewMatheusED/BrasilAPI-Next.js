import Navigation from "./ui/navigation";

export default function Home() {
    return (
        <div className="bg-zinc-800 text-zinc-100 h-screen p-6">
            <h1 className="text-3xl font-bold mb-6">Bem-vindo à Brasil API</h1>
            <p className="mb-4">Escolha uma das opções abaixo para começar:</p>
            <Navigation />
        </div>
    );
}