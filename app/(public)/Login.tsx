import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import FormInputs from "@/components/FormInputs";
import { Ionicons } from "@expo/vector-icons";
import { defaultStyles } from "@/constants/Styles";
import { Separator } from "@/components/Separator";
import { useOAuth, useSignIn } from "@clerk/clerk-expo";
// import { useWarmUpBrowser } from "@/helpers/useWarmUpBrowser";
import { useRouter } from "expo-router";
import { widthPercentage } from "@/helpers/dimensions";

enum Strategy {
  Google = "oauth_google",
  // Add more strategies here
}

const router = useRouter();

const Login = () => {
  // useWarmUpBrowser();
  const { signIn, setActive, isLoaded } = useSignIn();

  const { startOAuthFlow: googleAuth } = useOAuth({
    strategy: "oauth_google",
  });

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onRegisterPress = () => {
    router.push("/Register");
  };

  const onResetPress = () => {
    router.push("/Reset");
  };

  const onSignInPress = async () => {
    try {
      const signInAttempt = await signIn!.create({
        identifier: emailAddress,
        password,
      });

      await setActive!({ session: signInAttempt.createdSessionId });
      router.replace("/(auth)/Journal");
    } catch (error: any) {
      alert(error.error[0].message);
    }
  };

  const onSelectAuth = async (strategy: Strategy) => {
    const selectAuth = {
      [Strategy.Google]: googleAuth,
    }[strategy];

    try {
      const { createdSessionId, setActive, signIn, signUp } =
        await selectAuth();

      if (createdSessionId) {
        await setActive!({ session: createdSessionId });

        router.replace("/(auth)/Journal");
      }
    } catch (err) {
      console.log("OAuth error", err);
    }
  };

  return (
    <>
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
            <Ionicons name="call" size={24} style={defaultStyles.buttonIcon} />
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
        </View>
      </View>
    </>
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
