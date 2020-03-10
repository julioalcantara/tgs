import React, {useState} from 'react';
import {View, Button, Platform, StyleSheet, Text, TouchableOpacity} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { FontAwesome } from "@expo/vector-icons";
import Spacer from '../components/Spacer';

const Calendar = ({ navigation, label }) => {
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);
    let outputDate = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();

    const isShow = () => {
        setShow(true);
    }

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(false)
        setDate(currentDate);
        setShow(Platform.OS === 'ios' ? true : false);
    };

    return (
        <View>
            <View style={styles.container}>
                <Text style={styles.output}>{outputDate}</Text>
                <TouchableOpacity  onPress= {()=>isShow()}>
                    <View style={styles.icon}>
                        <FontAwesome
                            name="calendar"
                            size={40}
                            color='black'
                        />
                    </View>
                </TouchableOpacity>          

                {show && (
                    <DateTimePicker
                    testID="dateTimePicker" 
                    value={date}
                    display="spinner"
                    onChange={onChange}
                    />
                )} 
            </View>
        </View>
        
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: 'center'
        
    },
    output: {
        fontSize: 16,
        textAlign: "center",
        textAlignVertical: "center",
        height: 40,
        width: 250,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 10,
        margin: 10
    },
    icon: {
        margin: 10
    }
});

export default Calendar;