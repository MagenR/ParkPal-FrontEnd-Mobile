import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { Button } from 'react-native-paper';

const apiUrl = 'https://Proj.ruppin.ac.il/bgroup52/test2/tar6/api/auctions/auctionsintime';
const postBidUrl = 'https://Proj.ruppin.ac.il/bgroup52/test2/tar6/api/Bidders/postacbidder'

export default function AuctionScreen({navigation, route}) {

  const { chosenPark, EntranceDateTime, ExitDateTime, ExitTime,
    ExitDate, EnterTime, EnterDate } = route.params;

  const UserId = 8; //UserName
  // ============================ hooks

  const [maxPayment, setMaxPayment] = useState(0);
  const [userConfirmed, setUserConfirmed] = useState(false);
  const [leader, setLeader] = useState('');
  const [auctions, setAuctions] = useState([]);
  const [bidHistory, setHistory] = useState([]);
  
  useEffect(() => {
    getAuctions();
  }, []);

  const startAuction = () => {  
    setUserConfirmed(true)
    postBid();
    getAuctions();
  }

  const getAuctions = () => {
    fetch(apiUrl + '?' +
      'parkingLotId=' + chosenPark.Id + '&' +
      'StartTime=' + EntranceDateTime + '&' +
      'EndTime=' + ExitDateTime, {
      method: 'GET',
      headers: new Headers({
        'Content-type': 'application/json; charset=UTF-8'
      })
    })
      .then(res => {
        //console.log('res.status=', JSON.stringify(res.status));
        //console.log('res.ok=', JSON.stringify(res.ok));
        return res.json();
      })
      .then(
        (result) => {
          //console.log("fetch POST=", JSON.stringify(result));
          setAuctions(result === 'No matching auctions found.' ? [] : result);
        },
        (error) => {
          console.log("err POST=", error);
        });
  };

  const postBid = () => {

    let nowDateTime = new Date();
    let nowDate = nowDateTime.toISOString().split('T')[0];
    let nowTime = nowDateTime.toLocaleTimeString();

    let bidInfo = {
        Id: UserId,
        BiddedLot: {
            Id: chosenPark.Id
        },
        bidLimit: maxPayment,
        BidTime: nowDate + 'T' + nowTime,
        ForStartTime: EntranceDateTime,
        ForEndTime: ExitDateTime
    }

    fetch(postBidUrl, {
      method: 'POST',
      body: JSON.stringify(bidInfo),
      headers: new Headers({
        'Content-type': 'application/json; charset=UTF-8'
      })
    })
      .then(res => {
        //console.log('res=', JSON.stringify(res));
        console.log('res.status=', JSON.stringify(res.status));
        console.log('res.ok=', JSON.stringify(res.ok));
        return res.json();
      })
      .then(
        (result) => {
          console.log("fetch POST=", JSON.stringify(result));
          setHistory(result);
        },
        (error) => {
          console.log("err POST=", error);
        });
  }

  // ============================ handlers

  const handleTextChange = (text) => { setMaxPayment(Number(text)) };

  // ============================ JSX

  return (<>
    <Text style={styles.title}>Auction</Text>

    <View style={styles.detailsContainer}>
      <Text style={styles.detail}>{chosenPark.Name}</Text>
      <Text style={styles.detail}>Entrance: {EnterDate} at: {EnterTime}</Text>
      <Text style={styles.detail}>Exit: {ExitDate} at: {ExitTime}</Text>
    </View>

    <View style={styles.detailsContainer}>
      <Text style={styles.detail}>Ongoing auctions</Text>
      {auctions.length > 0 && auctions.map((auction, index) => (
        <View key={auction.Id}>
          <Text style={styles.detail}>Spot: {auction.SoldArrangement.ParentSpot.Number}</Text>
          <Text style={styles.detail}>Starting price: {auction.StartingPrice}</Text>
          {auction.HighestBidder !== null && <Text style={styles.detail}>CurrentBid: {auction.CurrBid}</Text>}
          {/* {auction.HighestBidder !== null && <Text style={styles.detail}>Current Leader {}</Text>} */}
          {/* {typeof auction.HighestBidder.Id !== null && auction.HighestBidder.Id === UserId ? <Text style={styles.detail}> You are leading!</Text> : null} */}
        </View>
      ))}
    </View>

    {!userConfirmed &&
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
    <View style={userConfirmed ? [styles.detailsContainer, { alignItems: 'center' }] : styles.confirmContainer}>
      {!userConfirmed ?
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

    {bidHistory.length > 0 &&
      <View style={styles.confirmContainer}>
        <Button
          style={styles.button}
          mode="contained"
          onPress={() => navigation.navigate('AuctionRunLogScreen', {BidHistory: bidHistory})}
        >
          Auction Log
        </Button>
      </View>
    }
  </>)
};

// ================================== styles

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
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
    fontSize: 15,
    margin: 6,
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
