import React, { useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import { StyleSheet, View, Text } from "react-native";

const Dropdown = ({ items, placeholder, onValueChange, style, title }) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);

  const handleValueChange = (value) => {
    setValue(value);
    if (onValueChange) onValueChange(value);
  };

  return (
    <View style={styles.dropDownContainer}>
      <View style={styles.labelContainer}>
        <Text style={[styles.label, style]}>{title}</Text>
      </View>
      <DropDownPicker
        style={[styles.dropDown, style]}
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={handleValueChange}
        placeholder={placeholder || "Selecione uma opção"}
        placeholderStyle={{
          color: "#B1B0AF",
          fontFamily: "Lato_400Regular",
        }}
        dropDownContainerStyle={{
          bborderWidth: 0,
          borderColor: "transparent",
          elevation: 0,
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0,
          shadowRadius: 0,
          maxHeight: "auto",
        }}
        scrollEnabled={false}
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
    borderWidth: 0, // Remove a borda
    borderColor: "transparent",
  },
});
