import { View, StyleSheet, Animated, useWindowDimensions } from "react-native";
import React from "react";
import PropTypes from "prop-types";

export default function Paginator({ data, scrollx }) {
  const { width } = useWindowDimensions();

  Paginator.propTypes = {
    data: PropTypes.array.isRequired,
    scrollx: PropTypes.object.isRequired,
  };

  return (
    <View
      style={{ flexDirection: "row", height: 20, justifyContent: "center" }}
    >
      {data.map((_, i) => {
        const inputRange = [
          (i - 1) * width, // antes da tela
          i * width, // tela atual
          (i + 1) * width, // próxima tela
        ];

        const dotWidth = scrollx.interpolate({
          inputRange,
          outputRange: [32, 32, 32], // tamanho dos pontos
          extrapolate: "clamp",
        });

        const opacity = scrollx.interpolate({
          inputRange,
          outputRange: [0.2, 1, 0.2], // opacidade dos pontos
          extrapolate: "clamp",
        });

        return (
          <Animated.View
            key={i.toString()}
            style={[styles.dot, { width: dotWidth, opacity }]}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  dot: {
    width: 192,
    height: 8,
    borderRadius: 16,
    backgroundColor: "#5A74FA",
    gap: 8,
    marginHorizontal: 3.5,
  },
});
