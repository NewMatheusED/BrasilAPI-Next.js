'use client';

import { useEffect, useState } from 'react';
import { getBank } from '../data/api';
import Container from '../ui/container';
import HeaderTitle from '../ui/headerTitle';
import ErrorMessage from '../ui/errorMessage';
import InputField from '../ui/inputField';
import LoadingIndicator from '../ui/loadingMessage';
import InfoMessage from '../ui/infoMessage';

interface BankData {
    ispb: number,
    name: string,
    code: number,
    fullName: string
}

export default function Bank() {
    const [bankCode, setBankCode] = useState('');
    const [bankData, setBankData] = useState<BankData | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [info, setInfo] = useState('Digite o código do banco');

    useEffect(() => {
        async function fetchBankData() {
            setLoading(true);
            setError('');
            setInfo('');

            try {
                const data = await getBank(bankCode);
                setBankData(data);
            } catch (error) {
                if (error instanceof Error) {
                    setError(error.message);
                } else {
                    setError('Erro desconhecido ao buscar banco');
                }
            } finally {
                setLoading(false);
            }
        }

        if (bankCode.length === 3) {
            fetchBankData();
        } else if (bankCode.length > 3) {
            setInfo('Código do banco deve conter 3 dígitos');
            setBankData(null);
            setError('');
        } else {
            setInfo('Digite o código do banco');
            setBankData(null);
            setError('');
        }
    }, [bankCode]);
    return (
        <Container>
            <HeaderTitle title="Bank Code" />
            <InputField 
                value={bankCode}
                onChange={(e) => setBankCode(e.target.value)}
                placeholder="Digite o código do banco"
            />
            {loading && <LoadingIndicator message="Buscando informações do banco..." />}
            {error && <ErrorMessage message={error} />}
            {info && <InfoMessage message={info} />}
            {bankData && (
                <div>
                    <p>Nome: {bankData.name ?? 'N/A'}</p>
                    <p>Código: {bankData.code ?? 'N/A'}</p>
                    <p>Nome Completo: {bankData.fullName ?? 'N/A'}</p>
                    <p>ISPB: {bankData.ispb ?? 'N/A'}</p>
                </div>
            )}
        </Container>
    );
}