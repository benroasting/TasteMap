import { StyleSheet, TextInput, TextInputProps } from "react-native";
import React from "react";
import { defaultStyles } from "@/constants/Styles";

interface FormInputsProps {
  style?: TextInputProps["style"];
  value: string;
  onChange: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  autoCapitalize?: TextInputProps["autoCapitalize"];
}

const FormInputs: React.FC<FormInputsProps> = ({
  style,
  value,
  onChange,
  placeholder,
  secureTextEntry,
  autoCapitalize,
}) => {
  return (
    <>
      <TextInput
        style={defaultStyles.inputField}
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        autoCapitalize={autoCapitalize}
      />
    </>
  );
};

export default FormInputs;
