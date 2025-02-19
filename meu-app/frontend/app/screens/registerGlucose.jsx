// Bibliotecas externas
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";

// Componentes customizados
import Header from "../components/CustomHeader";
import Dropdown from "../components/DropDown";
import CustomInput from "../components/CustomInput";
import ButtonSave from "../components/ButtonSave";

export default function registerGlucose() {
  const [glicose, setGlicose] = useState(0);
  const [treatment, setTreatment] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);

  // Função para verificar se o botão deve estar desabilitado
  useEffect(() => {
    if (glicose && treatment) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [glicose, treatment]);

  return (
    <View style={{ backgroundColor: "#FDFDFD", flex: 1 }}>
      <View style={styles.header}>
        <Header title={"Registrar glicemia"} />
      </View>

      <View
        style={{
          backgroundColor: "#FDFDFD",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Dropdown
          items={[
            {
              label: "Antes do café da manhã",
              value: "Antes do café da manhã",
            },
            {
              label: "Depois do café da manhã",
              value: "Depois do café da manhã",
            },
            { label: "Antes do almoço", value: "Antes do almoço" },
            { label: "Depois do almoço", value: "Depois do almoço" },
            { label: "Antes do jantar", value: "Antes do jantar" },
            { label: "Depois do jantar", value: "Depois do jantar" },
            { label: "Extra", value: "Extra" },
          ]}
          placeholder={"Selecione o tipo"}
          title={"Informe o tipo de glicemia"}
          style={customDropdownStyle}
          value={treatment}
          onValueChange={(item) => {
            setTreatment(item);
          }}
        />

        <CustomInput
          title={"Insira o valor de glicose no sangue"}
          placeholder={"000"}
          value={glicose}
          onChangeText={(value) => setGlicose(value)}
          keyboardType={"numeric"}
        />

        <View style={styles.viewBtns}>
          {/* 
          Chamar o modal de "Tem certeza que deseja cancelar o registro de glicemia?"
          O front possui um componente para modal em "/components/ConfirmationModal.js" basta chamar ele.
          */}
          <TouchableOpacity style={styles.btnCancel}>
            <Text style={styles.btnTextCancel}>Cancelar</Text>
          </TouchableOpacity>

          {/* 
          Funcção de salvar:
          Adicionar uma condição para verificar o nivel da glicemia. 
          - Se for <=75 "Glicemia está baixa" (Criar o modal "Atenção! Sua glicemia está baixa.")
          - Se for > 75 e < 120 "Glicemia está normal" (Criar o modal "Parabéns! Sua glicemia está dentro da meta.")
          - Se for >= 120 "Glicemia está alta" (Criar o modal "Atenção! Sua glicemia está alta.")
          */}
          <ButtonSave style={customButtonStyles} disabled={isDisabled} />
        </View>
      </View>
    </View>
  );
}

// Sobrescrição de estilos
const customButtonStyles = {
  container: {
    width: 154,
    heigth: 36,
    paddingLeft: 5,
  },
  moveButton: {
    width: 154,
    paddingVertical: 8,
    paddingHorizontal: 42,
  },
};

const customDropdownStyle = {
  dropDownContainer: {
    marginTop: 5,
  },
};

// Estilos
const styles = StyleSheet.create({
  header: {
    marginTop: 45,
  },
  viewBtns: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  btnCancel: {
    width: 154,
    heigth: 36,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 5,
    paddingRight: 20,
  },
  btnTextCancel: {
    color: "#898887",
    fontFamily: "Urbanist_700Bold",
    fontSize: 18,
    lineHeight: 19.8,
  },
});
