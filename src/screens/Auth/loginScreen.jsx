import { useContext, useState } from "react";
import AuthContent from "./components/authContent";
import { login } from "../../utils/auth";
import Loading from "../../components/loading";
import { Alert } from "react-native";
import { AuthContext } from "../../store/auth-context";

function LoginScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const authCtx = useContext(AuthContext);
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
