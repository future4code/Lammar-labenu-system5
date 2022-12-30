import { BaseDB } from "./BaseDB"
import { Turma } from "./Turma"


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

    public static changeTurma = async (tableName: string, idUsuario: string, idNovaTurma: string) => {
        try {
            const result = await Usuario
                .connection.raw(`
                    UPDATE ${tableName} SET turma_id = ${idNovaTurma} WHERE id = ${idUsuario}
                `)
            if (result[0].changedRows === 0) {
                throw new Error("Erro. Nenhum dado atualizado.")
            }
        } catch (error: any) {
            throw new Error(error.message)
        }
    }

    public static getUserAge = async (id:string) =>{
        try {
            const userBirthDate = await Usuario
                .connection(Turma.tableEstudante)
                .select("data_nasc")
                .where("id","=",`${id}`)

            const todayMillisec = Date.now()
            const birthMillisec = userBirthDate[0].data_nasc.getTime()
            const diffMillisec = todayMillisec - birthMillisec
            const diffYears = diffMillisec/31556952000
            const diffYearsStr = diffYears.toString().slice(0,2)

            return diffYearsStr

        } catch (error:any) {
            throw new Error(error.message)
        }
    }
}
