import React from "react";
import { View, Text, StyleSheet } from "react-native";

const DividerWithText = ({ text }) => (
  <View style={styles.container}>
    <View style={styles.divider} />
    <Text style={styles.text}>{text}</Text>
    <View style={styles.divider} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: "#666666",
  },
  text: {
    marginHorizontal: 10,
    fontFamily: "urbanist-regular",
    letterSpacing: 0.5,
    fontSize: 16,
    color: "black",
  },
});

export default DividerWithText;
