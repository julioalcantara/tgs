import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationEvents } from 'react-navigation';

import { Context as AuthContext } from '../context/AuthContext';

import AuthForm from '../components/AuthForm';
import NavLink from '../components/NavLink';

const SingupScreen = () => {
    const { state, signup, cleanErrorMessage } = useContext(AuthContext);
    
    return (
        <View style={styles.container}>
            <NavigationEvents onWillBlur={ cleanErrorMessage } />
            <AuthForm 
                headerText = "Create Account"
                errorMessage = {state.errorMessage}
                submitButtonText = "Create"
                onSubmit = {signup}
            />
            <NavLink 
                text = "Already have an account? Sign in instead!"
                routeName = 'Signin'
            />
        </View>
    );
};

SingupScreen.navigationOptions = {
    headerShown: false
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        marginBottom: 150
    }
});

export default SingupScreen;