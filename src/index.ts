import app from "./app"
import { changeTurma } from "./endpoints/estudante/changeTurma"
import { createEstudante } from "./endpoints/estudante/createEstudante"
import { getEstudanteByName } from "./endpoints/estudante/getEstudanteByName"
import { changeModulo } from "./endpoints/turma/changeModulo"
import { createTurma } from "./endpoints/turma/createTurma"
import { getTurmas } from "./endpoints/turma/getTurmas"

app.get("/turma", getTurmas)
app.post("/turma", createTurma)
app.put("/turma", changeModulo)

app.get("/estudante", getEstudanteByName)
app.post("/estudante", createEstudante)
app.put("/estudante", changeTurma)


