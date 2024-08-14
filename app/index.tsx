import { Pressable, StyleSheet, Text, View } from "react-native";

import { useRouter } from "expo-router";
import { COLORS } from "@/constants/Colors";
import Button from "@/components/Button";
import ScreenWrapper from "@/helpers/ScreenWrapper";
import { heightPercentage, widthPercentage } from "@/helpers/dimensions";

export default function Home() {
  const router = useRouter();
  return (
    <ScreenWrapper bg="white">
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>taste map</Text>
          <View style={styles.separator} />
          <Text style={styles.subtitle}>document your taste explorations</Text>
        </View>

        <View style={styles.footer}>
          <Button
            title="Start Exploring"
            buttonStyle={{ marginHorizontal: widthPercentage(3) }}
          />
          <View style={styles.footerTextContainer}>
            <Text style={styles.loginText}>Already have an account?</Text>
            <Pressable onPress={() => router.push("/signUpSignIn")}>
              <Text
                style={[
                  styles.loginText,
                  { color: COLORS.eggplant, fontWeight: 800 },
                ]}
              >
                Log In
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: widthPercentage(4),
  },
  titleContainer: {
    gap: 5,
    width: widthPercentage(80),
    alignItems: "center",
  },
  title: {
    fontSize: heightPercentage(6),
    fontWeight: "bold",
    fontFamily: "WorkSans",
    color: COLORS.cerulean,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "WorkSans",
    color: COLORS.charcoal,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
    backgroundColor: COLORS.clean,
  },
  footer: {
    position: "absolute",
    bottom: 60,
    width: "80%",
  },
  footerTextContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
    gap: 5,
  },
  loginText: {
    textAlign: "center",
    color: COLORS.charcoal,
    fontSize: 16,
  },
});
