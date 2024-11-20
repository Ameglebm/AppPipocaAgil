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
import { SafeAreaProvider } from "react-native-safe-area-context";
import React, { useEffect, useRef, useState } from "react";
import { useNavigation, useRouter } from "expo-router";
import slidesInfoDiabetes from "../components/slidesInfoDiabetes"; // Fonte de dados dos slides do carrossel
import TiposDiabetesItem from "../components/tiposDiabetesItem"; // Tela correspondente ao slide com id 1
import AdmInsulinaItem from "../components/admInsulinaItem"; // Tela correspondente ao slide com id 2
import MetaGlicemica from "../components/metaGlicemica"; // Tela correspondente ao slide com id 3
import MedicamentosItem from "../components/medicamentosItem"; // Tela correspondente ao slide com id 4
import TipoDeInsulinaItem from "../components/tipoDeInsulinaItem"; // Tela correspondente ao slide com id 5
import PaginatorInfo from "../components/PaginatorInfo"; // Paginador para exibir o progresso do carrossel
import AlertToggle from "../components/alertToggle";
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

  // Definindo tamanhos variáveis para os slides
  const getSlideSize = (id) => {
    switch (id) {
      case "1":
        return { height: 455 }; // Tamanho personalizado para o slide 1
      case "2":
        return { height: 357 }; // Tamanho personalizado para o slide 2
      case "3":
        return { height: 424 }; // Tamanho personalizado para o slide 3
      case "4":
        return { width: 352, height: 420 }; // Tamanho personalizado para o slide 4
      case "5":
        return { width: 352, height: 370 }; // Tamanho personalizado para o slide 5
      default:
        return { width: 300, height: 400 }; // Tamanho padrão para outros slides
    }
  };

  return (
    <SafeAreaProvider style={{ backgroundColor: "#FDFDFD" }}>
      <ScrollView>
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
            style={[
              styles.flatlist,
              currentIndex === 2 && { height: 440 }, // Aplica altura somente no slide 3
            ]}
            data={slidesInfoDiabetes} // Dados do array de configuração
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
                        return <TiposDiabetesItem item={item} />;
                      case "2":
                        return <AdmInsulinaItem item={item} />;
                      case "3":
                        return <MetaGlicemica item={item} />;
                      case "4":
                        return <MedicamentosItem item={item} />;
                      case "5":
                        return <TipoDeInsulinaItem item={item} />;
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
            onViewableItemsChanged={viewableItemsChanged} // Callback para atualizar o índice
            viewabilityConfig={viewConfig} // Configuração de visibilidade
            ref={slidesRef} // Referência ao FlatList
          />

          {currentIndex === 2 && ( // Quando o slide 3 (Meta Glicêmica) estiver ativo
            <View style={styles.alertContainer}>
              <AlertToggle />
            </View>
          )}
        </View>
        {/* Botão na parte inferior */}
        {currentIndex === 0 && (
          <View style={{ paddingTop: 20 }}>
            <ButtonSave scrollTo={scrollTo} currentIndex={currentIndex} />
          </View>
        )}
        {currentIndex === 1 && (
          <View style={{ marginTop: -80 }}>
            <ButtonSave scrollTo={scrollTo} currentIndex={currentIndex} />
          </View>
        )}
        {currentIndex === 2 && (
          <View>
            <ButtonSave scrollTo={scrollTo} currentIndex={currentIndex} />
          </View>
        )}
        {currentIndex === 3 && (
          <View>
            <ButtonSave scrollTo={scrollTo} currentIndex={currentIndex} />
          </View>
        )}
        {currentIndex === 4 && (
          <View>
            <ButtonSave scrollTo={scrollTo} currentIndex={currentIndex} />
          </View>
        )}
      </ScrollView>
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
    backgroundColor: "#EDF3FF", // cor de fundo para separar cada tela
    marginHorizontal: 4, // espaço entre as telas
    borderRadius: 16,
  },
  alertContainer: {
    justifyContent: "center",
    alignItems: "center",
    display: "flex", // Forçar renderização no Web
  },
  btnSave: {},
});
