import React from 'react';
import {View, StyleSheet,Button} from 'react-native';
import Calendar from "../components/Calendar";
import Spacer from '../components/Spacer';

const DatesAvailableScreen = ({ navigation }) => {
    
    return (
        <View style={styles.container}>
            <View style={styles.calendar}>
                <Calendar label="CHECK-IN" />
                <Calendar  label="CHECK-OUT"/>
            </View>
            <Spacer />
           <Button 
            title= "Book"
           />
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