import { AsyncStorage } from 'react-native';
import CreateDataConxtext from './CreateDataContext';
import dataBaseApi from '../api/dataBase';
import { navigate } from '../navigationRef';

const authReducer = ( state, action ) => {
    switch (action.type) { 
        case 'add_error': 
            return { ...state, errorMessage: action.payload };
        case 'signin':
            return { errorMessage: '', token: action.payload };
        case 'clean_error_message':
            return { ...state, errorMessage: ''};
        case 'signout':
            return { token: null, errorMessage: ''};
        case 'createProfile':
            return { errorMessage: '', token: action.payload };

        default: 
            return state;
    }
};

const tryLocalSignin = dispatch => async () => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
        dispatch ({ type: 'signin', payload: token });
        navigate('createProfile');
    } else {
        navigate('Signup');
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
        const response = await dataBaseApi.post('/signup', { email, password });
        await AsyncStorage.setItem('token', response.data.token );
        dispatch({ 
            type: 'signin', 
            payload: response.data.token 
        });
        // navigte to main flow
        navigate('createProfile');
    } catch (err) {
        dispatch ({ 
            type: 'add_error', 
            payload: 'Something went wrong with sign up' })
    }
};

const signin = (dispatch) => async ({ email, password }) => {
        //try to sign in
        //handle success by updating state
        //handle failure by showing error message 
        try {
            const response = await dataBaseApi.post('/signin', {email, password});
            await AsyncStorage.setItem('token', response.data.token);
            dispatch({ 
                type: 'signin',
                payload: response.data.token
             });
             navigate('Main');
        } catch(err) {
            dispatch({
                type: 'add_error',
                payload: 'Something went wrong with sign in'
            })
        }
    };

const signout = dispatch => async ()=> {
    await AsyncStorage.removeItem('token');
    dispatch({ type: 'signout' });
    navigate('loginFlow');
};

const createProfile = (dispatch) => async ({ name, phone }) => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
        try{
            const response = await dataBaseApi.post('/profile', { name, phone });
            dispatch({ 
                type: 'createProfile', 
                payload: response.data.token 
            });
            console.log("User Created a Profile");
            // navigte to main flow
            navigate('Profile');
    
        } catch (err) {
            dispatch ({ 
                type: 'add_error', 
                payload: 'Something went wrong at creating your profile' })
        }
    }
   
};


export const { Provider, Context } = CreateDataConxtext(
    authReducer,
    { signin, signout, signup, cleanErrorMessage, tryLocalSignin, createProfile },
    { token: null, errorMessage: '' }
); 