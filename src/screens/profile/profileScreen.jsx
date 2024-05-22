import { useContext } from "react";
import { Pressable, View, Text } from "react-native";
import { AuthContext } from "../../store/auth-context";
import CustomButton from "../../components/customButton";
import { Colors } from "../../constants/styles";

function ProfileScreen() {
  const authCtx = useContext(AuthContext);
  return (
    <View className="flex-1 justify-between align-center bg-white p-7">
      <View>
        <Text className="text-center text-xl font-bold mb-2 font-urbanist-medium">
          This app is developed by:
        </Text>
        <View className="h-px w-full bg-gray-400 my-3" />
        <Text className="text-center text-xl font-bold mb-2 font-urbanist-medium">
          Dipen Khatri
        </Text>
        <Text className="text-center text-md font-normal font-urbanist-regular">
          Khatridipen7@gmail.com
        </Text>
      </View>

      <CustomButton
        text="Logout"
        onPress={authCtx.logout}
        color={Colors.primary}
        borderRadius={5}
        textColor="#FFFFFF"
        marginBottom={20}
      />
    </View>
  );
}

export default ProfileScreen;
