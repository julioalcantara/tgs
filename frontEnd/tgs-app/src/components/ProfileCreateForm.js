import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Text, Button, Input } from 'react-native-elements';
import Spacer from './Spacer';

const ProfileCreateForm = ({ headerText, errorMessage, onSubmit, submitButtonText }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [styleCategory, setStyleCategory] = useState('');

    return (
        <>
            <Spacer>
                <Text h3>{headerText}</Text>
            </Spacer>
            <Input 
                label ="First Name" 
                value = {firstName}
                onChangeText = {setFirstName}
            />
            <Spacer />
            <Input 
                label = "Last Name"  
                value = {lastName}
                onChangeText = {setLastName}    
                autoCapitalize = "none"
                autoCorrect = {false}
            />
            <Spacer />
            <Input 
                label = "Which tattoo style do you do?"  
                value = {styleCategory}
                onChangeText = {setStyleCategory}    
                autoCapitalize = "none"
                autoCorrect = {false}
            />
            {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}
            <Spacer>
                <Button title = {submitButtonText} 
                    onPress={() => {
                        onSubmit({ firstName, lastName, styleCategory });

                    }} 
                />
            </Spacer>
        </>   
    );   
};  

const styles = StyleSheet.create({
    errorMessage: {
        fontSize: 16,
        color: 'red',
        marginLeft: 15,
        marginTop: 15
    }
});

export default ProfileCreateForm;    