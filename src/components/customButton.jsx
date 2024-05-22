import React from "react";
import { Pressable, Text, Image, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const CustomButton = ({
  image,
  text,
  onPress,
  textColor,
  width,
  color,
  backgroundColor,
  fontSize,
  borderRadius,
  height,
  icon,
  letterSpacing,
  margin,
  marginBottom,
  borderColor,
}) => {
  return (
    <Pressable
      android_ripple={{ color: "#ccc" }}
      style={({ pressed }) => [
        styles.container,
        {
          width: width || "100%",
          height: height || 50,
          margin: margin ? 20 : 0,
          backgroundColor: backgroundColor || color || "#6200EE",
          borderRadius: borderRadius || 0,
          opacity: pressed ? 0.7 : 1,
          marginBottom: marginBottom ?? 0,
          borderColor: borderColor || "transparent",
          borderWidth: borderColor ? 1 : 0,
        },
      ]}
      onPress={onPress}
    >
      {image && <Image source={image} style={styles.image} />}
      <Text
        style={{
          color: textColor || "#FFFFFF",
          fontSize: fontSize || 18,
          letterSpacing: letterSpacing || 0,
          fontFamily: "urbanist-regular",
        }}
      >
        {text}
      </Text>
      {icon && (
        <Ionicons name={icon} size={24} color="#FFFFFF" style={styles.icon} />
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontWeight: "800",
  },
  image: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  icon: {
    marginLeft: 8,
    color: "#666666",
  },
});

export default CustomButton;
