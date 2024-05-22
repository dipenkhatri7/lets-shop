import { useState } from "react";
import { View, Text, Pressable } from "react-native";
import CustomTextFieldContainer from "../../../components/customTextFieldContainer";
import CustomButton from "../../../components/customButton";
import { Colors } from "../../../constants/styles";
import Checkbox from "expo-checkbox";
function AuthForm({ isLogin, onSubmit, credentialsInvalid }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSelected, setSelection] = useState(false);

  const dividerLineClass = isLogin ? "mb-10 mt-3" : "mb-5";
  const {
    fullName: fullNameError,
    email: emailError,
    password: passwordError,
    confirmPassword: confirmPasswordError,
  } = credentialsInvalid;

  function updateInputValueHandler(inputType, newValue) {
    switch (inputType) {
      case "fullName":
        setFullName(newValue);
        break;
      case "email":
        setEmail(newValue);
        break;
      case "password":
        setPassword(newValue);
        break;
      case "confirmPassword":
        setConfirmPassword(newValue);
        break;
      default:
        break;
    }
  }

  function onSubmitHandler() {
    onSubmit({
      fullName: fullName,
      email: email,
      password: password,
      confirmPassword: confirmPassword,
    });
  }

  return (
    <>
      {!isLogin && (
        <CustomTextFieldContainer
          label="Full Name"
          hintText="Enter your full name"
          controller={fullName}
          onChanged={(newValue) =>
            updateInputValueHandler("fullName", newValue)
          }
          inputType="default"
          isInvalid={fullNameError}
        />
      )}
      <CustomTextFieldContainer
        label="Email"
        hintText="example@gmail.com"
        controller={email}
        onChanged={(newValue) => updateInputValueHandler("email", newValue)}
        inputType="email-address"
        isInvalid={emailError}
      />
      <CustomTextFieldContainer
        label="Password"
        hintText="Enter your password"
        controller={password}
        onChanged={(newValue) => updateInputValueHandler("password", newValue)}
        inputType="password"
        isPassword={true}
        isInvalid={passwordError}
      />
      {!isLogin && (
        <CustomTextFieldContainer
          label="Confirm Password"
          hintText="Confirm your password"
          controller={confirmPassword}
          onChanged={(newValue) =>
            updateInputValueHandler("confirmPassword", newValue)
          }
          inputType="password"
          isPassword={true}
          isInvalid={confirmPasswordError}
        />
      )}
      {isLogin && (
        <View className="flex flex-row justify-between my-4">
          <View className="flex flex-row items-center">
            <Checkbox
              value={isSelected}
              onValueChange={(newValue) => setSelection(newValue)}
              color={isSelected ? Colors.primary : "grey"}
            />
            <Text className="font-urbanist-regular ml-2">Remember me</Text>
          </View>
          <Pressable
            android_ripple={{ color: "#ccc" }}
            style={({ pressed }) => [
              {
                opacity: pressed ? 0.7 : 1,
              },
            ]}
            onPress={() => {}}
          >
            <Text className="text-black-600 font-urbanist-medium font-bold">
              Forgot Password?
            </Text>
          </Pressable>
        </View>
      )}
      {!isLogin && <View className="mt-2"></View>}
      <CustomButton
        text={isLogin ? "Login" : "Sign Up"}
        onPress={onSubmitHandler}
        color={Colors.primary}
        borderRadius={5}
        textColor="#FFFFFF"
        marginBottom={20}
      />
      <View className={dividerLineClass}>
        <View className="flex-row items-center">
          <View className="flex-1 h-px bg-gray-400" />
          <Text className="mx-2 font-urbanist-regular tracking-wider text-base text-black">
            or continue
          </Text>
          <View className="flex-1 h-px bg-gray-400" />
        </View>
      </View>
      <CustomButton
        text={isLogin ? "Login With Google" : "Sign Up With Google"}
        onPress={() => {
          // navigation.replace("Login");
        }}
        color="#FFFFFF"
        borderRadius={5}
        textColor="black"
        marginBottom={30}
        icon={"logo-google"}
        borderColor={"black"}
      />
    </>
  );
}

export default AuthForm;
