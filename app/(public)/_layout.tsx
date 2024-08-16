import React from "react";
import { Stack, useRouter } from "expo-router";
import { COLORS } from "@/constants/Colors";
import { Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

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
        headerStyle: {
          backgroundColor: "#f9f9f9",
        },
        headerTintColor: COLORS.charcoal,
        headerTitleStyle: {
          fontFamily: "WorkSans",
        },
      }}
    >
      <Stack.Screen
        name="login"
        options={{
          headerTitle: "Log In",
          headerRight: () => <CloseButton />,
        }}
      ></Stack.Screen>
      <Stack.Screen
        name="register"
        options={{
          headerTitle: "Create Account",
        }}
      ></Stack.Screen>
      <Stack.Screen
        name="reset"
        options={{
          headerTitle: "Reset Password",
        }}
      ></Stack.Screen>
    </Stack>
  );
};

export default PublicLayout;
