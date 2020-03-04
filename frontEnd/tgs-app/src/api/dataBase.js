import axios from 'axios';

export default axios.create({
    //start ngrok every 8 hours and update the Url
    baseURL: 'http://42d3e9f8.ngrok.io'
});