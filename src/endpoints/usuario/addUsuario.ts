import { Response, Request } from "express";
import { Docente } from "../../classes/Docente"
import { Estudante } from "../../classes/Estudante"
import { Usuario } from "../../classes/Usuario"

export const addUsuario = async (req:Request, res:Response) => {
    let errorCode = 400
    try {
        const {table, nome, email, day, month, year, turma_id } = req.body
        let tableName:string
        let novoUsuario: Docente | Estudante

        if (!table || !nome || !email || !day || !month || !year || !turma_id) {
            throw new Error("Body incompleto.")
        }
        if (table.toLowerCase() === 'estudante') {
            tableName = Usuario.tableEstudante
            novoUsuario = new Estudante(
                Date.now().toString(),
                nome,
                email,
                `${year}/${month}/${day}`,
                turma_id
            )
        } else if (table.toLowerCase() === 'docente') {
            tableName = Usuario.tableDocente
            novoUsuario = new Docente(
                Date.now().toString(),
                nome,
                email,
                `${year}/${month}/${day}`,
                turma_id
            )
        } else {
            throw new Error("Escolha tabela estudante ou docente.")
        }

        await Usuario.addUsuario(tableName, novoUsuario)
        
        res.status(201).send(
            {message: `Novo ${table.toLowerCase()} adicionado.`, novoUsuario})
    } catch (error: any) {
        res.status(errorCode).send({ message: error.message })
    }
}