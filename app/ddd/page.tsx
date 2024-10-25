'use client';

import { useEffect, useState } from 'react';
import { getDDD } from '../data/api';
import Container from '../ui/container';
import HeaderTitle from '../ui/headerTitle';
import ErrorMessage from '../ui/errorMessage';
import InputField from '../ui/inputField';
import LoadingIndicator from '../ui/loadingMessage';
import InfoMessage from '../ui/infoMessage';

interface DddData {
    state: string;
    cities: string[];
}

export default function Ddd() {
    const [ddd, setDdd] = useState('');
    const [dddData, setDddData] = useState<DddData | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [info, setInfo] = useState('Digite o DDD');

    useEffect(() => {
        async function fetchDDDData() {
            setLoading(true);
            setError('');
            setInfo('');

            try {
                const data = await getDDD(ddd);
                setDddData(data);
            } catch (error) {
                if (error instanceof Error) {
                    setError(error.message);
                } else {
                    setError('Erro desconhecido ao buscar DDD');
                }
            } finally {
                setLoading(false);
            }
        }

        if (ddd.length === 2) {
            fetchDDDData();
        } else if (ddd.length > 2) {
            setInfo('DDD deve conter 2 dígitos');
            setDddData(null);
            setError('');
        } else {
            setInfo('Digite o DDD');
            setDddData(null);
            setError('');
        }
    }, [ddd]); // Adicione a lista de dependências aqui

    return (
        <Container>
            <HeaderTitle title="DDD" />
            <InputField
                value={ddd}
                onChange={(e) => setDdd(e.target.value)}
                placeholder="Digite o DDD"
            />
            {loading && <LoadingIndicator message="Buscando informações do DDD..." />}
            {error && <ErrorMessage message={error} />}
            {info && <InfoMessage message={info} />}
            {dddData && (
                <div className="list-container">
                    <h1 className='sticky top-0 bg-zinc-800 p-4'>Estado: {dddData.state}</h1>
                    <p>Cidades:</p>
                    <ul className="list-disc list-inside space-y-1 h-full overflow-auto">
                        {dddData.cities.map((city, index) => (
                            <li key={index}>
                                {city}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </Container>
    );
}