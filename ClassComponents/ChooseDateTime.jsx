import React, { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Icon } from 'react-native-elements';
import { StyleSheet, View } from "react-native"

export default function ChooseDateTime() {

    const [date, setDate] = useState(new Date());

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setDate(currentDate);
    };

    return (
        <View>
            <View style={{ flexDirection: 'row', alignContent: 'space-around' }}>
                <Icon style={dateTimePickerStyles.icon} size={24} type='font-awesome' name="calendar" />
                <DateTimePicker
                    style={dateTimePickerStyles.timePicker}
                    value={date}
                    onChange={onChange}
                >
                </DateTimePicker>
            </View>
            <View style={{ flexDirection: 'row', alignContent: 'space-around' }}>
                <Icon style={dateTimePickerStyles.icon} size={24} type='font-awesome' name="right-to-line" />
                <DateTimePicker
                    style={dateTimePickerStyles.timePicker}
                    value={date}
                    mode='time'
                    onChange={onChange}
                >
                </DateTimePicker>
            </View>
        </View>
    )
}

const dateTimePickerStyles = StyleSheet.create({
    icon: {
        padding: 20,
    },
    timePicker: {
        padding: 20,
        alignSelf: 'center',
        width: 100,
    }
});
