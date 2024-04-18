import { DataSource } from "typeorm"
import { IMeasurementUseCases } from "../../../application/use-cases/measurement"
import { ICommonUseCases } from "../../../application/use-cases/common"
import { Submeter } from "../../../domain/entities/Submeter"
import { TypeORMMeasureRepository } from "./repositories/typeorm-measure-repository"
import { TypeORMSubmeterRepository } from "./repositories/typeorm-submeter-repository"

export class TypeORMDataSource {
    protected dataSource: DataSource
    measures: IMeasurementUseCases
    submeters: ICommonUseCases<Submeter>

    constructor() {
        this.dataSource = new DataSource({
            type: "postgres",
            host: process.env.POSTGRES_HOST || "localhost",
            port: parseInt(process.env.POSTGRES_PORT || "5432"),
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
            entities: [
                "src/infrastructure/data-sources/typeorm/models/**/*.ts"
            ],
            synchronize: true
        })
        this.measures = new TypeORMMeasureRepository(this.dataSource)
        this.submeters = new TypeORMSubmeterRepository(this.dataSource)
    }

    initialize() {
        this.dataSource.initialize()
            .then(() => {
                console.log("Data Source has been initialized!")
            })
            .catch((err) => {
                console.error("Error during Data Source initialization", err)
            })
    }
}