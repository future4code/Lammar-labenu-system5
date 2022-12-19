import { Response, Request } from "express";
import { Docente } from "../../classes/Docente";

export const createDocente = async (req:Request, res:Response) => {
    let errorCode = 400
    try {

        const {nome, email, day, month, year, turma_id } = req.body

        if (!nome || !email || !day || !month || !year || !turma_id) {
            throw new Error("Body incompleto.")
        }

        const novoDocente = new Docente(
            Date.now().toString(),
            nome,
            email,
            `${year}/${month}/${day}`,
            turma_id
        )

        await Docente.createDocente(novoDocente)
        
        res.status(201).send({message: "Novo docente adicionado.", Docente: novoDocente})
    } catch (error: any) {
        res.status(errorCode).send({ message: error.message })
    }
}