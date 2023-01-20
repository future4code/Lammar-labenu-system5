import { Response, Request } from "express";
import { Estudante } from "../classes/Estudante"

export const getEstudanteByHobby = async (req:Request, res:Response) => {
    let errorCode = 400
    try {
        const idHobby = req.query.idHobby as string

        if (!idHobby) {
            throw new Error("Informe o id do Hobby escolhido.")
        }

        const result = await Estudante.getEstudanteByHobby(idHobby)
        res.status(200).send(result)
    } catch (error: any) {
        res.status(errorCode).send({ message: error.message })
    }
}