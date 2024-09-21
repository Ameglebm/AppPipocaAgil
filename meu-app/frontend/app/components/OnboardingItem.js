import { View, Text, StyleSheet, Image, useWindowDimensions } from 'react-native'
import React from 'react'

export default OnboardingItem = ({ item }) => {
    const { width } = useWindowDimensions();

  return (
    <View style={[styles.container, {width}]}>
      <Image source={item.image} style={[styles.image, {width, resizeMode: 'contain'}]}/>

      <View style={{ flex: 0.3}}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        flex: 0.7,
        justifyContent: 'center',
    },
    title: {
        fontWeight: '700',
        fontSize: 24,
        fontStyle: 'normal',
        lineHeight: 26.4,
        marginBottom: 10,
        color: '#282828',
        textAlign: 'center',
    },
    description: {
        fontWeight: '400',
        fontStyle: 'normal',
        fontSize: 14,
        lineHeight: 21,
        color: '#282828',
        textAlign: 'center',
        paddingHorizontal: 64,
    },


})