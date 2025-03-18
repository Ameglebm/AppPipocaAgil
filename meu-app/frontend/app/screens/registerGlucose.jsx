// Bibliotecas externas
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { fetchGlucose, updateGlucose } from "../reducers/healthActions";

// Componentes customizados
import Header from "../components/CustomHeader";
import Dropdown from "../components/DropDown";
import CustomInput from "../components/CustomInput";
import ButtonSave from "../components/buttons/ButtonSave";
import CancelModal from "../components/modals/ConfirmationModal";
import GlucoseLevels from "../components/modals/GlucoseLevels";

export default function registerGlucose() {
  const router = useRouter();
  const dispatch = useDispatch();

  const userId = useSelector((state) => state.auth.userId);

  const [glicose, setGlicose] = useState(0);
  const [treatment, setTreatment] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [glucoseAlertModal, setGlucoseAlertModal] = useState(false);
  const [glucoseAlertData, setGlucoseAlertData] = useState({
    title: "",
    message: "",
  });

  const treatmentToId = {
    "Antes do café da manhã": 1,
    "Depois do café da manhã": 2,
    "Antes do almoço": 3,
    "Depois do almoço": 4,
    "Antes do jantar": 5,
    "Depois do jantar": 6,
    "Antes de dormir": 7,
    Extra: 8,
  };

  /*const glucoseList = useSelector((state) => state.health.glucoseRecords || []);*/

  /*const glucoseDropdownItems = glucoseList.map((item) => ({
    label: item.nome || `Glicemia ${item.id}`, // Ajuste conforme necessário
    value: item.id.toString(),
    id: item.id,
  }));*/

  // Buscar glicemia ao abrir a tela
  useEffect(() => {
    dispatch(fetchGlucose(userId));
  }, []);

  // Função para verificar se o botão deve estar desabilitado
  useEffect(() => {
    if (glicose && treatment) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [glicose, treatment]);

  const handleCancelPress = () => {
    // Implementar a lógica para cancelar o registro
    setModalVisible(true);
  };

  const handleConfirmCancel = () => {
    setGlicose(0);
    setTreatment("");
    setModalVisible(false); // Fecha o modal após confirmar
    router.back();
  };

  const handleSave = () => {
    const glicemiaId = treatmentToId[treatment];

    if (!glicemiaId) {
      console.error("Erro: treatment inválido!", treatment);
      return;
    }

    dispatch(updateGlucose(Number(userId), glicemiaId, Number(glicose)));

    console.log("Enviando dados para API:", {
      userId: Number(userId),
      glicemiaId,
      value: Number(glicose),
    });

    if (!userId || !glicemiaId || isNaN(Number(glicose))) {
      console.error("Erro: Dados inválidos antes do envio!");
      return;
    }

    if (glicose > 0 && treatment.trim() !== "") {
      if (glicose <= 75) {
        setGlucoseAlertData({
          title: "Atenção! Sua glicemia está baixa.",
          message:
            "Entre em contato com seu médico ou siga o plano de ação recomendado. Caso os sintomas persistam, busque atendimento médico imediatamente.",
          type: "low", // Ícone XClose
        });
      } else if (glicose > 120) {
        setGlucoseAlertData({
          title: "Atenção! Sua glicemia está alta.",
          message:
            "Aja conforme as orientações do seu médico. Se os sintomas persistirem, procure ajuda médica o mais rápido possível.",
          type: "high", // Ícone XClose
        });
      } else {
        setGlucoseAlertData({
          title: "Parabéns! Sua glicemia está dentro da meta.",
          message:
            "Manter esse controle é essencial para sua saúde. Continue acompanhando regularmente!",
          type: "normal", // Ícone CheckCircle
        });
      }
      setGlucoseAlertModal(true);
    }
  };

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
            { label: "Antes de dormir", value: "Antes de dormir" },
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
          <TouchableOpacity
            style={styles.btnCancel}
            onPress={() => handleCancelPress()}
          >
            <Text style={styles.btnTextCancel}>Cancelar</Text>
          </TouchableOpacity>

          <ButtonSave
            style={customButtonStyles}
            disabled={isDisabled}
            onPress={handleSave}
          />
        </View>
      </View>

      <CancelModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onConfirm={handleConfirmCancel}
        title="Tem certeza que deseja cancelar o registro de glicemia?"
        message="Esta ação não pode ser desfeita."
        style={customModalStyles}
      />

      <GlucoseLevels
        visible={glucoseAlertModal}
        onClose={() => setGlucoseAlertModal(false)}
        title={glucoseAlertData.title}
        message={glucoseAlertData.message}
        iconType={glucoseAlertData.type} // Define qual ícone será exibido
      />
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

const customModalStyles = {
  centeredView: {
    paddingTop: 42,
  },
  modalView: {
    height: 260,
    paddingHorizontal: 30,
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
