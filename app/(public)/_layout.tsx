import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/constants/Colors";

const PublicLayout = () => {
  const router = useRouter();

  const CloseButton = () => {
    return (
      <Pressable onPress={() => router.back()}>
        <Ionicons
          name="close-outline"
          size={25}
          style={{ marginRight: 15, color: COLORS.eggplant }}
        />
      </Pressable>
    );
  };

  return (
    <Stack
      screenOptions={{
        headerTintColor: COLORS.salmon,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="Login"
        options={{
          title: "Log in",
          headerTitleStyle: {
            fontFamily: "WorkSans",
          },
        }}
      />
      <Stack.Screen
        name="Register"
        options={{
          title: "Create Account",
          headerTitleStyle: {
            fontFamily: "WorkSans",
          },
        }}
      />
      <Stack.Screen
        name="Reset"
        options={{
          title: "Reset Password",
          headerTitleStyle: {
            fontFamily: "WorkSans",
          },
        }}
      />
    </Stack>
  );
};

export default PublicLayout;

const styles = StyleSheet.create({});
