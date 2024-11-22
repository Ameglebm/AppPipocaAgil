import {
  View,
  Text,
  StyleSheet,
  Image,
  useWindowDimensions,
} from "react-native";
import React from "react";
import PropTypes from "prop-types";

export default function OnboardingItem({ item }) {
  const { width } = useWindowDimensions();

  OnboardingItem.propTypes = {
    item: PropTypes.shape({
      image: PropTypes.any.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    }).isRequired,
  };

  return (
    <View style={[styles.container, { width }]}>
      <Image
        source={item.image}
        style={[styles.image, { width, resizeMode: "contain" }]}
      />

      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 317,
    height: 218,
    justifyContent: "center",
    marginBottom: 32,
  },
  title: {
    fontWeight: "700",
    fontSize: 24,
    fontStyle: "normal",
    lineHeight: 26.4,
    marginBottom: 16,
    color: "#282828",
    textAlign: "center",
  },
  description: {
    fontWeight: "400",
    fontStyle: "normal",
    fontSize: 14,
    lineHeight: 21,
    color: "#282828",
    textAlign: "center",
    width: 308,
    height: 83,
  },
});
