import React, { useContext} from 'react';
import {View, StyleSheet,Button} from 'react-native';
import Calendarform from "../components/CalendarForm";
import { Context } from "../context/BookingContext";
import Spacer from '../components/Spacer';

const DatesAvailableScreen = () => {
    const { booking } = useContext(Context);
    
    return (
        <View style={styles.container}>
            <View style={styles.calendar}>
                <Calendarform 
                label="CHECK-IN" 
                submitButtonText="Book"
                onSubmit = {booking}
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