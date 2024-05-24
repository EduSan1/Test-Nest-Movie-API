import {  IsNotEmpty } from 'class-validator';

export class UpdateUserDTO {
  @IsNotEmpty({ message: 'o nome não pode ser vazio!' })
  name: string;
}
