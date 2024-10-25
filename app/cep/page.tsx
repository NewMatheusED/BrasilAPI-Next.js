'use client';

import { useEffect, useState } from 'react';
import { getCEP } from '../data/api';
import Container from '../ui/container';
import HeaderTitle from '../ui/headerTitle';
import ErrorMessage from '../ui/errorMessage';
import InputField from '../ui/inputField';
import LoadingIndicator from '../ui/loadingMessage';
import InfoMessage from '../ui/infoMessage';
import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';

const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false });

interface CepData {
    cep: string;
    street: string;
    neighborhood: string;
    city: string;
    state: string;
    location: {
        coordinates: {
            latitude: number;
            longitude: number;
        };
    };
}

export default function Cep() {
    const [cepData, setCepData] = useState<CepData | null>(null);
    const [cep, setCep] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [info, setInfo] = useState('Digite um CEP');
    const [isClient, setIsClient] = useState(false);
    const [position, setPosition] = useState<[number, number] | null>(null);

    useEffect(() => {
        setIsClient(true);

        // Configurar o Leaflet apenas no lado do cliente
        if (typeof window !== 'undefined') {
            import('leaflet').then(L => {
                L.Icon.Default.mergeOptions({
                    iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
                    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
                    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
                });
            });
        }
    }, []);

    useEffect(() => {
        async function fetchCepData() {
            setLoading(true);
            setError('');
            setInfo('');
            try {
                const data = await getCEP(cep);
                setCepData(data);
            } catch (error) {
                if (error instanceof Error) {
                    setError(error.message);
                } else {
                    setError('Erro desconhecido ao buscar CEP');
                }
                setCepData(null);
            } finally {
                setLoading(false);
            }
        }

        if (cep.length === 8) {
            fetchCepData();
        } else if (cep.length > 0) {
            setInfo('CEP deve conter 8 dígitos');
            setCepData(null);
            setError('');
        } else {
            setInfo('Digite um CEP');
            setCepData(null);
            setError('');
        }
    }, [cep]);

    useEffect(() => {
        if (cepData?.location?.coordinates?.latitude) {
            setPosition([cepData.location.coordinates.latitude, cepData.location.coordinates.longitude]);
        } else {
            setPosition(null);
            if (cepData) {
                setError('Não foi possível renderizar o mapa');
            }
        }
    }, [cepData]);

    return (
        <Container>
            <HeaderTitle title="CEP" />
            <InputField
                value={cep}
                onChange={(e) => setCep(e.target.value)}
                placeholder="Digite o CEP"
            />
            {loading && <LoadingIndicator message="Buscando informações do CEP..." />}
            {error && <ErrorMessage message={error} />}
            {info && <InfoMessage message={info} />}
            {cepData && (
                <div>
                    <p>CEP: {cepData.cep ?? 'N/A'}</p>
                    <p>Logradouro: {cepData.street ?? 'N/A'}</p>
                    <p>Bairro: {cepData.neighborhood ?? 'N/A'}</p>
                    <p>Cidade: {cepData.city ?? 'N/A'}</p>
                    <p>Estado: {cepData.state ?? 'N/A'}</p>
                    {isClient && position && (
                        <MapContainer center={position} zoom={13} style={{ height: "200px", width: "100%" }}>
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            />
                            <Marker position={position}>
                                <Popup>
                                    {cepData.street ?? 'N/A'}, {cepData.neighborhood ?? 'N/A'}, {cepData.city ?? 'N/A'}, {cepData.state ?? 'N/A'}
                                </Popup>
                            </Marker>
                        </MapContainer>
                    )}
                </div>
            )}
        </Container>
    );
}