import { View, Image, Text } from "react-native";
import CustomButton from "../../components/customButton";
import { Colors } from "../../constants/styles";

/**
 * The OnBoarding component serves as the welcome screen for the application.
 * It provides navigation options to the Login and Signup screens.
 */
function OnBoarding({ navigation }) {
  return (
    <View className="flex-1 justify-center align-center p-8 bg-white">
      <View>
        <Image
          source={require("../../../assets/images/logo.png")}
          className="w-40 h-40 self-center"
        />
        <Text className="text-4xl text-center font-bold mt-8 mb-36 font-urbanist-medium">
          Let's Shop
        </Text>
      </View>
      <View>
        <CustomButton
          text="Login"
          onPress={() => {
            navigation.replace("Login");
          }}
          color={Colors.primary}
          borderRadius={5}
          textColor="#FFFFFF"
          marginBottom={20}
        />
        <CustomButton
          text="SignUp"
          onPress={() => {
            navigation.replace("Register");
          }}
          color={Colors.primary}
          borderRadius={5}
          textColor="#FFFFFF"
        />
      </View>
    </View>
  );
}

export default OnBoarding;
