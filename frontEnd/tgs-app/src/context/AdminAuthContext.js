// provider must be presente on the app.js when is been called

import { AsyncStorage } from 'react-native';
import CreateDataConxtext from './CreateDataContext';
import dataBaseApi from '../api/dataBase';
import { navigate } from '../navigationRef';

const adminAuthReducer = ( state, action ) => {
    switch (action.type) { 
        case 'add_error': 
            return { ...state, errorMessage: action.payload };
        case 'signin':
            return { errorMessage: '', token: action.payload };
        case 'clean_error_message':
            return { ...state, errorMessage: ''};
        case 'signout':
            return { token: null, errorMessage: ''};
            
        default: 
            return state;
    }
};

const tryLocalSignin = dispatch => async () => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
        dispatch ({ type: 'signin', payload: token });
        navigate('AdminMain');
        
    } else {
        navigate('Signin');
    }
}

const cleanErrorMessage = dispatch => () => {
    dispatch({ type: 'clean_error_message'});
}
 
const signup = (dispatch) => async ({ email, password }) => {
    //make an Api request to sign up with taht email and password
    //if user sign up, modify the state, and say that he is autheticated
    //if signing up fails, dispaly error message
    try{
        const response = await dataBaseApi.post('admin/signup', { email, password });
        await AsyncStorage.setItem('token', response.data.token );
        dispatch({ 
            type: 'signin', 
            payload: response.data.token 
        });
        
        // navigte to main flow
        navigate('AdminMain');
    } catch (err) {
        dispatch ({ 
            type: 'add_error', 
            payload: 'Something went wrong with sign up' })
    }
};

const signin = (dispatch) => async ({ email, password }) => {
        try {
            const response = await dataBaseApi.post('admin/signin', {email, password});
            await AsyncStorage.setItem('token', response.data.token);
            dispatch({ 
                type: 'signin',
                payload: response.data.token
             });
             navigate('AdminMain');
             
        } catch(err) {
            dispatch({
                type: 'add_error',
                payload: 'Something went wrong with sign in'
            })
        }
    };

const signout = dispatch => async ()=> {
    await AsyncStorage.clear();
    dispatch({ type: 'signout' });
    navigate('loginFlow');
};

export const { Provider, Context } = CreateDataConxtext(
    adminAuthReducer,
    { signin, signout, signup, cleanErrorMessage, tryLocalSignin },
    { token: null, errorMessage: '' }
); 