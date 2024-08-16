import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import FormInputs from "@/components/FormInputs";
import { defaultStyles } from "@/constants/Styles";
import { widthPercentage } from "@/helpers/dimensions";
import { useRouter } from "expo-router";
import { useSignUp } from "@clerk/clerk-expo";
import Spinner from "react-native-loading-spinner-overlay";

const Register = () => {
  const router = useRouter();
  const { signUp, setActive, isLoaded } = useSignUp();

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  const onSignUpPress = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLoaded) return;
    setLoading(true);

    try {
      await signUp.create({
        emailAddress,
        password,
      });

      // Send verification Email

      // change the UI to verify the email address
      setPendingVerification(true);
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
    } finally {
      setLoading(false);
    }
  };

  const onVerifyPress = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLoaded) return;
    setLoading(true);

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        router.replace("/(auth)/journal");
      } else {
        console.error(JSON.stringify(completeSignUp, null, 2));
      }
    } catch (err: any) {
      console.error("Error", JSON.stringify(err, null, 2));
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Spinner visible={loading} />
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
            <Pressable
              style={[defaultStyles.button]}
              onPress={() => onSignUpPress}
            >
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
          <View style={styles.formContainer}>
            <FormInputs
              value={code}
              placeholder="Enter the code from your email"
              style={[defaultStyles.inputField]}
              onChange={setCode}
            />
            <Pressable
              style={defaultStyles.buttonOutline}
              onPress={() => onVerifyPress}
            >
              <Text style={defaultStyles.buttonOutlineText}>Verify Email</Text>
            </Pressable>
            <Pressable
              style={defaultStyles.buttonOutline}
              onPress={() => router.back()}
            >
              <Text style={defaultStyles.buttonOutlineText}>Back to It</Text>
            </Pressable>
          </View>
        </>
      )}
    </View>
  );
};

export default Register;

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
