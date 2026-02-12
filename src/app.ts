import cors from "cors";
import Express from "express";

const app = Express();

app.use(Express.json());
app.use(cors());

//rotas

//rota check

app.get("/api/", (req, res) => {
  res.json({ message: "API todo list" });
});

export default app;
