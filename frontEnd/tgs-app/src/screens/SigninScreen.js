import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import NavLink from '../components/NavLink';
import AuthForm from '../components/AuthForm';
import { Context } from '../context/AuthContext';

const SigninScreen = () => {
    const { state, signin, cleanErrorMessage } = useContext(Context);
    return (
        <View style = {styles.container}>
            <NavigationEvents onWillBlur = { cleanErrorMessage } />
            <AuthForm 
                headerText = "Sign in to your account"
                errorMessage = {state.errorMessage}
                submitButtonText = "Sign in"
                onSubmit = {signin}
            />
            <NavLink 
                text = "Don't have an account? Sing up instead!"
                routeName = "Signup"
            />
        </View>
    );
};
//hide the header
SigninScreen.navigationOptions = {
    headerShown: false
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        marginBottom: 150
    }
});

export default SigninScreen;
