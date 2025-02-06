// Arquivo principal
// Importação de componentes e dependências necessárias
import {
  View,
  Text,
  FlatList,
  Pressable,
  Image,
  StyleSheet,
  Animated,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import React, { useEffect, useRef } from "react";
import { useNavigation, useRouter } from "expo-router";

import slides from "../components/slidesInfoDiabetes"; // Fonte de dados dos slides do carrossel
import TiposDiabetes from "../components/infoDiabetesItems/tiposDiabetesItem"; // Tela correspondente ao slide com id 1
import AdmInsulina from "../components/infoDiabetesItems/admInsulinaItem"; // Tela correspondente ao slide com id 2
import MetaGlicemica from "../components/infoDiabetesItems/metaGlicemicaItem"; // Tela correspondente ao slide com id 3
import Medicamentos from "../components/infoDiabetesItems/medicamentosItem"; // Tela correspondente ao slide com id 4
import TipoDeInsulina from "../components/infoDiabetesItems/tipoDeInsulinaItem"; // Tela correspondente ao slide com id 5
import backIcon from "../assets/images/backIcon.png"; // Importação da imagem do ícone de voltar

import PaginatorInfo from "../components/PaginatorInfo"; // Paginador para exibir o progresso do carrossel

export default function InfoDiabetes() {
  const navigation = useNavigation();
  const router = useRouter(); // Controle de rotas no aplicativo
  const scrollx = useRef(new Animated.Value(0)).current; // Valor animado para acompanhar o scroll
  const slidesRef = useRef(null); // Referência ao FlatList para controlar o scroll programaticamente

  // Remove o cabeçalho padrão da tela ao carregar
  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  // Configuração para considerar 50% de visibilidade de um slide
  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  // Navega diretamente para a tela final ao pressionar "Pular"
  const handleSkip = () => {
    router.push("/");
  };

  // Definindo tamanhos variáveis para os slides
  const getSlideSize = (id) => {
    switch (id) {
      case "1":
        return { height: 468 }; // Tamanho personalizado para o slide 1
      case "2":
        return {}; // Tamanho personalizado para o slide 2
      case "3":
        return {}; // Tamanho personalizado para o slide 3
      case "4":
        return { width: 352, height: 118 }; // Tamanho personalizado para o slide 4
      case "5":
        return { width: 352, height: 118 }; // Tamanho personalizado para o slide 5
      default:
        return { width: 360, height: 640 }; // Tamanho padrão para outros slides
    }
  };

  const currentIndex = useRef(0);

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      currentIndex.current = viewableItems[0].index;
    }
  }).current;

  const scrollToNextSlide = () => {
    const nextIndex = currentIndex.current + 1;

    if (nextIndex < slides.length) {
      slidesRef.current.scrollToIndex({ index: nextIndex, animated: true });
    } else {
      console.log("Último slide alcançado.");
    }
  };

  return (
    <SafeAreaProvider style={{ backgroundColor: "#FDFDFD" }}>
      {/* Cabeçalho principal com botão "Pular", paginador e título */}
      <View style={styles.mainHeader}>
        <Pressable style={styles.containerSkip} onPress={handleSkip}>
          <Text style={styles.textBtn}>Pular</Text>
        </Pressable>

        <View style={styles.header}>
          <Pressable onPress={() => navigation.goBack()}>
            <Image source={backIcon} />
          </Pressable>
          <Text style={styles.textHeader}>Informações do diabetes</Text>
        </View>
        {/* Paginador que exibe o progresso do carrossel */}
        <PaginatorInfo data={slides} scrollx={scrollx} />
      </View>

      <View>
        <FlatList
          style={styles.flatlist}
          onViewableItemsChanged={onViewableItemsChanged}
          data={slides} // Dados do array de configuração
          renderItem={({ item }) => {
            const slideSize = getSlideSize(item.id); // Obtém o tamanho dinâmico
            return (
              <View
                style={[
                  styles.slideContainer,
                  { width: slideSize.width, height: slideSize.height },
                ]}
              >
                {/* Renderiza o slide com base no ID */}
                {(() => {
                  switch (item.id) {
                    case "1":
                      return (
                        <TiposDiabetes
                          item={item}
                          scrollToNextSlide={scrollToNextSlide}
                        />
                      );
                    case "2":
                      return (
                        <AdmInsulina
                          item={item}
                          scrollToNextSlide={scrollToNextSlide}
                        />
                      );
                    case "3":
                      return (
                        <MetaGlicemica
                          item={item}
                          scrollToNextSlide={scrollToNextSlide}
                        />
                      );
                    case "4":
                      return (
                        <Medicamentos
                          item={item}
                          scrollToNextSlide={scrollToNextSlide}
                        />
                      );
                    case "5":
                      return <TipoDeInsulina item={item} />;
                    default:
                      return <Text>Slide não configurado</Text>;
                  }
                })()}
              </View>
            );
          }}
          horizontal={true} // Permite scroll horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled // Ativa o scroll por página
          bounces={false} // Remove o bounce ao final
          keyExtractor={(item) => item.id} // Chave única para cada slide
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollx } } }],
            {
              useNativeDriver: false,
            }
          )}
          scrollEventThrottle={32}
          viewabilityConfig={viewConfig} // Configuração de visibilidade
          ref={slidesRef} // Referência ao FlatList
        />
      </View>
    </SafeAreaProvider>
  );
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
    backgroundColor: "#FDFDFD",
  },
  slideContainer: {
    marginHorizontal: 4, // espaço entre as telas
    borderRadius: 16,
    paddingBottom: 16,
  },
  alertContainer: {
    justifyContent: "center",
    alignItems: "center",
    display: "flex", // Forçar renderização no Web
  },
  btnSave: {},
});
