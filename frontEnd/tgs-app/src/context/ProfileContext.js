// provider must be presente on the app.js when is been called

import CreateDataConxtext from './CreateDataContext';
import dataBaseApi from '../api/dataBase';
import { navigate } from '../navigationRef';

const profileReducer = ( state, action ) => {
    switch (action.type) { 
        case 'add_error': 
            return { ...state, errorMessage: action.payload };
        case 'clean_error_message':
            return { ...state, errorMessage: ''};
        case 'createProfile':
            return { ...state , profile: action.payload }; 
        case 'fetch_profile':
            return action.payload; 
        default: 
            return state;
    }
};

const cleanErrorMessage = dispatch => () => {
    dispatch({ type: 'clean_error_message'});
}

const createProfile = (dispatch) => async ({name, phone }) => {
    try{
        const response = await dataBaseApi.post('/profile', { name, phone });
        dispatch({ 
            type: 'createProfile', 
            payload: response.data
        });  

        console.log("User Created a Profile");
        navigate('Profile');

    } catch (err) {
        dispatch ({ 
            type: 'add_error', 
            payload: 'Something went wrong at creating your profile' })
    }
};

const fetchProfile = (dispatch) => async () => {
        try{
        const response = await dataBaseApi.get('/profile');
            dispatch({ 
                type: 'fetch_profile', 
                payload: response.data
            }); 
        } catch (err) {
            dispatch ({ 
                type: 'add_error', 
                payload: 'Something went wrong at creating your profile'})
        }
};

const getProfileById = (dispatch) => async () => {
    
    const response = await dataBaseApi.get(`/profile/`);
    dispatch({ 
        type: 'fetch_profile', 
        payload: response.data
    }); 

};


export const { Provider, Context } = CreateDataConxtext(
    profileReducer,
    { cleanErrorMessage, createProfile, fetchProfile, getProfileById },
    { errorMessage: '', profile: null }
); 