import { View, Text, FlatList, Pressable, Image, StyleSheet, Animated, ScrollView } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigation, useRouter } from 'expo-router'
import slidesInfoDiabetes from '../components/slidesInfoDiabetes';
import TiposDiabetesItem from "../components/tiposDiabetesItem";
import AdmInsulinaItem from "../components/admInsulinaItem"
import MetaGlicemica from '../components/metaGlicemica';
import PaginatorInfo from "../components/PaginatorInfo"; // Paginador
import ButtonMove from "../components/ButtonMove"; // Botões de avançar e retroceder

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
        router.push("/"); // Navega para a ultima tela (obs: definir rota)
        }
    };

    const handleSkip = () => {
        router.push("/");
    };

  return (
    <ScrollView style={{backgroundColor: "#FDFDFD"}}>
        
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
          <View style={styles.slideContainer}>
            {(() => {
              switch (item.id) {
                case '1':
                  return <TiposDiabetesItem item={item} />;
                case '2':
                  return <AdmInsulinaItem item={item} />;
                case '3':
                  return <MetaGlicemica item={item} />;
                default:
                  return <Text>Slide não configurado</Text>;
              }
            })()}
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

        {/* Botão na parte inferior */}
      <ButtonMove
        scrollTo={scrollTo}
        currentIndex={currentIndex}
      />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  mainHeader: {
    width: 360,
    height: "auto",
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 10,
    flexDirection: "column",
    
  },
  containerSkip: {
    flexDirection: "column",
    alignItems: "flex-end",
    paddingTop: 30,
    paddingBottom: 32,
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
    paddingBottom: 22,
  },
  flatlist: {
    marginBottom: 24,
  },
  slideContainer: {
    backgroundColor: '#EDF3FF', // cor de fundo para separar cada tela
    marginHorizontal: 4, // espaço entre as telas
    borderRadius: 16,
  },
  });