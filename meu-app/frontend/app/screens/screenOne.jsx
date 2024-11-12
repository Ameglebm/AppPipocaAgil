import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";

export default function ScreenOne() {
  const data = [
    { id: "header", isHeader: true },
    {
      id: "1",
      image: require("../assets/images/coracao.png"),
      title: "Informações do Diabetes",
    },
    {
      id: "2",
      image: require("../assets/images/saude.png"),
      title: "Saúde e Bem-Estar",
    },
    { id: "extra", isExtraView: true },
  ];

  const renderItem = ({ item }) => {
    if (item.isHeader) {
      return (
        <View style={styles.header}>
          <Text style={styles.title}>Personalize seu Monitoramento</Text>
          <Text style={styles.subTitle}>
            Para criar um plano de monitoramento completo é preciso registrar
            mais algumas informações.
          </Text>
        </View>
      );
    }

    if (item.isExtraView) {
      return <View style={styles.extraView}></View>;
    }

    return (
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.buttonCoracao}>
          <Image source={item.image} style={styles.image} />
          <Text style={styles.buttonText}>{item.title}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      contentContainerStyle={styles.flatListContainer}
    />
  );
}

const styles = StyleSheet.create({
  flatListContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    paddingTop: 40,
    paddingRight: 20,
    paddingBottom: 62,
    paddingLeft: 20,
    gap: 10,
    height: 310,
    backgroundColor: "#F6F6F6",
  },
  header: {
    gap: 24,
    marginBottom: 32,
  },
  title: {
    paddingTop: 20,
    fontFamily: "Urbanist_700Bold",
    fontSize: 20,
    lineHeight: 22,
  },
  subTitle: {
    color: 'rgba(0, 0, 0, 0.5)',
    fontFamily: "Roboto_400Regular",
    fontSize: 12,
    fontStyle: "normal",
    lineHeight: 16,
  },
  buttonContainer: {
    top: -6,
  },
  buttonCoracao: {
    flexDirection: "row",
    width: 319,
    height: 45,
    backgroundColor: "#FFFFFF",
    gap: 12,
    alignItems: "center",
    justifyContent: "flex-start",
    textAlign: "center",
    borderRadius: 12,
    // Configuração de sombra para iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    // Configuração de sombra para Android
    elevation: 3, // Use valores baixos para uma sombra mais sutil
  },
  image: {
    marginLeft: 16,
  },
  buttonText: {
    fontFamily: "Lato_400Regular",
    fontSize: 14,
    lineHeight: 21,
    color: "#0F0F0F",
  },
  extraView: {
    backgroundColor: "#f0f0f0",
    borderRadius: 12,
    alignItems: "center",
  },
  extraButton: {
    width: "100%",
    padding: 12,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    marginVertical: 4,
    alignItems: "center",
  },
  extraButtonText: {
    fontFamily: "Lato_400Regular",
    fontSize: 14,
    color: "#333333",
  },
});
