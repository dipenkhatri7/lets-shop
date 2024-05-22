import React, { useState } from "react";
import {
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { Colors } from "../constants/styles";

const CustomTextField = ({
  hintText = "Write something...",
  controller,
  focusNode,
  readOnly = false,
  isEnabled = true,
  inputType = "default",
  maxLines = 1,
  onTap,
  onChanged,
  isInvalid,
  prefixIcon,
  capitalization = "none",
  isPassword = false,
  prefixSize = 10,
  textAlign = "left",
  divider = false,
}) => {
  const [obscureText, setObscureText] = useState(isPassword);
  const [localIsInvalid, setLocalIsInvalid] = useState(isInvalid);

  const togglePasswordVisibility = () => {
    setObscureText(!obscureText);
  };

  return (
    <View>
      <TextInput
        onChangeText={onChanged}
        editable={!readOnly}
        placeholder={hintText}
        multiline={maxLines > 1}
        numberOfLines={maxLines}
        onFocus={onTap}
        style={[
          styles.input,
          isInvalid && { backgroundColor: Colors.error100 },
        ]}
        value={controller}
        textAlign={textAlign}
        keyboardType={inputType}
        textContentType={capitalization}
        secureTextEntry={obscureText}
      />
      {divider && <View style={styles.divider} />}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    fontFamily: "urbanist-regular",
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 10,
    padding: 14,
    marginBottom: 10,
    fontSize: 16,
  },
  divider: {
    height: 1,
    backgroundColor: "black",
    marginVertical: 10,
  },
});

export default CustomTextField;
