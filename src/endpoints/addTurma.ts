import { Response, Request } from "express";
import { Turma } from "../classes/Turma";

export const addTurma = async (req:Request, res:Response) => {
    let errorCode = 400
    try {
        let {nome, periodo, dataInicio,
            dataTermino, modulo} = req.body

        if (!nome) {
            throw new Error("Informe um nome para a turma.")
        }

        if (!periodo) {
            throw new Error("Informe 'integral' ou 'noturno' para o período da nova turma.")
        } else if (periodo.toLowerCase() != 'noturno' && periodo.toLowerCase() != 'integral') {
            throw new Error("Informe 'integral' ou 'noturno' para o período da nova turma.")
        } else if (periodo.toLowerCase() === 'noturno') {
            nome = nome + '-na-night'
        }

        if (modulo != "undefined") {
            if (modulo < "1" || modulo > "7") {
                throw new Error("O módulo da turma deve estar entre 1 e 7 ou undefined.")
            }
        }

        const novaTurma = new Turma(
            Date.now().toString(),
            nome,
            dataInicio,
            dataTermino,
            modulo
        )

        await Turma.addEntity(Turma.tableTurma, novaTurma)
        
        res.status(201).send({message: "Turma criada", turma: novaTurma})
    } catch (error: any) {
        res.status(errorCode).send({ message: error.message })
    }
}