import React, { useContext } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity} from 'react-native';
import { Image, ListItem } from 'react-native-elements';
import { NavigationEvents } from 'react-navigation';
import Spacer from '../components/Spacer';

import { Context as BookingContext } from '../context/BookingContext';

const ManageBookingScreen = ({ navigation }) => {
    const { state, fetchBooking } = useContext(BookingContext);

    return (
        <View style={styles.container}>
            <NavigationEvents onWillFocus = {fetchBooking}/>
            <View style={styles.imageStyle}>
                <Image
                    source={ require('../images/logo2.png')}
                    style={{ width: 150, height: 150}}
                />
            </View>   
            <Text>Welcome</Text>
            <Spacer />

            <FlatList 
                data = {state.bookings}
                keyExtractor = {item => item._id}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity onPress = {()=> navigation.navigate('DisplayBooking', {_id: item._id})}>
                            <ListItem chevron
                                rightTitle={item.checkout}
                                title={item.checkin}
                            />
                        </TouchableOpacity>
                        
                    );
                }}
            />
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

export default ManageBookingScreen;