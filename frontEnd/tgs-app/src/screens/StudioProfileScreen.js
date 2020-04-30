import React, { useContext } from 'react';
import { Text, StyleSheet,TouchableOpacity } from 'react-native';
import { Image } from 'react-native-elements';
import { SafeAreaView } from 'react-navigation';
import NavLinksBtn from '../components/NavLinksBtn';
import Spacer from '../components/Spacer';

import { Context as AuthContext } from '../context/AuthContext';

const StudioProfileScreen = ({ navigate }) => {
    const { signout } = useContext(AuthContext);
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
            <TouchableOpacity onPress={signout}>
            <Spacer>
                <Text style={styles.link}>Log out</Text>
            </Spacer>
        </TouchableOpacity>
            
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
    },
    link: {
        fontSize: 20
    }
});

export default StudioProfileScreen;