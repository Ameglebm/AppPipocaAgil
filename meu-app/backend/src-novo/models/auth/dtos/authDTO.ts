import { IsString, Matches, IsEmail, MinLength, ValidateIf, IsNotEmpty } from "class-validator";

// import { ApiProperty } from "@nestjs/swagger";
// import { Transform } from "class-transformer";
// import { cpf } from 'cpf-cnpj-validator';
// import { Validate } from 'class-validator';

// Vamos usar a palavra 'string' nas mensagens? Talvez 'texto' ou 'formato de texto' ou só 'formato incorreto'.

// As senhas aceitam o caractere espaço?

// As senhas tem um máximo de caracteres? Isso seria tratado pelo front-end ou devo colocar um validator length no lugar de minlenght?

// class IsCpfValid {
//   validate(value: string) {
//     return cpf.isValid(value);
//   }

//   defaultMessage() {
//     return 'CPF inválido';
//   }
// }

export class RegisterUserDTO {
  @IsString({ message: 'Nome deve ser uma string.' })
  @Matches( /^[A-Za-zÀ-ÿ\s]+$/, { message: 'Nome deve conter apenas letras e espaços.' })
  nome: string;

  @IsString({ message: 'Sobrenome deve ser uma string.' })
  @Matches( /^[A-Za-zÀ-ÿ\s]+$/, { message: 'Sobrenome deve conter apenas letras e espaços.' })
  sobrenome: string;

  // Não usa o IsString, porque o IsEmail já cobre a função do IsString?
  @IsEmail({}, { message: 'Formato de e-mail inválido.' })
  email: string;

  // Perguntar sobre melhora usando os transformators
  @IsString({ message: 'CPF deve ser uma string.' })
  @Matches( /^[\d.-]+$/, { message: 'CPF deve conter apenas números, pontos e hífens.' })
  cpf_number: string;

  @IsString({ message: 'Senha deve ser uma string.' })
  @MinLength( 8, { message: 'Senha deve ter pelo menos 8 caracteres.' })
  @Matches( /[A-Z]/, { message: 'Senha deve conter pelo menos uma letra maiúscula.' })
  @Matches( /[!@#$%^&*(),.?":;{}|<>]/, { message: 'Senha deve conter pelo menos um caractere especial.' })
  senha: string;

  // Talvez seja possível usar apenas o ValidateIf, mas tenho que confirmar. Teria algum perigo?
  // Condição alternativa(?): o => o.senha && o.confirmar_senha
  // depois de tirar as dúvidas, não esquece de ir lá no ResetPasswordDTO ver se precisa alterar
  @ValidateIf( o => o.senha !== o.confirmar_senha, { message: 'As senhas não correspondem.' })
  @IsString({ message: 'Confirmação de senha deve ser uma string.' })
  @MinLength( 8, { message: 'Confirmação de senha deve ter pelo menos 8 caracteres.' })
  @Matches( /[A-Z]/, { message: 'Confirmação de senha deve conter pelo menos uma letra maiúscula.' })
  @Matches( /[!@#$%^&*(),.?":;{}|<>]/, { message: 'Confirmação de senha deve conter pelo menos um caractere especial.' })
  confirmar_senha: string;
}

export class LoginDTO {
  @IsEmail({}, { message: 'Formato de e-mail inválido.' })
  email: string;

  @IsString({ message: 'Senha deve ser uma string.' })
  @MinLength( 8, { message: 'Senha deve ter pelo menos 8 caracteres.' })
  @Matches( /[A-Z]/, { message: 'Senha deve conter pelo menos uma letra maiúscula.' })
  @Matches( /[!@#$%^&*(),.?":;{}|<>]/, { message: 'Senha deve conter pelo menos um caractere especial.' })
  senha: string;
}

export class RequestPasswordResetDTO {
  @IsEmail({}, { message: 'Formato de e-mail inválido.' })
  email: string;
}

// chatGPT:
/* To enforce password confirmation matching, you can add custom validation logic in the service layer:

ts
Copy
Edit
if (dto.novaSenha !== dto.confirmarNovaSenha) {
  throw new BadRequestException('Passwords do not match');
} */

export class VerifyResetCodeDTO {
  @IsEmail({}, { message: 'Formato de e-mail inválido.' })
  email: string;

  @IsNotEmpty()
  @IsString({ message: 'O código deve ser uma string.' })
  code: string;
}

export class ResetPasswordDTO {
  @IsEmail({}, { message: 'Formato de e-mail inválido.' })
  email: string;

  @IsNotEmpty()
  @IsString({ message: 'O código deve ser uma string.' })
  code: string;

  @IsString({ message: 'Senha deve ser uma string.' })
  @MinLength( 8, { message: 'Senha deve ter pelo menos 8 caracteres.' })
  @Matches( /[A-Z]/, { message: 'Senha deve conter pelo menos uma letra maiúscula.' })
  @Matches( /[!@#$%^&*(),.?":;{}|<>]/, { message: 'Senha deve conter pelo menos um caractere especial.' })
  novaSenha: string;

  // depois de tirar a dúvida do outro campo confirmarSenha, não esquece de vir aqui ver se precisa alterar
  @ValidateIf( o => o.senha !== o.confirmar_senha, { message: 'As senhas não correspondem.' })
  @IsString({ message: 'Confirmação de senha deve ser uma string.' })
  @MinLength( 8, { message: 'Confirmação de senha deve ter pelo menos 8 caracteres.' })
  @Matches( /[A-Z]/, { message: 'Confirmação de senha deve conter pelo menos uma letra maiúscula.' })
  @Matches( /[!@#$%^&*(),.?":;{}|<>]/, { message: 'Confirmação de senha deve conter pelo menos um caractere especial.' })
  confirmarNovaSenha: string;
}
