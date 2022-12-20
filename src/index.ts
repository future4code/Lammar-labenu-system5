import app from "./app"
import { changeTurma } from "./endpoints/changeTurma"
import { addUsuario } from "./endpoints/addUsuario"
import { getEntity } from "./endpoints/getEntity"
import { changeModulo } from "./endpoints/changeModulo"
import { addTurma } from "./endpoints/addTurma"
import { getMembers } from "./endpoints/getMembers"

app.get("/entity", getEntity)

app.post("/usuario", addUsuario)
app.put("/usuario", changeTurma)

app.post("/turma", addTurma)
app.put("/turma", changeModulo)

app.get("/members", getMembers)