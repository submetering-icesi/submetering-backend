import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Measure } from "../../../../domain/entities/Measure";
import { TypeORMSubmeter } from "./Submeter";

@Entity()
export class TypeORMMeasure implements Measure {

    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column()
    type!: string;

    @Column()
    value!: number;

    @Column()
    unit!: string;

    @Column()
    timestamp!: string;

    @ManyToOne(() => TypeORMSubmeter, submeter => submeter.id, { eager: true })
    submeter!: string;
}