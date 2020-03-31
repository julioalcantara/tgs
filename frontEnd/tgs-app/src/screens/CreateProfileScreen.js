import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import ProfileCreateForm from '../components/ProfileCreateForm';
import { Context as AuthContext } from '../context/AuthContext';

const CreateProfileScreen = () => {
   const { state, createProfile, cleanErrorMessage } = useContext(AuthContext);
    return (
        <View style = {styles.container}>
            <NavigationEvents onWillBlur = { cleanErrorMessage } />
            <ProfileCreateForm 
                headerText = 'Create Profile'
                submitButtonText = 'Submit'
                errorMessage = {state.errorMessage}
                onSubmit = {createProfile}
            />               
        </View>
    );
}
//hide the header
CreateProfileScreen.navigationOptions = {
    headerShown: false
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        marginBottom: 150
    }
});

export default CreateProfileScreen;