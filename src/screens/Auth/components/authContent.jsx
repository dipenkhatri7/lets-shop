import { useState } from "react";
import { Alert, Pressable, View, Text, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AuthForm from "./authForm";

function AuthContent({ isLogin, onAuthenticate }) {
  const navigation = useNavigation();

  const [credentialsInvalid, setCredentialsInvalid] = useState({
    fullName: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  function submitHandler(credentials) {
    let { fullName, email, password, confirmPassword } = credentials;
    email = email.trim();
    password = password.trim();

    const isEmailValid = email.includes("@");
    const isPasswordValid = password.length > 6;
    const isFullNameValid = fullName.length > 0;
    const isConfirmPasswordValid = confirmPassword === password;

    if (
      !isEmailValid ||
      !isPasswordValid ||
      (!isLogin && (!isFullNameValid || !isConfirmPasswordValid))
    ) {
      Alert.alert("Invalid input", "Please check your inputs and try again", [
        { text: "Okay" },
      ]);
      setCredentialsInvalid({
        fullName: !isFullNameValid,
        email: !isEmailValid,
        password: !isPasswordValid,
        confirmPassword: !isConfirmPasswordValid,
      });
      return;
    }
    isLogin
      ? onAuthenticate({ email, password })
      : onAuthenticate({ email, password, fullName });
  }

  return (
    <View className="flex-1 justify-center align-center bg-white p-7">
      <View>
        <Image
          source={require("../../../../assets/images/logo.png")}
          className="w-20 h-20 self-center"
        />
        <Text className="text-3xl text-center font-bold mt-3 mb-5 font-urbanist-medium">
          {isLogin ? "Login" : "Sign Up"}
        </Text>
      </View>
      <AuthForm
        isLogin={isLogin}
        onSubmit={submitHandler}
        credentialsInvalid={credentialsInvalid}
      />
      <View className="flex flex-row justify-center items-center ">
        <Text className="font-urbanist-regular">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
        </Text>
        <Pressable
          android_ripple={{ color: "#ccc" }}
          style={({ pressed }) => [
            {
              opacity: pressed ? 0.7 : 1,
            },
          ]}
          onPress={() =>
            isLogin
              ? navigation.replace("Register")
              : navigation.replace("Login")
          }
        >
          <Text className="text-blue-600 font-urbanist-medium">
            {isLogin ? "Sign Up" : "Login"}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

export default AuthContent;
