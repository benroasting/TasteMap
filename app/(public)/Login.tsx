import React, { useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useRouter } from "expo-router";
import { useOAuth, useSignIn } from "@clerk/clerk-expo";

// Components
import FormInputs from "@/components/FormInputs";
import { Separator } from "@/components/Separator";
import Spinner from "react-native-loading-spinner-overlay";
import { useWarmUpBrowser } from "@/helpers/useWarmUpBrowser";

// Styles
import { Ionicons } from "@expo/vector-icons";
import { defaultStyles } from "@/constants/Styles";
// import { useWarmUpBrowser } from "@/helpers/useWarmUpBrowser";
import { heightPercentage, widthPercentage } from "@/helpers/dimensions";

enum Strategy {
  Google = "oauth_google",
  // Add more strategies here
}

const Login = () => {
  useWarmUpBrowser();
  const router = useRouter();
  const { signIn, setActive, isLoaded } = useSignIn();

  // const { startOAuthFlow: googleAuth } = useOAuth({
  //   strategy: "oauth_google",
  // });

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onRegisterPress = () => {
    router.push("/register");
  };

  const onResetPress = () => {
    router.push("/reset");
  };

  const onSignInPress = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLoaded) return;
    setLoading(true);

    try {
      await signIn.create({
        identifier: emailAddress,
        password,
      });

      await setActive({ session: signIn.createdSessionId });
      // router.replace("/(auth)/journal");
    } catch (error: any) {
      console.error(JSON.stringify(error, null, 2));
    } finally {
      setLoading(false);
    }
  };

  // const onSelectAuth = async (strategy: Strategy) => {
  //   const selectAuth = {
  //     [Strategy.Google]: googleAuth,
  //   }[strategy];

  //   try {
  //     const { createdSessionId, setActive, signIn, signUp } =
  //       await selectAuth();

  //     if (createdSessionId) {
  //       await setActive!({ session: createdSessionId });

  //       router.replace("/(auth)/journal");
  //     }
  //   } catch (err) {
  //     console.log("OAuth error", err);
  //   }
  // };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Spinner visible={loading} />
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
        <Pressable style={[defaultStyles.button]} onPress={() => onSignInPress}>
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
            <Ionicons name="call" size={24} style={defaultStyles.buttonIcon} />
            <Text style={defaultStyles.buttonOutlineText}>
              Continue with Phone
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[defaultStyles.buttonOutline, { marginBottom: 10 }]}
            // onPress={() => onSelectAuth(Strategy.Google)}
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
        </View>
      </View>
    </View>
  );
};

export default Login;

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
