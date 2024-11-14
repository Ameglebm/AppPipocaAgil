import { View, Text, FlatList, Pressable, Image, StyleSheet, Animated, ScrollView } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigation, useRouter } from 'expo-router'
import TiposDiabetesItem from "../components/tiposDiabetesItem";
import AdmInsulinaItem from "../components/admInsulinaItem"
import slidesInfoDiabetes from '../components/slidesInfoDiabetes';
import PaginatorInfo from "../components/PaginatorInfo"; // Paginador
import NavigationButtons from "../components/NextButton"; // Botões de avançar e retroceder

export default function TiposDiabetes() {
    const navigation = useNavigation();
    const router = useRouter();
    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollx = useRef(new Animated.Value(0)).current;
    const slidesRef = useRef(null);

    useEffect(() => {
        navigation.setOptions({ headerShown: false});
    }, [navigation]);

    const viewableItemsChanged = useRef(({ viewableItems }) => {
        if (viewableItems.length > 0) {
          setCurrentIndex(viewableItems[0].index);
        }
    }).current;
    
    const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;
    
    const scrollTo = () => {
        if (currentIndex < slidesInfoDiabetes.length - 1) {
            slidesRef.current.scrollToIndex({ index: currentIndex + 1 });
        } else {
        router.push("../screens/welcome"); // Navega para a tela de Boas-vindas quando chega ao último slide
        }
    };
    
    const scrollBack = () => {
        if (currentIndex > 0) {
          slidesRef.current.scrollToIndex({ index: currentIndex - 1 });
        }
    };

    const handleSkip = () => {
        router.push("/");
    };

  return (
    <ScrollView>
        
        <View style={styles.mainHeader}>
            <Pressable style={styles.containerSkip} onPress={handleSkip}>
                <Text style={styles.textBtn}>Pular</Text>
            </Pressable>

            <View style={styles.header}>
                <Pressable onPress={() => navigation.goBack()}>
                    <Image source={require("../assets/images/backIcon.png")} />
                </Pressable>
                <Text style={styles.textHeader}>Informações do diabetes</Text>
            </View>

            <PaginatorInfo data={slidesInfoDiabetes} scrollx={scrollx} />
        </View> 

      <View>
        <FlatList
        style={styles.flatlist}
        data={slidesInfoDiabetes}
        renderItem={({ item }) => (
          <View>
            <TiposDiabetesItem item={item} />
            <AdmInsulinaItem item={item} />
          </View>
        )}
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

        {/* Botões na parte inferior */}
      <NavigationButtons
        scrollTo={scrollTo}
        scrollBack={scrollBack}
        currentIndex={currentIndex}
      />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  mainHeader: {
    backgroundColor: "#FDFDFD",
    width: 360,
    height: "auto",
    padding: 20,
    flexDirection: "column",
    alignItems: "center",
    gap: 20,
  },
  containerSkip: {
    flexDirection: "column",
    alignItems: "flex-end",
    paddingTop: 20,
    gap: 28,
    alignSelf: "stretch",
  },
  textBtn: {
    color: "#E4732B",
    textAlign: "right",
    fontFamily: "Lato_700Bold",
    fontStyle: "normal",
    fontSize: 12,
    lineHeight: 16,
  },
  header: {
    flexDirection: "row",
    gap: 8,
  },
  textHeader: {
    color: "#282828",
    fontFamily: "Urbanist_700Bold",
    fontSize: 24,
    fontStyle: "normal",
    lineHeight: 26.4,
  },
  flatlist: {
    backgroundColor: "#EDF3FF",
  },
  });