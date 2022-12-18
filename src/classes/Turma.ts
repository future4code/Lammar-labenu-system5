import { BaseDB } from "../database/BaseDB"

export class Turma extends BaseDB {
    constructor(
        private id: string,
        private nome: string,
        private modulo: string = '0'
    ) {
        super()
    }

    public static createTurma = async (novaTurma: Turma) => {
        await Turma
            .connection(Turma.tableTurma)
            .insert(novaTurma)
    }

    public static getTurmas = async () => {
        const result = await Turma
            .connection(Turma.tableTurma)
            .select()
        return result
    }

    public static changeModulo = async (id:string, value:string) => {
        await Turma
            .connection(Turma.tableTurma)
            .where('id', '=', id)
            .update('modulo', value)
    }
}