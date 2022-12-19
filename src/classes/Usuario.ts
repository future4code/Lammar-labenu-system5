import { BaseDB } from "./BaseDB"
import { Docente } from "./Docente"
import { Estudante } from "./Estudante"

export abstract class Usuario extends BaseDB {
    constructor(
        protected id: string,
        protected nome: string,
        protected email: string,
        protected data_nasc: string,
        protected turma_id: string,
    ) {
        super()
    }

    public static changeTurma = async (tableName:string, idUsuario:string, idNovaTurma:string) => {
        await Usuario
            .connection(tableName)
            .where("id","=",idUsuario)
            .update("turma_id",idNovaTurma)
    }

    public static addUsuario = async(tableName:string, novoUsuario: Docente | Estudante) => {
        await Usuario
            .connection(tableName)
            .insert(novoUsuario)
    }

    public static getUsuario = async (tableName:string, nomeUsuario:string) => {
        const result = await Usuario
            .connection(tableName)
            .select()
            .where("nome","like",`%${nomeUsuario}%`)
        return result
    }
}
