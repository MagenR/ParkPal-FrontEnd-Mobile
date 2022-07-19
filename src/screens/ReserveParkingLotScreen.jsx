import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-paper';

import DateTimePickerModal from "react-native-modal-datetime-picker";

export default function ReserveParkingLotScreen(props) {

    const { chosenPark } = props.route.params;
    const { Name, Address, HourlyTariff, Type } = chosenPark;

    // ============================ hooks

    const [entrance, setEntrance] = useState({
        show: false,
        date: null, 
        time: null
    });

    const [exit, setExit] = useState({
        show: false,
        date: null,
        time: null
    });

    const [totalPayment, setTotalPayment] = useState();

    useEffect(() => {
        if (!entrance.date || !exit.date)
            return;

        const diff = prepareDate(exit) - prepareDate(entrance);
        const totalPayment = diff / (1000 * 60 * 60) * HourlyTariff;

        setTotalPayment(totalPayment.toFixed(2))
    }, [entrance, exit])

    // ============================ handlers

    const prepareDate = (dateObj) => { // formats date object for payment calculations
        return new Date(`${dateObj.date}T${dateObj.time}`);
    }

    const showDateTimePicker = (set) => { set(prevState => { return { ...prevState, show: true} })}

    const handleDateChange = (type, selectedDate) => { // called when user confirms datetimepicker
        const dateConfig = {
            show: false,
            date: selectedDate.toISOString().split('T')[0],
            time: selectedDate.toLocaleTimeString(),
        }

        if (type === 'entrance') 
            setEntrance(dateConfig)
        else if (type === 'exit')
            setExit(dateConfig)
    }

    const handlePageSwitch = () => { // moves to next page and called when user finished flow and clicks confirm
        const params = { 
            chosenPark, 
            totalPayment,
            entrance,
            exit
        };

        let page;

        if (Type === 'empty')   
            page = 'PaymentScreen';
        else                    
            page = 'AuctionScreen';

        props.navigation.navigate(page, params)
    };

    const canReserveParkingSpot = entrance.date && entrance.time && exit.date && exit.time && totalPayment > 0;

    // ============================ JSX

    return (<>
        <Text style={styles.title}>Parking Details</Text>

        <View style={styles.detailsContainer}>
            <Text style={styles.detail}>Name: {Name}</Text>
            <Text style={styles.detail}>Address: {Address}</Text>
            <Text style={styles.detail}>Hourly Tariff: {HourlyTariff}</Text>
        </View>

        <View>

            <View style={styles.entranceContainer}>

                <View>
                    <Text style={styles.dateDetail}>Entrance date: {entrance.date}</Text>
                    <Text style={styles.dateDetail}>Entrance time: {entrance.time?.slice(0,5)}</Text>
                </View>

                <Button
                    style={styles.button}
                    mode="contained"
                    onPress={() => showDateTimePicker(setEntrance)}
                >
                    {entrance.show ? 'Close' : 'Choose'}
                </Button>
            </View>

            { entrance.date &&
                <View style={styles.entranceContainer}>
                    <View>
                        <Text style={styles.dateDetail}>Exit date: {exit.date}</Text>
                        <Text style={styles.dateDetail}>Exit time: {exit.time?.slice(0,5)}</Text>
                    </View>
                    <Button
                        style={styles.button}
                        mode="contained"
                    onPress={() => showDateTimePicker(setExit)}
                    >
                        {exit.show ? 'Close' : 'Choose'}
                    </Button>
                </View>
            }

        </View>

        <View>
            <DateTimePickerModal
                isVisible={entrance.show}
                mode="datetime"
                minimumDate={new Date()}
                onConfirm={(dateTime) => handleDateChange('entrance', dateTime)}
                onCancel={() => setEntrance(prevState => { return { ...prevState, show: false} })}
            />
        
            <DateTimePickerModal
                isVisible={exit.show}
                mode="datetime"
                minimumDate={new Date(entrance.date)}
                onConfirm={(dateTime) => handleDateChange('exit', dateTime)}
                onCancel={() => setExit(prevState => { return { ...prevState, show: false} })}
            />
        </View>

        { canReserveParkingSpot &&
            <>
                { Type === 'empty' && <Text style={styles.payment}>Total payment: {totalPayment}</Text> }
                <View style={styles.confirmContainer}>
                    <Button 
                        style={styles.button}
                        mode="contained"
                        onPress={handlePageSwitch}
                    >
                        { Type === 'empty' ? 'Confirm' : 'Auction'} 
                    </Button>
                </View>
            </>                
        }

        { totalPayment <= 0 && <Text style={styles.error}>Exit time must be after entrance time!</Text>}

    </>)
};

// ================================== styles

const styles = StyleSheet.create({
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        textDecorationLine: 'underline',
        alignSelf: 'center',
        marginTop: 20
    },
    detailsContainer: {
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 4,
        padding: 10,
        margin: 10,
    },
    detail: {
        fontSize: 20,
        margin: 10
    },
    entranceContainer: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        margin: 10,
        padding: 10,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 4,
    },
    dateDetail: {
        fontSize: 15
    },
    confirmContainer: {
        marginTop: 12,
        alignSelf: 'center'
    },
    payment: {
        fontSize: 20,
        margin: 40,
        alignSelf: 'center'
    },
    button: {
        padding: 4,
        backgroundColor: '#009387'
    },
    error: {
        fontSize: 20,
        margin: 30,
        color: 'red'
    }
});
