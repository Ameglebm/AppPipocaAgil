export interface RegisterUserDTO {
  nome: string;
  sobrenome: string;
  email: string;
  cpf_number: string;
  senha: string;
  confirmar_senha: string;
}

export interface LoginDTO {
  email: string;
  senha: string;
}

export interface RequestPasswordResetDTO {
  email: string;
}

export interface VerifyResetCodeDTO {
  email: string;
  code: string;
}

export interface ResetPasswordDTO {
  email: string;
  code: string;
  novaSenha: string;
  confirmarNovaSenha: string;
}