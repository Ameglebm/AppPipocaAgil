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
    <View style={{ flexDirection: "row", height: 20 }}>
      {data.map((_, i) => {
        const inputRange = [(i - 1) * width, i * width, (i + 1) * width];

        const dotWidth = scrollx.interpolate({
          inputRange,
          outputRange: [10, 30, 10],
          extrapolate: "clamp",
        });

        const opacity = scrollx.interpolate({
          inputRange,
          outputRange: [0.3, 1, 0.3],
          extrapolate: "clamp",
        });

        return (
          <Animated.View
            style={[
              styles.dot,
              {
                width: dotWidth,
                opacity,
              },
            ]}
            key={i.toString()}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  dot: {
    height: 8,
    borderRadius: 10,
    backgroundColor: "#2F39D3",
    marginHorizontal: 2,
  },
});
