import axios from 'axios';
import { AsyncStorage } from 'react-native';

const instance = axios.create({
    //start ngrok every 8 hours and update the Url => ngrok http 3000
    baseURL: 'http://0839adc6.ngrok.io'
});

//automatic Authentication
instance.interceptors.request.use(
    async (config) => {
        const token = await AsyncStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (err) => {
        return Promise.reject(err);
    }
);


export default instance;