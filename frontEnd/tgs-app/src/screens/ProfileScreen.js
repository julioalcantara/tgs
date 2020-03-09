import React, { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Image, Button } from 'react-native-elements';
import { SafeAreaView } from 'react-navigation';
import Spacer from '../components/Spacer';
import { Context as AuthContext } from '../context/AuthContext';

const ProfileScreen = () => {
    const { signout } = useContext(AuthContext);
    return (
        <SafeAreaView style={styles.container}>
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