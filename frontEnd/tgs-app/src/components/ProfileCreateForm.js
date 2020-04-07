import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Text, Button, Input } from 'react-native-elements';
import Spacer from './Spacer';

const ProfileCreateForm = ({ headerText, errorMessage, onSubmit, submitButtonText }) => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    return (
        <>
            <Spacer>
                <Text h3>{headerText}</Text>
            </Spacer>
            <Input 
                label ="Name" 
                value = {name}
                onChangeText = {setName}
            />
            <Spacer />
            <Input 
                label = "Phone"  
                value = {phone}
                onChangeText = {setPhone}    
                autoCapitalize = "none"
                autoCorrect = {false}
            />
            {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}
            <Spacer>
                <Button title = {submitButtonText} 
                    onPress={() => {
                        onSubmit({ name, phone });

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