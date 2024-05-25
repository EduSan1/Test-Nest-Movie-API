import { IsNotEmpty } from "class-validator";

export class MovieRequest {
    @IsNotEmpty({ message: 'o titulo não pode ser vazio!' })
    title : string;

    @IsNotEmpty({ message: 'a descrição não pode ser vazio!' })

    description : string
    @IsNotEmpty({ message: 'a data de lançamento não pode ser vazio!' })
    releaseDate : Date
}