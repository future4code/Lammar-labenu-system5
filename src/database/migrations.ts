import { connection } from "./connection"
import especialidades from "./especialidades.json"

const printError = (error: any) => { console.log(error.sqlMessage || error.message) }

const tableEstudante = "LabSys_estudante"
const tableDocente = "LabSys_docente"
const tableTurma = "LabSys_turma"
const tableEstudanteHobby = "LabSys_estudanteHobby"
const tableHobbies = "LabSys_hobbies"
const tableDocenteEspecialidades = "LabSys_docenteEspec"
const tableEspecialidades = "LabSys_especialidades"

const createTables = () =>

    // Tabela Hobbies
    connection.schema.hasTable(tableHobbies).then((exists) => {
        if (!exists) {
            return connection.schema
                .createTable(tableHobbies, (table) => {
                    table.string('id')
                    table.primary(['id'])
                    table.string('nome').notNullable().unique()
                })
                .then(() => {
                    console.log(`Table ${tableHobbies} created.`)
                })
        } else {
            console.log(`Table ${tableHobbies} already exists.`)
        }
    })
        .catch(printError)


// Tabela de Relação Estudante-Hobbie
connection.schema.hasTable(tableEstudanteHobby).then((exists) => {
    if (!exists) {
        return connection.schema
            .createTable(tableEstudanteHobby, (table) => {
                table.string('id')
                table.primary(['id'])
                table.string('id_hobby')
                table.foreign('id_hobby').references(`${tableHobbies}.id`)
                table.string('id_estudante')
                table.foreign('id_estudante')
                    .references(`${tableEstudante}.id`)
                    .onDelete('cascade')
            })
            .then(() => {
                console.log(`Table ${tableEstudanteHobby} created.`)
            })
    } else {
        console.log(`Table ${tableEstudanteHobby} already exists.`)
    }
})
    .catch(printError)


// Tabela Estudantes
connection.schema.hasTable(tableEstudante).then((exists) => {
    if (!exists) {
        return connection.schema
            .createTable(tableEstudante, (table) => {
                table.string('id')
                table.primary(['id'])
                table.string('nome').notNullable()
                table.string('email').notNullable().unique()
                table.date('data_nasc').notNullable()
                table.string('turma_id').notNullable()
                table.foreign('turma_id')
                .references(`${tableTurma}.id`)
                .onDelete('cascade')
            })
            .then(() => {
                console.log(`Table ${tableEstudante} created.`)
            })
    } else {
        console.log(`Table ${tableEstudante} already exists.`)
    }
})
    .catch(printError)


// Tabela Turma
connection.schema.hasTable(tableTurma).then((exists) => {
    if (!exists) {
        return connection.schema
            .createTable(tableTurma, (table) => {
                table.string('id')
                table.primary(['id'])
                table.string('nome').notNullable()
                table.string('modulo').notNullable().defaultTo(0)
            })
            .then(() => {
                console.log(`Table ${tableTurma} created.`)
            })
    } else {
        console.log(`Table ${tableTurma} already exists.`)
    }
})
    .catch(printError)


// Tabela Docente
connection.schema.hasTable(tableDocente).then((exists) => {
    if (!exists) {
        return connection.schema
            .createTable(tableDocente, (table) => {
                table.string('id')
                table.primary(['id'])
                table.string('nome').notNullable()
                table.string('email').notNullable().unique()
                table.date('data_nasc').notNullable()
                table.string('turma_id').notNullable()
                table.foreign('turma_id')
                .references(`${tableTurma}.id`)
                .onDelete('cascade')
            })
            .then(() => {
                console.log(`Table ${tableDocente} created.`)
            })
    } else {
        console.log(`Table ${tableDocente} already exists.`)
    }
})
    .catch(printError)


// Tabela de Relação Docente-Especialidades
connection.schema.hasTable(tableDocenteEspecialidades).then((exists) => {
    if (!exists) {
        return connection.schema
            .createTable(tableDocenteEspecialidades, (table) => {
                table.string('id')
                table.primary(['id'])
                table.string('id_docente').notNullable()
                table.foreign('id_docente').references(`${tableDocente}.id`)
                table.string('id_especialidade').notNullable()
                table.foreign('id_especialidade')
                .references(`${tableEspecialidades}.id`)
                .onDelete('cascade')
            })
            .then(() => {
                console.log(`Table ${tableDocenteEspecialidades} created.`)
            })
    } else {
        console.log(`Table ${tableDocenteEspecialidades} already exists.`)
    }
})
    .catch(printError)


// Tabela Especialidades
connection.schema.hasTable(tableEspecialidades).then((exists) => {
    if (!exists) {
        return connection.schema
            .createTable(tableEspecialidades, (table) => {
                table.string('id')
                table.primary(['id'])
                table.string('nome').notNullable()
            })
            .then(() => {
                console.log(`Table ${tableEspecialidades} created.`)
            })
    } else {
        console.log(`Table ${tableEspecialidades} already exists.`)
    }
})
    .catch(printError)


const addEspecialidades = () => connection(tableEspecialidades)
    .insert(especialidades)
    .then(() => { console.log("Especialidades adicionadas.") })
    .catch(printError)

const closeConnection = () => { connection.destroy() }

createTables()
    .then(addEspecialidades)
    .finally(closeConnection)