import { Response, Request } from "express";
import { Turma } from "../../classes/Turma";

export const getTurmas = async (req:Request, res:Response) => {
    let errorCode = 400
    try {
        const result = await Turma.getTurmas()
        
        res.status(200).send(result)
    } catch (error: any) {
        res.status(errorCode).send({ message: error.message })
    }
}