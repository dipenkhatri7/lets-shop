import { createUser } from "../../utils/auth";
import Loading from "../../components/loading";
import { useContext, useState } from "react";
import { AuthContext } from "../../store/auth-context";
import AuthContent from "./components/authContent";

function SignupScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const authCtx = useContext(AuthContext);
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
  if (isAuthenticating) {
    return <Loading message={"Creating your account..."} />;
  }
  return (
    <>
      <AuthContent onAuthenticate={signupHandler} />
    </>
  );
}

export default SignupScreen;
