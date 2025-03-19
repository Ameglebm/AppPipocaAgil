import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import PropTypes from "prop-types";

const ButtonCancel = ({ onPress, style }) => {
  return (
    <View style={[styles.container, style?.container]}>
      <TouchableOpacity
        style={[styles.btnCancel, style?.btnCancel]}
        onPress={onPress}
      >
        <Text style={styles.btnTextCancel}>Cancelar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ButtonCancel;

ButtonCancel.propTypes = {
  onPress: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  style: PropTypes.shape({
    container: PropTypes.object,
    btnCancel: PropTypes.object,
    btnTextCancel: PropTypes.object,
  }),
};

const styles = StyleSheet.create({
  container: {
    width: 154,
    justifyContent: "center",
    alignSelf: "center",
  },
  btnCancel: {
    width: 154,
    heigth: 36,
    alignItems: "center",
    justifyContent: "center",
  },
  btnTextCancel: {
    color: "#898887",
    fontFamily: "Urbanist_700Bold",
    fontSize: 18,
    lineHeight: 19.8,
  },
});
