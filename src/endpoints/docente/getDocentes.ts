import { Response, Request } from "express";
import { Docente } from "../../classes/Docente";

export const getDocentes = async (req:Request, res:Response) => {
    let errorCode = 400
    try {
        const result = await Docente.getDocentes()
        
        res.status(200).send(result)
    } catch (error: any) {
        res.status(errorCode).send({ message: error.message })
    }
}