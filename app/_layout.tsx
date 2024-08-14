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

const CLERK_PUBLISHABLE_KEY = process.env.CLERK_PUBLISHABLE_KEY as string;

const tokenCache = {
  async getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (error) {
      console.error("SecureStore get item error: ", error);
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (error) {
      return;
    }
  },
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

function RootLayout() {
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
    if (!isLoaded) return;

    const inAuthGroup = segments[0] === "(auth)";

    if (isSignedIn && !inAuthGroup) {
      router.replace("/(tabs)/Journal");
    } else if (!isSignedIn && inAuthGroup) {
      router.replace("/");
    }
  }, [isSignedIn]);

  if (!loaded || !isLoaded) {
    return <Slot />;
  }

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="signUpSignIn"
        options={{
          title: "Log in or sign up",
          headerTitleStyle: {
            fontFamily: "WorkSans",
          },
          presentation: "modal",
          headerRight: () => (
            <Pressable onPress={() => router.back()}>
              <Ionicons
                name="close-outline"
                size={25}
                style={{ marginRight: 15, color: COLORS.eggplant }}
              />
            </Pressable>
          ),
        }}
      />
      <Stack.Screen name="(auth)/(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}

function RootLayoutNav() {
  return (
    <ClerkProvider
      publishableKey={CLERK_PUBLISHABLE_KEY}
      tokenCache={tokenCache}
    >
      <RootLayout />
    </ClerkProvider>
  );
}

export default RootLayoutNav;
