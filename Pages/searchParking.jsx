import React from "react";
import { View } from "react-native"
import ChooseDateTime from "../ClassComponents/ChooseDateTime";
import ShowMap from "../ClassComponents/ShowMap";

export default function SearchParking() {
  return (
    <View style={{ flex: 1 }}>
      <ShowMap />
      <ChooseDateTime />
    </View>
  )
}
