// provider must be presente on the app.js when is been called

import { AsyncStorage } from 'react-native';
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
            return { ...state, currentUser: action.payload };
        default: 
            return state;
    }
};

const cleanErrorMessage = dispatch => () => {
    dispatch({ type: 'clean_error_message'});
}

const createProfile = (dispatch) => async ({name, phone }) => {
    // use user token to create a profile
    const token = await AsyncStorage.getItem('token'); 
    if (token) {
        try{
            const response = await dataBaseApi.post('/profile', { name, phone });
            dispatch({ 
                type: 'createProfile', 
                payload: response.data
            });  
            
            console.log("User Created a Profile");
            navigate('Main');
    
        } catch (err) {
            dispatch ({ 
                type: 'add_error', 
                payload: 'Something went wrong at creating your profile' })
        }
    }
};
const getProfile = (dispatch) => async () => {
        try{
        const response = await dataBaseApi.get('/profile');
            dispatch({ 
                type: 'createProfile', 
                payload: response.data
            }); 
            console.log(response);
        } catch (err) {
            dispatch ({ 
                type: 'add_error', 
                payload: 'Something went wrong at creating your profile' })
        }
};

const getProfileById = (dispatch) => async () => {
    const id = currentUser;
    console.log(id);
    const response = await dataBaseApi.get(`/profile/`);
    dispatch({ 
        type: 'createProfile', 
        payload: response.data
    }); 

};

export const { Provider, Context } = CreateDataConxtext(
    profileReducer,
    { cleanErrorMessage, createProfile, getProfile, getProfileById },
    { errorMessage: '', currentUser: null }
); 