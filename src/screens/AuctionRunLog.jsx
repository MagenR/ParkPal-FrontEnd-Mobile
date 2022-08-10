import { View, Text, StyleSheet, ScrollView  } from 'react-native'
import React, { useState, useEffect } from 'react';

export default function AuctionRunLog({ navigation, route }) {

  useEffect(() => {
    console.log("rrrrrrrrrrrrrrrrrrrrr= " + route.params.BidHistory)
    console.log("rrrrrrrrrrrrrrrrrrrrr= " + route.params.BidHistory.length)

  console.log("type!!!!" + route.params.BidHistory[0]);
  }, [])
  

  return (
    <View>
      <Text style={styles.title}>Auction Run Log</Text>
      <ScrollView  style={styles.detailsContainer}>
      {route.params.BidHistory.map((logEntry, index) => (
        <Text style={styles.detail} key={index}>{logEntry}</Text>
        ))}
      </ScrollView>
    </View>
  )
}

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
      detail: {
        fontSize: 15,
        margin: 4,
      },
});