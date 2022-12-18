import app from "./app"
import { changeModulo } from "./endpoints/changeModulo"
import { createTurma } from "./endpoints/createTurma"
import { getTurmas } from "./endpoints/getTurmas"

app.get("/turma", getTurmas)
app.post("/turma", createTurma)
app.put("/turma", changeModulo)