import React from "react";
import { Image, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

const ProfileButton = () => {
  const navigation = useNavigation();

  return (
    <Pressable
      android_ripple={{ color: "#ccc" }}
      style={({ pressed }) => [
        {
          opacity: pressed ? 0.7 : 1,
        },
      ]}
      onPress={() => navigation.navigate("Profile")}
    >
      <Image
        source={require("../../assets/images/user.png")}
        className="w-6 h-6 mr-4"
      />
    </Pressable>
  );
};

export default ProfileButton;
