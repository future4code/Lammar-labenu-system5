import { Response, Request } from "express";
import { Usuario } from "../classes/Usuario";

export const getUserAge = async (req:Request, res:Response) => {
    let errorCode = 400
    try {
        const userId = req.query.userId as string

        if (!userId) {
            throw new Error("Informe o ID do usuário.")
        }

        const result = await Usuario.getUserAge(userId)
        res.status(200).send(result)
    } catch (error: any) {
        res.status(errorCode).send({ message: error.message })
    }
}