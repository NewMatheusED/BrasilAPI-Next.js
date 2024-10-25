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

export async function getBank(bankCode: string) {
    try {
        if (!bankCode) {
            throw new Error('Código do banco não pode ser vazio');
        }
        if (bankCode.length !== 3) {
            throw new Error('Código do banco deve conter 3 dígitos');
        }
        const response = await axios.get(`${urlBase}/banks/v1/${bankCode}`);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message || 'Erro ao buscar banco');
        }
        throw new Error('Erro ao buscar banco');
    }
}

export async function getDDD(ddd: string) {
    try {
        if (!ddd) {
            throw new Error('DDD não pode ser vazio');
        }
        if (ddd.toString().length !== 2) {
            throw new Error('DDD deve conter 2 dígitos');
        }
        const response = await axios.get(`${urlBase}/ddd/v1/${ddd}`);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message || 'Erro ao buscar DDD');
        }
        throw new Error('Erro ao buscar DDD');
    }
}