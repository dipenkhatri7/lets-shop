import React from "react";
import { View, Text, Image, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const CategoryText = ({
  leftText,
  rightText,
  imageSourcePrototype,
  onPress,
}) => {
  return (
    <Pressable
      android_ripple={{ color: "#ccc" }}
      style={({ pressed }) => [
        {
          opacity: pressed ? 0.9 : 1,
        },
      ]}
      onPress={onPress}
      className="flex flex-row justify-between align-center items-center p-2"
    >
      <View className="flex flex-row items-center">
        {imageSourcePrototype && (
          <Image
            source={imageSourcePrototype}
            style={{ width: 48, height: 48, marginRight: 2 }}
          />
        )}
        <Text
          className={`text-xl font-urbanist-medium ${
            !imageSourcePrototype && "ml-3"
          }`}
        >
          {leftText}
        </Text>
      </View>
      {rightText && (
        <View className="flex flex-row items-center">
          <Text className="font-urbanist-regular text-lg mr-2">
            {rightText}
          </Text>
          <Ionicons name="chevron-forward" size={24} color="black" />
        </View>
      )}
    </Pressable>
  );
};

export default CategoryText;
