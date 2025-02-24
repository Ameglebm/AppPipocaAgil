import React, { useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import { StyleSheet, View, Text } from "react-native";
import PropTypes from "prop-types";

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
    <View style={[styles.dropDownContainer, style?.dropDownContainer]}>
      <View style={styles.labelContainer}>
        <Text style={[styles.label, style]}>{title}</Text>
      </View>
      <DropDownPicker
        style={[styles.dropDown, style, open && styles.inputFocused]}
        open={open}
        listMode="SCROLLVIEW"
        setOpen={setOpen}
        value={value} // Usa o valor passado do pai
        items={items}
        setValue={(callback) => {
          const selectedValue =
            typeof callback === "function" ? callback(value) : callback;
          console.log("Valor selecionado no Dropdown:", selectedValue);
          onValueChange && onValueChange(selectedValue);
        }}
        placeholder={placeholder || "Selecione uma opção"}
        placeholderStyle={{
          color: "#B1B0AF",
          fontFamily: "Lato_400Regular",
          fontSize: 16,
        }}
        dropDownContainerStyle={{
          borderWidth: 1,
          borderColor: "#E5E5E5",
          elevation: 0,
          maxHeight: "auto",
        }}
        listItemContainerStyle={{
          borderBottomWidth: 0,
        }}
        listItemLabelStyle={{
          fontFamily: "Urbanist_400Regular",
          color: "#282828",
          fontSize: 15,
        }}
      />
    </View>
  );
};

export default Dropdown;

Dropdown.propTypes = {
  items: PropTypes.array,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onValueChange: PropTypes.func,
  style: PropTypes.object,
  title: PropTypes.string,
};

const styles = StyleSheet.create({
  dropDownContainer: {
    width: 320,
    gap: 8,
    marginTop: 16,
    marginBottom: 24,
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
    paddingHorizontal: 16,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 1,
    elevation: 5,
    backgroundColor: "#FDFDFD",
    width: 320,
    height: 44,
    minHeight: 44,
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
