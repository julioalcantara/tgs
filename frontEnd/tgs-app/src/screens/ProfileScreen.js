import React, { useContext } from 'react';
import { StyleSheet, View, FlatList, TouchableOpacity } from 'react-native';
import { Image, Button, ListItem } from 'react-native-elements';
import { NavigationEvents } from 'react-navigation';

import { Context as AuthContext } from '../context/AuthContext';
import { Context as ProfileContext } from '../context/ProfileContext';

const ProfileScreen = () => {
    const { signout } = useContext(AuthContext);
    const { state, fetchProfile } = useContext(ProfileContext);
    //console.log(state);
    return (
        <View style={styles.container}>
            <NavigationEvents onWillFocus = {fetchProfile}/>
            <View style={styles.imageStyle}>
                <Image
                    source={ require('../images/logo2.png')}
                    style={{ width: 150, height: 150}}
                />
            </View>   
            <FlatList 
                data = {state}
                
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity>
                            <ListItem chevron title={item._id} /> 
                        </TouchableOpacity>
                    );
                    
                }}
                keyExtractor = {item => item._id}
            />
            <Button 
                title= 'Sign out'
                onPress={signout}
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

export default ProfileScreen;