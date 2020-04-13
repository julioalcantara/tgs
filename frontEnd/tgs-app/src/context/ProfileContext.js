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

const createProfile = dispatch => async ({name, phone }) => {
    try{
        const response = await dataBaseApi.post('/profile', { name, phone });
        await AsyncStorage.setItem('profileId', response.data.profiles._id );

        console.log("User Created a Profile");
        navigate('Main');

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
    const id = fetchProfile.profile;
    const profileResponse = await dataBaseApi.get(`/profile/`);
    dispatch({ 
        type: 'fetch_profile', 
        payload: profileResponse.data
    }); 
    console.log(id);
};


export const { Provider, Context } = CreateDataConxtext(
    profileReducer,
    { cleanErrorMessage, createProfile, fetchProfile, getProfileById },
    { errorMessage: '', profile: null }
); 