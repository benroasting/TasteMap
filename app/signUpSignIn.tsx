import { defaultStyles } from "@/constants/Styles";
import { useAuth, useOAuth, useSignIn, useSignUp } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { useState } from "react";
import { useWarmUpBrowser } from "@/helpers/useWarmUpBrowser";
import * as WebBrowser from "expo-web-browser";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import FormInputs from "@/components/FormInputs";
import { COLORS } from "@/constants/Colors";
import { Separator } from "@/components/Separator";
import { Ionicons } from "@expo/vector-icons";
import { widthPercentage } from "@/helpers/dimensions";
import React from "react";

enum Strategy {
  Google = "oauth_google",
  // Add more strategies here
}

WebBrowser.maybeCompleteAuthSession();

export default function SignUpSignIn() {
  useWarmUpBrowser();
  const router = useRouter();

  const {
    signUp,
    setActive: setActiveSU,
    isLoaded: isSignUpLoaded,
  } = useSignUp();

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");

  const onSignUpPress = async () => {
    if (!isSignUpLoaded) {
      return;
    }
    setLoading(true);

    try {
      // Create the user on Clerk
      await signUp.create({
        emailAddress,
        password,
      });
      // Send verification Email
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      // change the UI to verify the email address
      setPendingVerification(true);
    } catch (err: any) {
      alert(err.errors[0].message);
    } finally {
      await setActiveSU({ session: signUp.createdSessionId });
      setLoading(false);
    }
  };

  const [successfulReset, setSuccessfulReset] = useState(false);
  const [loading, setLoading] = useState(false);
  const [intendToRegister, setIntendToRegister] = useState(false);
  const [intendToReset, setIntendToReset] = useState(false);

  const {
    signIn,
    setActive: setActiveSI,
    isLoaded: isSignInLoaded,
  } = useSignIn();

  const onRegisterPress = () => {
    setIntendToRegister(true);
  };

  const onResetPress = () => {
    setIntendToReset(true);
  };

  const { startOAuthFlow: googleAuth } = useOAuth({
    strategy: "oauth_google",
  });

  const { getToken } = useAuth();

  const onSelectAuth = async (strategy: Strategy) => {
    const selectAuth = {
      [Strategy.Google]: googleAuth,
    }[strategy];

    try {
      const { createdSessionId, setActive, signIn, signUp } =
        await selectAuth();

      if (createdSessionId) {
        await setActive!({ session: createdSessionId });
        console.log(
          "setting active session",
          setActive!({ session: createdSessionId })
        );
        router.replace("/(auth)/(tabs)/Journal");
      }
    } catch (err) {
      console.log("OAuth error", err);
    } finally {
      setLoading(false);
      router.replace("/(auth)/(tabs)/Journal");
      console.log(getToken());
      console.log("OAuth flow completed ... back to app");
    }
  };

  const onVerify = async () => {
    if (!isSignUpLoaded) {
      return;
    }
    setLoading(true);

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (completeSignUp.status === "complete") {
        await setActiveSU({ session: completeSignUp.createdSessionId });
        router.replace("/(auth)/(tabs)/Journal");
      }
    } catch (err: any) {
      alert(err.errors[0].message);
    }
  };

  const onSignInPress = async () => {
    if (!isSignInLoaded) {
      return;
    }
    setLoading(true);
    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      });

      await setActiveSI({ session: signInAttempt.createdSessionId });
      router.replace("/(auth)/(tabs)/Journal");
    } catch (error: any) {
      alert(error.error[0].message);
    }
  };

  const onRequestReset = async () => {
    try {
      await signIn!.create({
        strategy: "reset_password_email_code",
        identifier: emailAddress,
      });
      setSuccessfulReset(true);
    } catch (error: any) {
      alert(error.error[0].message);
    }
  };

  const onReset = async () => {
    if (!isSignInLoaded) {
      return;
    }
    setLoading(true);
    try {
      const result = await signIn!.attemptFirstFactor({
        strategy: "reset_password_email_code",
        code,
        password,
      });
      alert("Password reset successfully");
      await setActiveSI({ session: result.createdSessionId });
    } catch (err: any) {
      alert(err.errors[0].message);
    } finally {
      setLoading(false);
      router.back();
    }
  };

  const Login = () => {
    return (
      <>
        {!intendToReset && (
          <View style={styles.formContainer}>
            <FormInputs
              placeholder="Email"
              value={emailAddress}
              onChange={setEmailAddress}
            />
            <FormInputs
              placeholder="Password"
              value={password}
              onChange={setPassword}
              secureTextEntry
            />
            <Pressable style={[defaultStyles.button]} onPress={onSignInPress}>
              <Text style={defaultStyles.buttonText}>Continue</Text>
            </Pressable>

            <Pressable onPress={onRegisterPress}>
              <Text style={styles.links}>Create an account</Text>
            </Pressable>
            <Pressable onPress={onResetPress}>
              <Text style={styles.links}>Reset Password</Text>
            </Pressable>

            <Separator text="or" />

            <View>
              <TouchableOpacity
                style={[defaultStyles.buttonOutline, { marginBottom: 10 }]}
              >
                <Ionicons
                  name="call"
                  size={24}
                  style={defaultStyles.buttonIcon}
                />
                <Text style={defaultStyles.buttonOutlineText}>
                  Continue with Phone
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[defaultStyles.buttonOutline, { marginBottom: 10 }]}
                onPress={() => onSelectAuth(Strategy.Google)}
              >
                <Ionicons
                  name="logo-google"
                  size={24}
                  style={defaultStyles.buttonIcon}
                />
                <Text style={defaultStyles.buttonOutlineText}>
                  Continue with Google
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={defaultStyles.buttonOutline}
                onPress={() => onSelectAuth(Strategy.Apple)}
              >
                <Ionicons
                  name="logo-apple"
                  size={24}
                  style={defaultStyles.buttonIcon}
                />
                <Text style={defaultStyles.buttonOutlineText}>
                  Continue with Apple
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </>
    );
  };

  const Register = () => {
    return (
      <>
        {!pendingVerification && (
          <View style={styles.formContainer}>
            <FormInputs
              autoCapitalize="none"
              placeholder="Email"
              value={emailAddress}
              onChange={setEmailAddress}
            />
            <FormInputs
              placeholder="Password"
              value={password}
              onChange={setPassword}
              secureTextEntry
            />
            <View>
              <Pressable style={[defaultStyles.button]} onPress={onSignUpPress}>
                <Text style={defaultStyles.buttonText}>Sign Up</Text>
              </Pressable>
              <Pressable
                style={defaultStyles.buttonOutline}
                onPress={() => router.back()}
              >
                <Text style={defaultStyles.buttonOutlineText}>Back to It</Text>
              </Pressable>
            </View>
          </View>
        )}

        {pendingVerification && (
          <>
            <View>
              <FormInputs
                value={code}
                placeholder="Enter the code from your email"
                style={[defaultStyles.inputField]}
                onChange={setCode}
              />
            </View>
            <Pressable style={defaultStyles.buttonOutline} onPress={onVerify}>
              <Text style={defaultStyles.buttonOutlineText}>Verify Email</Text>
            </Pressable>
          </>
        )}
      </>
    );
  };

  const Reset = () => {
    return (
      <View style={styles.formContainer}>
        {!successfulReset && (
          <>
            <FormInputs
              autoCapitalize="none"
              placeholder="Email"
              value={emailAddress}
              onChange={setEmailAddress}
            />
            <Pressable style={[defaultStyles.button]} onPress={onRequestReset}>
              <Text style={defaultStyles.buttonText}>Send Reset Email</Text>
            </Pressable>
          </>
        )}

        {successfulReset && (
          <>
            <FormInputs value={code} placeholder="Code..." onChange={setCode} />
            <FormInputs
              placeholder="New password"
              value={password}
              onChange={setPassword}
              secureTextEntry
            />
            <Pressable
              style={[defaultStyles.button, { marginBottom: 10 }]}
              onPress={onReset}
            >
              <Text style={defaultStyles.buttonText}>Set New Password</Text>
            </Pressable>
          </>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>taste map</Text>
      {loading ? (
        <ActivityIndicator
          animating={loading}
          size="large"
          color={COLORS.honey}
          style={{ marginBottom: 20 }}
        />
      ) : null}
      {intendToRegister ? <Register /> : <Login />}
      {intendToReset && <Reset />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    fontFamily: "WorkSans",
    marginBottom: 20,
  },
  formContainer: {
    width: widthPercentage(80),
  },
  links: {
    textAlign: "center",
    paddingBottom: 2,
  },
});
