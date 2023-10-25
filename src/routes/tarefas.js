const express = require("express");
const router = express.Router();
const connectDB = require("../middleware/connectDB");

router.use(express.json());

router.post("/", async (req, res) => {
  // #swagger.tags = ['Tarefas']
  try{
    const connection = await connectDB();
    const { descricao, concluido } = req.body;

    const sql = "INSERT INTO tarefas (descricao, concluido) VALUES (?,?)";
    const values = [descricao, concluido];

    const [result] = await connection.query(sql, values);
    await connection.end();

    res.status(200).json({ data: result });
  } catch (error) {
    console.error("Error while creating user in database:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/", async (req, res) => {
  // #swagger.tags = ['Tarefas']
  try {
    const connection = await connectDB();
    const [result] = await connection.query("SELECT * FROM tarefas");
    await connection.end();
    res.json({ data: result });
  } catch (error) {
    console.error("Error in the database query:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/getByText", async (req, res) => {
  // #swagger.tags = ['Tarefas']
  try {
    const connection = await connectDB();
    const {descricao} = req.body;

    const sql ="SELECT * FROM tarefas WHERE descricao LIKE ?";
    const values = [`%${descricao}%`];

    const [result] = await connection.query(sql, values);
    await connection.end();

    res.status(200).json({ data: results });
  } catch (error) {
    console.error("Error while creating user in database:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/update/:id", async (req, res) => {
  // #swagger.tags = ['Tarefas']
  try {
    const connection = await connectDB();
    const id = req.params.id;
    const { descricao, concluido } = req.body;
    const updatedFields = req.body;
    const update_at = new Date();

    const sql = "UPDATE tarefas SET ? , update_at = ? WHERE id = ?";
    const values = [updatedFields, update_at, id];

    const [result] = await connection.query(sql, values);
    await connection.end();

    res.json({ data: result });
  } catch (error) {
    console.error("Error while editing user in database:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/delete/:id", async (req, res) => {
  // #swagger.tags = ['Tarefas']
  try {
    const connection = await connectDB();
    const id = req.params.id;

    const sql = "DELETE FROM tarefas WHERE id = ?";
    const [result] = await connection.query(sql, [id]);
    await connection.end();

    res.json({ data: result });
  } catch (error) {
    console.error("Error when deleting user from database:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
