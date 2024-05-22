import { ActivityIndicator, View, Text } from "react-native";

function Loading({ message }) {
  return (
    <View className="flex-1 justify-center align-center">
      <Text className="text-lg mb-2 text-center font-urbanist-regular">
        {message}
      </Text>
      <ActivityIndicator size="large" color="grey" />
    </View>
  );
}

export default Loading;
