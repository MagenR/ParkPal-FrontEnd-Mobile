import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Searchbar, Button } from 'react-native-paper';

export default function SearchParamsScreen({ navigation }) {

  const [searchParams, setSearchQuery] = React.useState({
    searchQuery: '',
    enterDate: '',
    enterTime: '',
    exitDate: '',
    exitTime: ''
  });

  const onChangeSearch = query => setSearchQuery(query);

  return (
    <View style={styles.container}>
      <Text>SearchParamsScreen</Text>
      <Searchbar
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchParams.searchQuery}
      />

    <Button
     style={{ height: 40 }}
     mode="contained"
      onPress={()=>console.log('openDateTime')}
      >
      Set Enter Date
    </Button>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 25,
    paddingHorizontal: 20
  }
})