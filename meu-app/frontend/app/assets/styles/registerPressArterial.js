import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#FDFDFD",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    paddingLeft: 10,
    marginTop: 38,
    gap: 8,
  },
  textHeader: {
    fontSize: 24,
    fontFamily: "Urbanist_700Bold",
  },
  textViews: {
    paddingTop: 16,
    alignItems: "center",
    width: 320,
    gap: 20,
  },
  containerText: {
    flexDirection: "row",
    color: "#282828",
    fontFamily: "Lato_400Regular",
    fontSize: 14,
    fontStyle: "normal",
    lineHeight: 21,
    gap: 20,
  },

  inputs: {
    flexDirection: "row",
    justifyContent: "center",
    width: 193,
    gap: 80,
  },
  inputsText: {
    width: 56,
    height: 42,
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
  inputFocused: {
    borderColor: "#B4D2F8", // Cor de borda ao focar
    borderWidth: 2, // Bordas mais espessas
  },
  dateContainer: {
    alignSelf: "flex-start", // Alinha o texto à esquerda
    width: "100%",
  },
  dateText: {
    color: "#282828",
    fontFamily: "Urbanist_400Regular",
    fontSize: 16,
    fontStyle: "normal",
    lineHeight: 17.6,
  },
  btnModal: {
    width: 154,
    height: 42,
    paddingVertical: 10,
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
    backgroundColor: "#EDF3FF", // Cor de fundo para indicar seleção
    borderColor: "#EDF3FF", // Mesma cor da borda
  },
  dateTextStyle: {
    color: "#898887", // Cor padrão
    textAlign: "center",
    fontSize: 16,
    fontFamily: "Lato_400Regular",
  },

  dateTextStyleSelected: {
    color: "#282828", // Cor do texto ao salvar
    textAlign: "center",
    fontFamily: "Lato_400Regular",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "#FDFDFD",
    borderRadius: 20,
    width: "90%",
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    paddingTop: 8,
    gap: 8,
  },
  btnCancel: {
    width: 154,
    height: 36,
    paddingVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    backgroundColor: "#FDFDFD",
  },
  textCancel: {
    color: "#898887",
    fontFamily: "Urbanist_700Bold",
    fontSize: 18,
    lineHeight: 19.8,
  },
  btnRegister: {
    width: 154,
    height: 36,
    paddingVertical: 6,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    backgroundColor: "#7A98FF",
    borderWidth: 1,
    borderColor: "#7A98FF", // Persian Blue do Figma
    // Sombras
    shadowColor: "rgba(12, 12, 13, 1)", // Cor da sombra
    shadowOffset: { width: 0, height: 2 }, // Deslocamento da sombra
    shadowOpacity: 0.15, // Opacidade da primeira sombra
    shadowRadius: 6, // Raio da primeira sombra
    elevation: 6, // Necessário para Android
  },
  btnRegisterActive: {
    backgroundColor: "#2F39D3", // Cor quando ativo
  },
  textRegister: {
    color: "#FDFDFD",
    fontFamily: "Urbanist_700Bold",
    fontSize: 18,
    lineHeight: 19.8,
  },

  modalOverlay: {
    flex: 1,
    height: 222,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    width: "100%",
    position: "relative", // Define um contexto de posicionamento para `absolute` na imagem
    overflow: "visible", // Evita cortes na imagem
  },
  image: {
    backgroundColor: "#5FA8FF",
    width: 48,
    height: 48,
    padding: 12,
    borderRadius: 42,
    justifyContent: "center",
    alignItems: "center",
    flexShrink: 0,
    position: "absolute", // Sai do fluxo normal do layout
    top: "0%", // Alinha dinamicamente no topo do container
    left: "57%", // Centraliza horizontalmente no modal
    transform: [
      { translateX: -24 }, // Movimenta horizontalmente pela metade da largura
      { translateY: -24 }, // Movimenta verticalmente pela metade da altura
    ],
  },
  modalText: {
    width: "80%",
    fontFamily: "Urbanist_700Bold",
    fontSize: 18,
    color: "282828",
    fontStyle: "normal",
    lineHeight: 19.8,
    marginTop: 20, // Adiciona um espaçamento superior para garantir que o texto não sobreponha a imagem
    marginBottom: 16,
    textAlign: "center",
  },
  modalButtons: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  modalButtonConfirm: {
    backgroundColor: "#2F39D3",
    width: 256,
    height: 36,
    paddingVertical: 8,
    paddingHorizontal: 42,
    borderRadius: 8,
    alignItems: "center",
  },
  modalButtonCancel: {
    backgroundColor: "#FDFDFD",
    width: 158,
    height: 36,
    paddingVertical: 8,
    paddingHorizontal: 42,
    borderRadius: 8,
    alignItems: "center",
  },
  modalButtonText: {
    color: "#FDFDFD",
    fontFamily: "Urbanist_700Bold",
    fontSize: 18,
    fontStyle: "normal",
    lineHeight: 19.8,
  },
  modalButtonTextCancel: {
    color: "#5E5D5C",
    fontFamily: "Urbanist_700Bold",
    fontSize: 18,
    fontStyle: "normal",
    lineHeight: 19.8,
  },
});

export default styles;
