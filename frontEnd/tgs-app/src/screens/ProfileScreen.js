import React, { useContext } from 'react';
import { StyleSheet, View, Text, FlatList, SafeAreaView } from 'react-native';
import { Image, Button } from 'react-native-elements';
import { NavigationEvents } from 'react-navigation';
import { navigate } from '../navigationRef';
import { Context as AuthContext } from '../context/AuthContext';
import { Context as ProfileContext } from '../context/ProfileContext';

const ProfileScreen = () => {
    const { signout } = useContext(AuthContext);
    const {createProfile, getProfile, getProfileById } = useContext(ProfileContext);
    // const { getProfile } = useContext(AuthContext);
    const name = navigate.getParam('name');
    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Text>hi</Text>
                <Text>{name}</Text>
            </View>
            <View style={styles.imageStyle}>
                <Image
                    source={ require('../images/logo2.png')}
                    style={{ width: 150, height: 150}}
                />
            </View>   
            <Button 
                title= 'Sign out'
                onPress={signout}
            />
            <Button title = "Get Data" onPress = {getProfile}/>  
            <Button title = "id Data" onPress = {getProfileById}/>   
        </SafeAreaView>
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