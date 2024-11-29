import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

const InputWithPressable = ({ placeholder, textLabel, onPress }) => {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handlePress = (index) => {
    setSelectedIndex(index);
    onPress(placeholder[index]); // Passa o valor selecionado para o handleInputChange
  };

  return (
    <View style={styles.inputContainer}>
      <View style={styles.input}>
        <View style={styles.rowContainer}>
          <Text style={styles.textLabel}>{textLabel}</Text>
          <View style={styles.pressableContainer}>
            {placeholder.map((item, index) => (
              <Pressable
                key={index}
                style={[
                  styles.pressable,
                  selectedIndex === index && styles.selected,
                ]}
                onPress={() => handlePress(index)}
              >
                <Text
                  style={[
                    styles.pressableText,
                    selectedIndex === index && styles.selectedText,
                  ]}
                >
                  {item}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
};

export default InputWithPressable;

const styles = StyleSheet.create({
  inputContainer: {
    width: 320,
    alignItems: "center",
    gap: 12,
  },
  input: {
    justifyContent: "space-between",
    width: "100%",
    height: 44,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 14,
    backgroundColor: "#FDFDFD",
    fontFamily: "Urbanist_700Bold",
    lineHeight: 22,
    color: "#373737",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 1,
    elevation: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  textLabel: {
    fontFamily: "Lato_400Regular",
    fontSize: 14,
    lineHeight: 21,
  },
  pressableContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "75%",
    gap: 8,
    marginLeft: 8,
  },
  pressable: {
    backgroundColor: "#EDF3FF",
    borderRadius: 150,
    width: 32,
    height: 20,
    paddingTop: 2,
    paddingRight: 8,
    paddingBottom: 2,
    paddingLeft: 8,
  },
  pressableText: {
    color: "#282828",
    fontFamily: "Lato_400Regular",
    fontSize: 12,
    lineHeight: 16,
    textAlign: "center",
  },
  selected: {
    backgroundColor: "#B0C8E5",
    opacity: 1,
  },
  selectedText: {
    color: "#282828",
  },
});
