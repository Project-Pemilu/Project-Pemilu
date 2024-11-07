import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'https://fase2.fathanabds.online/',
});

export default axiosClient;
