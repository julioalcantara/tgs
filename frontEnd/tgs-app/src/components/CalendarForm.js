import React, {useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Button} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { SafeAreaView } from 'react-navigation';  

const CalendarForm = ({ label }) => {
    
    const [date, setDate] = useState(new Date());
    
    const [show, setShow] = useState(false);
    let outputDate = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();

    const isShow = ()=> {
        setShow(true);
    }

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date; //if the user hits 'cancel', the date default will be store
        setShow(false)
        setDate(currentDate);
        setShow(Platform.OS === 'ios' ? true : false);
    };

    return (
        <SafeAreaView forceInset={{ vertical: 'always', horizontal: 'always'}}>
            <View style={styles.container}> 
                <TouchableOpacity  onPress= {()=>isShow()}>
                <Text style={styles.label}>{label}</Text>
                <Text style={styles.output}>{outputDate}</Text>
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
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row"     
    },
    output: {
        fontSize: 16,
        textAlign: "center",
        textAlignVertical: "center",
        height: 40,
        width: 170,
        borderColor: 'black',
        borderWidth: 1,
        marginHorizontal: 10
    },
    label: {
        marginLeft:15,
        fontSize: 15
    }
});

export default CalendarForm;