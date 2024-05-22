import { View, Text, Image } from "react-native";

const HeaderTitle = () => {
  return (
    <View className="flex-row items-center">
      <Image
        source={require("../../assets/images/logo.png")}
        className="w-8 h-8 mr-2"
      />
      <Text className="text-black text-xl font-urbanist-medium">
        Let's Shop
      </Text>
    </View>
  );
};
export default HeaderTitle;
