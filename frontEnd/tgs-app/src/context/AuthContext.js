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

        default: 
            return state;
    }
};

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
        navigate('DatesAvailable');

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
             navigate('DatesAvailable');

        } catch(err) {
            dispatch({
                type: 'add_error',
                payload: 'Something went wrong with sign in'
            })
        }
    };

const signout = (dispatch) => {
    return ({ email, password }) => {  

    };
};

export const { Provider, Context } = CreateDataConxtext(
    authReducer,
    { signin, signout, signup, cleanErrorMessage },
    { token: null, errorMessage: '' }
);