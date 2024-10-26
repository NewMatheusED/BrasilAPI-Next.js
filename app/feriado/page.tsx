'use client';

import { useState, useEffect } from "react";
import { getFeriado } from "../data/api";
import Container from '../ui/container';
import HeaderTitle from '../ui/headerTitle';
import ErrorMessage from '../ui/errorMessage';
import InputField from '../ui/inputField';
import LoadingIndicator from '../ui/loadingMessage';
import InfoMessage from '../ui/infoMessage';

interface Feriado {
    date: string,
    name: string,
    type: string
}

function formatData(data: string) {
    const [year, month, day] = data.split('-');
    return `${day}/${month}/${year}`;
}

export default function Feriado() {
    const [feriadoData, setFeriadoData] = useState<Feriado[]>([]);
    const [feriado, setFeriado] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [info, setInfo] = useState('Digite um CEP');

    useEffect(() => {
        async function fetchFeriado() {
            setLoading(true);
            setError('');
            setInfo('');
            try {
                const data = await getFeriado(feriado);
                setFeriadoData(data);
            } catch (error) {
                if (error instanceof Error) {
                    setError(error.message);
                } else {
                    setError('Erro desconhecido ao buscar CEP');
                }
                setFeriadoData([]);
            } finally {
                setLoading(false);
            }
        }

        if (feriado.length === 4) {
            fetchFeriado();
        } else if (feriado.length > 4) {
            setError('Ano não pode ter mais de 4 dígitos');
            setFeriadoData([]);
            setInfo('');
        } else {
            setError('');
            setFeriadoData([]);
            setInfo('Digite o ano');
        }

    }, [feriado]);

    return (
        <Container>
            <HeaderTitle title='Feriado' />
            <InputField
                value={feriado}
                onChange={(e) => setFeriado(e.target.value)}
                placeholder="Digite um ano"
            />
            {loading && <LoadingIndicator message="Buscando informações do feriado..." />}
            {error && <ErrorMessage message={error} />}
            {info && <InfoMessage message={info} />}
            {feriadoData.length > 0 && (
                <ul>
                    {feriadoData.map((feriado, index) => (
                        <li key={index}>
                            <p className='flex gap-2'>
                                <span>{feriado.name}</span> -
                                <span className="dataFormated">{formatData(feriado.date)}</span> -
                                <span>{feriado.type}</span>
                            </p> 
                        </li>
                    ))}
                </ul>
            )}
        </Container>
    );
}