import { connection } from "./connection"

const printError = (error: any) => { console.log(error.sqlMessage || error.message) }

const tableEstudante = "LabSys_estudante"
const tableDocente = "LabSys_docente"
const tableTurma = "LabSys_turma"

const createTables = () => 
    connection.schema.hasTable(tableEstudante).then((exists) => {
        if (!exists) {
            console.log(`Table ${tableEstudante} created.`)
            return connection.schema
                .createTable('LabSys_docente', (table) => {
                    table.string('id')
                    table.primary(['id'])
                    table.string('nome').notNullable()
                    table.string('email').notNullable().unique()
                    table.date('data_nasc').notNullable()
                    table.string('turma_id').notNullable()
                    table.foreign('turma_id').references(`${tableTurma}.id`)
                })
        } else {
            console.log(`Table ${tableEstudante} already exists.`)
        }
    })
    .catch(printError)
    
    connection.schema.hasTable(tableTurma).then((exists) => {
        if (!exists) {
            console.log(`Table ${tableTurma} created.`)
            return connection.schema
                .createTable('LabSys_docente', (table) => {
                    table.string('id')
                    table.primary(['id'])
                    table.string('nome').notNullable()
                    table.string('modulo').notNullable().defaultTo(0)
                })
        } else {
            console.log(`Table ${tableTurma} already exists.`)
        }
    })
    .catch(printError)

    connection.schema.hasTable(tableDocente).then((exists) => {
        if (!exists) {
            console.log('Table created.')
            return connection.schema
                .createTable(tableDocente, (table) => {
                    table.string('id')
                    table.primary(['id'])
                    table.string('nome').notNullable()
                    table.string('email').notNullable().unique()
                    table.date('data_nasc').notNullable()
                    table.string('turma_id').notNullable()
                    table.foreign('turma_id').references(`${tableTurma}.id`)
                })
        } else {
            console.log(`Table ${tableEstudante} already exists.`)
        }
    })
    .catch(printError)



// const insertUsers = () => connection("TABLE_NAME")
//     .insert(json_file)
//     .then(() => { console.log("Users added.") })
//     .catch(printError)

const closeConnection = () => { connection.destroy() }

createTables()
    // .then(insertUsers)
    .finally(closeConnection)
