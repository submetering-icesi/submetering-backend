import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";
import { Topic } from "../../../../domain/entities/Topic";

@Entity()
export class TypeORMTopic implements Topic {

    @PrimaryGeneratedColumn("uuid")
    id!: string | undefined;

    @Column()
    name!: string;

    @Column()
    @Index({ unique: true })
    topic!: string;
}