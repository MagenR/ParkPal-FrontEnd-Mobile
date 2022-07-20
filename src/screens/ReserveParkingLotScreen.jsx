import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { Button, Checkbox } from 'react-native-paper';


const apiUrlReserve = 'https://Proj.ruppin.ac.il/bgroup52/test2/tar6/api/parkingarrangements/reserve';
const apiUrlAuction = 'https://Proj.ruppin.ac.il/bgroup52/test2/tar6/api/auctions/reserve';

export default function ReserveParkingLotScreen(props) {

  // ============================ vars
  const { chosenPark } = props.route.params;
  const { Id, Name, Address, HourlyTariff, NumOfSpaces, Type } = chosenPark;
  const { EntranceDateTime, ExitDateTime, ExitTime, ExitDate, EnterTime, EnterDate } = props.route.params; // add user Id.
  const TotalPayment = (ExitDateTime - EntranceDateTime) / (1000 * 60 * 60) * HourlyTariff;

  // ============================ hooks
  const [isSelected, setChecked] = useState(false);
  const [maxPayment, setMaxPayment] = useState(0);
  //const [TotalPayment, setTotalPayment] = useState((ExitDateTime - EntraceDateTime) / (1000 * 60 * 60) * HourlyTariff);
  //const [totalPayment, setTotalPayment] = useState(null);

  // ============================ handlers

  // useEffect(() => {
  //   console.log(props.route.params);
  //   setTotalPayment(TotalPayment.toFixed(2));
  // }, [])

  //const prepareDate = (dateObj) => { // formats date object for payment calculations
  //    return new Date(`${dateObj.date}T${dateObj.time}`);
  //}

  // 
  const handlePost = () => {
    let arrangement = {
      Buyer: {
        Id: 3
      },
      ParentSpot: {
        ParentLot: {
          Id: Id,
          NumOfSpaces: NumOfSpaces
        }
      },
      StartTime: EntranceDateTime,
      EndTime: ExitDateTime
    }

    let auction = {
      SoldArrangement: arrangement,
      StartingPrice: maxPayment  
    }

    console.log(isSelected ? auction : arrangement);

    fetch(isSelected ? apiUrlAuction : apiUrlReserve, {
      method: 'POST',
      body: JSON.stringify(isSelected ? auction : arrangement),
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
        },
        (error) => {
          console.log("err POST=", error);
        });
  }

  const handleTextChange = (text) => { setMaxPayment(Number(text)) };


  const handlePageSwitch = () => { // moves to next page and called when user finished flow and clicks confirm
    const params = {
      chosenPark,
      TotalPayment,
      EntraceDateTime,
      ExitDateTime
    };

    props.navigation.navigate('PaymentScreen', params)
  };

  const canReserveParkingSpot = TotalPayment > 0;

  // ============================ JSX

  return (
    <View>
      <Text style={styles.title}>Parking Details</Text>

      <View style={styles.detailsContainer}>
        <Text style={styles.detail}>Name: {Name}</Text>
        <Text style={styles.detail}>Address: {Address}</Text>
        <Text style={styles.detail}>Hourly Tariff: {HourlyTariff}</Text>
      </View>

      <View>

        <View style={styles.entranceContainer}>
          <View>
            <Text style={styles.dateDetail}>Entrace date: {EnterDate}</Text>
            <Text style={styles.dateDetail}>Entrace time: {EnterTime}</Text>
          </View>
        </View>

      </View>

      <View>

        <View style={styles.entranceContainer}>
          <View>
            <Text style={styles.dateDetail}>Exit date: {ExitDate}</Text>
            <Text style={styles.dateDetail}>Exit time: {ExitTime}</Text>
          </View>
        </View>

      </View>

      <View>

        {/* {<Text style={styles.payment}>Total payment: {TotalPayment}</Text>} */}

        <View style={styles.checkboxContainer}>
          <Checkbox
            status={isSelected ? 'checked' : 'unchecked'}
            onPress={() => {
              setChecked(!isSelected);
            }}
          />
          <Text style={styles.label}>Set as future auction</Text>
        </View>

        {isSelected &&
          <View style={styles.detailsContainer}>
            <Text style={styles.detail}>Enter minimal price:</Text>
            <TextInput
              style={styles.input}
              placeholder='Amount'
              placeholderTextColor='#cdd0d2'
              onChangeText={handleTextChange}
              keyboardType='decimal-pad'
            />
          </View>

        }

        <View style={styles.confirmContainer}>
          <Button
            style={styles.button}
            mode="contained"
            onPress={handlePost}
          >
            Confirm
          </Button>
        </View>

      </View>

    </View>
  );
}
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
    margin: 10,
  },
  detail: {
    fontSize: 15,
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
  },
  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  checkbox: {
    alignSelf: "center",
  },
  label: {
    margin: 8,
  },
});
