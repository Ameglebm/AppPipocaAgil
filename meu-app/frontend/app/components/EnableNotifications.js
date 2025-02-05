import React from "react";
import { Text, StyleSheet, View, Switch } from "react-native";
import PropTypes from "prop-types";

export default function EnableNotifications({
  onActivate,
  value,
  onValueChange,
}) {
  // A variável `value` e a função `onValueChange` são agora usadas para controlar o estado externamente
  const handleActivate = () => {
    if (onActivate) {
      onActivate();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Ativar notificações</Text>
      <View
        style={[
          styles.containerSwitch,
          { backgroundColor: value ? "#7A98FF" : "#FDFDFD" },
        ]}
      >
        <Switch
          trackColor={{ false: "#FDFDFD", true: "#7A98FF" }}
          thumbColor={value ? "#FDFDFD" : "#7A98FF"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={onValueChange} // Usando a função passada como prop
          onPress={handleActivate} // Opcional, se você quiser disparar algum evento adicional ao pressionar
          value={value} // Usando o valor controlado externamente
          style={[
            styles.switch,
            {
              transform: value ? [{ scaleX: 1.2 }, { scaleY: 1.2 }] : [],
            },
          ]}
        />
      </View>
    </View>
  );
}

EnableNotifications.propTypes = {
  onActivate: PropTypes.func.isRequired,
  value: PropTypes.bool.isRequired,
  onValueChange: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    width: 352,
    height: 64,
    borderRadius: 16,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    padding: 16,
    backgroundColor: "#EDF3FF",
  },
  text: {
    fontFamily: "Urbanist_400Regular",
    fontSize: 16,
    lineHeight: 18,
  },
  containerSwitch: {
    width: 52,
    height: 32,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: "#7A98FF",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 2,
    paddingRight: 8,
    paddingBottom: 2,
    paddingLeft: 8,
  },
});
