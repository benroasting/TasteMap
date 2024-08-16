import React, { useEffect } from "react";
import { Pressable } from "react-native";
import { Slot, Stack, useRouter, useSegments } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import * as SecureStore from "expo-secure-store";
import { ClerkProvider, useAuth } from "@clerk/clerk-expo";

// Styles
import "react-native-reanimated";
import { COLORS } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import ScreenWrapper from "@/helpers/ScreenWrapper";

const CLERK_PUBLISHABLE_KEY = process.env.CLERK_PUBLISHABLE_KEY as string;

const tokenCache = {
  async getToken(key: string) {
    try {
      return await SecureStore.getItemAsync(key);
    } catch (error) {
      console.error("SecureStore get item error: ", error);
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return await SecureStore.setItemAsync(key, value);
    } catch (error) {
      console.error("SecureStore set item error: ", error);
      return;
    }
  },
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

function InitialLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    WorkSans: require("../assets/fonts/WorkSans-VariableFont_wght.ttf"),
    WorkSansItalic: require("../assets/fonts/WorkSans-Italic-VariableFont_wght.ttf"),
  });
  const { isLoaded, isSignedIn } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  useEffect(() => {
    console.log("User changed: ", isSignedIn);
    if (!isLoaded) return;

    const inAuthGroup = segments[0] === "(auth)";
    console.log(" useEffect ~ segment:", inAuthGroup);

    if (isSignedIn && !inAuthGroup) {
      router.replace("/(auth)/journal");
    } else if (!isSignedIn && inAuthGroup) {
      router.replace("/");
    }
  }, [isSignedIn]);

  return <Slot />;
}

const RootLayout = () => {
  return (
    <ClerkProvider
      publishableKey={CLERK_PUBLISHABLE_KEY}
      tokenCache={tokenCache}
    >
      <ScreenWrapper bg="white">
        <InitialLayout />
      </ScreenWrapper>
    </ClerkProvider>
  );
};

export default RootLayout;
