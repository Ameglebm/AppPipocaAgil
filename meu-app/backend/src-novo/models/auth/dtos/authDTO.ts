import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsEmail, IsString, Matches, Min, ValidateIf } from "class-validator";
import { cpf } from 'cpf-cnpj-validator';
import { Validate } from 'class-validator';

class IsCpfValid {
  validate(value: string) {
    return cpf.isValid(value);
  }

  defaultMessage() {
    return 'CPF inválido';
  }
}

export class RegisterUserDTO {
  @ApiProperty()
  @IsString({ message: 'O nome do usuário deve ser uma string.' })
  @Matches(
          /^[A-Za-zÀ-ÿ\s]+$/,
          { message: 'Nome deve conter apenas letras e espaços.' }
  )
  nome!: string;

  @ApiProperty()
  @IsString({ message: 'O nome do usuário deve ser uma string.' })
  @Matches(
          /^[A-Za-zÀ-ÿ\s]+$/,
          { message: 'Nome deve conter apenas letras e espaços.' }
  )
  sobrenome!: string;

  @ApiProperty()
  @IsEmail({}, { message: 'Formato de e-mail inválido.' })
  email!: string;

  @ApiProperty()
  @IsString({ message: 'O nome do usuário deve ser uma string.' })
  @Matches(
          /^[\d.-]+$/,
          { message: 'CPF deve conter apenas números, pontos e hífens.' }
  )
  @Transform(({ value }) => value.replace(/[.-]/g, ''))
  @Matches(/^\d{11}$/, { message: 'CPF deve conter exatamente 11 dígitos numéricos.' })
  @Validate(IsCpfValid, { message: 'CPF inválido' })
  cpf_number!: string;

  @ApiProperty()
  @IsString({ message: 'A senha deve ser uma string.' })
  @Min(8, { message: 'Senha deve ter pelo menos 8 caracteres.' })
  @Matches(
          /[A-Z]/,
          { message: 'Senha deve conter pelo menos uma letra maiúscula.' }
  )
  @Matches(
    /[!@#$%^&*(),.?":;{}|<>]/,
    { message: 'Senha deve conter pelo menos um caractere especial' }
  )
  senha!: string;

  @ApiProperty()
  @IsString({ message: 'A confirmação de senha deve ser uma string.' })
  @Min(8, { message: 'Confirmação de senha deve ter pelo menos 8 caracteres.' })
  @ValidateIf(o => o.senha !== o.confirmar_senha, {message: 'As senhas não correspondem.'})
  confirmar_senha!: string;
}

export class LoginDTO {
  email!: string;
  senha!: string;
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