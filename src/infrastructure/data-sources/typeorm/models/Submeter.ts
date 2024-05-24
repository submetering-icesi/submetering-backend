import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";
import { Submeter } from "../../../../domain/entities/Submeter";

@Entity()
export class TypeORMSubmeter implements Submeter {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column()
    @Index({ unique: true })
    name!: string;

    @Column()
    location!: string;
}