import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Image } from 'react-native-elements';
import { SafeAreaView } from 'react-navigation';
import NavLinksBtn from '../components/NavLinksBtn';

const StudioProfileScreen = ({ navigate }) => {
    return (
        <SafeAreaView forceInset={{ top: 'always'}} style={styles.container}>
            <Image
                source={ require('../images/voodooLogo1.png')}
                style={styles.imageStyle}
            />
            <NavLinksBtn 
                text = "About" 
            />
            <NavLinksBtn 
                text = "Location" 
            />
            <NavLinksBtn 
                text = "Terms and Conditions" 
            />
            <NavLinksBtn 
                text = "Date Availability" 
                routeName = "DatesAvailable"
            />
            
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        borderColor: 'red',
        borderWidth: 10,
        marginTop: 50,
        flex: 1,
        padding: 17
    },
    imageStyle: {
        width: 350,
        height: 107
    },
    textBtn: {
        fontSize: 20
    }
});

export default StudioProfileScreen;