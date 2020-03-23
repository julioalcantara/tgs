import { AsyncStorage } from 'react-native';
import CreateDataConxtext from './CreateDataContext';
import dataBaseApi from '../api/dataBase';
import { navigate } from '../navigationRef';

const bookingReducer = ( state, action ) => {
    switch (action.type) {
        case 'add_error': 
            return { ...state, errorMessage: action.payload };
        case 'booking':
            return { errorMessage: '', token: action.payload };

        default: 
            return state;
    }
};

const booking = (dispatch) => async ({ checkin, checkout }) => {

    try{
        const response = await dataBaseApi.post('/dates/add', { checkin, checkout });
        await AsyncStorage.setItem('token', response.data.token );
        dispatch({ 
            type: 'booking', 
            payload: response.data.token 
        });
        console.log("Its working");
        // navigte to main flow
        //navigate('Main');

    } catch (err) {
        dispatch ({ 
            type: 'add_error', 
            payload: 'Something went wrong with sign up' })
    }
};

export const { Provider, Context } = CreateDataConxtext(
    bookingReducer,
    { booking },
    { token: null, errorMessage: '' }
); 