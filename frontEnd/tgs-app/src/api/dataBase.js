import axios from 'axios';

export default axios.create({
    //start ngrok every 8 hours and update the Url
    baseURL: 'http://95878af8.ngrok.io'
});