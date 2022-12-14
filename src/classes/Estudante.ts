export class Estudante {
    constructor(
        private id: string,
        private nome: string,
        private email: string,
        private data_nasc: string,
        private turma_id: string,
        private hobbies:string[]
    ) { }
}
