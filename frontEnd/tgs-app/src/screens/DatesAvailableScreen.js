import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationEvents } from 'react-navigation';

import { Context as ProfileContext } from '../context/ProfileContext';
import { Context as BookingContext } from '../context/BookingContext';

import Spacer from '../components/Spacer';
import BookingForm from '../components/BookingForm';
import CalendarForm from '../components/CalendarForm';

const DatesAvailableScreen = () => {
    const {  getProfileById } = useContext(ProfileContext);
    const { state, createBooking } = useContext(BookingContext);
    
    return (
        <View style={styles.container}>
             <NavigationEvents onWillFocus = {getProfileById}/>
                <BookingForm 
                    headerText = "Booking"
                    errorMessage = {state.errorMessage}
                    submitButtonText = "Book"
                    onSubmit = { createBooking }
                />
            <Spacer /> 
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center'
    }
});

export default DatesAvailableScreen;