import { DataSource } from "typeorm";
import { User } from "./Entities/Users";
import { Productos } from "./Entities/Productos";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "root",
    database: "postgres",
    synchronize: true,
    logging: true,
    entities: [User,Productos]
})
