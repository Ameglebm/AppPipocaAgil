import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import api from "../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

function Inputs() {
  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [secureText, setSecureText] = useState(true);
  const [isDisabled, setIsDisabled] = useState(true);
  const [secureText2, setSecureText2] = useState(true);
  const [buttonColor, setButtonColor] = useState("#7A98FF");

  const router = useRouter();
  const [errors, setErrors] = useState({});

  const formatCpf = (value) => {
    // Remove tudo que não for número
    let cleanedValue = value.replace(/\D/g, "");

    // Aplica a máscara de CPF
    if (cleanedValue.length <= 3) {
      return cleanedValue;
    }
    if (cleanedValue.length <= 6) {
      return cleanedValue.replace(/(\d{3})(\d{1,})/, "$1.$2");
    }
    if (cleanedValue.length <= 9) {
      return cleanedValue.replace(/(\d{3})(\d{3})(\d{1,})/, "$1.$2.$3");
    }
    return cleanedValue.replace(/(\d{3})(\d{3})(\d{3})(\d{1,})/, "$1.$2.$3-$4");
  };

  const handleCpfChange = (value) => {
    setCpf(formatCpf(value));
  };

  const validateInputs = () => {
    const newErrors = {};

    if (!nome) newErrors.nome = "Nome é obrigatório.";
    if (!sobrenome) newErrors.sobrenome = "Sobrenome é obrigatório.";
    if (!email) {
      newErrors.email = "E-mail é obrigatório.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "E-mail inválido.";
    }

    if (!cpf) {
      newErrors.cpf = "CPF é obrigatório.";
    } else if (!/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(cpf)) {
      newErrors.cpf = "Formato de CPF inválido.";
    }

    if (!senha) {
      newErrors.senha = "Senha é obrigatória.";
    } else if (
      !/(?=.*[!@#$%^&*(),.?":{}|<>])/.test(senha) || // Verifica caractere especial
      !/(?=.*[A-Z])/.test(senha) || // Verifica caractere maiúsculo
      senha.length < 8
    ) {
      newErrors.senha =
        "A senha deve ter pelo menos 8 caracteres, incluir 1 caractere especial e 1 caractere maiúsculo.";
    }

    if (senha !== confirmarSenha) {
      newErrors.confirmarSenha = "As senhas não coincidem.";
    }

    if (!isChecked) {
      newErrors.termos = "Você deve aceitar os termos.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Retorna true se não houver erros
  };

  const sendForm = async () => {
    if (!validateInputs()) return; // Valida antes de enviar
    if (errors.cpf) return; // Impede envio se CPF já estiver em uso
    if (isDisabled) return;
    const novoUsuario = {
      nome,
      sobrenome,
      email,
      cpf_number: cpf,
      senha,
      confirmar_senha: confirmarSenha,
    };

    try {
      const response = await api.post("/auth/register", novoUsuario);

      if (response.status === 201) {
        const token = response.data.token;
        await AsyncStorage.setItem("userToken", token);
        console.log("Usuário criado com sucesso");
        router.navigate("../Feedbacks/CheckSucess");
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: "Email ou CPF já está em uso.",
          cpf: "Email ou CPF já está em uso.",
        }));
      }
      if (error.response && error.response.status === 400) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          geral: "Erro de validação nos dados fornecidos.",
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          geral: "Ocorreu um erro inesperado. Tente novamente mais tarde.",
        }));
      }
    }
  };

  const handlePress = () => {
    setIsChecked((prevState) => {
      const newState = !prevState;
      setButtonColor(newState ? "#2F39D3" : "#7A98FF");
      setIsDisabled(!newState);
      return newState;
    });
  };

  return (
    <View>
      <Text style={styles.label}>Nome*</Text>
      <TextInput
        placeholder="Digite seu nome"
        style={styles.inputDados}
        value={nome}
        onChangeText={setNome}
        placeholderTextColor="#B1B0AF"
      />
      {errors.nome && <Text style={styles.error}>{errors.nome}</Text>}
      <Text style={styles.label}>Sobrenome*</Text>
      <TextInput
        placeholder="Digite seu sobrenome"
        style={styles.inputDados}
        value={sobrenome}
        onChangeText={setSobrenome}
        placeholderTextColor="#B1B0AF"
      />
      {errors.sobrenome && <Text style={styles.error}>{errors.sobrenome}</Text>}
      <Text style={styles.label}>E-mail*</Text>
      <TextInput
        placeholder="Digite seu e-mail"
        style={styles.inputDados}
        value={email}
        onChangeText={setEmail}
        placeholderTextColor="#B1B0AF"
      />
      {errors.email && <Text style={styles.error}>{errors.email}</Text>}
      <Text style={styles.label}>CPF*</Text>
      <TextInput
        placeholder="000.000.000-00"
        style={styles.inputDados}
        value={cpf}
        onChangeText={handleCpfChange}
        placeholderTextColor="#B1B0AF"
      />
      {errors.cpf && <Text style={styles.error}>{errors.cpf}</Text>}
      <Text style={styles.label}>Senha*</Text>
      <View style={styles.senhaContainer}>
        <TextInput
          placeholder="Digite sua senha"
          style={styles.inputDados}
          secureTextEntry={secureText}
          value={senha}
          onChangeText={setSenha}
          placeholderTextColor="#B1B0AF"
        />
        {errors.senha && <Text style={styles.error}>{errors.senha}</Text>}
        <TouchableOpacity
          style={styles.iconBtn}
          onPress={() => setSecureText((prevState) => !prevState)}
        >
          <Feather
            name={secureText ? "eye-off" : "eye"}
            size={17}
            color="#B1B0AF"
            style={styles.eyeIcon}
          />
        </TouchableOpacity>
      </View>
      <Text style={styles.label}>Confirmar a senha*</Text>
      <View style={styles.senhaContainer}>
        <TextInput
          placeholder="Confirme sua senha"
          style={styles.inputDados}
          secureTextEntry={secureText2}
          value={confirmarSenha}
          onChangeText={setConfirmarSenha}
          placeholderTextColor="#B1B0AF"
        />
        {errors.confirmarSenha && (
          <Text style={styles.error}>{errors.confirmarSenha}</Text>
        )}
        <TouchableOpacity
          style={styles.iconBtn}
          onPress={() => setSecureText2((prevState) => !prevState)}
        >
          <Feather
            name="eye-off"
            size={17}
            color="#B1B0AF"
            style={styles.eyeIcon}
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.checkboxContainer} onPress={handlePress}>
        <View style={[styles.checkbox, isChecked && styles.checkedCheckbox]}>
          {isChecked && <AntDesign name="check" size={16} color="#FDFDFD" />}
        </View>
        <Text style={styles.labelCheckBox}>
          Políticas de privacidade e Termos de uso
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.btnContainer, { backgroundColor: buttonColor }]}
        onPress={sendForm}
        disabled={isDisabled}
      >
        <Text style={styles.txtBtn}>Cadastrar</Text>
      </TouchableOpacity>
    </View>
  );
}

