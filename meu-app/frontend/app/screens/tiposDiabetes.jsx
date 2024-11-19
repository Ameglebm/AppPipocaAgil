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
  ScrollView,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useNavigation, useRouter } from "expo-router";
import slidesInfoDiabetes from "../components/slidesInfoDiabetes"; // Fonte de dados dos slides do carrossel
import TiposDiabetesItem from "../components/tiposDiabetesItem"; // Tela correspondente ao slide com id 1
import AdmInsulinaItem from "../components/admInsulinaItem"; // Tela correspondente ao slide com id 2
import MetaGlicemica from "../components/metaGlicemica"; // Tela correspondente ao slide com id 3
import PaginatorInfo from "../components/PaginatorInfo"; // Paginador para exibir o progresso do carrossel
import ButtonSave from "../components/ButtonSave"; // Botões de navegação (Salvar)

export default function TiposDiabetes() {
  const navigation = useNavigation(); // Fonte de dados dos slides do carrossel
  const router = useRouter(); // Controle de rotas no aplicativo
  const [currentIndex, setCurrentIndex] = useState(0); // Estado para armazenar o índice atual do slide
  const scrollx = useRef(new Animated.Value(0)).current; // Valor animado para acompanhar o scroll
  const slidesRef = useRef(null); // Referência ao FlatList para controlar o scroll programaticamente

  // Remove o cabeçalho padrão da tela ao carregar
  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  // Atualiza o índice atual com base no slide visível
  const viewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  // Configuração para considerar 50% de visibilidade de um slide
  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  // Avança para o próximo slide ou navega para a tela final
  const scrollTo = () => {
    if (currentIndex < slidesInfoDiabetes.length - 1) {
      slidesRef.current.scrollToIndex({ index: currentIndex + 1 });
    } else {
      router.push("/"); // Redireciona para a rota final
    }
  };

  // Navega diretamente para a tela final ao pressionar "Pular"
  const handleSkip = () => {
    router.push("/");
  };

  return (
    <ScrollView style={{ backgroundColor: "#FDFDFD" }}>
      {/* Cabeçalho principal com botão "Pular" e título */}
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
        {/* Paginador que exibe o progresso do carrossel */}
        <PaginatorInfo data={slidesInfoDiabetes} scrollx={scrollx} />
      </View>

      <View>
        <FlatList
          style={styles.flatlist}
          data={slidesInfoDiabetes} // Dados do array de configuração
          renderItem={({ item }) => (
            <View style={styles.slideContainer}>
              {/* Renderiza o slide com base no ID */}
              {(() => {
                switch (item.id) {
                  case "1":
                    return <TiposDiabetesItem item={item} />;
                  case "2":
                    return <AdmInsulinaItem item={item} />;
                  case "3":
                    return <MetaGlicemica item={item} />;
                  default:
                    return <Text>Slide não configurado</Text>;
                }
              })()}
            </View>
          )}
          horizontal // Permite scroll horizontal
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
          onViewableItemsChanged={viewableItemsChanged} // Callback para atualizar o índice
          viewabilityConfig={viewConfig} // Configuração de visibilidade
          ref={slidesRef} // Referência ao FlatList
        />

        {/* Botão na parte inferior */}
        <ButtonSave scrollTo={scrollTo} currentIndex={currentIndex} />
      </View>
    </ScrollView>
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
    marginBottom: 24,
  },
  slideContainer: {
    backgroundColor: "#EDF3FF", // cor de fundo para separar cada tela
    marginHorizontal: 4, // espaço entre as telas
    borderRadius: 16,
  },
});
