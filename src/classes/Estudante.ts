import { Usuario } from "./Usuario"

export class Estudante extends Usuario {
    constructor(
        id: string,
        nome: string,
        email: string,
        data_nasc: string,
        turma_id: string
    ) {
        super(
            id,
            nome,
            email,
            data_nasc,
            turma_id
        )
    }

    public static createEstudante = async(novoEstudante: Estudante) => {
        await Estudante
            .connection(Estudante.tableEstudante)
            .insert(novoEstudante)
    }

    public static getEstudanteByName = async (nome:string) => {
        const result = await Estudante
            .connection(Estudante.tableEstudante)
            .select()
            .where("nome","like",`%${nome}%`)
        return result
    }

    public static changeTurma = async (idEstudante:string, idNovaTurma:string) => {
        await Estudante
            .connection(Estudante.tableEstudante)
            .where("id","=",idEstudante)
            .update("turma_id",idNovaTurma)
    }
}
