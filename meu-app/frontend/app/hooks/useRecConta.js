// app/hooks/useRecConta.js
import { useState } from "react";

const useRecConta = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const validateEmail = (input) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(input);
  };

  const handleEmailChange = (text) => {
    setEmail(text);
    if (text === "" || validateEmail(text)) {
      setError("");
    } else {
      setError("Insira o e-mail utilizado no cadastro.");
    }
  };

  return {
    email,
    error,
    handleEmailChange,
  };
};

export default useRecConta;
