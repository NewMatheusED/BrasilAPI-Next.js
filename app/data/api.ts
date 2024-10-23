import axios from 'axios';

const urlBase = 'https://brasilapi.com.br/api';

export async function getCEP(cep: string) {
    try {
        if (!cep) {
            throw new Error('CEP não pode ser vazio');
        }
        if (cep.length !== 8) {
            throw new Error('CEP deve conter 8 dígitos');
        }
        const response = await axios.get(`${urlBase}/cep/v2/${cep}`);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message || 'Erro ao buscar CEP');
        }
        throw new Error('Erro ao buscar CEP');
    }
}