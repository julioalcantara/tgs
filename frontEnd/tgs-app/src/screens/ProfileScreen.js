import React, { useContext } from 'react';
import { StyleSheet, View, Text} from 'react-native';
import { Image, Button } from 'react-native-elements';
import { NavigationEvents } from 'react-navigation';
import Spacer from '../components/Spacer';

import { Context as AuthContext } from '../context/AuthContext';
import { Context as ProfileContext } from '../context/ProfileContext';

const ProfileScreen = () => {
    const { signout } = useContext(AuthContext);
    const { state, getProfileById } = useContext(ProfileContext);

    const name = state.profile.firstName;
    return (
        <View style={styles.container}>
            <NavigationEvents onWillFocus = {getProfileById}/>
            <View style={styles.imageStyle}>
                <Image
                    source={ require('../images/logo2.png')}
                    style={{ width: 150, height: 150}}
                />
            </View>   
            <Text>Welcome, {name}</Text>
            <Spacer />
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