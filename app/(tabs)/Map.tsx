import { COLORS } from "@/constants/Colors";
import { StyleSheet, Text, View } from "react-native";

export default function Map() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Map</Text>
      <View style={styles.separator} />
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
