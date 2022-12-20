import { BaseDB } from "./BaseDB"

export class Turma extends BaseDB {
    constructor(
        private id: string,
        private nome: string,
        private modulo: string = '0'
    ) {
        super()
    }

    public static changeModulo = async (id:string, value:string) => {
        await Turma
            .connection(Turma.tableTurma)
            .where('id', '=', id)
            .update('modulo', value)
    }

    public static getMembers = async (turma:string) => {
        let docentes:string[]
        let estudantes:string[]
        docentes = await Turma
            .connection(Turma.tableDocente)
            .select("nome")
            .where("turma_id","=",turma)
        estudantes = await Turma
            .connection(Turma.tableEstudante)
            .select("nome")
            .where("turma_id","=",turma)
        const result = docentes.concat(estudantes)
        return result
    }
}