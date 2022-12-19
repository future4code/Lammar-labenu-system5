import { BaseDB } from "../classes/BaseDB"
import especialidades from "./especialidades.json"

const printError = (error: any) => { console.log(error.sqlMessage || error.message) }

const createTables = () =>

    // Tabela Hobbies
    BaseDB.connection.schema.hasTable(BaseDB.tableHobbies).then((exists) => {
        if (!exists) {
            return BaseDB.connection.schema
                .createTable(BaseDB.tableHobbies, (table) => {
                    table.string('id')
                    table.primary(['id'])
                    table.string('nome').notNullable().unique()
                })
                .then(() => {
                    console.log(`Table ${BaseDB.tableHobbies} created.`)
                })
        } else {
            console.log(`Table ${BaseDB.tableHobbies} already exists.`)
        }
    })
        .catch(printError)


// Tabela de Relação Hobby-Estudante
BaseDB.connection.schema.hasTable(BaseDB.tableHobbyEstudante).then((exists) => {
    if (!exists) {
        return BaseDB.connection.schema
            .createTable(BaseDB.tableHobbyEstudante, (table) => {
                table.string('id')
                table.primary(['id'])
                table.string('id_hobby')
                table.foreign('id_hobby')
                    .references(`${BaseDB.tableHobbies}.id`)
                    .onDelete('cascade')
                table.string('id_estudante')
                table.foreign('id_estudante')
                    .references(`${BaseDB.tableEstudante}.id`)
                    .onDelete('cascade')
            })
            .then(() => {
                console.log(`Table ${BaseDB.tableHobbyEstudante} created.`)
            })
    } else {
        console.log(`Table ${BaseDB.tableHobbyEstudante} already exists.`)
    }
})
    .catch(printError)


// Tabela Estudantes
BaseDB.connection.schema.hasTable(BaseDB.tableEstudante).then((exists) => {
    if (!exists) {
        return BaseDB.connection.schema
            .createTable(BaseDB.tableEstudante, (table) => {
                table.string('id')
                table.primary(['id'])
                table.string('nome').notNullable()
                table.string('email').notNullable().unique()
                table.date('data_nasc').notNullable()
                table.string('turma_id').notNullable()
                table.foreign('turma_id')
                    .references(`${BaseDB.tableTurma}.id`)
                    .onDelete('cascade')
            })
            .then(() => {
                console.log(`Table ${BaseDB.tableEstudante} created.`)
            })
    } else {
        console.log(`Table ${BaseDB.tableEstudante} already exists.`)
    }
})
    .catch(printError)


// Tabela Turma
BaseDB.connection.schema.hasTable(BaseDB.tableTurma).then((exists) => {
    if (!exists) {
        return BaseDB.connection.schema
            .createTable(BaseDB.tableTurma, (table) => {
                table.string('id')
                table.primary(['id'])
                table.string('nome').notNullable().unique()
                table.string('modulo').notNullable().defaultTo(0)
            })
            .then(() => {
                console.log(`Table ${BaseDB.tableTurma} created.`)
            })
    } else {
        console.log(`Table ${BaseDB.tableTurma} already exists.`)
    }
})
    .catch(printError)


// Tabela Docente
BaseDB.connection.schema.hasTable(BaseDB.tableDocente).then((exists) => {
    if (!exists) {
        return BaseDB.connection.schema
            .createTable(BaseDB.tableDocente, (table) => {
                table.string('id')
                table.primary(['id'])
                table.string('nome').notNullable()
                table.string('email').notNullable().unique()
                table.date('data_nasc').notNullable()
                table.string('turma_id').notNullable()
                table.foreign('turma_id')
                    .references(`${BaseDB.tableTurma}.id`)
                    .onDelete('cascade')
            })
            .then(() => {
                console.log(`Table ${BaseDB.tableDocente} created.`)
            })
    } else {
        console.log(`Table ${BaseDB.tableDocente} already exists.`)
    }
})
    .catch(printError)


// Tabela de Relação Docente-Especialidades
BaseDB.connection.schema.hasTable(BaseDB.tableDocenteEspecialidades).then((exists) => {
    if (!exists) {
        return BaseDB.connection.schema
            .createTable(BaseDB.tableDocenteEspecialidades, (table) => {
                table.string('id')
                table.primary(['id'])
                table.string('id_docente').notNullable()
                table.foreign('id_docente')
                    .references(`${BaseDB.tableDocente}.id`)
                table.string('id_especialidade').notNullable()
                table.foreign('id_especialidade')
                    .references(`${BaseDB.tableEspecialidades}.id`)
                    .onDelete('cascade')
            })
            .then(() => {
                console.log(`Table ${BaseDB.tableDocenteEspecialidades} created.`)
            })
    } else {
        console.log(`Table ${BaseDB.tableDocenteEspecialidades} already exists.`)
    }
})
    .catch(printError)


// Tabela Especialidades
BaseDB.connection.schema.hasTable(BaseDB.tableEspecialidades).then((exists) => {
    if (!exists) {
        return BaseDB.connection.schema
            .createTable(BaseDB.tableEspecialidades, (table) => {
                table.string('id')
                table.primary(['id'])
                table.string('nome').notNullable()
            })
            .then(() => {
                console.log(`Table ${BaseDB.tableEspecialidades} created.`)
            })
    } else {
        console.log(`Table ${BaseDB.tableEspecialidades} already exists.`)
    }
})
    .catch(printError)


const addEspecialidades = () => BaseDB.connection(BaseDB.tableEspecialidades)
    .insert(especialidades)
    .then(() => { console.log(`Especialidades adicionadas na tablela ${BaseDB.tableEspecialidades}.`) })
    .catch(printError)

const connection = () => { BaseDB.connection.destroy() }

createTables()
    .then(addEspecialidades)
    .finally(connection)