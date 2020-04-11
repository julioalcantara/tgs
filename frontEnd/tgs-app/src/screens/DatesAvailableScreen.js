import React, { useContext } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { NavigationEvents, SafeAreaView } from 'react-navigation';

import { Context as ProfileContext } from '../context/ProfileContext';
import { Context as BookingContext } from '../context/BookingContext';

import Spacer from '../components/Spacer';
import BookingForm from '../components/BookingForm';
import CalendarForm from '../components/CalendarForm';

const DatesAvailableScreen = () => {
    const {  fetchProfile } = useContext(ProfileContext);
    const { state, createBooking } = useContext(BookingContext);
    
    return (
        <View style={styles.container}>
             <NavigationEvents onWillFocus = {fetchProfile}/>
            <ScrollView>
                <BookingForm 
                    headerText = "Booking"
                    errorMessage = {state.errorMessage}
                    submitButtonText = "Book"
                    onSubmit = { createBooking }
                />
                
                <CalendarForm />
            </ScrollView>
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