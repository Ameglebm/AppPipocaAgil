import { View, StyleSheet, Animated, useWindowDimensions } from 'react-native';
import React from 'react';

export default function Paginator({ data, scrollx }) {
  const { width } = useWindowDimensions();

  return (
    <View style={{ flexDirection: 'row', height: 20 }}>
      {data.map((_, i) => {
        const inputRange = [
          (i - 1) * width, // antes da tela
          i * width,       // tela atual
          (i + 1) * width, // próxima tela
        ];

        const dotWidth = scrollx.interpolate({
          inputRange,
          outputRange: [30, 30, 30], // tamanho dos pontos
          extrapolate: 'clamp',
        });

        const opacity = scrollx.interpolate({
          inputRange,
          outputRange: [0.3, 1, 0.3], // opacidade dos pontos
          extrapolate: 'clamp',
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
    borderRadius: 10,
    gap: 8,
    backgroundColor: '#5A74FA',
    marginHorizontal: 2,
  },
});
