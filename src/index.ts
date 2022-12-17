import app from "./app"
import { createTurma } from "./endpoints/createTurma"
import { getTurmas } from "./endpoints/getTurmas"

app.get("/turma", getTurmas);
app.post("/turma", createTurma);
