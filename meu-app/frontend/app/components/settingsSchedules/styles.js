import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    width: 360,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 14,
    color: "#000000",
    fontFamily: "Lato_400Regular",
    lineHeight: 21,
    marginBottom: 10,
  },
  selectAllButton: {
    marginBottom: 20,
    alignItems: "flex-end",
  },
  selectAllButtonText: {
    color: "#2F39D3",
    fontFamily: "Lato_400Regular",
    textDecorationLine: "underline",
    fontSize: 12,
    lineHeight: 16,
  },
  daysContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  dayContainer: {
    alignItems: "center",
    paddingHorizontal: 10,
  },
  dayText: {
    backgroundColor: "#EDF3FF",
    color: "#5E5D5C",
    fontSize: 16,
    borderRadius: 10,
    paddingVertical: 6,
    paddingHorizontal: 7,
  },
  checkbox: {
    marginTop: 16,
    borderColor: "#49454F",
  },
  textDose: {
    fontFamily: "Lato_400Regular",
    fontSize: 14,
    color: "#282828",
    paddingBottom: 5,
    lineHeight: 21,
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
  buttonSave: {
    width: 320,
    height: 42,
  },
  btnAdd: {
    width: 42,
    height: 42,
    marginTop: 32,
    backgroundColor: "#2F39D3",
    borderRadius: 21,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  deleteButton: {
    position: "absolute",
    top: 37,
    left: 284,
  },
});

export default styles;
