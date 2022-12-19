import knex from "knex"
import dotenv from "dotenv"

dotenv.config()

export abstract class BaseDB {

    public static tableEstudante = "LabSys_estudante"
    public static tableDocente = "LabSys_docente"
    public static tableTurma = "LabSys_turma"
    public static tableHobbyEstudante = "LabSys_estudanteHobby"
    public static tableHobbies = "LabSys_hobbies"
    public static tableDocenteEspecialidades = "LabSys_docenteEspec"
    public static tableEspecialidades = "LabSys_especialidades"

    public static connection = knex({
        client: "mysql",
        connection: {
            host: process.env.DB_HOST,
            port: 3306,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
            multipleStatements: true
        },
    })
}