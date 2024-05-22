import React from "react";
import { Image, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

const BackButton = () => {
  const navigation = useNavigation();

  return (
    <Pressable
      android_ripple={{ color: "#ccc" }}
      style={({ pressed }) => [
        {
          opacity: pressed ? 0.7 : 1,
        },
      ]}
      onPress={() => navigation.goBack()}
    >
      <Image
        source={require("../../assets/images/arrow-left.png")}
        style={{ width: 24, height: 24, marginLeft: 15 }}
      />
    </Pressable>
  );
};

export default BackButton;
