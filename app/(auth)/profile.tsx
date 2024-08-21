import { StyleSheet, Text, View, Button } from "react-native";
import React from "react";
import { useAuth } from "@clerk/clerk-expo";
import { router } from "expo-router";

const profile = () => {
  const { signOut, isSignedIn } = useAuth();

  return (
    <View>
      <Button title="Log out" onPress={() => signOut()} />
    </View>
  );
};

export default profile;

const styles = StyleSheet.create({});
