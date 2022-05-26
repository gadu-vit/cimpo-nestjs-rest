import { IsEmail, IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({
    message: 'Informe o nome do usuário.',
  })
  @IsString()
  name: string;

  @IsNotEmpty({
    message: 'Informe o email do usuário.',
  })
  @IsEmail()
  email: string;

  @IsNotEmpty({
    message: 'Informe a senha do usuário.',
  })
  @MinLength(8, {
    message: 'A senha deve ter, no mínimo, 8 caracteres.'
  })
  @Matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/, {
    message: 'A senha deve ter pelo menos uma letra minúscula, uma letra maiúscula e um número.'
  })
  password: string;

  cpf: string;
  street: string;
  zipCode: string;
  number: string;
  complement: string;
  district: string;
  city: string;
  state: string;
  prodComprado: number;
}
