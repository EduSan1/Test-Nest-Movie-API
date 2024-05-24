import { IsEmail, IsNotEmpty } from "class-validator";

export class LoginUserDTO {
    @IsEmail(undefined, { message: 'e-mail informado invalido!' })
    email: string;
  
    @IsNotEmpty()
    password: string;
}