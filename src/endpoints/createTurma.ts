import { Response, Request } from "express";
import { Turma } from "../classes/Turma";

export const createTurma = async (req:Request, res:Response) => {
    let errorCode = 400
    try {
        const {nome, modulo} = req.body

        if (!nome) {
            throw new Error("Informe um nome para a turma.")
        }

        const novaTurma = new Turma(
            Date.now().toString(),
            nome,
            modulo
        )

        await Turma.createTurma(novaTurma)
        
        res.status(201).send({message: "Turma criada", turma: novaTurma})
    } catch (error: any) {
        res.status(errorCode).send({ message: error.message })
    }
}