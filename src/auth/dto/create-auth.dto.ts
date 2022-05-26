import { IsNotEmpty } from "class-validator";

export class CreateLoginDto {
    @IsNotEmpty({
       message: 'Informe o email.', 
    })
    email: string;

    @IsNotEmpty({
        message: 'Informe a senha.', 
     })
    password: string;
}
