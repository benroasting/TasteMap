import { StyleSheet } from "react-native";

import { Text, View } from "@/components/Themed";
import { Link } from "expo-router";
import { COLORS } from "@/constants/Colors";

export default function Home() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>taste map</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <Link href="/(modals)/signUpSignIn">Log In</Link>
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
    fontSize: 48,
    fontWeight: "bold",
    fontFamily: "WorkSans",
    color: COLORS.cerulean,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
