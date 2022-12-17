import { Turma } from "../classes/Turma"
import { BaseDB } from "./BaseDB"

export class TurmaDB extends BaseDB {

    public static createTurma = async (novaTurma: Turma) => {
        await TurmaDB
            .connection(TurmaDB.tableTurma)
            .insert(novaTurma)
    }

    // public static createProduct = async (newProduct: Product) => {
    //     await ProductDatabase
    //         .connection(ProductDatabase.productTableName)
    //         .insert(newProduct)
    // }


    // public static getProducts = async () => {
    //     const result = await ProductDatabase
    //         .connection(ProductDatabase.productTableName)
    //         .select()
    //     return result
    // }


    // public static findProduct = async (productId: string) => {
    //     const result = await ProductDatabase
    //         .connection(ProductDatabase.productTableName)
    //         .select()
    //         .where({ id: productId })
    //     return result
    // }
}