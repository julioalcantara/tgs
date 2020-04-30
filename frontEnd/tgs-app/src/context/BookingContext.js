// provider must be presente on the app.js when is been called

import CreateDataConxtext from './CreateDataContext';
import dataBaseApi from '../api/dataBase';
import { navigate } from '../navigationRef';

const bookingReducer = ( state, action ) => {
    switch (action.type) { 
        case 'add_error': 
            return { ...state, errorMessage: action.payload };
        case 'clean_error_message':
            return { ...state, errorMessage: ''};
        case 'createBooking':
            return { ...state, currentBooking: action.payload };
        case 'fetch_booking':
            return action.payload; 
        default: 
            return state;
    }
};

const cleanErrorMessage = dispatch => () => {
    dispatch({ type: 'clean_error_message'});
}

const createBooking = (dispatch) => async ({ profileId, checkin, checkout }) => {
    try{
        const response = await dataBaseApi.post('/booking', { profileId, checkin, checkout });
        dispatch({ 
            type: 'createBooking', 
            payload: response.data
            
        }); 
        console.log("User Created a booking successfully");
        alert("Booking created successfully");
        navigate('Studio');

    } catch (err) {
        dispatch ({ 
            type: 'add_error', 
            payload: 'Something went wrong at creating your Booking' })
    }
    
};

const fetchBooking = (dispatch) => async () => {
    try{
    const response = await dataBaseApi.get('/booking');
    dispatch({ 
        type: 'fetch_booking', 
        payload: response.data
    }); 

    } catch (err) {
        dispatch ({ 
            type: 'add_error', 
            payload: 'Something went wrong at creating your booking'})
    }
};


export const { Provider, Context } = CreateDataConxtext(
    bookingReducer,
    { cleanErrorMessage, createBooking, fetchBooking},
    { errorMessage: '', currentBooking: null }
); 