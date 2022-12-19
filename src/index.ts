import app from "./app"
import { changeTurma } from "./endpoints/usuario/changeTurma"
import { addUsuario } from "./endpoints/usuario/addUsuario"
import { getUsuario } from "./endpoints/usuario/getUsuario"
import { changeModulo } from "./endpoints/turma/changeModulo"
import { createTurma } from "./endpoints/turma/createTurma"
import { getTurmas } from "./endpoints/turma/getTurmas"

app.put("/usuario", changeTurma)
app.post("/usuario", addUsuario)
app.get("/usuario", getUsuario)

app.get("/turma", getTurmas)
app.post("/turma", createTurma)
app.put("/turma", changeModulo)