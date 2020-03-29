import axios from 'axios';

const api = axios.create({ // armazena a URL base (significa a parte do endereço que não muda, ou seja, que tem em todas as outras rotas).
    baseURL: 'http://localhost:3333'
});

export default api;