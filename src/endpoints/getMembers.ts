import { Response, Request } from "express";
import { Turma } from "../classes/Turma"

export const getMembers = async (req:Request, res:Response) => {
    let errorCode = 400
    try {
        const turma = req.query.turma as string

        if (!turma) {
            throw new Error("Informe a turma.")
        }

        const result = await Turma.getMembers(turma)
        res.status(200).send(result)
    } catch (error: any) {
        res.status(errorCode).send({ message: error.message })
    }
}