export class Docente {
    constructor(
        private id: string,
        private nome: string,
        private email: string,
        private data_nasc: string,
        private turma_id: string,
        private especialidades:string[]
    ) { }
}
