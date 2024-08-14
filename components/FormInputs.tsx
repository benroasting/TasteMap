import { StyleSheet, TextInput } from "react-native";
import React from "react";
import { defaultStyles } from "@/constants/Styles";

const FormInputs = (props: any) => {
  return (
    <>
      <TextInput
        style={defaultStyles.inputField}
        autoCorrect={false}
        {...props}
      />
    </>
  );
};

export default FormInputs;

const styles = StyleSheet.create({});
