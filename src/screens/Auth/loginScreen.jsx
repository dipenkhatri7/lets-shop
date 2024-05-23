import { useContext, useState } from "react";
import { Alert } from "react-native";
import AuthContent from "./components/authContent";
import { login } from "../../utils/auth";
import Loading from "../../components/loading";
import { AuthContext } from "../../store/auth-context";

/**
 * The LoginScreen component handles the user login process.
 * It displays a loading spinner while authenticating and
 * shows an alert if authentication fails.
 */
function LoginScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const authCtx = useContext(AuthContext);

  /**
   * Handles the login process.
   * @param {Object} credentials - The user's login credentials.
   * @param {string} credentials.email - The user's email.
   * @param {string} credentials.password - The user's password.
   */
  async function loginHandler({ email, password }) {
    setIsAuthenticating(true);
    try {
      const token = await login(email, password);
      authCtx.authenticate(token);
    } catch (error) {
      Alert.alert(
        "Authentication failed!",
        "Could not authenticate you. Please try again.",
        [{ text: "Okay" }]
      );
      setIsAuthenticating(false);
    }
  }

  if (isAuthenticating) {
    return <Loading message={"Logging you in..."} />;
  }

  return (
    <>
      <AuthContent isLogin onAuthenticate={loginHandler} />
    </>
  );
}

export default LoginScreen;
