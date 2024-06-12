import { Column, Entity, Long, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Measure } from "../../../../domain/entities/Measure";
import { TypeORMSubmeter } from "./Submeter";

@Entity()
export class TypeORMMeasure implements Measure {

    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({ type: "decimal" })
    value!: number;

    @Column({ type: "bigint" })
    timestamp!: number;

    @Column()
    registry!: string;

    @ManyToOne(() => TypeORMSubmeter, submeter => submeter.id, { eager: true })
    submeter!: string;
}