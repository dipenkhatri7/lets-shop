import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import CustomTextField from "./customTextField";

const CustomTextFieldContainer = ({ label, hintText, ...textFieldProps }) => {
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <View>
        <CustomTextField hintText={hintText} {...textFieldProps} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontFamily: "urbanist-regular",
    fontSize: 18,
    color: "black",
    marginBottom: 10,
  },
});

export default CustomTextFieldContainer;
