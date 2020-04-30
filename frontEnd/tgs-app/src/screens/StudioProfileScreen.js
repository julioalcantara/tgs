import React from 'react';
import { StyleSheet } from 'react-native';
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
                routeName = "Studio"
            />
            <NavLinksBtn 
                text = "Location" 
                routeName = "Studio"
            />
            <NavLinksBtn 
                text = "Terms and Conditions" 
                routeName = "Studio"
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
        marginTop: 50,
        flex: 1,
        justifyContent: 'flex-start',
        padding: 17
    },
    imageStyle: {
        width: 370,
        height: 107,
        marginBottom: 15
    },
    textBtn: {
        fontSize: 20
    }
});

export default StudioProfileScreen;