const express = require("express");
const mongoose = require("mongoose");
const tasksRoutes = require("./routes/tasks-routes");
const usersRoutes = require("./routes/users-routes");
// Importer le gestionnaire d'erreurs
const errorHandler = require("./handler/error-handler");

const app = express();

const uri = "mongodb://localhost:27017/Users-Tasks";
mongoose
  .connect(uri)
  .then(() => {
    app.listen(5000);
  })
  .catch((err) => console.log(err));

//Parse le code entrant pour ajouter une propriété body sur la request
app.use(express.json());
// ce middleware ne rtourne pas de reponse mais va ajoute run header
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // header et value * quels domaines peuvent acceder a notre serveur
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  ); //quel header sont autorisés ( pourait etre * pour tout)
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE"); // quelles methodes HTTP sont autorisées
  next();
});

app.use("/api/tasks", tasksRoutes);

app.use("/api/users", usersRoutes);

app.use((req, res, next) => {
  const error = new Error("Route non trouvée");
  error.code = 404;
  next(error);
});

app.use(errorHandler);
