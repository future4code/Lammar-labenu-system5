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
}