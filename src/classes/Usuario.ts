import { BaseDB } from "./BaseDB"

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
}
