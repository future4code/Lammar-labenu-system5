import { BaseDB } from "./BaseDB"

export class Turma extends BaseDB {
    constructor(
        private id: string,
        private nome: string,
        private data_inicio: string,
        private data_termino: string,
        private modulo: string = '0'
    ) {
        super()
    }

    public static changeModulo = async (id: string, value: string) => {
        try {
            const result = await Turma
                .connection.raw(`
                    UPDATE ${this.tableTurma} SET modulo = ${value} WHERE id = ${id}
                `)
            if (result[0].changedRows === 0) {
                throw new Error("Erro. Nenhum dado atualizado.")
            }
        } catch (error: any) {
            throw new Error(error.message)
        }
    }

    public static getMembers = async (turma: string) => {
        let docentes: string[]
        let estudantes: string[]
        docentes = await Turma
            .connection(Turma.tableDocente)
            .select("nome")
            .where("turma_id", "=", turma)
        estudantes = await Turma
            .connection(Turma.tableEstudante)
            .select("nome")
            .where("turma_id", "=", turma)
        const result = docentes.concat(estudantes)
        return result
    }
}