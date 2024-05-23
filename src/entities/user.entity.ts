import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name: 'users'})
export class UserEntity {

    @PrimaryGeneratedColumn('uuid')
    id : string;

    @Column({length: 150, nullable: false})
    name : string;


    @Column({length: 70, nullable: false})
    email : string;


    @Column({length: 255, nullable: false})
    password : string;

    @CreateDateColumn()
    createdAt : string;

    @UpdateDateColumn()
    updatedAt : string;
}