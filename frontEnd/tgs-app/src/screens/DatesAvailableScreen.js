import React, { useContext} from 'react';
import {View, StyleSheet,Button} from 'react-native';

import { Context } from "../context/BookingContext";
import Spacer from '../components/Spacer';
import BookingForm from '../components/BookingForm';

const DatesAvailableScreen = () => {
    const { state, createBooking } = useContext(Context);
    
    return (
        <View style={styles.container}>
            <View style={styles.calendar}>
                <BookingForm 
                    headerText = "Booking"
                    errorMessage = {state.errorMessage}
                    submitButtonText = "Book"
                    onSubmit = {createBooking}
                />
            </View>
            <Spacer />
           
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 30,
        padding: 15
    },
    calendar: {
        flexDirection: "row"
    }
});

export default DatesAvailableScreen;