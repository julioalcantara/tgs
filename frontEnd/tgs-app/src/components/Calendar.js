import React, {useState} from 'react';
import {View, Platform, StyleSheet, Text, TouchableOpacity} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const Calendar = ({ label }) => {
    
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
        </View>
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

export default Calendar;