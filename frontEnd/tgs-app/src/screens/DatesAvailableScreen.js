import React from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';

const DatesAvailableScreen = ({ navigation }) => {
    return (
        <View>
            <Text> DatesAvailableScreen </Text>
            <Button 
                title = "Go to Home"
                onPress = {() => navigation.navigate('Profile')}
            />

        </View>
    );
}

const styles = StyleSheet.create({});

export default DatesAvailableScreen;