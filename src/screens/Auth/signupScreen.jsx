import { createUser } from "../../utils/auth";
import Loading from "../../components/loading";
import { useContext, useState } from "react";
import { AuthContext } from "../../store/auth-context";
import AuthContent from "./components/authContent";
import { Alert } from "react-native";

/**
 * The SignupScreen component provides the user interface for user registration.
 * It handles user signup by interacting with the authentication API and managing authentication state.
 */
function SignupScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const authCtx = useContext(AuthContext);

  /**
   * Handles user signup by calling the createUser function and updating the authentication context.
   * Displays a loading spinner while the signup process is in progress.
   * @param {Object} param0 - An object containing email, password, and fullName.
   */
  async function signupHandler({ email, password, fullName }) {
    setIsAuthenticating(true);
    try {
      const token = await createUser(email, password, fullName);
      authCtx.authenticate(token);
    } catch (error) {
      Alert.alert(
        "Authentication failed!",
        "Could not create user. Please try again",
        [{ text: "Okay" }]
      );
      setIsAuthenticating(false);
    }
  }

  // Show a loading indicator while the signup process is in progress.
  if (isAuthenticating) {
    return <Loading message={"Creating your account..."} />;
  }

  // Render the authentication content when not loading.
  return (
    <>
      <AuthContent onAuthenticate={signupHandler} />
    </>
  );
}

export default SignupScreen;
