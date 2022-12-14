export class Turma {
    constructor(
        private id: string,
        private nome: string,
        private docentes: string[],
        private estudantes: string[],
        private modulo: string = '0'
    ) { }
}