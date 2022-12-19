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
}
