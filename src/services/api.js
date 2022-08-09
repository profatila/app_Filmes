import axios from 'axios';

// https://sujeitoprogramador.com/r-api/?api=filmes/
// base url > https://sujeitoprogramador.com/    ROTA que não vai mudar!!!
// primeira ROTA que traz todos os filmes > r-api/?api=filmes/
// rota que traz o filme com id 123       > r-api/?api=filmes/123

const api = axios.create({
    baseURL: 'https://sujeitoprogramador.com'
})

export default api;