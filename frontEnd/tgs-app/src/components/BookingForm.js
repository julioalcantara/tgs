import React, { useState, useContext } from 'react';
import { StyleSheet, FlatList } from 'react-native';

import { Text, Button, Input } from 'react-native-elements';
import Spacer from './Spacer';

import { Context } from '../context/ProfileContext';

const BookingForm = ({ headerText, errorMessage, onSubmit, submitButtonText }) => {
    const { state } = useContext(Context);

    const [checkin, setCheckin] = useState('');
    const [checkout, setcheckout] = useState('');
    const [profileId, setProfileId] = useState('');

    // console.log(state.profiles.item._id);
    return (
        <>
            <Spacer>
                <Text h3>{headerText}</Text>
            </Spacer>
            
            <FlatList 
                data = {state.profiles}
                keyExtractor = {item => item._id}
                renderItem={({ item }) => {
                    return (
                        <Input 
                            label= "This is your profile id"
                            value = {item._id}
                            disabled= {true}
                        />
                    );  
                }} 
            />
            <Spacer />
            <Input 
                label= "Please Place you Profile id here!"
                value = {profileId}
                onChangeText = {setProfileId}
                placeholder='xxxxxxxxxxxxxxxxxxxxxxx'
                autoCapitalize = "none"
                autoCorrect = {false}
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