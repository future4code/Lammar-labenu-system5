import { Response, Request } from "express";
import { Turma } from "../../classes/Turma";

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
        if (modulo < "0" || modulo > "6") {
            throw new Error("O módulo da turma deve estar entre 0 e 6.")
        }

        await Turma.changeModulo(id,modulo)

        res.status(201).send("Módulo atualizado.")
    } catch (error: any) {
        res.status(errorCode).send({ message: error.message })
    }
}