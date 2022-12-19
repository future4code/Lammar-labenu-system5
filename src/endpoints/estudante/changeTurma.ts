import { Response, Request } from "express";
import { Estudante } from "../../classes/Estudante";

export const changeTurma = async (req:Request, res:Response) => {
    let errorCode = 400
    try {
        const {idEstudante, idNovaTurma} = req.body

        if (!idEstudante) {
            throw new Error("Informe o id do aluno.")
        }
        if (!idNovaTurma) {
            throw new Error("Informe o id da nova turma.")
        }

        await Estudante.changeTurma(idEstudante, idNovaTurma)

        res.status(201).send("A turma do aluno foi alterada.")
    } catch (error: any) {
        res.status(errorCode).send({ message: error.message })
    }
}