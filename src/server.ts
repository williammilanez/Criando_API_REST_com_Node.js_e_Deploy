import app from "./app";

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servidor is running on http://localhost:${PORT}/api/todos`);
});
