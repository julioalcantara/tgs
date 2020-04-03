import axios from 'axios';

export default axios.create({
    //start ngrok every 8 hours and update the Url => ngrok http 3000
    baseURL: 'http://916a4729.ngrok.io'
});