import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 12,
  },
  btnModal: {
    width: 320,
    height: 44,
    paddingVertical: 10,
    paddingHorizontal: 14,
    backgroundColor: "#FDFDFD", // Adiciona cor de fundo
    textAlign: "center",
    borderWidth: 1,
    borderColor: "#C8C8C7", // Cor da borda
    borderRadius: 8,
    elevation: 1, // Elevação de 1px (somente no Android)
    shadowColor: "#000", // Cor da sombra para iOS
    shadowOffset: { width: 0, height: 1 }, // Posição da sombra
    shadowOpacity: 0.2, // Opacidade da sombra
    shadowRadius: 1, // Raio da sombra
  },
  btnModalSelected: {
    backgroundColor: "#FDFDFD", // Cor de fundo para indicar seleção
  },
  dateTextStyle: {
    color: "#B1B0AF", // Cor padrão
    fontSize: 16,
    fontFamily: "Lato_400Regular",
  },
  dateTextStyleSelected: {
    color: "#373737", // Cor do texto ao salvar
    fontFamily: "Lato_400Regular",
  },
});

export default styles;
