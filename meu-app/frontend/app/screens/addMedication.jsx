// Bibliotecas externas
import React, { useState, useEffect } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
// Redux
import { useDispatch } from "react-redux";
import {
  pushMedication,
  updateMedicationField,
} from "../reducers/medicationActions";

// Componentes
import ButtonSave from "../components/ButtonSave";
import CustomHeader from "../components/CustomHeader";
import CustomInput from "../components/CustomInput";
import Dropdown from "../components/DropDown";
import InputWithPressable from "../components/InputWithPressable";
import ModalCustom from "../components/Modal";

const addMedication = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const isEditing = params.isEditing || false;
  const dispatch = useDispatch();

  const [nameMedication, setNameMedication] = useState(params.name || "");
  const [treatment, setTreatment] = useState(params.treatment || "");
  const [dosageAdm, setDosageAdm] = useState(params.dosageAdm || "");
  const [unit, setUnit] = useState(params.unit || "");
  const [doseLeft, setDoseLeft] = useState(params.doseLeft || "");
  const [modalVisible, setModalVisible] = useState(false); //Controle de visibilidade do modal

  useEffect(() => {
    if (modalVisible) {
      const timer = setTimeout(() => {
        setModalVisible(false);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [modalVisible]);

  const handleSave = () => {
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

    setTimeout(() => {
      setModalVisible(false);
      router.back(); // Redireciona para MedicamentoItem
    }, 1500);
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
          { label: "Pressão arterial", value: "Pressão arterial" },
          { label: "Diabetes", value: "Diabetes" },
          { label: "Colesterol", value: "Colesterol" },
          { label: "Obesidade", value: "Obesidade" },
          { label: "Doenças hepáticas", value: "Doenças hepáticas" },
          {
            label: "Doenças renal crônica",
            value: "Doenças renal crônica",
          },
          { label: "Doenças autoimunes", value: "Doenças autoimunes" },
          { label: "Infecções", value: "Infecções" },
        ]}
        placeholder={"Selecione o tratamento"}
        value={treatment}
        onValueChange={(item) => setTreatment(item)}
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
