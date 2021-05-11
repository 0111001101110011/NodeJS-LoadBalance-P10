const fs = require("fs");
const server = require("fastify")();

const HOST = process.env.HOST || "127.0.0.1";
const PORT = process.env.PORT || 4000;

console.log(`Proceso pid=${process.pid}`);

// http://localhost:4000/recetas/42
server.get("/recetas/:id", async (request, response) => {
  console.log(`Proceso de atención de solicitud pid=${process.pid}`);
  const id = Number(request.params.id);
  if (id !== 42) {
    response.statusCode = 404;
    return { error: "No se encontró receta" };
  }
  return {
    pid: process.pid,
    receta: {
      id,
      nombre: "Taco de pollo",
      pasos: "Agarra una tortilla y échale pollo",
      ingredientes: [
        { id: 1, nombre: "Tortilla", cantidad: "2 unidades" },
        { id: 2, nombre: "Pollo", cantidad: "80 grs" },
      ],
    },
  };
});

server.listen(PORT, HOST, () => {
  console.log(`Servidor ejecutandose en http://${HOST}:${PORT}`);
});
