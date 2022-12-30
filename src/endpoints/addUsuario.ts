import { Response, Request } from "express";
import { Docente } from "../classes/Docente"
import { Estudante } from "../classes/Estudante"
import { BaseDB } from "../classes/BaseDB";

export const addUsuario = async (req:Request, res:Response) => {
    let errorCode = 400
    try {
        const {table, nome, email, data_nasc, turma_id } = req.body
        let tableName:string
        let novoUsuario: Docente | Estudante

        if (!table || !nome || !email || !data_nasc || !turma_id) {
            throw new Error("Body incompleto.")
        }
        if (table.toLowerCase() === 'estudante') {
            tableName = BaseDB.tableEstudante
            novoUsuario = new Estudante(
                Date.now().toString(),
                nome,
                email,
                data_nasc,
                turma_id
            )
        } else if (table.toLowerCase() === 'docente') {
            tableName = BaseDB.tableDocente
            novoUsuario = new Docente(
                Date.now().toString(),
                nome,
                email,
                data_nasc,
                turma_id
            )
        } else {
            throw new Error("Escolha tabela estudante ou docente.")
        }

        await BaseDB.addEntity(tableName, novoUsuario)
        
        res.status(201).send(
            {message: `Novo ${table.toLowerCase()} adicionado à turma.`, novoUsuario})
    } catch (error: any) {
        res.status(errorCode).send({ message: error.message })
    }
}