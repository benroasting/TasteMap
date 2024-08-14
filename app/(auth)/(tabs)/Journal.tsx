import { StyleSheet, Text, View } from "react-native";

import { Link } from "expo-router";
import { COLORS } from "@/constants/Colors";

export default function Journal() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Journal</Text>
      <View style={styles.separator} />
      <Link href="/coffee/12">Coffee Details</Link>
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
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "WorkSans",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
    backgroundColor: COLORS.clean,
  },
});
