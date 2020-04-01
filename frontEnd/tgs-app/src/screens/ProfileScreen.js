import React, { useContext } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { Image, Button } from 'react-native-elements';
import { NavigationEvents } from 'react-navigation';
import { navigate } from '../navigationRef';
import { Context as AuthContext } from '../context/AuthContext'

const ProfileScreen = () => {
    const { signout } = useContext(AuthContext);
    // const { getProfile } = useContext(AuthContext);
    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Text>hi</Text>
                <FlatList 
                    data={getProfile}
                    keyExtractor={getProfileData =>getProfileData.name}
                    renderItem={({item}) => {
                        return <Text>{item.name}</Text>
                    }}
                />
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