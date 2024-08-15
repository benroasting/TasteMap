import { defaultStyles } from "@/constants/Styles";
import { useAuth, useOAuth, useSignIn, useSignUp } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { useState } from "react";
// import { useWarmUpBrowser } from "@/helpers/useWarmUpBrowser";
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

import { widthPercentage } from "@/helpers/dimensions";
import React from "react";

WebBrowser.maybeCompleteAuthSession();

export default function SignUpSignIn() {
  // useWarmUpBrowser();
  const router = useRouter();

  const { getToken } = useAuth();

  // const Reset = () => {
  //   return (

  //   );
  // };

  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>taste map</Text>
      {loading ? (
        <ActivityIndicator
          animating={loading}
          size="large"
          color={COLORS.honey}
          style={{ marginBottom: 20 }}
        />
      ) : null}
      {intendToRegister ? <Register /> : <Login />}
      {intendToReset && <Reset />} */}
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
