import React, { useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import { StyleSheet, View, Text } from "react-native";

const Dropdown = ({
  items,
  placeholder,
  value,
  onValueChange,
  style,
  title,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <View style={styles.dropDownContainer}>
      <View style={styles.labelContainer}>
        <Text style={[styles.label, style]}>{title}</Text>
      </View>
      <DropDownPicker
        style={[styles.dropDown, style, open && styles.inputFocused]}
        open={open}
        setOpen={setOpen}
        value={value} // Usa o valor passado do pai
        items={items}
        setValue={(callback) => {
          const selectedValue = callback(value);
          console.log("Valor selecionado no Dropdown:", selectedValue);
          onValueChange && onValueChange(selectedValue); // Atualiza valor no pai
        }}
        placeholder={placeholder || "Selecione uma opção"}
        placeholderStyle={{
          color: "#B1B0AF",
          fontFamily: "Lato_400Regular",
        }}
        dropDownContainerStyle={{
          borderWidth: 0,
          borderColor: "transparent",
          elevation: 0,
          maxHeight: "auto",
        }}
        listItemContainerStyle={{
          borderBottomWidth: 0,
        }}
        listItemLabelStyle={{
          fontFamily: "Urbanist_400Regular",
          color: "#282828",
        }}
      />
    </View>
  );
};

export default Dropdown;

const styles = StyleSheet.create({
  dropDownContainer: {
    width: 320,
    gap: 8,
    marginTop: 16,
    marginBottom: 16,
  },
  labelContainer: {
    alignSelf: "flex-start",
  },
  label: {
    fontFamily: "Lato_400Regular",
    fontSize: 14,
    lineHeight: 21,
    height: 21,
  },
  dropDown: {
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 14,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 1,
    elevation: 5,
    backgroundColor: "#FDFDFD",
    width: "100%",
    height: 44,
    fontFamily: "Urbanist_700Bold",
    lineHeight: 22,
    color: "#373737",
    borderColor: "transparent",
  },
  inputFocused: {
    borderColor: "#5FA8FF",
    borderWidth: 1,
    shadowColor: "#B4D2F8", // Cor da sombra
    shadowOffset: { width: 0, height: 0 }, // Sem deslocamento
    shadowOpacity: 1, // Totalmente opaco
    shadowRadius: 3, // Tamanho da difusão
    elevation: 4, // Adicionado para compatibilidade com Android
  },
});
