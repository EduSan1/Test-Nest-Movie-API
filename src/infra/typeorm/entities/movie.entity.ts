import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name: 'movies'})
export class MovieEntity {

    @PrimaryGeneratedColumn('uuid')
    id : string;

    @Column({length: 200, nullable: false})
    title : string;

    @Column({length: 600, nullable: false})
    description : string

    @Column({nullable: false})
    releaseDate : Date

    @CreateDateColumn()
    createdAt : string;

    @UpdateDateColumn()
    updatedAt : string;
}