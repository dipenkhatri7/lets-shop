import { useContext } from "react";
import { Pressable, View, Text } from "react-native";
import { AuthContext } from "../../store/auth-context";
import CustomButton from "../../components/customButton";
import { Colors } from "../../constants/styles";

/**
 * Profile screen component.
 *
 * Renders user profile information and logout button.
 * @returns {JSX.Element} Profile screen component
 */
function ProfileScreen() {
  // Access authentication context
  const authCtx = useContext(AuthContext);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "white",
        padding: 7,
      }}
    >
      <View>
        <Text
          style={{
            textAlign: "center",
            fontSize: 20,
            fontWeight: "bold",
            marginBottom: 2,
            fontFamily: "urbanist-medium",
          }}
        >
          This app is developed by:
        </Text>
        <View
          style={{
            height: 1,
            width: "100%",
            backgroundColor: "#ccc",
            marginVertical: 3,
          }}
        />
        <Text
          style={{
            textAlign: "center",
            fontSize: 20,
            fontWeight: "bold",
            marginBottom: 2,
            fontFamily: "urbanist-medium",
          }}
        >
          Dipen Khatri
        </Text>
        <Text
          style={{
            textAlign: "center",
            fontSize: 16,
            fontFamily: "urbanist-regular",
          }}
        >
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
