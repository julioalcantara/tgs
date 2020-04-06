import React, { useState, useContext } from 'react';
import { StyleSheet } from 'react-native';
import { Text, Button, Input } from 'react-native-elements';
import Spacer from './Spacer';

import { Context } from '../context/BookingContext';

const BookingForm = ({ headerText, errorMessage, onSubmit, submitButtonText }) => {
    const [checkin, setCheckin] = useState('');
    const [checkout, setcheckout] = useState('');

    const {state: {currentUser}} = useContext(Context);
    const profileId = currentUser.createdProfile._id;
    return (
        <>
            <Spacer>
                <Text h3>{headerText}</Text>
                
            </Spacer>

            <Input 
                label ="Profile id" 
                value = {profileId}
            />
            <Spacer />

            <Input 
                label ="Checkin" 
                value = {checkin}
                onChangeText = {setCheckin}
                autoCapitalize = "none"
                autoCorrect = {false}
            />
            <Spacer />

            <Input 
                label = "Checkout"  
                value = {checkout}
                onChangeText = {setcheckout}    
                autoCapitalize = "none"
                autoCorrect = {false}
            />
            {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}
            <Spacer>
                <Button title = {submitButtonText} 
                    onPress={() =>{
                        onSubmit({ profileId, checkin, checkout });

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

export default BookingForm;    