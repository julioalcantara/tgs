import React from 'react';
import {View, StyleSheet,Button} from 'react-native';
import Calendar from "../components/Calendar";

const DatesAvailableScreen = ({ navigation }) => {
    
    return (
        <View style={styles.container}>
           <Calendar  />
           <Calendar  />

           <Button 
            title= "Book"
           />

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 30
    }
});

export default DatesAvailableScreen;