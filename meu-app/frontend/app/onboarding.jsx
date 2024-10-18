import React, { useState, useRef, useEffect } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Animated,
  TouchableOpacity,
  Text,
  Pressable,
} from "react-native";
import { useNavigation, useRouter } from "expo-router";
import OnboardingItem from "./components/OnboardingItem";
import slides from "./components/slides";
import Paginator from "./components/Paginator"; // Paginador
import NavigationButtons from "./components/NextButton"; // Certifique-se de que o caminho está correto

export default function OnboardingScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollx = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef(null);
  const router = useRouter();
  const navigation = useNavigation();

  useEffect(() => { //Ao iniciar a página seta o header dela como false
    navigation.setOptions({headerShown: false});
  }, [navigation])

  const viewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const scrollTo = () => {
    if (currentIndex < slides.length - 1) {
      slidesRef.current.scrollToIndex({ index: currentIndex + 1 });
    } else {
      router.push("../screens/home"); // Navega para a tela de Boas-vindas quando chega ao último slide
    }
  };

  const scrollBack = () => {
    if (currentIndex > 0) {
      slidesRef.current.scrollToIndex({ index: currentIndex - 1 });
    }
  };

  const handleSkip = () => {
    router.push("../screens/home");
  };

  return (
    <View style={styles.container}>
      
      <Pressable style={styles.containerPular} onPress={handleSkip}>
        <Text style={styles.textBtn}>Pular</Text>
      </Pressable>

      <View style={styles.content}>
        <FlatList
          data={slides}
          renderItem={({ item }) => <OnboardingItem item={item} />}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          bounces={false}
          keyExtractor={(item) => item.id}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollx } } }],
            {
              useNativeDriver: false,
            }
          )}
          scrollEventThrottle={32}
          onViewableItemsChanged={viewableItemsChanged}
          viewabilityConfig={viewConfig}
          ref={slidesRef}
        />
        <Paginator data={slides} scrollx={scrollx} />
      </View>

      {/* Botões na parte inferior */}
      <NavigationButtons
        scrollTo={scrollTo}
        scrollBack={scrollBack}
        currentIndex={currentIndex}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fdfdfd",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  containerPular: {
    width: "100%",
    alignItems: "flex-end",
    padding: 20,
    marginTop: 50,
  },
  textBtn: {
    color: "#E4732B",
  },
});
