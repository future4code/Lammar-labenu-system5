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

    public static getEstudanteByHobby = async (idHobby: string) => {
        let idEstudantes: string[]
        let estudantes: Estudante[]=[]
        idEstudantes = await Estudante
            .connection(Estudante.tableHobbyEstudante)
            .select("id_estudante")
            .where("id_hobby", "=", idHobby)

        for await (const item of idEstudantes) {
            const result = await Estudante
                .connection(Estudante.tableEstudante)
                .select()
                .where("id", "=", Object.values(item))
            estudantes.push(result[0])
        }
        return estudantes
    }
}
