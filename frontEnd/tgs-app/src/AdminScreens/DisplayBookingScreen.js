import React, { useContext } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity} from 'react-native';
import { Image, ListItem } from 'react-native-elements';
import { NavigationEvents } from 'react-navigation';
import Spacer from '../components/Spacer';

import { Context as BookingContext } from '../context/BookingContext';

const DisplayBookingScreen = ({ navigation }) => {

    const { state } = useContext(BookingContext);

    const _id = navigation.getParam('_id');
    //const bookings = state.find(t => t._id === _id);

    console.log(id);
    return (
        <View style={styles.container}>
            <View style={styles.imageStyle}>
                <Image
                    source={ require('../images/logo2.png')}
                    style={{ width: 150, height: 150}}
                />
            </View>   
            <Text>Welcome to Bookings</Text>
            <Spacer />
            
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 50,
        flex: 1,
        padding: 20
    },
    imageStyle: {
        alignItems: 'center'
    },    
});

export default DisplayBookingScreen;