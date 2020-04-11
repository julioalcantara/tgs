import React, {useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Button} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { SafeAreaView } from 'react-navigation';  

const CalendarForm = () => {
    
    const [checkin, setCheckin] = useState(new Date());
    const [checkout, setCheckout] = useState(new Date());
    const [checkinShow, setCheckinShow] = useState(false);
    const [checkoutShow, setCheckoutShow] = useState(false);
    let checkinOutputDate = checkin.getDate() + "/" + (checkin.getMonth() + 1) + "/" + checkin.getFullYear();
    let checkoutOutputDate = checkout.getDate() + "/" + (checkout.getMonth() + 1) + "/" + checkout.getFullYear();

    const ischeckinShow = ()=> {
        setCheckinShow(true);
    }
    const ischeckoutShow = ()=> {
        setCheckoutShow(true);
    }

    const oncheckinChange = (event, selectedDate) => {
        const checkinCurrentDate = selectedDate || date; //if the user hits 'cancel', the date default will be store
        setCheckinShow(false);
        setCheckin(checkinCurrentDate);
        setCheckinShow(Platform.OS === 'ios' ? true : false);
    };

    const onCheckoutChange = (event, selectedDate) => {
        const checkoutCurrentDate = selectedDate || date;
        setCheckoutShow(false);
        setCheckout(checkoutCurrentDate);
        setCheckoutShow(Platform.OS === 'ios' ? true : false);
    };

    return (
        <SafeAreaView forceInset={{ vertical: 'always', horizontal: 'always'}}>
            <View style={styles.container}> 
                <TouchableOpacity  onPress= {()=>ischeckinShow()}>
                <Text style={styles.output}>{checkinOutputDate}</Text>
                </TouchableOpacity>          

                {checkinShow && (
                    <DateTimePicker
                    label="Check In"
                    testID="dateTimePicker" 
                    value={checkin}
                    display="spinner"
                    onChange={oncheckinChange}
                    />
                )} 
            </View>

            <View style={styles.container}> 
                <TouchableOpacity  onPress= {()=>ischeckoutShow()}>
                <Text style={styles.output}>{checkoutOutputDate}</Text>
                </TouchableOpacity>          

                {checkoutShow && (
                    <DateTimePicker
                    label="Check Out"
                    testID="dateTimePicker" 
                    value={checkout}
                    display="spinner"
                    onChange={onCheckoutChange}
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