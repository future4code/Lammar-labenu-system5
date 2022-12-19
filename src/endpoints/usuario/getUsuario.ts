import { Response, Request } from "express";
import { Usuario } from "../../classes/Usuario"

export const getUsuario = async (req:Request, res:Response) => {
    let errorCode = 400
    try {
        const table = req.body.table
        let nome = req.body.nome as string
        let tableName:string

        if (!nome) {
            nome = "%"
        }
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
        
        const result = await Usuario.getUsuario(tableName, nome)
        res.status(200).send(result)
    } catch (error: any) {
        res.status(errorCode).send({ message: error.message })
    }
}