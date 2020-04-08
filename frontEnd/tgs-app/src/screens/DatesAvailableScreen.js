import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationEvents } from 'react-navigation';

import { Context } from "../context/BookingContext";
import Spacer from '../components/Spacer';
import BookingForm from '../components/BookingForm';

const DatesAvailableScreen = () => {
    const { state, createBooking, cleanErrorMessage } = useContext(Context);
    
    return (
        <View style={styles.container}>
            <NavigationEvents onWillBlur = { cleanErrorMessage } />
            <View>
                <BookingForm 
                    headerText = "Booking"
                    errorMessage = {state.errorMessage}
                    submitButtonText = "Book"
                    onSubmit = { createBooking }
                />
                
            </View>
            <Spacer />
           
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        marginBottom: 150
    }
});

export default DatesAvailableScreen;