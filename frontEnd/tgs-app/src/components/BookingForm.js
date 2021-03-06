import React, { useState, useContext } from 'react';
import { StyleSheet } from 'react-native';
import { Text, Button, Input } from 'react-native-elements';
import Spacer from './Spacer';

import { Context as ProfileContext} from '../context/ProfileContext';

const BookingForm = ({ headerText, errorMessage, onSubmit, submitButtonText }) => {
    const {  state } = useContext(ProfileContext);

    const [checkin, setCheckin] = useState('');
    const [checkout, setcheckout] = useState('');
    const profileId = state.profile._id;

    return (
        <>
            <Spacer>
                <Text h3>{headerText}</Text>
            </Spacer>
            
            <Spacer />
            <Input 
                label= "Profile Id"
                value = {profileId}
                autoCapitalize = "none"
                disabled = {true}
            />
            <Spacer />
            <Input 
                label ="Checkin" 
                value = {checkin}
                onChangeText = {setCheckin}
                placeholder = 'xx/xx/xxxx'
                autoCapitalize = "none"
                autoCorrect = {false}
            />
            <Spacer />
            <Input 
                label = "Checkout"  
                value = {checkout}
                onChangeText = {setcheckout}  
                placeholder = 'xx/xx/xxxx'  
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