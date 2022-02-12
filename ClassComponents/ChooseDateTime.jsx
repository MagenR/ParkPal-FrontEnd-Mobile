import React, { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Icon } from 'react-native-elements';
import { StyleSheet, View, Text } from "react-native"

export default function ChooseDateTime() {

    const [date, setDate] = useState(new Date());

    const changeDate = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setDate(currentDate);
    };

    return (
        <View>
            <View style={{ flexDirection: 'row', alignContent: 'space-around' }}>
                <Icon style={{marginRight: 10}} size={24} type='font-awesome-5' name="sign-in-alt" />
                <Text style={dateTimePickerStyles.header}>Entrance:</Text>
                <DateTimePicker
                    style={dateTimePickerStyles.entranceDateTime}
                    value={date}
                    mode='datetime'
                    onChange={changeDate}
                >
                </DateTimePicker>
            </View>
            <View style={{ flexDirection: 'row', alignContent: 'space-around', paddingTop:20 }}>
                <Icon style={{marginRight: 10}} size={24} type='font-awesome-5' name="sign-out-alt" />
                <Text style={dateTimePickerStyles.header}>Exit:</Text>
                <DateTimePicker
                    style={dateTimePickerStyles.exitDateTime}
                    value={date}
                    mode='datetime'
                    onChange={changeDate}
                >
                </DateTimePicker>
            </View>
        </View>
    )
}

const dateTimePickerStyles = StyleSheet.create({
    header: {
        marginRight: 10,
        padding: 1,
        fontSize: 20
    },
    entranceDateTime: {
        alignSelf: 'center',
        width: 200,
    },
    exitDateTime: {
        alignSelf: 'center',
        width: 245,
    },
});
