import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { Button } from 'react-native-paper';

const apiUrl = '';

export default function AuctionScreen(props) {

    const { chosenPark, entrance, exit } = props.route.params;
    
    // ============================ hooks

    const [maxPayment, setMaxPayment] = useState(0);
    const [userConfirmed, setUserConfirmed] = useState(false);
    const [leader, setLeader] = useState('');

    useEffect(() => {
        const fetchLeader = () => {
            fetch(apiUrl, {
                method: 'GET',
                headers: new Headers({
                    'Content-type': 'application/json; charset=UTF-8' 
                })
            })
            .then(res => { return res.json() })
            .then(res => { setLeader(res) })
            .catch(err =>{  console.log(err) })
        };
        fetchLeader();
    }, []); 

    // ============================ handlers

    const handleTextChange = (text) => { setMaxPayment(Number(text)) };

    const startAuction = () => { setUserConfirmed(true); };

    // ============================ JSX

    return (<>
        <Text style={styles.title}>Auction</Text>

        <View style={styles.detailsContainer}>
            <Text style={styles.detail}>Name: {chosenPark.Name}</Text>
            <Text style={styles.detail}>Entrance: {entrance.date} - {entrance.time.slice(0,5)}</Text>
            <Text style={styles.detail}>Exit: {exit.date} - {exit.time.slice(0,5)}</Text>
        </View>
        
        { !userConfirmed &&
            <View style={styles.detailsContainer}>
                <Text style={styles.detail}>Enter maximum payment:</Text>
                <TextInput
                    style={styles.input}
                    placeholder='Amount'
                    placeholderTextColor='#cdd0d2'
                    onChangeText={handleTextChange}
                    keyboardType='decimal-pad'
                />
            </View>

        }
        <View style={userConfirmed ? [styles.detailsContainer, { alignItems: 'center'}] : styles.confirmContainer}>
            { !userConfirmed ?
                <Button 
                    style={styles.button}
                    mode="contained"
                    onPress={startAuction}
                >
                    Confirm
                </Button>
                :
                <>
                    <Text style={styles.secondTitle}>Your maximum bid</Text>
                    <Text style={styles.bid}>{maxPayment} ₪</Text>
                </>
            }
        </View>

        { userConfirmed &&
            <View style={[styles.detailsContainer, { alignItems: 'center'}]}>
                <Text style={styles.secondTitle}>Current auction leader</Text>
                <Text style={styles.leader}>{leader}</Text>
            </View>
        }
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
        margin: 12,
    },
    confirmContainer: {
        padding: 1,
        margin: 12,
        alignItems: 'center'
    },
    detail: {
        fontSize: 20,
        margin: 12,
    },
    input: {
        margin: 12,
        paddingHorizontal: 2,
        paddingVertical: 5,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
    },
    button: {
        padding: 4,
        backgroundColor: '#009387'
    },
    secondTitle: {
        fontSize: 30,
        textDecorationLine: 'underline',
    },
    bid: {
        fontSize: 25,
        alignSelf: 'center'
    },
    leader: {
        fontSize: 25,
        alignSelf: 'center',
        margin: 12,
    }
});
