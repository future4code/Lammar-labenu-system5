import { Response, Request } from "express";
import { Estudante } from "../../classes/Estudante";

export const getEstudanteByName = async (req:Request, res:Response) => {
    let errorCode = 400
    try {
        const nome = req.query.nome as string

        if (!nome) {
            throw new Error("Informar o nome do aluno.")
        }

        const result = await Estudante.getEstudanteByName(nome)

        res.status(200).send(result)
    } catch (error: any) {
        res.status(errorCode).send({ message: error.message })
    }
}