export default Inputs;

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    fontFamily: "Lato_400Regular",
    lineHeight: 19.6,
    paddingTop: 8,
    paddingBottom: 8,
    marginBottom: 8,
    color: "#282828",
  },
  inputDados: {
    width: 320,
    height: 44,
    backgroundColor: "#FDFDFD",
    borderRadius: 8,
    paddingTop: 10,
    paddingRight: 14,
    paddingBottom: 10,
    paddingLeft: 14,
    marginBottom: 8,
    gap: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.12,
    shadowRadius: 1,
    elevation: 1,
    color: "#373737",
    placeholderTextColor: "#B1B0AF",
    fontFamily: "Lato_400Regular",
    lineHeight: 22,
    fontSize: 16,
  },
  senhaContainer: {
    position: "relative",
  },
  iconBtn: {
    position: "absolute",
    top: 14,
    right: 10,
  },
  checkboxContainer: {
    marginTop: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderRadius: 4,
    borderColor: "#FFD3A8",
    gap: 10,
    marginRight: 8,
  },
  checkedCheckbox: {
    backgroundColor: "#FE6811",
  },
  btnContainer: {
    flexGrow: 1,
    width: 320,
    height: 42,
    borderRadius: 8,
    paddingTop: 8,
    paddingRight: 80,
    paddingBottom: 8,
    paddingLeft: 80,
    gap: 8,
    backgroundColor: "#2F39D3",
    alignItems: "center",
    marginTop: 32,
    shadowColor: "#0C0C0D",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
  },
  txtBtn: {
    fontFamily: "Urbanist_700Bold",
    color: "#FDFDFD",
    fontSize: 18,
  },
  error: {
    color: "red",
    fontSize: 12,
    marginBottom: 8,
  },
});
