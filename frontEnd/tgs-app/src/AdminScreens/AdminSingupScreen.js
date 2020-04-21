import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationEvents } from 'react-navigation';

import { Context as AdminAuthContext } from '../context/AdminAuthContext';

import AuthForm from '../components/AuthForm';
import NavLink from '../components/NavLink';

const AdminSignupScreen = () => {
    const { state, signup, cleanErrorMessage } = useContext(AdminAuthContext);
    
    return (
        <View style={styles.container}>
            <NavigationEvents onWillBlur={ cleanErrorMessage } />
            <AuthForm 
                headerText = "Sign up as Admin"
                errorMessage = {state.errorMessage}
                submitButtonText = "Sign up"
                onSubmit = {signup}
            />
            <NavLink 
                text = "Sign in as User"
                routeName = "Signin"
            />
        </View>
    );
};

AdminSignupScreen.navigationOptions = {
    headerShown: false
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        marginBottom: 150
    }
});

export default AdminSignupScreen;