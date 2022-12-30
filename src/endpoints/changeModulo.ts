import { Response, Request } from "express";
import { Turma } from "../classes/Turma";

export const changeModulo = async (req:Request, res:Response) => {
    let errorCode = 400
    try {
        const {id, modulo} = req.body

        if (!id) {
            throw new Error("Informe o id da turma.")
        }
        if (!modulo) {
            throw new Error("Informe o módulo da turma.")
        }
        if (modulo != "undefined" && modulo < "1" || modulo > "7") {
            throw new Error("O módulo da turma deve estar entre 1 e 7 ou undefined.")
        }

        await Turma.changeModulo(id,modulo)

        res.status(200).send("O módulo da turma foi alterado.")
    } catch (error: any) {
        res.status(errorCode).send({ message: error.message })
    }
}