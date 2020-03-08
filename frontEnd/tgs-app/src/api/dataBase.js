import axios from 'axios';

export default axios.create({
    //start ngrok every 8 hours and update the Url
    baseURL: 'http://bfdf03ca.ngrok.io'
});