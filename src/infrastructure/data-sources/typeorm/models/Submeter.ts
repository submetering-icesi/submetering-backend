import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Submeter } from "../../../../domain/entities/Submeter";

@Entity()
export class TypeORMSubmeter implements Submeter {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column()
    name!: string;

    @Column()
    location!: string;
}