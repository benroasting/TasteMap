import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import FormInputs from "@/components/FormInputs";
import { defaultStyles } from "@/constants/Styles";
import { widthPercentage } from "@/helpers/dimensions";
import { useRouter } from "expo-router";
import { useSignUp } from "@clerk/clerk-expo";

const Register = () => {
  const router = useRouter();
  const { signUp, setActive, isLoaded } = useSignUp();
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");

  const onSignUpPress = async () => {
    if (!isLoaded) return;
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
      setLoading(false);
    }
  };

  const onVerifyPress = async () => {
    if (!isLoaded) return;
    setLoading(true);

    try {
      const completeSignUp = await signUp!.attemptEmailAddressVerification({
        code,
      });

      if (completeSignUp.status === "complete") {
        await setActive!({ session: completeSignUp.createdSessionId });
        router.replace("/(auth)/journal");
      }
    } catch (err: any) {
      alert(err.errors[0].message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
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
          <Pressable
            style={defaultStyles.buttonOutline}
            onPress={onVerifyPress}
          >
            <Text style={defaultStyles.buttonOutlineText}>Verify Email</Text>
          </Pressable>
          <Pressable
            style={defaultStyles.buttonOutline}
            onPress={() => router.back()}
          >
            <Text style={defaultStyles.buttonOutlineText}>Back to It</Text>
          </Pressable>
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
