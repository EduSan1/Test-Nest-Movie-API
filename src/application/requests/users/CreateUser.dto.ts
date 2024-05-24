import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { EmailIsUnique } from './validator/EmailIsUnique.validator';

export class CreateUserDTO {
  @IsNotEmpty({ message: 'o nome não pode ser vazio!' })
  name: string;

  @IsEmail(undefined, { message: 'e-mail informado invalido!' })
  @EmailIsUnique({ message: 'email já existe!!' })
  email: string;

  @MinLength(8, { message: 'coloca mais caractere!' })
  password: string;
}
