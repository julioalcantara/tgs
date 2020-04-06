import React, { useContext } from 'react';
import { StyleSheet, View, Text, SafeAreaView, ActivityIndicator } from 'react-native';
import { Image, Button } from 'react-native-elements';
import { Context as AuthContext } from '../context/AuthContext';
import { Context as ProfileContext } from '../context/ProfileContext';

const ProfileScreen = () => {
    const { signout } = useContext(AuthContext);
    const {state: {currentUser}, getProfile, getProfileById } = useContext(ProfileContext);

    if(!currentUser)  {
        //spinner
        return <ActivityIndicator size="large" style={{marginTop: 200}} />
    }

    const name = currentUser.createdProfile.name;

    return (
        <SafeAreaView  forceInset={{ top: 'always'}} style={styles.container}>
            <View>
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