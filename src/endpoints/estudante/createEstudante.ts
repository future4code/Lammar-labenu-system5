import { Response, Request } from "express";
import { Estudante } from "../../classes/Estudante";

export const createEstudante = async (req:Request, res:Response) => {
    let errorCode = 400
    try {
        const {nome, email, day, month, year, turma_id } = req.body

        if (!nome || !email || !day || !month || !year || !turma_id) {
            throw new Error("Body incompleto.")
        }

        const novoEstudante = new Estudante(
            Date.now().toString(),
            nome,
            email,
            `${year}/${month}/${day}`,
            turma_id
        )

        await Estudante.createEstudante(novoEstudante)
        
        res.status(201).send({message: "Estudante adicionado.", Estudante: novoEstudante})
    } catch (error: any) {
        res.status(errorCode).send({ message: error.message })
    }
}