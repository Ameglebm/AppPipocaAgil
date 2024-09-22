import React, { useState, useRef} from "react";
import { View, Text, Button, StyleSheet, FlatList, Animated } from "react-native";
import { useRouter } from "expo-router"; // Para a navegação
import OnboardingItem from './components/OnboardingItem'; // 
import slides from './components/slides'; // Conteúdo da onboarding 
import Paginator from './components/Paginator'; // Componente para exibir o indicador
import NextButton from "./components/NextButton"; // Botão de próximo

export default function OnboardingScreen() {

  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollx = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef(null);

  const viewableItemsChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50}).current;

  const scrollTo = () => {                  // lógica para o botão mover os slides
    if (currentIndex < slides.length - 1) {
        slidesRef.current.scrollToIndex({ index: currentIndex + 1});
    } else {
        console.log('Last item.');
    }
}

  return (
    <View style={styles.container}>
      <View style={{ flex: 3}}>
        <FlatList 
        data={slides}
        renderItem={({ item }) => <OnboardingItem item={item} />}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        bounces={false}
        keyExtractor={(item) => item.id}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: {x: scrollx } } }], {
          useNativeDriver: false,
        })}
        scrollEventThrottle={32}
        onViewableItemsChanged={viewableItemsChanged}
        viewabilityConfig={viewConfig}
        ref={slidesRef}

        />
      </View>

      <Paginator data={slides} scrollx={scrollx}/>
      <NextButton scrollTo={scrollTo} /> 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fdfdfd",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
});
