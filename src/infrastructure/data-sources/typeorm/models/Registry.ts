import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Registry } from "../../../../domain/entities/Registry";
import { TypeORMSubmeter } from "./Submeter";

@Entity()
export class TypeORMRegistry implements Registry {

    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column()
    name!: string;

    @Column()
    registry!: string;

    @Column()
    format!: number;

    @Column()
    unit!: string;

    @Column()
    pointType!: number;

    @ManyToOne(() => TypeORMSubmeter, submeter => submeter.id, { eager: true })
    submeter!: string;

}