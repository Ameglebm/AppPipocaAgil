import { View, StyleSheet, Animated, useWindowDimensions } from 'react-native'
import React from 'react'

export default Paginator = ({data, scrollx}) => {
    const { width } = useWindowDimensions()

  return (
    <View style={{ flexDirection: 'row', height: 64}}>
        {data.map((_, i) => {
            const inputRange = [(i - 1) * width, i * width, (i + 1) * width];

            const dotWidth = scrollx.interpolate({
                inputRange,
                outputRange: [10, 50, 10],
                extrapolate: 'clamp',
            });

            const opacity = scrollx.interpolate({
                inputRange,
                outputRange: [0.3, 1, 0.3],
                extrapolate: 'clamp'
            })

            return <Animated.View 
            style={[
                styles.dot, 
                {
                    width: dotWidth,
                    opacity, 
                },
            ]} 
            key={i.toString()} />
        })}
      
    </View>
  )
}

const styles = StyleSheet.create({
    dot: {
        height: 10,
        borderRadius: 5,
        backgroundColor: '#2F39D3',
        marginHorizontal: 3,
    }
})