import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS } from "@/constants/Colors";
import Loading from "./Loading";
import { heightPercentage } from "@/helpers/dimensions";

interface ButtonProps {
  buttonStyle?: {};
  textStyle?: {};
  title: string;
  onPress?: () => void;
  loading?: boolean;
  hasShadow?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  buttonStyle,
  textStyle,
  title,
  onPress = () => {},
  loading = false,
  hasShadow = false,
}) => {
  if (loading) {
    return (
      <View
        style={[styles.button, buttonStyle, { backgroundColor: "#f1f1f1" }]}
      >
        <Loading />
      </View>
    );
  }

  return (
    <Pressable
      onPress={onPress}
      style={[styles.button || buttonStyle, hasShadow && styles.shadow]}
    >
      <Text style={[styles.text || textStyle]}>{title}</Text>
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.honey,
    height: heightPercentage(6),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  text: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  shadow: {
    shadowColor: COLORS.mist,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
});
