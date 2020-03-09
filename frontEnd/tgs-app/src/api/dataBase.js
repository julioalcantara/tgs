import axios from 'axios';

export default axios.create({
    //start ngrok every 8 hours and update the Url
    baseURL: 'http://60b4bf39.ngrok.io'
});