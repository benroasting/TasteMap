import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import FormInputs from "@/components/FormInputs";
import { useSignIn } from "@clerk/clerk-expo";
import { defaultStyles } from "@/constants/Styles";
import { widthPercentage } from "@/helpers/dimensions";
import { useRouter } from "expo-router";

const Reset = () => {
  const router = useRouter();
  const { signIn, setActive, isLoaded } = useSignIn();

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [successfulReset, setSuccessfulReset] = useState(false);
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
    try {
      const result = await signIn!.attemptFirstFactor({
        strategy: "reset_password_email_code",
        code,
        password,
      });
      alert("Password reset successfully");
      await setActive!({ session: result.createdSessionId });
    } catch (err: any) {
      alert(err.errors[0].message);
    } finally {
      setLoading(false);
      router.back();
    }
  };
  return (
    <View style={styles.container}>
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
    </View>
  );
};

export default Reset;

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
