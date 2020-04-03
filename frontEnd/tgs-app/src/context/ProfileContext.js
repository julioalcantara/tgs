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
            return { errorMessage: '', token: action.payload };
        case 'getProfile':
            return action.payload;
        case 'editProfile':
            return state.map((token) => {
                if(token.id === action.payload.id){
                    return action.payload;
                } else {
                    return token;
                }
            })
        default: 
            return state;
    }
};

const cleanErrorMessage = dispatch => () => {
    dispatch({ type: 'clean_error_message'});
}

const createProfile = (dispatch) => async ({name, phone }) => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
        try{
            const response = await dataBaseApi.post('/profile', { name, phone });
            //await AsyncStorage.setItem('_id', response.data);
            dispatch({ // the dispatch can be delited. 
                type: 'createProfile', 
                payload: response.data
                
            });  
            console.log("User Created a Profile");
            navigate('Profile', {name});
    
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
            
            const id = await dataBaseApi.filter('_id');
            
            //const profileId = response.data.profiles[0]._id;
            
            //const getId = await AsyncStorage.setItem('_id');
            // const profileName = getProfile.data.profiles[0].name;

            dispatch({ 
                type: 'getProfile', 
                payload: response.data
                
            }); 
            console.log(id);
            //console.log(response);
            //console.log(profileId);
            // console.log(profileName);
    
        } catch (err) {
            dispatch ({ 
                type: 'add_error', 
                payload: 'Something went wrong at creating your profile' })
        }
};

const getProfileById = (dispatch) => async () => {
    //const id = await AsyncStorage.getItem('_id');
    //const id = '5e84d5f481805744742dab43'
    const response = await dataBaseApi.get(`/profile/${id}`);
    dispatch({ 
        type: 'getProfile', 
        payload: response.data
        
    }); 
    console.log(id);
};

export const { Provider, Context } = CreateDataConxtext(
    profileReducer,
    { cleanErrorMessage, createProfile, getProfile, getProfileById },
    { errorMessage: '' }
); 