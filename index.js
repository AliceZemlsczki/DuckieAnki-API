const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const deckRoutes = require("./routes/deckRoutes");
const authMiddleware = require("./middlewares/authMiddleware");

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(express.json());
// Rotas
// Usuário autenticado A
app.use("/user", userRoutes);
app.get("/user", authMiddleware, userRoutes, (req, res) => {
  res.status(200).send("sucesso")
})
// Sem autenticação
app.use("/auth", authRoutes);
// Deck
app.use("/deck", deckRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
