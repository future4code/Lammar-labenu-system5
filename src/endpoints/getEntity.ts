import { Response, Request } from "express";
import { BaseDB } from "../classes/BaseDB";

export const getEntity = async (req:Request, res:Response) => {
    let errorCode = 400
    try {
        const table = req.body.table
        let nome = req.body.nome as string
        let tableName:string

        if (!nome) {
            nome = "%"
        }
        if (!table) {
            throw new Error("Escolha tabela estudante, docente ou turma.")
        }
        if (table.toLowerCase() === 'estudante') {
            tableName = BaseDB.tableEstudante
        } else if (table.toLowerCase() === 'docente') {
            tableName = BaseDB.tableDocente
        } else if (table.toLowerCase() === 'turma') {
            tableName = BaseDB.tableTurma
        } else {
            throw new Error("Escolha tabela estudante, docente ou turma.")
        }
        
        const result = await BaseDB.getEntity(tableName, nome)
        res.status(200).send(result)
    } catch (error: any) {
        res.status(errorCode).send({ message: error.message })
    }
}