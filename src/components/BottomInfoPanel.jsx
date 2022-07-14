import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { Button } from 'react-native-paper';

export default function BottomInfoPanel( props ) {
  // ref
  const bottomSheetRef = useRef(null);

  // variables
  const snapPoints = useMemo(() => ['25%', '85%'], []);

  // callbacks
  const handleSheetChanges = useCallback((index) => {
    console.log('handleSheetChanges', index);
  }, []);

  useEffect(() => {
    console.log(props);
  }, [])
  

  // renders
  return (
    // <View style={styles.container}>
    <BottomSheet
      ref={bottomSheetRef}
      index={0}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
    >
      <View style={[styles.footer]}>
      {props.chosenPark && <View>
        <Text>Name: {props.chosenPark.Name}</Text>
        <Text>Address: {props.chosenPark.Address}</Text>
        <Text>Hourly Tariff: {props.chosenPark.HourlyTariff}</Text>
      </View>}
        <View style={{ marginTop: 10, justifyContent: 'space-between', flex: 2, flexDirection: 'row' }}>
          <Button
            style={{ height: 40 }}
            icon="close"
            mode="contained"
            onPress={() => props.closePanel()}>
            cancel
          </Button>
          <Button
            style={{ height: 40 }}
            icon="check"
            mode="contained"
            onPress={() => console.log("Create booking function")}>
            Book this lot
          </Button>
        </View>
      </View>
    </BottomSheet>
    // {/* </View> */}
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: 'grey',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  footer: {
    flex: Platform.OS === 'ios' ? 3 : 5,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 10,
    paddingTop: 20
  },
});