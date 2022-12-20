import { Response, Request } from "express";
import { Usuario } from "../classes/Usuario";

export const changeTurma = async (req:Request, res:Response) => {
    let errorCode = 400
    try {
        const {table, idUsuario, idNovaTurma} = req.body
        let tableName:string

        if (!table) {
            throw new Error("Escolha tabela estudante ou docente.")
        }
        if (table.toLowerCase() === 'estudante') {
            tableName = Usuario.tableEstudante
        } else if (table.toLowerCase() === 'docente') {
            tableName = Usuario.tableDocente
        } else {
            throw new Error("Escolha tabela estudante ou docente.")
        }
        if (!idUsuario) {
            throw new Error("Informe o id do usuário.")
        }
        if (!idNovaTurma) {
            throw new Error("Informe o id da nova turma.")
        }

        await Usuario.changeTurma(tableName, idUsuario, idNovaTurma)

        res.status(201).send(`A turma do ${table.toLowerCase()} foi alterada.`)
    } catch (error: any) {
        res.status(errorCode).send({ message: error.message })
    }
}