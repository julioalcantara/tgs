import React, {useContext} from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Image, Button } from 'react-native-elements';

import { Context as AdminAuthContext } from '../context/AdminAuthContext';

const AdminHomeScreen = ({ navigation }) => {
    const { signout } = useContext(AdminAuthContext);

    return (
        <View style={styles.container}>
            <Text style={styles.text}> Welcome Admin </Text>
            <Image
                source={ require('../images/logo2.png')}
                style={styles.imageStyle}
            />
            <Button title= 'Manage Bookings' onPress={() => navigation.navigate('ManageBookings')} />
            <Button title= 'Sign out' onPress={signout} />
        </View>
    );
}

//hide the header
AdminHomeScreen.navigationOptions = {
    headerShown: false
};

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        flex: 1,
        justifyContent: 'center',
        alignSelf: 'center'
    },
    imageStyle: {
        width: 250,
        height: 250   
    },
    text: {
        textAlign: "center",
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 15
    }
});

export default AdminHomeScreen;