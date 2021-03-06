import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Image } from 'react-native-elements';

const HomeScreen = () => {

    return (
        <View style={styles.container}>
            <Text style={styles.text}> Welcome to TGS app </Text>
            <Image
                source={ require('../images/logo2.png')}
                style={styles.imageStyle}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 50,
        flex: 1,
        justifyContent: 'flex-start',
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

export default HomeScreen;