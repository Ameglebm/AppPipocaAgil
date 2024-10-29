import { useState } from "react";

export default function useFormValidation() {
  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [buttonColor, setButtonColor] = useState("#7A98FF");

  const handleCheckboxToggle = () => {
    setIsChecked((prev) => {
      const newState = !prev;
      setButtonColor(newState ? "#2F39D3" : "#7A98FF");
      setIsDisabled(!newState);
      return newState;
    });
  };

  return {
    nome,
    setNome,
    sobrenome,
    setSobrenome,
    email,
    setEmail,
    cpf,
    setCpf,
    senha,
    setSenha,
    confirmarSenha,
    setConfirmarSenha,
    isChecked,
    isDisabled,
    buttonColor,
    handleCheckboxToggle,
  };
}
