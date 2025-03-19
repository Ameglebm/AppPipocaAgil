// Bibliotecas externas
import React, { useState, useEffect } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Redux
import { useSelector, useDispatch } from "react-redux";
import {
  pushMedication,
  updateMedicationField,
} from "../reducers/medicationActions";

// API
import api from "../services/api";

// Componentes
import ButtonSave from "../components/buttons/ButtonSave";
import CustomHeader from "../components/CustomHeader";
import CustomInput from "../components/CustomInput";
import Dropdown from "../components/DropDown";
import InputWithPressable from "../components/InputWithPressable";
import ModalCustom from "../components/modals/Modal";

const addMedication = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const isEditing = params.isEditing || false;
  const dispatch = useDispatch();

  const userId = useSelector((state) => state.auth.userId);

  const [nameMedication, setNameMedication] = useState(params.name || "");
  const [treatment, setTreatment] = useState(params.treatment || "");
  const [dosageAdm, setDosageAdm] = useState(params.dosageAdm || "");
  const [unit, setUnit] = useState(params.unit || "");
  const [doseLeft, setDoseLeft] = useState(params.doseLeft || 0);
  const [modalVisible, setModalVisible] = useState(false); //Controle de visibilidade do modal

  useEffect(() => {
    if (modalVisible) {
      const timer = setTimeout(() => {
        setModalVisible(false);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [modalVisible]);

  const handleSave = async () => {
    const medicationData = {
      name: nameMedication,
      treatment: treatment,
      dosageAdm: dosageAdm,
      unit: unit,
      doseLeft: doseLeft,
    };

    if (isEditing) {
      dispatch(updateMedicationField(params.id, medicationData));
    } else {
      dispatch(pushMedication({ id: new Date().getTime(), ...medicationData }));
    }

    console.log("Medicamento salvo:", medicationData);

    setModalVisible(true);

    if (!userId) {
      console.error("Erro: userId não encontrado");
      return;
    }

    try {
      const token = await AsyncStorage.getItem("authToken");
      if (!token) {
        console.error("Erro: Token de autenticação não encontrado");
        return;
      }

      const payload = {
        userId,
        nomeMedicamento: nameMedication,
        tipoDosagem: unit,
        tipoTratamentoId: treatment ? parseInt(treatment, 10) : 1,
        dosagemPorAdministracao: dosageAdm,
        dosesRestantes: Number(doseLeft) || 0,
      };

      console.log("Enviando payload:", payload);

      const response = await api.post("/userMedicines", payload, {
        header: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      switch (response.status) {
        case 201:
          console.log("Medicamento do usuário registrado com sucesso!");
          setTimeout(() => {
            setModalVisible(false);
            router.back(); // Redireciona para MedicamentoItem
          }, 1500);
          break;

        case 400:
          console.error("Erro de validação! Verifique os dados enviados.");
          break;

        case 500:
          console.error("Erro interno do servidor");
          break;

        default:
          console.error("Resposta inesperada do servidor", response.status);
          break;
      }
    } catch (error) {
      console.error(
        "Erro na requisição:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ alignItems: "center" }}
    >
      <View style={{ marginTop: 35, paddingBottom: 12 }}>
        <CustomHeader title={"Adicionar medicação"} />
      </View>

      <CustomInput
        title={"Nome do medicamento"}
        placeholder={"Insira o nome"}
        value={nameMedication}
        onChangeText={(value) => setNameMedication(value)}
      />

      <Dropdown
        items={[
          { id: 1, label: "Pressão arterial", value: "1" },
          { id: 2, label: "Diabetes", value: "2" },
          { id: 3, label: "Colesterol", value: "3" },
          { id: 4, label: "Obesidade", value: "4" },
          { id: 5, label: "Doenças hepáticas", value: "5" },
          {
            id: 6,
            label: "Doenças renal crônica",
            value: "6",
          },
          { id: 7, label: "Doenças autoimunes", value: "7" },
          { id: 8, label: "Infecções", value: "8" },
        ]}
        placeholder={"Selecione o tratamento"}
        value={treatment}
        onValueChange={(item) => setTreatment(item)}
        keyExtractor={(item) => item.id} // Evita erro de chave duplicada
        title={"Para qual tratamento?"}
      />

      <CustomInput
        title={"Dosagem por adminstração"}
        placeholder={"Quantidade por dose (ex: 1 comprimido)"}
        value={dosageAdm}
        onChangeText={(value) => setDosageAdm(value)}
        keyboardType={"numeric"}
      />

      <InputWithPressable
        textLabel="Unidade"
        placeholder={["mL", "IU", "%", "mcg", "mg", "g"]}
        value={unit}
        onPress={(unit) => setUnit(unit)}
      />

      <CustomInput
        title={"Quantidade de doses restantes"}
        placeholder={"Dose"}
        value={doseLeft}
        onChangeText={(value) => setDoseLeft(value)}
        keyboardType={"numeric"}
      />

      <ButtonSave style={customButtonStyle} onPress={handleSave} />

      <ModalCustom
        modalVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        message={"Registro salvo com sucesso"}
      />
    </ScrollView>
  );
};

export default addMedication;

const customButtonStyle = {
  container: {
    paddingBottom: 16,
  },
  moveButton: {
    height: 42,
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FDFDFD",
    width: "100%",
  },
  infoContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  notificacaoContainer: {
    paddingLeft: 20,
    width: 320,
    flexShrink: 1,
    paddingTop: 16,
    gap: 16,
  },
  notificacaoTitle: {
    fontFamily: "Lato_400Regular",
    fontSize: 14,
    lineHeight: 21,
  },
  textNotificacao: {
    fontFamily: "Lato_400Regular",
    fontSize: 14,
    lineHeight: 22,
  },
  frequencia: {
    color: "#2F39D3",
    fontSize: 16,
  },
  dados: {
    fontFamily: "Lato_400Regular",
    fontSize: 14,
    color: "#282828",
  },
});
