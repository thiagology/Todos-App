import axios from 'axios';

// recebe a informação de .env para a variavel renomeada de apiBaseURL
const { REACT_APP_API_BASE_URL: apiBaseURL } = process.env;

const myAxios = axios.create({
  baseURL: apiBaseURL,
});

export default myAxios;
