import axios from 'axios';

const Axios = axios.create({
    baseURL: "http://192.168.0.11/car_rental/public"
});

export default Axios;